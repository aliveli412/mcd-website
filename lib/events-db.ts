export type EventStatus = "draft" | "published";

export type DbEvent = {
  id: string;
  slug: string;
  title: string;
  title_plain: string;
  description: string;
  body: string[];
  category: string;
  date_display: string | null;
  event_date: string | null;
  event_time: string | null;
  location: string | null;
  duration: string | null;
  poster_url: string | null;
  featured: boolean;
  status: EventStatus;
  schedule: { time: string; label: string }[];
  title_en?: string | null;
  title_plain_en?: string | null;
  description_en?: string | null;
  category_en?: string | null;
  location_en?: string | null;
  duration_en?: string | null;
  body_en?: string[];
  created_at: string;
  updated_at: string;
};

export type EventInsert = Omit<
  DbEvent,
  "id" | "created_at" | "updated_at"
>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
