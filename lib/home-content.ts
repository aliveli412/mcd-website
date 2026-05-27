export const heroContent = {
  tag: "Doğaya ve insanlığa özgürlük, mücadele, direniş ve dayanışma ile gelecek!",
  title: ["MUNZUR", "ÇEVRE", "DERNEĞİ"] as const,
  blurb:
    "2003 yılından bu yana Türkiye'nin her yerinde doğal mirası, biyoçeşitliliği ve özgür yaşamı korumak için çalışıyoruz. Suya, toprağa ve insana sahip çıkıyoruz.",
};

export { heritageBand } from "@/lib/heritage-band";

export type { PublicNews as NewsItem } from "@/lib/data/types";

export const aboutPillars = [
  {
    title: "EKOLOJİK MÜCADELE",
    description: "HES, maden ve yapılaşma projelerine karşı hukuki ve toplumsal eylemler",
    icon: "chart",
  },
  {
    title: "DOĞA TAKİBİ",
    description: "Biyoçeşitlilik, su kalitesi, fauna ve flora izleme çalışmaları",
    icon: "nature",
  },
  {
    title: "TOPLUMSAL EĞİTİM",
    description: "Çocuklar ve gençler için doğa, kültür ve hak temelli atölyeler",
    icon: "people",
  },
  {
    title: "KÜLTÜR & SANAT",
    description: "Festivaller, müzik, sergi ve film aracılığıyla doğa anlatısı",
    icon: "culture",
  },
] as const;

