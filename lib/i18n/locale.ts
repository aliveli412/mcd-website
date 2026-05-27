import { cookies } from "next/headers";

export const LOCALE_COOKIE = "mcd_locale";

export type Locale = "tr" | "en";

export const defaultLocale: Locale = "tr";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "tr";
}

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return parseLocale(store.get(LOCALE_COOKIE)?.value);
}
