import type { Locale } from "@/lib/i18n/locale";

const messages = {
  tr: {
    headerTagline: "2003'ten beri doğa için mücadele",
    supportCta: "Destek Ol",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    mainNavAria: "Ana menü",
    localeSwitchEn: "EN",
    localeSwitchTr: "TR",
    localeSwitcherAria: "Dil seçimi",
    newsEyebrow: "SON HABERLER",
    newsTitle: "Güncel haberler",
    newsAccent: "haberler",
    newsAllLink: "Tüm Haberler",
    newsEmpty: "Henüz yayınlanmış haber yok.",
    readMore: "Devamını oku",
    newsPageTitle: "Güncel haberler",
    newsPageDesc:
      "Munzur Çevre Derneği'nden haberler, duyurular ve basın açıklamaları.",
    backToNews: "← Tüm haberler",
    source: "Kaynak:",
    originalSource: "Orijinal haber",
    newsNotFound: "Haber bulunamadı",
    showcaseDrag: "Fareyle sürükleyin, tekerlek ile kaydırın veya okları kullanın",
    newsCarouselDrag: "Ok ile geçin veya parmağınızla / fareyle sürükleyin",
    nav: {
      home: "ANASAYFA",
      about: "HAKKIMIZDA",
      events: "ETKİNLİKLER",
      news: "HABERLER",
      contact: "İLETİŞİM",
    },
    footer: {
      blurb:
        "Munzur Çevre Derneği; su, toprak ve yaşam alanları için hukuki ve toplumsal mücadele yürütür.",
      links: "Bağlantılar",
      activities: "Faaliyetler",
      support: "Destek",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    headerTagline: "Fighting for nature since 2003",
    supportCta: "Support us",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNavAria: "Main menu",
    localeSwitchEn: "EN",
    localeSwitchTr: "TR",
    localeSwitcherAria: "Language",
    newsEyebrow: "LATEST NEWS",
    newsTitle: "News",
    newsAccent: "news",
    newsAllLink: "All news",
    newsEmpty: "No published news yet.",
    readMore: "Read more",
    newsPageTitle: "News",
    newsPageDesc:
      "News, announcements and press releases from Munzur Environment Association.",
    backToNews: "← All news",
    source: "Source:",
    originalSource: "Original article",
    newsNotFound: "Article not found",
    showcaseDrag: "Drag with mouse, scroll with wheel, or use arrows",
    newsCarouselDrag: "Use arrows or swipe / drag with finger or mouse",
    nav: {
      home: "HOME",
      about: "ABOUT",
      events: "EVENTS",
      news: "NEWS",
      contact: "CONTACT",
    },
    footer: {
      blurb:
        "Munzur Environment Association pursues legal and social struggle for water, land and living environments.",
      links: "Links",
      activities: "Activities",
      support: "Support",
      rights: "All rights reserved.",
    },
  },
} as const;

export type MessageKey = keyof (typeof messages)["tr"];

export function getMessages(locale: Locale) {
  return messages[locale];
}

export type Messages = ReturnType<typeof getMessages>;
