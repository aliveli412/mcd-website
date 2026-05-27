/** Gerçek basın haberleri — kaynak URL'leri ile (son ~1 yıl) */
export type NewsArticleSeed = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  body: string[];
  gradient: string;
  imagePath: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
};

export const newsArticles: NewsArticleSeed[] = [
  {
    slug: "havacor-dogaya-ve-yasam-nobeti",
    tag: "YAŞAM NÖBETİ",
    title: "Havaçor Vadisi'nde doğa ve yaşam nöbeti başladı",
    excerpt:
      "Munzur Çevre Derneği ve köy derneklerinin ortak çağrısıyla Ovacık'ta bir ay sürecek nöbet, bitki çeşitliliğini ve yaşam alanlarını korumayı hedefliyor.",
    body: [
      "Dersim'in Ovacık ilçesine bağlı Havaçor Köyü'nde, Havaçor Köyü Derneği öncülüğünde bir ay sürecek doğa ve yaşam nöbeti başlatıldı. Munzur Çevre Derneği, Dersim Dernekleri Federasyonu ve bölgedeki köy dernekleri nöbeti ortak yürütüyor.",
      "Açıklamada, maden, jeotermal ve güneş enerjisi projelerine karşı tutulan nöbetlerin Munzur coğrafyasındaki bitki tahribatına karşı bir dayanışma çağrısı olduğu vurgulandı. Işkın, çiriş, aygülü, kekik ve sumak gibi yerel türlerin ticari amaçla kökünden sökülerek yok edildiği belirtildi.",
      "Aktivistler, Pülümür, Hozat, Pertek ve Çemişgezek'teki mücadelelerle dayanışma içinde olduklarını ve «Munzur'a uzanan eller kırılır» şiarıyla hareket ettiklerini ifade etti.",
    ],
    gradient: "from-leaf-green to-forest-dark",
    imagePath: "/news/havacor-direnis.jpg",
    publishedAt: "2026-05-24T10:00:00Z",
    sourceName: "PİRHA",
    sourceUrl:
      "https://pirha.org/munzurda-doga-kiyimina-karsi-yasam-nobeti-havacor-vadisinde-direnis-basladi-video-515768.html",
  },
  {
    slug: "pulumur-krom-ocagi-halk-bulusmasi",
    tag: "HALK BULUŞMASI",
    title: "Pülümür'de krom ocağına karşı halk buluşması çağrısı",
    excerpt:
      "Munzur Çevre Derneği Dersim Temsilciliği, Dimin Madencilik'in planladığı krom ocağı projesine karşı 28 Mayıs'taki buluşmaya tüm yurttaşları davet etti.",
    body: [
      "Pülümür ilçesinde yapılmak istenen krom ocağına karşı köylüler ve çevre örgütleri halk buluşması düzenliyor. Proje, koruma altındaki endemik bitki türlerini ve bölge ekosistemini tehdit ediyor.",
      "Munzur Çevre Derneği Dersim Temsilciliği'nden Yusuf Topçu, Hel Dağı bölgesinin hayvancılık ve arıcılığın yoğun olduğu bir alan olduğunu ve halkın maden faaliyetini kesinlikle istemediğini söyledi.",
      "Topçu, «Talanı durdurmanın yolu halkı örgütlemek ve lokal mücadeleleri bütünleştirmekten geçer» dedi ve medyayı buluşmaya katılmaya çağırdı.",
    ],
    gradient: "from-forest-mid to-river-blue",
    imagePath: "/news/krom-ocagi-bulusma.jpg",
    publishedAt: "2026-05-26T11:00:00Z",
    sourceName: "bianet",
    sourceUrl:
      "https://bianet.org/haber/dersimde-krom-ocagina-karsi-halk-bulusmasi-cagrisi-319955",
  },
  {
    slug: "ges-projelerine-karsi-basin-aciklamasi",
    tag: "BASIN AÇIKLAMASI",
    title: "GES projelerine karşı: Rızamız yok, doğa talanına hayır",
    excerpt:
      "Munzur Çevre Derneği, Pertek ve Hozat'taki güneş enerjisi santrali planlarına karşı «Dersim'de GES'lere Karşı Örgütlenelim» şiarıyla basın açıklaması yaptı.",
    body: [
      "Munzur Çevre Derneği Dersim Temsilciliği, bölgedeki baraj, HES, GES ve maden projelerine karşı basın açıklaması gerçekleştirdi. Suna Çelik'in okuduğu metinde «Rızamız yoktur» denilerek doğa talanına izin verilmeyeceği vurgulandı.",
      "Açıklamada, Pertek ve Hozat'taki geniş tarım arazileri ile meralara kurulması planlanan GES'lerin hayvancılığı, arıcılığı bitirebileceği ve yeni bir göç dalgası yaratabileceği belirtildi.",
      "Dernek, şirketlerin yaşam alanlarını talan ettiğini, barajlarla sulara boğulan coğrafyanın şimdi de GES ve maden sahalarıyla tehdit altında olduğunu ifade ederek halk dayanışmasıyla mücadele edileceğini duyurdu.",
    ],
    gradient: "from-terracotta to-forest-dark",
    imagePath: "/news/ges-basin-aciklamasi.jpg",
    publishedAt: "2026-03-01T14:00:00Z",
    sourceName: "PİRHA",
    sourceUrl:
      "https://pirha.org/dersimde-doga-talanina-karsi-munzur-cevre-derneginden-aciklama-rizamiz-yok-doga-talanina-hayir-video-505900.html",
  },
  {
    slug: "ovacik-havacor-bir-aylik-nobet",
    tag: "OVACIK",
    title: "Ovacık'ta bir ay sürecek yaşam nöbeti",
    excerpt:
      "Havaçor Vadisi'nde başlatılan nöbet, Munzur coğrafyasındaki ekolojik tahribata karşı sürdürülen mücadelenin yeni durağı olarak öne çıkıyor.",
    body: [
      "Dersim'in Ovacık ilçesine bağlı Havaçor Köyü'nde bir ay sürecek doğa ve yaşam nöbeti başlatıldı. Eyleme çok sayıda çevre örgütü ve yöre derneği katıldı.",
      "Havaçor Köyü Derneği'nden Çilem Hayıroğlu, nöbetlerin maden ve enerji projelerine karşı tutulduğunu, Munzur coğrafyasının da bu saldırılarla karşı karşıya kaldığını belirtti.",
      "Nöbetin amacının bitki yaşam alanlarını korumak olduğu vurgulanarak, Türkiye'nin farklı noktalarındaki benzer mücadelelere dayanışma çağrısı yapıldı.",
    ],
    gradient: "from-river-blue to-forest-mid",
    imagePath: "/news/havacor-nobet.jpg",
    publishedAt: "2026-05-25T09:00:00Z",
    sourceName: "bianet",
    sourceUrl: "https://bianet.org/haber/ovacikta-bir-ay-surecek-yasam-nobeti-319930",
  },
  {
    slug: "munzur-gozeleri-tam-koruma-talebi",
    tag: "MUNZUR GÖZELERİ",
    title: "Munzur Gözeleri için tam koruma talebi",
    excerpt:
      "Munzur Çevre Derneği, vadilerin yalnızca kısmi değil bütünüyle kesin korunacak hassas alan ilan edilmesini istiyor.",
    body: [
      "Munzur ve Pülümür vadilerindeki koruma statüsü değişikliklerine karşı tepkiler sürerken, Munzur Çevre Derneği tam koruma talebini yineledi.",
      "Dernek yöneticisi Yusuf Topçu, kısmi koruma kararının kamuoyunun tepkisini yumuşatmaya yönelik bir mesaj olduğunu, oysa coğrafyanın uzun yıllardır maden projelerinin tehdidi altında olduğunu söyledi.",
      "Topçu, Munzur Vadisi'nin boydan boya sit alanı ilan edilmesi gerektiğini ve suların, toprakların zehirlenmesine izin verilmeyeceğini vurguladı.",
    ],
    gradient: "from-forest-mid to-forest-dark",
    imagePath: "/news/gozeler-tam-koruma.jpg",
    publishedAt: "2025-03-04T12:00:00Z",
    sourceName: "bianet",
    sourceUrl:
      "https://bianet.org/haber/dersimliler-ve-cevreciler-munzur-gozeleri-icin-tam-koruma-istiyor-305088",
  },
  {
    slug: "munzur-gozeleri-talana-hayir",
    tag: "MUNZUR GÖZELERİ",
    title: "Munzur Gözeleri'nde talana müsaade etmeyeceğiz",
    excerpt:
      "SİT statüsünün düşürülmesine karşı Munzur Çevre Derneği, gözelerde yapılan keşif sürecini ve maden tehdidini kamuoyuna duyurdu.",
    body: [
      "Munzur Gözeleri'nin koruma statüsünün düşürülmesinin ardından bilim ekibinin keşif çalışması gündeme geldi. Munzur Çevre Derneği Dersim Temsilcisi Yusuf Topçu, kararın maden şirketlerine alan açma amacı taşıdığını belirtti.",
      "Topçu, Aleviler için kutsal kabul edilen gözelerin hemen üstündeki bölgelerde altın madeni ruhsatlarının verildiğini ve statü düşerse akarsuların kirletilebileceğini söyledi.",
      "TMMOB Dersim Şubesi'nin açtığı dava süreciyle birlikte dernek, talana karşı hukuki ve toplumsal mücadelenin sürdürüleceğini açıkladı.",
    ],
    gradient: "from-leaf-green to-river-blue",
    imagePath: "/news/gozeler-talana-hayir.jpg",
    publishedAt: "2024-11-01T10:00:00Z",
    sourceName: "bianet",
    sourceUrl:
      "https://bianet.org/haber/munzur-gozelerinde-talana-musaade-etmeyecegiz-301335",
  },
];
