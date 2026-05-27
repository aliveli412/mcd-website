import type { DbEvent, EventStatus } from "@/lib/events-db";

/** Supabase satırını tek şemaya çevirir (date/event_date, published/status). */
export function normalizeDbEvent(row: Record<string, unknown>): DbEvent {
  const title = String(row.title ?? "");
  const titlePlain = String(row.title_plain ?? row.title ?? "");
  const eventDate = (row.date ?? row.event_date ?? null) as string | null;
  const eventTime = (row.event_time ?? row.time ?? null) as string | null;

  let status: EventStatus = "draft";
  if (row.status === "published" || row.status === "draft") {
    status = row.status;
  } else if (row.published === true) {
    status = "published";
  }

  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title,
    title_plain: titlePlain,
    description: String(row.description ?? ""),
    body: Array.isArray(row.body) ? (row.body as string[]) : [],
    category: String(row.category ?? ""),
    date_display: (row.date_display as string | null) ?? null,
    event_date: eventDate,
    event_time: eventTime,
    location: (row.location as string | null) ?? null,
    duration: (row.duration as string | null) ?? null,
    poster_url: (row.poster_url as string | null) ?? null,
    featured: Boolean(row.featured),
    status,
    schedule: Array.isArray(row.schedule)
      ? (row.schedule as { time: string; label: string }[])
      : [],
    title_en: (row.title_en as string | null) ?? null,
    title_plain_en: (row.title_plain_en as string | null) ?? null,
    description_en: (row.description_en as string | null) ?? null,
    category_en: (row.category_en as string | null) ?? null,
    location_en: (row.location_en as string | null) ?? null,
    duration_en: (row.duration_en as string | null) ?? null,
    body_en: Array.isArray(row.body_en) ? (row.body_en as string[]) : [],
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

export function eventPayloadFromForm(parsed: {
  title: string;
  description: string;
  category: string;
  location: string | null;
  duration: string | null;
  eventDate: string | null;
  eventTime: string | null;
  posterUrl: string | null;
  featured: boolean;
  status: EventStatus;
  dateDisplay: string | null;
  titleEn: string | null;
  descriptionEn: string | null;
  categoryEn: string | null;
  locationEn: string | null;
  durationEn: string | null;
  bodyEn: string[];
}) {
  const titlePlainEn = parsed.titleEn?.trim() || null;
  return {
    title: parsed.title,
    title_plain: parsed.title,
    description: parsed.description,
    category: parsed.category,
    date_display: parsed.dateDisplay,
    date: parsed.eventDate,
    event_time: parsed.eventTime || null,
    location: parsed.location,
    duration: parsed.duration,
    poster_url: parsed.posterUrl,
    featured: parsed.featured,
    status: parsed.status,
    title_en: titlePlainEn,
    title_plain_en: titlePlainEn,
    description_en: parsed.descriptionEn,
    category_en: parsed.categoryEn,
    location_en: parsed.locationEn,
    duration_en: parsed.durationEn,
    body_en: parsed.bodyEn,
  };
}
