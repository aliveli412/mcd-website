"use server";

import type { ActionResult } from "@/lib/admin/action-result";
import { publishedAtToday } from "@/lib/admin/published-at";
import { requireAdmin } from "@/lib/admin/require-admin";
import { revalidateNews } from "@/lib/admin/revalidate";
import { type NewsStatus, slugify } from "@/lib/news-db";
import { supabaseAdmin } from "@/lib/supabase/server";

function parseNewsForm(
  formData: FormData,
  imageUrlFromClient?: string | null,
) {
  const title = (formData.get("title") as string)?.trim();
  const tag = (formData.get("tag") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const bodyRaw = (formData.get("body") as string)?.trim() ?? "";
  const gradient = (formData.get("gradient") as string)?.trim();
  const imageUrl =
    imageUrlFromClient !== undefined
      ? imageUrlFromClient?.trim() || null
      : (formData.get("image_url") as string)?.trim() || null;
  const status = ((formData.get("status") as NewsStatus) || "draft") as NewsStatus;
  const slugField = (formData.get("slug") as string)?.trim();

  const body = bodyRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const titleEn = (formData.get("title_en") as string)?.trim() || null;
  const tagEn = (formData.get("tag_en") as string)?.trim() || null;
  const excerptEn = (formData.get("excerpt_en") as string)?.trim() || null;
  const bodyEnRaw = (formData.get("body_en") as string)?.trim() ?? "";
  const bodyEn = bodyEnRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    title,
    tag,
    excerpt,
    body,
    gradient,
    imageUrl,
    status,
    slugField,
    titleEn,
    tagEn,
    excerptEn,
    bodyEn,
  };
}

function resolvePublishedAt(
  status: NewsStatus,
  existing: string | null | undefined,
): string | null {
  if (status !== "published") {
    return existing ?? null;
  }
  return existing ?? publishedAtToday();
}

function buildSlug(title: string, existingSlug?: string) {
  if (existingSlug) return existingSlug;
  const slug = slugify(title);
  return slug || `haber-${Date.now()}`;
}

export async function createNews(
  formData: FormData,
  imageUrlFromClient?: string | null,
): Promise<ActionResult<{ slug: string; imageUrl: string | null }>> {
  try {
    await requireAdmin();
    const parsed = parseNewsForm(formData, imageUrlFromClient);

    if (!parsed.title || !parsed.tag || !parsed.excerpt) {
      return { ok: false, error: "Başlık, etiket ve özet zorunludur." };
    }

    const slug = buildSlug(parsed.title);
    const published_at = resolvePublishedAt(parsed.status, null);

    const { error } = await supabaseAdmin.from("news").insert({
      slug,
      tag: parsed.tag,
      title: parsed.title,
      excerpt: parsed.excerpt,
      body: parsed.body,
      title_en: parsed.titleEn,
      tag_en: parsed.tagEn,
      excerpt_en: parsed.excerptEn,
      body_en: parsed.bodyEn,
      gradient: parsed.gradient || "from-forest-mid to-forest-dark",
      image_url: parsed.imageUrl,
      status: parsed.status,
      published_at,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Bu slug zaten kullanılıyor." };
      }
      throw error;
    }

    revalidateNews(slug);
    return { ok: true, data: { slug, imageUrl: parsed.imageUrl } };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Haber oluşturulamadı",
    };
  }
}

export async function updateNews(
  id: string,
  formData: FormData,
  imageUrlFromClient?: string | null,
): Promise<ActionResult<{ slug: string; imageUrl: string | null }>> {
  try {
    await requireAdmin();
    const parsed = parseNewsForm(formData, imageUrlFromClient);

    if (!parsed.title || !parsed.tag || !parsed.excerpt) {
      return { ok: false, error: "Başlık, etiket ve özet zorunludur." };
    }

    const slug = buildSlug(parsed.title, parsed.slugField || undefined);

    const { data: existing } = await supabaseAdmin
      .from("news")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();

    const published_at = resolvePublishedAt(
      parsed.status,
      existing?.published_at,
    );

    const { error } = await supabaseAdmin
      .from("news")
      .update({
        slug,
        tag: parsed.tag,
        title: parsed.title,
        excerpt: parsed.excerpt,
        body: parsed.body,
        title_en: parsed.titleEn,
        tag_en: parsed.tagEn,
        excerpt_en: parsed.excerptEn,
        body_en: parsed.bodyEn,
        gradient: parsed.gradient || "from-forest-mid to-forest-dark",
        image_url: parsed.imageUrl,
        status: parsed.status,
        published_at,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Bu slug zaten kullanılıyor." };
      }
      throw error;
    }

    revalidateNews(slug);
    return { ok: true, data: { slug, imageUrl: parsed.imageUrl } };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Haber güncellenemedi",
    };
  }
}

export async function deleteNews(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
    if (error) throw error;
    revalidateNews();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Haber silinemedi",
    };
  }
}

export async function setNewsStatus(
  id: string,
  status: NewsStatus,
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const updates: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === "published") {
      const { data: row } = await supabaseAdmin
        .from("news")
        .select("published_at")
        .eq("id", id)
        .maybeSingle();
      if (!row?.published_at) {
        updates.published_at = publishedAtToday();
      }
    }

    const { error } = await supabaseAdmin.from("news").update(updates).eq("id", id);
    if (error) throw error;

    revalidateNews();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Durum güncellenemedi",
    };
  }
}
