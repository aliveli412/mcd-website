export type NewsStatus = "draft" | "published";

export type DbNews = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
  gradient: string;
  image_url: string | null;
  status: NewsStatus;
  published_at: string | null;
  source_url?: string | null;
  source_name?: string | null;
  title_en?: string | null;
  tag_en?: string | null;
  excerpt_en?: string | null;
  body_en?: string[];
  created_at: string;
  updated_at: string;
};

export const NEWS_GRADIENT_OPTIONS = [
  { value: "from-forest-mid to-forest-dark", label: "Orta orman yeşili" },
  { value: "from-leaf-green to-forest-dark", label: "Yaprak yeşili" },
  { value: "from-river-blue to-forest-dark", label: "Nehir mavisi" },
  { value: "from-forest-dark to-forest-deep", label: "Koyu orman" },
  { value: "from-terracotta to-forest-dark", label: "Toprak tonu (terrakota)" },
] as const;

export const NEWS_GRADIENTS = NEWS_GRADIENT_OPTIONS.map((o) => o.value);

import { asStringArray } from "@/lib/data/json-body";

export { slugify } from "@/lib/events-db";

export function normalizeDbNews(row: Record<string, unknown>): DbNews {
  let status: NewsStatus = "draft";
  if (row.status === "published" || row.status === "draft") {
    status = row.status;
  }

  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    tag: String(row.tag ?? ""),
    title: String(row.title ?? ""),
    excerpt: String(row.excerpt ?? ""),
    body: asStringArray(row.body),
    gradient: String(row.gradient ?? "from-forest-mid to-forest-dark"),
    image_url: (row.image_url as string | null) ?? null,
    status,
    published_at: (row.published_at as string | null) ?? null,
    source_url: (row.source_url as string | null) ?? null,
    source_name: (row.source_name as string | null) ?? null,
    title_en: (row.title_en as string | null) ?? null,
    tag_en: (row.tag_en as string | null) ?? null,
    excerpt_en: (row.excerpt_en as string | null) ?? null,
    body_en: asStringArray(row.body_en),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}
