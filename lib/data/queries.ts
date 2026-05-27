import { mapEvent, mapNews, type DbNewsRow } from "@/lib/data/mappers";
import type { PublicEvent, PublicNews } from "@/lib/data/types";
import { getLocale } from "@/lib/i18n/locale";
import { filterPublicEvents, isRemovedPublicEvent } from "@/lib/removed-events";
import { supabaseAdmin } from "@/lib/supabase/server";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

/** Yaklaşan yayınlanmış etkinlikler; yetmezse en son geçmiş etkinliklerle tamamlar. */
export async function getDisplayEvents(limit: number): Promise<PublicEvent[]> {
  const locale = await getLocale();
  const today = todayIsoDate();

  const { data: upcoming, error: upErr } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("status", "published")
    .not("date", "is", null)
    .gte("date", today)
    .order("featured", { ascending: false })
    .order("date", { ascending: true })
    .limit(limit + 8);

  if (upErr) {
    console.error("getDisplayEvents (upcoming):", upErr.message);
  }

  let result = filterPublicEvents(
    (upcoming ?? []).map((row) => mapEvent(row, locale)),
  );
  if (result.length >= limit) {
    return result.slice(0, limit);
  }

  const need = limit - result.length;
  const { data: past, error: pastErr } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("status", "published")
    .not("date", "is", null)
    .lt("date", today)
    .order("date", { ascending: false })
    .limit(need + 8);

  if (pastErr) {
    console.error("getDisplayEvents (past):", pastErr.message);
    return result;
  }

  result = [
    ...result,
    ...filterPublicEvents((past ?? []).map((row) => mapEvent(row, locale))),
  ];
  return result.slice(0, limit);
}

export async function getFeaturedEvents(): Promise<PublicEvent[]> {
  return getDisplayEvents(5);
}

export async function getPublishedEvents(): Promise<PublicEvent[]> {
  const locale = await getLocale();
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("getPublishedEvents:", error.message);
    return [];
  }

  return filterPublicEvents((data ?? []).map((row) => mapEvent(row, locale)));
}

export async function getUpcomingEvents(limit = 12): Promise<PublicEvent[]> {
  return getDisplayEvents(limit);
}

export async function getEventBySlug(slug: string): Promise<PublicEvent | null> {
  const locale = await getLocale();
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  const event = mapEvent(data, locale);
  if (isRemovedPublicEvent(event)) return null;
  return event;
}

export async function getPublishedEventSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("slug, title_plain, title")
    .eq("status", "published");

  if (error) return [];
  return (data ?? [])
    .map((row) => mapEvent(row))
    .filter((e) => !isRemovedPublicEvent(e))
    .map((e) => e.slug);
}

export async function getLatestNews(limit = 3): Promise<PublicNews[]> {
  const locale = await getLocale();
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getLatestNews:", error.message);
    return [];
  }

  return (data as DbNewsRow[]).map((row) => mapNews(row, locale));
}

export async function getAllPublishedNews(): Promise<PublicNews[]> {
  const locale = await getLocale();
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getAllPublishedNews:", error.message);
    return [];
  }

  return (data as DbNewsRow[]).map((row) => mapNews(row, locale));
}

export async function getNewsBySlug(slug: string): Promise<PublicNews | null> {
  const locale = await getLocale();
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return mapNews(data as DbNewsRow, locale);
}

export async function getPublishedNewsSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("slug")
    .eq("status", "published");

  if (error) return [];
  return data?.map((r) => r.slug) ?? [];
}

export async function getHomepageData() {
  const { getFieldGalleryPhotos } = await import("@/lib/data/field-gallery");

  const [spotlight, news, fieldGallery] = await Promise.all([
    getDisplayEvents(2),
    getLatestNews(6),
    getFieldGalleryPhotos(),
  ]);

  const today = todayIsoDate();
  const spotlightUsesPast =
    spotlight.length > 0 &&
    spotlight.every((e) => e.eventDate && e.eventDate < today);

  return {
    featured: spotlight,
    spotlightUsesPast,
    news,
    fieldGallery,
  };
}
