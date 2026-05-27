export const mainNav = [
  { href: "/", label: "ANASAYFA" },
  { href: "/hakkimizda", label: "HAKKIMIZDA" },
  { href: "/etkinlikler", label: "ETKİNLİKLER" },
  { href: "/haberler", label: "HABERLER" },
  { href: "/iletisim", label: "İLETİŞİM" },
] as const;

export const footerNav = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/etkinlikler", label: "Etkinlikler" },
  { href: "/haberler", label: "Haberler" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const footerActivities = [
  { href: "/hakkimizda", label: "Çevre Mücadelesi" },
  { href: "/hakkimizda", label: "Doğa Takibi" },
  { href: "/etkinlikler", label: "Eğitim & Atölye" },
  { href: "/etkinlikler", label: "Festival & Kültür" },
  { href: "/haberler", label: "Yayınlar" },
] as const;

export const footerSupport = [
  { href: "/iletisim", label: "Gönüllü Ol" },
  { href: "/iletisim", label: "Bağış Yap" },
  { href: "/iletisim", label: "Üye Ol" },
  { href: "/iletisim", label: "Bülten Aboneliği" },
  { href: "/iletisim", label: "İş Birliği" },
] as const;

export function isNavActive(pathname: string, href: string): boolean {
  const path = href.split("?")[0] ?? href;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
