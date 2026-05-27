import { LOCALE_QUERY, type Locale } from "@/lib/i18n/locale-constants";

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
