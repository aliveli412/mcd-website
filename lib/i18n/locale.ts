import { unstable_noStore as noStore } from "next/cache";
import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  type Locale,
  parseLocale,
} from "@/lib/i18n/locale-constants";

const LOCALE_HEADER = "x-mcd-locale";

export type { Locale } from "@/lib/i18n/locale-constants";
export {
  LOCALE_COOKIE,
  LOCALE_QUERY,
  defaultLocale,
  parseLocale,
} from "@/lib/i18n/locale-constants";

export async function getLocale(): Promise<Locale> {
  noStore();
  const fromHeader = (await headers()).get(LOCALE_HEADER);
  if (fromHeader) return parseLocale(fromHeader);

  const store = await cookies();
  return parseLocale(store.get(LOCALE_COOKIE)?.value);
}
