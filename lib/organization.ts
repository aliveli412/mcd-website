export const organization = {
  name: "Munzur Çevre Derneği",
  email: "munzurcevredernegi@gmail.com",
  phone: "+90 (428) 000 00 00",
  phoneNote: "Dersim temsilciliği · hafta içi 09:00–18:00",
  offices: [
    {
      id: "hq",
      label: "GENEL MERKEZ",
      lines: ["Munzur Çevre Derneği", "Okmeydanı", "İstanbul"],
      region: "Türkiye",
    },
    {
      id: "dersim",
      label: "DERSİM TEMSİLCİLİĞİ",
      lines: ["Munzur Çevre Derneği", "Cumhuriyet Mah.", "Tunceli (Dersim)"],
      region: "Türkiye",
    },
  ],
} as const;
