import type { Locale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/locale-url";
import { getMessages } from "@/lib/i18n/messages";

export function getMainNav(locale: Locale) {
  const n = getMessages(locale).nav;
  return [
    { href: localizedPath("/", locale), label: n.home },
    { href: localizedPath("/hakkimizda", locale), label: n.about },
    { href: localizedPath("/etkinlikler", locale), label: n.events },
    { href: localizedPath("/haberler", locale), label: n.news },
    { href: localizedPath("/iletisim", locale), label: n.contact },
  ] as const;
}

export function getFooterNav(locale: Locale) {
  const n = getMessages(locale).nav;
  return [
    {
      href: localizedPath("/", locale),
      label: n.home.charAt(0) + n.home.slice(1).toLowerCase(),
    },
    { href: localizedPath("/hakkimizda", locale), label: n.about },
    { href: localizedPath("/etkinlikler", locale), label: n.events },
    { href: localizedPath("/haberler", locale), label: n.news },
    { href: localizedPath("/iletisim", locale), label: n.contact },
  ] as const;
}

export function localizeFooterLinks(
  links: readonly { href: string; label: string }[],
  locale: Locale,
) {
  return links.map((link) => ({
    ...link,
    href: localizedPath(link.href, locale),
  }));
}
