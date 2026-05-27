import type { Locale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export function getMainNav(locale: Locale) {
  const n = getMessages(locale).nav;
  return [
    { href: "/", label: n.home },
    { href: "/hakkimizda", label: n.about },
    { href: "/etkinlikler", label: n.events },
    { href: "/haberler", label: n.news },
    { href: "/iletisim", label: n.contact },
  ] as const;
}

export function getFooterNav(locale: Locale) {
  const n = getMessages(locale).nav;
  return [
    { href: "/", label: n.home.charAt(0) + n.home.slice(1).toLowerCase() },
    { href: "/hakkimizda", label: locale === "en" ? "About" : "Hakkımızda" },
    { href: "/etkinlikler", label: locale === "en" ? "Events" : "Etkinlikler" },
    { href: "/haberler", label: locale === "en" ? "News" : "Haberler" },
    { href: "/iletisim", label: locale === "en" ? "Contact" : "İletişim" },
  ] as const;
}
