export const LOCALE_COOKIE = "mcd_locale";
/** URL’de dil: /haberler?lang=en */
export const LOCALE_QUERY = "lang";

export type Locale = "tr" | "en";

export const defaultLocale: Locale = "tr";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "tr";
}
