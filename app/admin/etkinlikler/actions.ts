"use server";

import type { ActionResult } from "@/lib/admin/action-result";
import { requireAdmin } from "@/lib/admin/require-admin";
import { revalidateEvents } from "@/lib/admin/revalidate";
import { eventPayloadFromForm } from "@/lib/data/normalize-event";
import { type EventStatus, slugify } from "@/lib/events-db";
import { supabaseAdmin } from "@/lib/supabase/server";

function parseEventForm(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const category = formData.get("category") as string;
  const location = (formData.get("location") as string)?.trim() || null;
  const duration = (formData.get("duration") as string)?.trim() || null;
  const eventDate = (formData.get("event_date") as string) || null;
  const eventTime = (formData.get("event_time") as string) || null;
  const posterUrl =
    (formData.get("poster_url") as string)?.trim() ||
    (formData.get("posterUrl") as string)?.trim() ||
    null;
  const featured = formData.get("featured") === "on";
  const status = ((formData.get("status") as EventStatus) || "published") as EventStatus;
  const slugField = (formData.get("slug") as string)?.trim();
  const titleEn = (formData.get("title_en") as string)?.trim() || null;
  const descriptionEn = (formData.get("description_en") as string)?.trim() || null;
  const categoryEn = (formData.get("category_en") as string)?.trim() || null;
  const locationEn = (formData.get("location_en") as string)?.trim() || null;
  const durationEn = (formData.get("duration_en") as string)?.trim() || null;
  const bodyEn = ((formData.get("body_en") as string) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const dateDisplay =
    eventDate && eventTime ? `${eventDate} ${eventTime}` : eventDate;

  return {
    title,
    description,
    category,
    location,
    duration,
    eventDate,
    eventTime,
    posterUrl,
    featured,
    status,
    dateDisplay,
    slugField,
    titleEn,
    descriptionEn,
    categoryEn,
    locationEn,
    durationEn,
    bodyEn,
  };
}

function buildSlug(title: string, existingSlug?: string) {
  if (existingSlug) return existingSlug;
  const slug = slugify(title);
  return slug || `etkinlik-${Date.now()}`;
}

export async function createEvent(
  formData: FormData,
): Promise<ActionResult<{ slug: string }>> {
  try {
    await requireAdmin();

    const parsed = parseEventForm(formData);

    if (!parsed.title || !parsed.description || !parsed.category) {
      return { ok: false, error: "Başlık, açıklama ve kategori zorunludur." };
    }

    const slug = buildSlug(parsed.title);

    const { error } = await supabaseAdmin.from("events").insert({
      slug,
      ...eventPayloadFromForm(parsed),
      body: [],
      schedule: [],
      updated_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Bu slug zaten kullanılıyor; başlığı değiştirin." };
      }
      throw error;
    }

    revalidateEvents();
    return { ok: true, data: { slug } };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Etkinlik oluşturulamadı",
    };
  }
}

export async function updateEvent(
  id: string,
  formData: FormData,
): Promise<ActionResult<{ slug: string }>> {
  try {
    await requireAdmin();

    const parsed = parseEventForm(formData);

    if (!parsed.title || !parsed.description || !parsed.category) {
      return { ok: false, error: "Başlık, açıklama ve kategori zorunludur." };
    }

    const slug = buildSlug(parsed.title, parsed.slugField || undefined);

    const { error } = await supabaseAdmin
      .from("events")
      .update({
        slug,
        ...eventPayloadFromForm(parsed),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Bu slug zaten kullanılıyor." };
      }
      throw error;
    }

    revalidateEvents();
    return { ok: true, data: { slug } };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Etkinlik güncellenemedi",
    };
  }
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const { error } = await supabaseAdmin.from("events").delete().eq("id", id);

    if (error) throw error;

    revalidateEvents();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Etkinlik silinemedi",
    };
  }
}

export async function setEventStatus(
  id: string,
  status: EventStatus,
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("events")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;

    revalidateEvents();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Durum güncellenemedi",
    };
  }
}
