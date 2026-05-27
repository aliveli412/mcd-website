import type { Locale } from "@/lib/i18n/locale";

const content = {
  tr: {
    hero: {
      tag: "Doğaya ve insanlığa özgürlük, mücadele, direniş ve dayanışma ile gelecek!",
      title: ["MUNZUR", "ÇEVRE", "DERNEĞİ"] as const,
      blurb:
        "2003 yılından bu yana Türkiye'nin her yerinde doğal mirası, biyoçeşitliliği ve özgür yaşamı korumak için çalışıyoruz. Suya, toprağa ve insana sahip çıkıyoruz.",
      ctaEvents: "ETKİNLİKLERİMİZ",
      ctaAbout: "HAKKIMIZDA",
    },
    heritage: {
      value: "22",
      suffix: "YIL",
      label: "Çevre mücadelesi",
      sentence:
        "2003'ten bu yana Türkiye'nin her yerinde suya, toprağa, ormana ve özgür yaşama sahip çıkmak için durmaksızın mücadele ediyoruz.",
      ariaLabel: "Kuruluş yılı",
    },
    aboutPreview: {
      eyebrow: "HAKKIMIZDA",
      title: "Doğanın sesi,\nhalkın direnişi",
      accent: ["sesi", "direnişi"] as const,
      leadExtra:
        " Hidroelektrik santral projelerine karşı mücadeleden fidan dikimine, kültürel etkinliklerden kamuoyu raporlarına kadar geniş bir alanda faaliyet gösteriyoruz.",
      cta: "BİZİ DAHA İYİ TANI",
      pillars: [
        {
          title: "EKOLOJİK MÜCADELE",
          description:
            "HES, maden ve yapılaşma projelerine karşı hukuki ve toplumsal eylemler",
          icon: "chart",
        },
        {
          title: "DOĞA TAKİBİ",
          description:
            "Biyoçeşitlilik, su kalitesi, fauna ve flora izleme çalışmaları",
          icon: "nature",
        },
        {
          title: "TOPLUMSAL EĞİTİM",
          description:
            "Çocuklar ve gençler için doğa, kültür ve hak temelli atölyeler",
          icon: "people",
        },
        {
          title: "KÜLTÜR & SANAT",
          description:
            "Festivaller, müzik, sergi ve film aracılığıyla doğa anlatısı",
          icon: "culture",
        },
      ],
    },
    events: {
      upcomingEyebrow: "YAKLAŞAN ETKİNLİKLER",
      recentEyebrow: "SON ETKİNLİKLER",
      title: "Birlikte direnişe\nkatıl",
      accent: "direnişe",
      allLink: "Tüm Etkinlikler",
      empty: "Yaklaşan etkinlik bulunmuyor.",
      recentNote:
        "Yaklaşan tarihli etkinlik yok; son gerçekleşen etkinliklerimiz gösteriliyor.",
      ariaLabel: "Etkinlikler",
      viewDetails: "Detayları gör →",
      details: "DETAYLAR",
      join: "KATIL",
      pageTitle: "Etkinlikler",
      pageDesc:
        "Festivalden doğa yürüyüşlerine, eğitim programlarından panel etkinliklerine kadar tüm programlarımız.",
      listEmpty: "Henüz yayınlanmış etkinlik yok.",
      detailNotFound: "Etkinlik bulunamadı",
      backToEvents: "← Tüm etkinlikler",
      aboutEvent: "Etkinlik hakkında",
      program: "Program",
      joinRegister: "KATIL / KAYIT",
      askQuestion: "SORU SOR",
      otherEvents: "Diğer etkinlikler",
    },
    fieldGallery: {
      eyebrow: "SAHADAN",
      title: "Mücadele sokakta",
      accent: "sokakta",
      blurb:
        "Türkiye'nin dört bir yanında pazar yerlerinden dağ köylerine kadar halkla omuz omuza.",
      aside: "Eylem, buluşma ve saha çalışmalarından kareler",
      featured: "Öne çıkan",
    },
    joinCta: {
      eyebrow: "Destek & gönüllülük",
      title: "Mücadeleye katılın",
      accent: "katılın",
      blurb:
        "Gönüllü olun, dayanışma kurun veya etkinliklerimize dahil olun. Adresler ve yazışma formu iletişim sayfasında.",
      contactPage: "İletişim sayfası",
    },
    contact: {
      eyebrow: "İLETİŞİM",
      title: "Birlikte çalışalım",
      accent: "çalışalım",
      writeTitle: "Bize yazın",
      writeBlurb:
        "Soru, öneri veya gönüllülük için mesaj bırakın. En kısa sürede dönüş yapılır.",
      email: "E-posta",
      emailSub: "Her iki merkeze ortak",
      phone: "Telefon",
      name: "İsim",
      namePlaceholder: "Adınız ve soyadınız",
      emailPlaceholder: "ornek@eposta.com",
      subject: "Konu",
      subjectPlaceholder: "Mesajınızın konusu",
      message: "Mesaj",
      messagePlaceholder: "Mesajınızı buraya yazınız...",
      submit: "Gönder",
      formSending: "Gönderiliyor…",
      formSuccess: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
      formErrorRequired: "Lütfen tüm alanları doldurun.",
      formErrorEmail: "Geçerli bir e-posta adresi girin.",
      formErrorTooLong: "Mesaj çok uzun. Lütfen kısaltın.",
      formErrorSend: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
      formErrorConfig:
        "E-posta servisi yapılandırılmamış. Bize doğrudan yazabilirsiniz: munzurcevredernegi@gmail.com",
      formKvkkNoticePrefix: "Form üzerinden gönderdiğiniz veriler ",
      formKvkkNoticeLink: "KVKK Aydınlatma Metni",
      formKvkkNoticeSuffix: " uyarınca işlenir.",
      pageTitle: "İletişim",
      pageDesc:
        "Munzur Çevre Derneği ile iletişime geçin — İstanbul ve Dersim ofisleri.",
    },
    aboutPage: {
      metaTitle: "Hakkımızda",
      metaDesc:
        "Munzur Çevre Derneği'nin tarihçesi, faaliyet alanları ve 2003'ten bugüne Türkiye genelindeki mücadelesi.",
      historyTitle: "Tarihçe",
      historySub:
        "2003'ten bugüne Türkiye genelinde süren mücadelemizin önemli dönüm noktaları.",
      whoTitle: "Kimiz, ne yapıyoruz?",
      activitiesEyebrow: "FAALİYET ALANLARI",
      activitiesTitle: "Her yerde üç koldan mücadele",
      activitiesAccent: "üç koldan",
      joinTitle: "Mücadeleye katıl",
      joinBlurb:
        "Üye olun, gönüllü olun veya etkinliklerimize katılarak ekolojik mücadeleye güç katın.",
      joinContact: "İletişime geç",
      joinEvents: "Etkinlikler",
      lead: "Munzur Çevre Derneği, genel merkezi İstanbul Okmeydanı'nda, Dersim temsilciliğiyle birlikte 2003'ten bu yana Türkiye'nin her yerinde doğa ve insan haklarının ayrılmaz bir bütün olduğu inancıyla çalışıyor.",
      paragraphs: [
        "Hidroelektrik santral projelerine karşı mücadeleden fidan dikimine, kültürel etkinliklerden kamuoyu raporlarına kadar geniş bir alanda faaliyet gösteriyoruz. İstanbul'daki genel merkezimiz örgütsel koordinasyonu yürütürken, Dersim temsilciliğimiz sahadaki mücadele, hukuk süreçleri ve halk buluşmalarının odak noktasıdır.",
        "Yerel halkla, üniversitelerle ve ulusal çevre örgütleriyle kurduğumuz dayanışma ağları sayesinde ekolojik mücadelenin sesini Ankara'dan Avrupa'ya taşıyoruz. Eğitim programlarımız ve festivallerimiz, ekolojik bilinci güçlendirmenin yanı sıra kültürel hafızayı da yaşatmayı hedefler.",
        "Gönüllülerimiz ve üyelerimiz, derneğin karar alma süreçlerine aktif katılır. Şeffaflık, demokratik katılım ve ekolojik adalet ilkeleri tüm çalışmalarımızın temelini oluşturur.",
      ],
      timeline: [
        {
          year: "2003",
          title: "Kuruluş",
          description:
            "Munzur'da HES ve maden projelerine karşı mücadele etmek üzere yerel aktivistler ve hukukçular tarafından dernek kuruldu; mücadele alanı kısa sürede ülke geneline yayıldı.",
        },
        {
          year: "2008",
          title: "İlk festival",
          description:
            "Doğa ve kültür festivali geleneği başlatıldı; ekolojik mücadelenin sesini geniş kitlelere duyuran yıllık buluşma haline geldi.",
        },
        {
          year: "2014",
          title: "Su izleme ağı",
          description:
            "Üniversite iş birliğiyle su kalitesi izleme programı başlatıldı; yıllık raporlar yayınlanmaya başlandı.",
        },
        {
          year: "2019",
          title: "Gençlik atölyeleri",
          description:
            "Çocuk ve gençlere yönelik doğa eğitimi programı kalıcı hale getirildi; okul iş birlikleri kuruldu.",
        },
        {
          year: "2024",
          title: "Dayanışma ağı",
          description:
            "Ulusal ve uluslararası ekoloji örgütleriyle koordineli kampanya ve hukuk destek ağı güçlendirildi.",
        },
      ],
      activityAreas: [
        {
          title: "Ekolojik Mücadele",
          description:
            "HES, maden, yol ve yapılaşma projelerine karşı hukuki süreçler, kampanyalar ve kamuoyu oluşturma çalışmaları yürütüyoruz.",
          items: [
            "Dava ve izleme süreçleri",
            "Basın açıklamaları ve kampanyalar",
            "Yerel meclis ve planlama takibi",
          ],
        },
        {
          title: "Doğa Takibi",
          description:
            "Biyoçeşitlilik, su kalitesi, fauna ve flora izleme çalışmalarıyla ekolojik durumu belgeliyoruz.",
          items: [
            "Su kalitesi ölçümleri",
            "Flora-fauna envanteri",
            "Yıllık durum raporları",
          ],
        },
        {
          title: "Toplumsal Eğitim",
          description:
            "Çocuklar, gençler ve yetişkinler için doğa, kültür ve hak temelli atölyeler düzenliyoruz.",
          items: [
            "Okul ve mahalle atölyeleri",
            "Gönüllü eğitim programı",
            "Rehberli doğa yürüyüşleri",
          ],
        },
        {
          title: "Kültür & Sanat",
          description:
            "Festivaller, müzik, sergi ve film aracılığıyla doğa ve direniş anlatısını yaşatıyoruz.",
          items: [
            "Yıllık doğa festivali",
            "Konser ve sergi programları",
            "Belgesel ve yayın desteği",
          ],
        },
      ],
    },
    org: {
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
    },
    footerActivities: [
      { href: "/hakkimizda", label: "Çevre Mücadelesi" },
      { href: "/hakkimizda", label: "Doğa Takibi" },
      { href: "/etkinlikler", label: "Eğitim & Atölye" },
      { href: "/etkinlikler", label: "Festival & Kültür" },
      { href: "/haberler", label: "Yayınlar" },
    ],
    footerSupport: [
      { href: "/iletisim", label: "Gönüllü Ol" },
      { href: "/iletisim", label: "Bağış Yap" },
      { href: "/iletisim", label: "Üye Ol" },
      { href: "/iletisim", label: "Bülten Aboneliği" },
      { href: "/iletisim", label: "İş Birliği" },
    ],
    legal: { privacy: "Gizlilik", kvkk: "KVKK", cookies: "Çerez Politikası" },
    legalPages: {
      privacy: {
        metaTitle: "Gizlilik politikası",
        eyebrow: "YASAL",
        title: "Gizlilik politikası",
        updated: "Son güncelleme: Mayıs 2026",
        contactLabel: "Sorularınız için:",
        contactCta: "İletişim formu",
        paragraphs: [
          "Munzur Çevre Derneği («Dernek»), munzurcevredernegi.net sitesini ziyaret edenlerin gizliliğine saygı duyar.",
          "İletişim formu aracılığıyla ilettiğiniz ad, e-posta, konu ve mesaj yalnızca talebinize yanıt vermek ve dernek faaliyetleriyle ilgili iletişim kurmak amacıyla işlenir.",
          "Form verileri güvenli altyapı üzerinden e-posta olarak dernek yetkililerine iletilir; üçüncü taraflarla paylaşılmaz, reklam profillemesi yapılmaz.",
          "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız için KVKK aydınlatma metnine ve dernek iletişim kanallarına başvurabilirsiniz.",
        ],
      },
      kvkk: {
        metaTitle: "KVKK aydınlatma metni",
        eyebrow: "YASAL",
        title: "KVKK aydınlatma metni",
        updated: "Son güncelleme: Mayıs 2026",
        contactLabel: "Başvuru ve sorular:",
        contactCta: "İletişim formu",
        paragraphs: [
          "Veri sorumlusu: Munzur Çevre Derneği (İstanbul genel merkez, Dersim temsilciliği).",
          "İletişim formunda toplanan kişisel veriler: ad soyad, e-posta adresi, mesaj konusu ve içeriği.",
          "İşleme amaçları: iletişim taleplerini yanıtlamak, gönüllülük/üyelik/etkinlik başvurularını değerlendirmek, yasal yükümlülükleri yerine getirmek.",
          "Hukuki sebep: ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaati (KVKK m.5/2-f) ve açık rıza gerektiren hallerde açık rızanız.",
          "Saklama süresi: talebin çözülmesinden sonra makul süre (genellikle en fazla 2 yıl) veya mevzuatın öngördüğü süre.",
          "Haklarınız: verilerinize erişim, düzeltme, silme, işlemeyi kısıtlama ve itiraz; Şikâyet için Kişisel Verileri Koruma Kurulu’na başvurabilirsiniz.",
        ],
      },
      cookies: {
        metaTitle: "Çerez politikası",
        eyebrow: "YASAL",
        title: "Çerez politikası",
        updated: "Son güncelleme: Mayıs 2026",
        contactLabel: "Sorularınız için:",
        contactCta: "İletişim formu",
        paragraphs: [
          "Sitemiz zorunlu çerezler kullanır: dil tercihi (mcd_locale) ve oturum güvenliği için gerekli teknik çerezler.",
          "Bu çerezler site işlevleri için gereklidir; reklam veya davranışsal izleme amacıyla üçüncü taraf pazarlama çerezi kullanılmaz.",
          "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz; dil tercihi ve bazı özellikler düzgün çalışmayabilir.",
          "İletişim formu gönderimleri çerez yerine sunucu tarafı işleme ile e-posta sağlayıcısına (Resend) aktarılır.",
        ],
      },
    },
    carousel: { prev: "Önceki", next: "Sonraki", prevNews: "Önceki haber", nextNews: "Sonraki haber" },
    mobileMenu: "Menü",
    closeMenu: "Kapat",
  },
  en: {
    hero: {
      tag: "Freedom, struggle, resistance and solidarity for nature and humanity — for the future!",
      title: ["MUNZUR", "ENVIRONMENT", "ASSOCIATION"] as const,
      blurb:
        "Since 2003 we have worked across Turkey to protect natural heritage, biodiversity and free living. We stand up for water, land and people.",
      ctaEvents: "OUR EVENTS",
      ctaAbout: "ABOUT US",
    },
    heritage: {
      value: "22",
      suffix: "YEARS",
      label: "Environmental struggle",
      sentence:
        "Since 2003 we have fought without pause across Turkey for water, soil, forests and free life.",
      ariaLabel: "Years of struggle",
    },
    aboutPreview: {
      eyebrow: "ABOUT US",
      title: "Nature's voice,\npeople's resistance",
      accent: ["voice", "resistance"] as const,
      leadExtra:
        " From resisting hydropower projects to tree planting, cultural events and public reports, we work on many fronts.",
      cta: "GET TO KNOW US",
      pillars: [
        {
          title: "ECOLOGICAL STRUGGLE",
          description:
            "Legal and community action against dams, mining and development projects",
          icon: "chart",
        },
        {
          title: "NATURE MONITORING",
          description:
            "Biodiversity, water quality, fauna and flora monitoring",
          icon: "nature",
        },
        {
          title: "COMMUNITY EDUCATION",
          description:
            "Nature, culture and rights-based workshops for children and youth",
          icon: "people",
        },
        {
          title: "CULTURE & ART",
          description:
            "Festivals, music, exhibitions and film for ecological storytelling",
          icon: "culture",
        },
      ],
    },
    events: {
      upcomingEyebrow: "UPCOMING EVENTS",
      recentEyebrow: "RECENT EVENTS",
      title: "Join the\nstruggle together",
      accent: "struggle",
      allLink: "All events",
      empty: "No upcoming events.",
      recentNote:
        "No upcoming dates; showing our most recent events.",
      ariaLabel: "Events",
      viewDetails: "View details →",
      details: "DETAILS",
      join: "JOIN",
      pageTitle: "Events",
      pageDesc:
        "From festivals and nature walks to education programmes and panel discussions.",
      listEmpty: "No published events yet.",
      detailNotFound: "Event not found",
      backToEvents: "← All events",
      aboutEvent: "About this event",
      program: "Schedule",
      joinRegister: "JOIN / REGISTER",
      askQuestion: "ASK A QUESTION",
      otherEvents: "Other events",
    },
    fieldGallery: {
      eyebrow: "FROM THE FIELD",
      title: "Struggle in the streets",
      accent: "streets",
      blurb:
        "Side by side with communities from marketplaces to mountain villages across Turkey.",
      aside: "Moments from actions, gatherings and field work",
      featured: "Featured",
    },
    joinCta: {
      eyebrow: "Support & volunteering",
      title: "Join the struggle",
      accent: "struggle",
      blurb:
        "Volunteer, build solidarity or take part in our events. Addresses and the contact form are on the contact page.",
      contactPage: "Contact page",
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let's work together",
      accent: "together",
      writeTitle: "Write to us",
      writeBlurb:
        "Leave a message for questions, suggestions or volunteering. We will reply as soon as we can.",
      email: "Email",
      emailSub: "Shared by both offices",
      phone: "Phone",
      name: "Name",
      namePlaceholder: "Your full name",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      submit: "Send",
      formSending: "Sending…",
      formSuccess: "Your message was received. We will reply as soon as we can.",
      formErrorRequired: "Please fill in all fields.",
      formErrorEmail: "Please enter a valid email address.",
      formErrorTooLong: "Your message is too long. Please shorten it.",
      formErrorSend: "Could not send your message. Please try again later.",
      formErrorConfig:
        "Email service is not configured. You can write to us directly: munzurcevredernegi@gmail.com",
      formKvkkNoticePrefix:
        "Data you submit through this form is processed in accordance with our ",
      formKvkkNoticeLink: "Data protection notice (KVKK)",
      formKvkkNoticeSuffix: ".",
      pageTitle: "Contact",
      pageDesc:
        "Contact Munzur Environment Association — Istanbul and Dersim offices.",
    },
    aboutPage: {
      metaTitle: "About us",
      metaDesc:
        "History, areas of work and nationwide struggle of Munzur Environment Association since 2003.",
      historyTitle: "History",
      historySub:
        "Key milestones in our nationwide struggle from 2003 to today.",
      whoTitle: "Who we are, what we do",
      activitiesEyebrow: "AREAS OF WORK",
      activitiesTitle: "Three fronts everywhere",
      activitiesAccent: "fronts",
      joinTitle: "Join the struggle",
      joinBlurb:
        "Become a member, volunteer or take part in our events to strengthen ecological resistance.",
      joinContact: "Get in touch",
      joinEvents: "Events",
      lead: "Munzur Environment Association, with its headquarters in Istanbul Okmeydanı and Dersim representative office, has worked across Turkey since 2003 on the belief that nature and human rights are inseparable.",
      paragraphs: [
        "From resisting hydropower projects to tree planting, cultural events and public reports, we work on many fronts. Our Istanbul headquarters coordinates organisationally, while our Dersim office focuses on field struggle, legal processes and community gatherings.",
        "Through solidarity networks with local communities, universities and national environmental groups, we carry the voice of ecological struggle from Ankara to Europe. Our education programmes and festivals aim to strengthen ecological awareness and keep cultural memory alive.",
        "Volunteers and members take an active part in decision-making. Transparency, democratic participation and ecological justice underpin all our work.",
      ],
      timeline: [
        {
          year: "2003",
          title: "Foundation",
          description:
            "The association was founded by local activists and lawyers to resist HES and mining in Munzur; the struggle soon spread nationwide.",
        },
        {
          year: "2008",
          title: "First festival",
          description:
            "The nature and culture festival tradition began, becoming an annual gathering that brings ecological struggle to wider audiences.",
        },
        {
          year: "2014",
          title: "Water monitoring",
          description:
            "A water quality monitoring programme with universities was launched; annual reports began to be published.",
        },
        {
          year: "2019",
          title: "Youth workshops",
          description:
            "Nature education for children and youth became permanent; school partnerships were established.",
        },
        {
          year: "2024",
          title: "Solidarity network",
          description:
            "Coordinated campaigns and legal support with national and international ecology organisations were strengthened.",
        },
      ],
      activityAreas: [
        {
          title: "Ecological struggle",
          description:
            "Legal processes, campaigns and public awareness against dams, mining, roads and development.",
          items: [
            "Litigation and monitoring",
            "Press releases and campaigns",
            "Local council and planning follow-up",
          ],
        },
        {
          title: "Nature monitoring",
          description:
            "We document ecological conditions through biodiversity, water, fauna and flora work.",
          items: [
            "Water quality measurements",
            "Flora and fauna inventory",
            "Annual status reports",
          ],
        },
        {
          title: "Community education",
          description:
            "Nature, culture and rights-based workshops for children, youth and adults.",
          items: [
            "School and neighbourhood workshops",
            "Volunteer training programme",
            "Guided nature walks",
          ],
        },
        {
          title: "Culture & art",
          description:
            "We keep alive narratives of nature and resistance through festivals, music, exhibitions and film.",
          items: [
            "Annual nature festival",
            "Concert and exhibition programmes",
            "Documentary and publishing support",
          ],
        },
      ],
    },
    org: {
      phoneNote: "Dersim office · weekdays 9:00–18:00",
      offices: [
        {
          id: "hq",
          label: "HEAD OFFICE",
          lines: ["Munzur Environment Association", "Okmeydanı", "Istanbul"],
          region: "Turkey",
        },
        {
          id: "dersim",
          label: "DERSIM OFFICE",
          lines: [
            "Munzur Environment Association",
            "Cumhuriyet Mah.",
            "Tunceli (Dersim)",
          ],
          region: "Turkey",
        },
      ],
    },
    footerActivities: [
      { href: "/hakkimizda", label: "Environmental struggle" },
      { href: "/hakkimizda", label: "Nature monitoring" },
      { href: "/etkinlikler", label: "Education & workshops" },
      { href: "/etkinlikler", label: "Festival & culture" },
      { href: "/haberler", label: "Publications" },
    ],
    footerSupport: [
      { href: "/iletisim", label: "Volunteer" },
      { href: "/iletisim", label: "Donate" },
      { href: "/iletisim", label: "Become a member" },
      { href: "/iletisim", label: "Newsletter" },
      { href: "/iletisim", label: "Partnerships" },
    ],
    legal: { privacy: "Privacy", kvkk: "Data protection", cookies: "Cookie policy" },
    legalPages: {
      privacy: {
        metaTitle: "Privacy policy",
        eyebrow: "LEGAL",
        title: "Privacy policy",
        updated: "Last updated: May 2026",
        contactLabel: "Questions:",
        contactCta: "Contact form",
        paragraphs: [
          "Munzur Environment Association respects the privacy of visitors to munzurcevredernegi.net.",
          "Contact form data (name, email, subject, message) is used only to respond to your request and communicate about our work.",
          "Submissions are sent by e-mail to authorised staff via secure infrastructure; we do not sell data or use it for ad profiling.",
          "For rights under Turkish data protection law (KVKK), see our data protection notice or contact us.",
        ],
      },
      kvkk: {
        metaTitle: "Data protection notice",
        eyebrow: "LEGAL",
        title: "Data protection notice (KVKK)",
        updated: "Last updated: May 2026",
        contactLabel: "Requests and questions:",
        contactCta: "Contact form",
        paragraphs: [
          "Data controller: Munzur Environment Association (Istanbul headquarters, Dersim office).",
          "Personal data collected via the contact form: name, e-mail, subject and message content.",
          "Purposes: responding to enquiries, evaluating volunteering/membership/event requests, legal compliance.",
          "Legal basis: legitimate interest where applicable under KVKK, and explicit consent where required.",
          "Retention: reasonable period after the request is handled (typically up to 2 years) or as required by law.",
          "Your rights: access, rectification, erasure, restriction and objection; you may lodge a complaint with the Turkish DPA.",
        ],
      },
      cookies: {
        metaTitle: "Cookie policy",
        eyebrow: "LEGAL",
        title: "Cookie policy",
        updated: "Last updated: May 2026",
        contactLabel: "Questions:",
        contactCta: "Contact form",
        paragraphs: [
          "We use essential cookies: language preference (mcd_locale) and technical cookies required for security.",
          "These cookies are necessary for site functionality; we do not use third-party marketing or behavioural tracking cookies.",
          "You may delete or block cookies in your browser; language preference and some features may not work correctly.",
          "Contact form submissions are processed server-side and sent via our e-mail provider (Resend), not via advertising cookies.",
        ],
      },
    },
    carousel: {
      prev: "Previous",
      next: "Next",
      prevNews: "Previous articles",
      nextNews: "Next articles",
    },
    mobileMenu: "Menu",
    closeMenu: "Close",
  },
} as const;

export type SiteContent = (typeof content)[Locale];

export function getSiteContent(locale: Locale): SiteContent {
  return content[locale];
}
