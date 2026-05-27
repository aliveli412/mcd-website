/**
 * Haberleri Supabase'e yazar. Çalıştırma:
 *   node scripts/seed-news.mjs
 * .env.local gerekir (SUPABASE_SERVICE_ROLE_KEY)
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env.local");

function loadEnv() {
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (!m) continue;
      const key = m[1].trim();
      let val = m[2].trim().replace(/^["']|["']$/g, "");
      const hash = val.indexOf("#");
      if (hash > 0 && !val.startsWith('"')) val = val.slice(0, hash).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    console.error(".env.local bulunamadı");
    process.exit(1);
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Supabase URL veya SERVICE_ROLE_KEY eksik");
  process.exit(1);
}

const articles = [
  {
    slug: "havacor-dogaya-ve-yasam-nobeti",
    tag: "YAŞAM NÖBETİ",
    title: "Havaçor Vadisi'nde doğa ve yaşam nöbeti başladı",
    excerpt:
      "Munzur Çevre Derneği ve köy derneklerinin ortak çağrısıyla Ovacık'ta bir ay sürecek nöbet, bitki çeşitliliğini ve yaşam alanlarını korumayı hedefliyor.",
    body: [
      "Dersim'in Ovacık ilçesine bağlı Havaçor Köyü'nde, Havaçor Köyü Derneği öncülüğünde bir ay sürecek doğa ve yaşam nöbeti başlatıldı. Munzur Çevre Derneği, Dersim Dernekleri Federasyonu ve bölgedeki köy dernekleri nöbeti ortak yürütüyor.",
      "Açıklamada, maden, jeotermal ve güneş enerjisi projelerine karşı tutulan nöbetlerin Munzur coğrafyasındaki bitki tahribatına karşı bir dayanışma çağrısı olduğu vurgulandı.",
      "Aktivistler, Pülümür, Hozat, Pertek ve Çemişgezek'teki mücadelelerle dayanışma içinde olduklarını ifade etti.",
    ],
    gradient: "from-leaf-green to-forest-dark",
    image_url: "/news/havacor-direnis.jpg",
    status: "published",
    published_at: "2026-05-24T10:00:00Z",
    source_url:
      "https://pirha.org/munzurda-doga-kiyimina-karsi-yasam-nobeti-havacor-vadisinde-direnis-basladi-video-515768.html",
    source_name: "PİRHA",
  },
  {
    slug: "pulumur-krom-ocagi-halk-bulusmasi",
    tag: "HALK BULUŞMASI",
    title: "Pülümür'de krom ocağına karşı halk buluşması çağrısı",
    excerpt:
      "Munzur Çevre Derneği Dersim Temsilciliği, Dimin Madencilik'in planladığı krom ocağı projesine karşı halk buluşmasına tüm yurttaşları davet etti.",
    body: [
      "Pülümür ilçesinde yapılmak istenen krom ocağına karşı köylüler ve çevre örgütleri halk buluşması düzenliyor.",
      "Munzur Çevre Derneği Dersim Temsilciliği'nden Yusuf Topçu, bölge halkının maden faaliyetini istemediğini söyledi.",
      "Topçu, talanı durdurmanın yolu halkı örgütlemek ve lokal mücadeleleri bütünleştirmekten geçtiğini belirtti.",
    ],
    gradient: "from-forest-mid to-river-blue",
    image_url: "/news/krom-ocagi-bulusma.jpg",
    status: "published",
    published_at: "2026-05-26T11:00:00Z",
    source_url:
      "https://bianet.org/haber/dersimde-krom-ocagina-karsi-halk-bulusmasi-cagrisi-319955",
    source_name: "bianet",
  },
  {
    slug: "ges-projelerine-karsi-basin-aciklamasi",
    tag: "BASIN AÇIKLAMASI",
    title: "GES projelerine karşı: Rızamız yok, doğa talanına hayır",
    excerpt:
      "Munzur Çevre Derneği, Pertek ve Hozat'taki güneş enerjisi santrali planlarına karşı basın açıklaması yaptı.",
    body: [
      "Munzur Çevre Derneği Dersim Temsilciliği, bölgedeki baraj, HES, GES ve maden projelerine karşı basın açıklaması gerçekleştirdi.",
      "Açıklamada Pertek ve Hozat'taki GES planlarının tarım ve hayvancılığı tehdit ettiği vurgulandı.",
      "Dernek, halk dayanışmasıyla mücadele edileceğini duyurdu.",
    ],
    gradient: "from-terracotta to-forest-dark",
    image_url: "/news/ges-basin-aciklamasi.jpg",
    status: "published",
    published_at: "2026-03-01T14:00:00Z",
    source_url:
      "https://pirha.org/dersimde-doga-talanina-karsi-munzur-cevre-derneginden-aciklama-rizamiz-yok-doga-talanina-hayir-video-505900.html",
    source_name: "PİRHA",
  },
  {
    slug: "ovacik-havacor-bir-aylik-nobet",
    tag: "OVACIK",
    title: "Ovacık'ta bir ay sürecek yaşam nöbeti",
    excerpt:
      "Havaçor Vadisi'nde başlatılan nöbet, Munzur coğrafyasındaki ekolojik mücadelede yeni bir durak.",
    body: [
      "Dersim'in Ovacık ilçesine bağlı Havaçor Köyü'nde bir ay sürecek doğa ve yaşam nöbeti başlatıldı.",
      "Havaçor Köyü Derneği, maden ve enerji projelerine karşı nöbetlerin sürdüğünü belirtti.",
      "Türkiye genelindeki benzer mücadelelere dayanışma çağrısı yapıldı.",
    ],
    gradient: "from-river-blue to-forest-mid",
    image_url: "/news/havacor-nobet.jpg",
    status: "published",
    published_at: "2026-05-25T09:00:00Z",
    source_url: "https://bianet.org/haber/ovacikta-bir-ay-surecek-yasam-nobeti-319930",
    source_name: "bianet",
  },
  {
    slug: "munzur-gozeleri-tam-koruma-talebi",
    tag: "MUNZUR GÖZELERİ",
    title: "Munzur Gözeleri için tam koruma talebi",
    excerpt:
      "Munzur Çevre Derneği, vadilerin bütünüyle kesin korunacak hassas alan ilan edilmesini istiyor.",
    body: [
      "Munzur ve Pülümür vadilerindeki koruma statüsü değişikliklerine karşı Munzur Çevre Derneği tam koruma talebini yineledi.",
      "Dernek, kısmi koruma kararının yetersiz olduğunu vurguladı.",
      "Munzur Vadisi'nin boydan boya sit alanı olması gerektiği ifade edildi.",
    ],
    gradient: "from-forest-mid to-forest-dark",
    image_url: "/news/gozeler-tam-koruma.jpg",
    status: "published",
    published_at: "2025-03-04T12:00:00Z",
    source_url:
      "https://bianet.org/haber/dersimliler-ve-cevreciler-munzur-gozeleri-icin-tam-koruma-istiyor-305088",
    source_name: "bianet",
  },
  {
    slug: "munzur-gozeleri-talana-hayir",
    tag: "MUNZUR GÖZELERİ",
    title: "Munzur Gözeleri'nde talana müsaade etmeyeceğiz",
    excerpt:
      "SİT statüsünün düşürülmesine karşı Munzur Çevre Derneği mücadeleyi sürdürüyor.",
    body: [
      "Munzur Gözeleri'nin koruma statüsünün düşürülmesine karşı tepkiler sürüyor.",
      "Munzur Çevre Derneği, maden ruhsatlarının gözeleri tehdit ettiğini belirtti.",
      "Hukuki süreçle birlikte toplumsal mücadelenin devam edeceği açıklandı.",
    ],
    gradient: "from-leaf-green to-river-blue",
    image_url: "/news/gozeler-talana-hayir.jpg",
    status: "published",
    published_at: "2024-11-01T10:00:00Z",
    source_url:
      "https://bianet.org/haber/munzur-gozelerinde-talana-musaade-etmeyecegiz-301335",
    source_name: "bianet",
  },
];

const supabase = createClient(url, key);

const oldSlugs = [
  "munzur-yapilasma-plani",
  "bahar-fidan-dikimi",
  "munzur-suyu-raporu",
];

const { error: delErr } = await supabase.from("news").delete().in("slug", oldSlugs);
if (delErr) console.warn("Eski haber silinemedi (yoksa normal):", delErr.message);

for (const row of articles) {
  const { error } = await supabase.from("news").upsert(
    { ...row, updated_at: new Date().toISOString() },
    { onConflict: "slug" },
  );
  if (error) {
    console.error("Hata:", row.slug, error.message);
    if (error.message.includes("source_url")) {
      console.error(
        "→ docs/supabase/news-seed-2025-2026.sql dosyasını SQL Editor'da çalıştırın (source_url sütunu).",
      );
    }
    process.exit(1);
  }
  console.log("OK:", row.slug);
}

console.log("\n6 haber eklendi. Görseller: public/news/");
