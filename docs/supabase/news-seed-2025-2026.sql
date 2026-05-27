-- Gerçek haberler (basın) — Supabase SQL Editor'da çalıştırın
-- Önce: public/news/ görselleri repoda olmalı (site /news/... yollarını kullanır)
-- Canlıda görsel için görselleri Supabase Storage'a yükleyip image_url güncelleyebilirsiniz

alter table public.news add column if not exists source_url text;
alter table public.news add column if not exists source_name text;

-- Eski örnek (uydurma) haberleri kaldır
delete from public.news
where slug in (
  'munzur-yapilasma-plani',
  'bahar-fidan-dikimi',
  'munzur-suyu-raporu'
);

insert into public.news (
  slug,
  tag,
  title,
  excerpt,
  body,
  gradient,
  image_url,
  status,
  published_at,
  source_url,
  source_name,
  updated_at
)
values
  (
    'havacor-dogaya-ve-yasam-nobeti',
    'YAŞAM NÖBETİ',
    'Havaçor Vadisi''nde doğa ve yaşam nöbeti başladı',
    'Munzur Çevre Derneği ve köy derneklerinin ortak çağrısıyla Ovacık''ta bir ay sürecek nöbet, bitki çeşitliliğini ve yaşam alanlarını korumayı hedefliyor.',
    '["Dersim''in Ovacık ilçesine bağlı Havaçor Köyü''nde, Havaçor Köyü Derneği öncülüğünde bir ay sürecek doğa ve yaşam nöbeti başlatıldı. Munzur Çevre Derneği, Dersim Dernekleri Federasyonu ve bölgedeki köy dernekleri nöbeti ortak yürütüyor.","Açıklamada, maden, jeotermal ve güneş enerjisi projelerine karşı tutulan nöbetlerin Munzur coğrafyasındaki bitki tahribatına karşı bir dayanışma çağrısı olduğu vurgulandı.","Aktivistler, Pülümür, Hozat, Pertek ve Çemişgezek''teki mücadelelerle dayanışma içinde olduklarını ifade etti."]'::jsonb,
    'from-leaf-green to-forest-dark',
    '/news/havacor-direnis.jpg',
    'published',
    '2026-05-24T10:00:00Z',
    'https://pirha.org/munzurda-doga-kiyimina-karsi-yasam-nobeti-havacor-vadisinde-direnis-basladi-video-515768.html',
    'PİRHA',
    now()
  ),
  (
    'pulumur-krom-ocagi-halk-bulusmasi',
    'HALK BULUŞMASI',
    'Pülümür''de krom ocağına karşı halk buluşması çağrısı',
    'Munzur Çevre Derneği Dersim Temsilciliği, Dimin Madencilik''in planladığı krom ocağı projesine karşı halk buluşmasına tüm yurttaşları davet etti.',
    '["Pülümür ilçesinde yapılmak istenen krom ocağına karşı köylüler ve çevre örgütleri halk buluşması düzenliyor.","Munzur Çevre Derneği Dersim Temsilciliği''nden Yusuf Topçu, bölge halkının maden faaliyetini istemediğini söyledi.","Topçu, talanı durdurmanın yolu halkı örgütlemek ve lokal mücadeleleri bütünleştirmekten geçtiğini belirtti."]'::jsonb,
    'from-forest-mid to-river-blue',
    '/news/krom-ocagi-bulusma.jpg',
    'published',
    '2026-05-26T11:00:00Z',
    'https://bianet.org/haber/dersimde-krom-ocagina-karsi-halk-bulusmasi-cagrisi-319955',
    'bianet',
    now()
  ),
  (
    'ges-projelerine-karsi-basin-aciklamasi',
    'BASIN AÇIKLAMASI',
    'GES projelerine karşı: Rızamız yok, doğa talanına hayır',
    'Munzur Çevre Derneği, Pertek ve Hozat''taki güneş enerjisi santrali planlarına karşı basın açıklaması yaptı.',
    '["Munzur Çevre Derneği Dersim Temsilciliği, bölgedeki baraj, HES, GES ve maden projelerine karşı basın açıklaması gerçekleştirdi.","Açıklamada Pertek ve Hozat''taki GES planlarının tarım ve hayvancılığı tehdit ettiği vurgulandı.","Dernek, halk dayanışmasıyla mücadele edileceğini duyurdu."]'::jsonb,
    'from-terracotta to-forest-dark',
    '/news/ges-basin-aciklamasi.jpg',
    'published',
    '2026-03-01T14:00:00Z',
    'https://pirha.org/dersimde-doga-talanina-karsi-munzur-cevre-derneginden-aciklama-rizamiz-yok-doga-talanina-hayir-video-505900.html',
    'PİRHA',
    now()
  ),
  (
    'ovacik-havacor-bir-aylik-nobet',
    'OVACIK',
    'Ovacık''ta bir ay sürecek yaşam nöbeti',
    'Havaçor Vadisi''nde başlatılan nöbet, Munzur coğrafyasındaki ekolojik mücadelede yeni bir durak.',
    '["Dersim''in Ovacık ilçesine bağlı Havaçor Köyü''nde bir ay sürecek doğa ve yaşam nöbeti başlatıldı.","Havaçor Köyü Derneği, maden ve enerji projelerine karşı nöbetlerin sürdüğünü belirtti.","Türkiye genelindeki benzer mücadelelere dayanışma çağrısı yapıldı."]'::jsonb,
    'from-river-blue to-forest-mid',
    '/news/havacor-nobet.jpg',
    'published',
    '2026-05-25T09:00:00Z',
    'https://bianet.org/haber/ovacikta-bir-ay-surecek-yasam-nobeti-319930',
    'bianet',
    now()
  ),
  (
    'munzur-gozeleri-tam-koruma-talebi',
    'MUNZUR GÖZELERİ',
    'Munzur Gözeleri için tam koruma talebi',
    'Munzur Çevre Derneği, vadilerin bütünüyle kesin korunacak hassas alan ilan edilmesini istiyor.',
    '["Munzur ve Pülümür vadilerindeki koruma statüsü değişikliklerine karşı Munzur Çevre Derneği tam koruma talebini yineledi.","Dernek, kısmi koruma kararının yetersiz olduğunu vurguladı.","Munzur Vadisi''nin boydan boya sit alanı olması gerektiği ifade edildi."]'::jsonb,
    'from-forest-mid to-forest-dark',
    '/news/gozeler-tam-koruma.jpg',
    'published',
    '2025-03-04T12:00:00Z',
    'https://bianet.org/haber/dersimliler-ve-cevreciler-munzur-gozeleri-icin-tam-koruma-istiyor-305088',
    'bianet',
    now()
  ),
  (
    'munzur-gozeleri-talana-hayir',
    'MUNZUR GÖZELERİ',
    'Munzur Gözeleri''nde talana müsaade etmeyeceğiz',
    'SİT statüsünün düşürülmesine karşı Munzur Çevre Derneği mücadeleyi sürdürüyor.',
    '["Munzur Gözeleri''nin koruma statüsünün düşürülmesine karşı tepkiler sürüyor.","Munzur Çevre Derneği, maden ruhsatlarının gözeleri tehdit ettiğini belirtti.","Hukuki süreçle birlikte toplumsal mücadelenin devam edeceği açıklandı."]'::jsonb,
    'from-leaf-green to-river-blue',
    '/news/gozeler-talana-hayir.jpg',
    'published',
    '2024-11-01T10:00:00Z',
    'https://bianet.org/haber/munzur-gozelerinde-talana-musaade-etmeyecegiz-301335',
    'bianet',
    now()
  )
on conflict (slug) do update set
  tag = excluded.tag,
  title = excluded.title,
  excerpt = excluded.excerpt,
  body = excluded.body,
  gradient = excluded.gradient,
  image_url = excluded.image_url,
  status = excluded.status,
  published_at = excluded.published_at,
  source_url = excluded.source_url,
  source_name = excluded.source_name,
  updated_at = now();
