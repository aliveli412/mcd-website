import { asStringArray } from "@/lib/data/json-body";
import { normalizeDbEvent } from "@/lib/data/normalize-event";
import type { DbEvent } from "@/lib/events-db";
import type { PublicEvent, PublicNews } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/locale";

export type DbNewsRow = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[] | null;
  gradient: string | null;
  image_url: string | null;
  status: string;
  published_at: string | null;
  source_url?: string | null;
  source_name?: string | null;
  title_en?: string | null;
  tag_en?: string | null;
  excerpt_en?: string | null;
  body_en?: string[] | null;
};

function formatNewsDate(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatEventDate(
  eventDate: string | null,
  dateDisplay: string | null,
  locale: Locale,
): string {
  if (dateDisplay?.trim()) return dateDisplay.trim();
  if (!eventDate) return "";
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(eventDate));
}

function derivePosterPlaceholder(
  titlePlain: string | undefined | null,
  eventDate: string | null,
  locale: Locale,
) {
  const fallback = locale === "en" ? "EVENT" : "ETKİNLİK";
  const words = (titlePlain ?? fallback).trim().split(/\s+/).filter(Boolean);
  const year = eventDate ? new Date(eventDate).getFullYear().toString() : "2026";
  return {
    headline: words[0]?.toUpperCase() ?? "MCD",
    subline: words.slice(1, 3).join(" ").toUpperCase() || fallback,
    year,
  };
}

export function mapEvent(
  row: DbEvent | Record<string, unknown>,
  locale: Locale = "tr",
): PublicEvent {
  const e = "title_plain" in row && typeof row.title_plain === "string"
    ? (row as DbEvent)
    : normalizeDbEvent(row as Record<string, unknown>);

  const titleEn = e.title_en?.trim();
  const useEn = locale === "en" && Boolean(titleEn);
  const titlePlain = useEn && e.title_plain_en?.trim()
    ? e.title_plain_en.trim()
    : e.title_plain;
  const title = useEn && titleEn ? titleEn : e.title;

  const body = useEn
    ? Array.isArray(e.body_en) && e.body_en.length > 0
      ? e.body_en
      : Array.isArray(e.body)
        ? e.body
        : []
    : Array.isArray(e.body)
      ? e.body
      : [];
  const schedule = Array.isArray(e.schedule) ? e.schedule : [];

  return {
    id: e.id,
    slug: e.slug,
    category:
      useEn && e.category_en?.trim() ? e.category_en.trim() : e.category,
    date: formatEventDate(e.event_date, e.date_display, locale),
    title: title.includes("\n") ? title : titlePlain,
    titlePlain,
    description:
      useEn && e.description_en?.trim()
        ? e.description_en.trim()
        : e.description,
    body,
    location:
      useEn && e.location_en?.trim() ? e.location_en.trim() : (e.location ?? ""),
    duration:
      useEn && e.duration_en?.trim() ? e.duration_en.trim() : (e.duration ?? ""),
    posterUrl: e.poster_url,
    poster: e.poster_url
      ? undefined
      : derivePosterPlaceholder(titlePlain, e.event_date, locale),
    schedule,
    eventDate: e.event_date,
    eventTime: e.event_time,
    featured: e.featured,
  };
}

export function mapNews(row: DbNewsRow, locale: Locale = "tr"): PublicNews {
  const titleEn = row.title_en?.trim();
  const useEn = locale === "en" && Boolean(titleEn);

  return {
    id: row.id,
    slug: row.slug,
    tag: useEn && row.tag_en?.trim() ? row.tag_en.trim() : row.tag,
    date: formatNewsDate(row.published_at, locale),
    title: useEn ? titleEn! : row.title,
    excerpt:
      useEn && row.excerpt_en?.trim() ? row.excerpt_en.trim() : row.excerpt,
    body: useEn
      ? (() => {
          const en = asStringArray(row.body_en);
          return en.length > 0 ? en : asStringArray(row.body);
        })()
      : asStringArray(row.body),
    gradient: row.gradient ?? "from-forest-mid to-forest-dark",
    imageUrl: row.image_url,
    publishedAt: row.published_at,
    sourceUrl: row.source_url ?? null,
    sourceName: row.source_name ?? null,
  };
}

