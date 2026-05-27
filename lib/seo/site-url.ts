export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://munzurcevredernegi.net";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function resolveOgImage(
  ogImage: string | null | undefined,
  fallback: string | null | undefined,
): string | undefined {
  const raw = ogImage?.trim() || fallback?.trim();
  if (!raw) return undefined;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return absoluteUrl(raw);
}
