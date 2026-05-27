export type SitePhoto = {
  src: string;
  alt: string;
  caption?: string;
  /** object-cover odak noktası, örn. "center 25%" */
  objectPosition?: string;
};

export const sitePhotos = {
  /** Ana sayfa hero: slogan ve başlıkların arka planı */
  heroBelowTitle: {
    src: "/photos/pazar-eylemi.png",
    alt: "Pazarda çevre afişleriyle toplu eylem — sahadan mücadele",
  },
  hero: {
    src: "/photos/varto-eylemi.png",
    alt: "Varto’da JES projesine karşı pankartlı eylem",
  },
  aboutPreview: {
    src: "/photos/afis-yapistirma.png",
    alt: "Gönüllü, sokakta çevre buluşması afişi yapıştırıyor",
    caption: "Sahada, halkın içinde",
    objectPosition: "center 35%",
  },
  aboutBanner: {
    src: "/photos/varto-eylemi.png",
    alt: "Varto’da JES projesine karşı pankartlı eylem",
    caption: "Türkiye’nin her yerinde direniş",
    objectPosition: "center 40%",
  },
  hakkimizdaHero: {
    src: "/photos/saha-bulusma.png",
    alt: "Dağlık bölgede yelekli gönüllüler halkla broşür paylaşıyor",
  },
  etkinliklerBanner: {
    src: "/photos/pazar-afis.png",
    alt: "Pazarda yeşil afişlerle ekoloji buluşması çağrısı",
    caption: "Pazar yerinde buluşma",
    objectPosition: "center 30%",
  },
  haberlerBanner: {
    src: "/photos/pazar-eylemi.png",
    alt: "Pazarda toplu çevre mücadelesi eylemi",
  },
  iletisim: {
    src: "/photos/saha-bulusma.png",
    alt: "Gönüllüler sahada halkla dayanışma içinde",
    caption: "Köy ve kentte dayanışma",
    objectPosition: "center 25%",
  },
} as const satisfies Record<string, SitePhoto>;

export const fieldGallery: SitePhoto[] = [
  {
    src: "/photos/pazar-eylemi.png",
    alt: "Pazarda maden ve talana karşı toplu protesto",
    caption: "Halkın sesi, ortak eylem",
    objectPosition: "center 45%",
  },
  sitePhotos.aboutPreview,
  sitePhotos.etkinliklerBanner,
  sitePhotos.aboutBanner,
  sitePhotos.iletisim,
];
