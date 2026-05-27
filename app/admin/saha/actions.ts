"use server";

import type { ActionResult } from "@/lib/admin/action-result";
import { revalidateFieldGallery } from "@/lib/admin/revalidate";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  FIELD_GALLERY_MAX,
  normalizeFieldGalleryPhoto,
} from "@/lib/field-gallery-db";
import { supabaseAdmin } from "@/lib/supabase/server";

function parseForm(formData: FormData) {
  const alt = (formData.get("alt") as string)?.trim();
  const caption = (formData.get("caption") as string)?.trim() || null;
  const objectPosition =
    (formData.get("object_position") as string)?.trim() || "center";
  const imageUrl = (formData.get("image_url") as string)?.trim();
  const sortOrderRaw = formData.get("sort_order");
  const sort_order =
    sortOrderRaw !== null && sortOrderRaw !== ""
      ? Number(sortOrderRaw)
      : null;

  return { alt, caption, objectPosition, imageUrl, sort_order };
}

async function nextSortOrder(): Promise<number | null> {
  const { count, error } = await supabaseAdmin
    .from("field_gallery_photos")
    .select("id", { count: "exact", head: true });

  if (error) throw error;
  if ((count ?? 0) >= FIELD_GALLERY_MAX) return null;

  const { data: used } = await supabaseAdmin
    .from("field_gallery_photos")
    .select("sort_order");

  const taken = new Set((used ?? []).map((r) => r.sort_order));
  for (let i = 0; i < FIELD_GALLERY_MAX; i++) {
    if (!taken.has(i)) return i;
  }
  return null;
}

export async function createFieldGalleryPhoto(
  formData: FormData,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const parsed = parseForm(formData);

    if (!parsed.alt) {
      return { ok: false, error: "Alt metin (erişilebilirlik) zorunludur." };
    }
    if (!parsed.imageUrl) {
      return { ok: false, error: "Görsel yükleyin veya URL girin." };
    }

    const sort_order =
      parsed.sort_order !== null &&
      !Number.isNaN(parsed.sort_order) &&
      parsed.sort_order >= 0 &&
      parsed.sort_order < FIELD_GALLERY_MAX
        ? parsed.sort_order
        : await nextSortOrder();

    if (sort_order === null) {
      return {
        ok: false,
        error: `En fazla ${FIELD_GALLERY_MAX} görsel olabilir. Önce birini silin.`,
      };
    }

    const { data, error } = await supabaseAdmin
      .from("field_gallery_photos")
      .insert({
        image_url: parsed.imageUrl,
        alt: parsed.alt,
        caption: parsed.caption,
        object_position: parsed.objectPosition,
        sort_order,
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return {
          ok: false,
          error: "Bu sıra numarası dolu. Başka bir konum seçin.",
        };
      }
      throw error;
    }

    revalidateFieldGallery();
    return { ok: true, data: { id: data.id } };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Görsel eklenemedi",
    };
  }
}

export async function updateFieldGalleryPhoto(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = parseForm(formData);

    if (!parsed.alt) {
      return { ok: false, error: "Alt metin zorunludur." };
    }
    if (!parsed.imageUrl) {
      return { ok: false, error: "Görsel URL gerekli." };
    }
    if (
      parsed.sort_order === null ||
      Number.isNaN(parsed.sort_order) ||
      parsed.sort_order < 0 ||
      parsed.sort_order >= FIELD_GALLERY_MAX
    ) {
      return { ok: false, error: "Geçerli bir konum (0–4) seçin." };
    }

    const { error } = await supabaseAdmin
      .from("field_gallery_photos")
      .update({
        image_url: parsed.imageUrl,
        alt: parsed.alt,
        caption: parsed.caption,
        object_position: parsed.objectPosition,
        sort_order: parsed.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return {
          ok: false,
          error: "Bu konumda başka bir görsel var.",
        };
      }
      throw error;
    }

    revalidateFieldGallery();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Görsel güncellenemedi",
    };
  }
}

export async function deleteFieldGalleryPhoto(
  id: string,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const { error } = await supabaseAdmin
      .from("field_gallery_photos")
      .delete()
      .eq("id", id);
    if (error) throw error;
    revalidateFieldGallery();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Görsel silinemedi",
    };
  }
}

export async function moveFieldGalleryPhoto(
  id: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const { data: rows, error: listErr } = await supabaseAdmin
      .from("field_gallery_photos")
      .select("*")
      .order("sort_order", { ascending: true });

    if (listErr) throw listErr;

    const list = (rows ?? []).map((r) =>
      normalizeFieldGalleryPhoto(r as Record<string, unknown>),
    );
    const index = list.findIndex((p) => p.id === id);
    if (index < 0) return { ok: false, error: "Görsel bulunamadı." };

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= list.length) {
      return { ok: true, data: undefined };
    }

    const a = list[index];
    const b = list[swapIndex];
    const now = new Date().toISOString();

    const { error: errA } = await supabaseAdmin
      .from("field_gallery_photos")
      .update({ sort_order: b.sort_order, updated_at: now })
      .eq("id", a.id);

    if (errA) throw errA;

    const { error: errB } = await supabaseAdmin
      .from("field_gallery_photos")
      .update({ sort_order: a.sort_order, updated_at: now })
      .eq("id", b.id);

    if (errB) throw errB;

    revalidateFieldGallery();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Sıra değiştirilemedi",
    };
  }
}
