import { LOCALE_QUERY, type Locale } from "@/lib/i18n/locale-constants";

/** EN seçiliyken dahili linklere ?lang=en ekler (çerez olmasa da dil korunur). */
export function localizedPath(
  pathname: string,
  locale: Locale,
  searchParams?: URLSearchParams | string,
): string {
  if (locale === "en") {
    return pathWithLocale(pathname, "en", searchParams);
  }
  const params = new URLSearchParams(
    typeof searchParams === "string" ? searchParams : searchParams?.toString(),
  );
  params.delete(LOCALE_QUERY);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function pathWithLocale(
  pathname: string,
  locale: Locale,
  searchParams?: URLSearchParams | string,
): string {
  const params = new URLSearchParams(
    typeof searchParams === "string" ? searchParams : searchParams?.toString(),
  );
  params.set(LOCALE_QUERY, locale);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
