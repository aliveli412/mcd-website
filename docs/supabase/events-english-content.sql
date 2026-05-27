-- Örnek etkinliklerin İngilizce metinleri (events-seed-2025-2026.sql sonrası)
-- Önce events-english.sql çalıştırılmış olmalı.

update public.events set
  title_en = 'Public meeting against chrome mine in Pülümür',
  title_plain_en = 'Public meeting against chrome mine in Pülümür',
  description_en = 'Public meeting against Dimin Mining''s chrome mine project on Mount Hel. Called by Munzur Environment Association Dersim Branch and local village associations.',
  category_en = 'Public meeting',
  location_en = 'Pülümür, Dersim',
  duration_en = 'Full day',
  body_en = '["Opening and briefing","Joint struggle call","Press statement"]'::jsonb
where slug = 'pulumur-krom-ocagi-halk-bulusmasi';

update public.events set
  title_en = 'Organising meeting against solar plants in Dersim',
  title_plain_en = 'Organising meeting against solar plants in Dersim',
  description_en = 'Press statement and organising meeting against planned solar power plants in Pertek and Hozat under the slogan «We do not consent».',
  category_en = 'Press & organising',
  location_en = 'Tunceli city centre',
  duration_en = '3 hours',
  body_en = '["Overview of solar plant projects","Legal processes","Joint action plan"]'::jsonb
where slug = 'ges-projelerine-karsi-dersim-bulusmasi';

update public.events set
  title_en = 'Full protection march for Munzur Springs',
  title_plain_en = 'Full protection march for Munzur Springs',
  description_en = 'March demanding full protection of Munzur Springs against downgraded status and mining pressure.',
  category_en = 'March',
  location_en = 'Ovacık — Munzur Valley',
  duration_en = '5 hours',
  body_en = '["Join the cortege","March","Closing statement"]'::jsonb
where slug = 'munzur-gozeleri-koruma-yuruyusu';

update public.events set
  title_en = 'Opening of Havaçor nature and life vigil',
  title_plain_en = 'Opening of Havaçor nature and life vigil',
  description_en = 'Opening programme for a one-month nature and life vigil in Havaçor, Ovacık; solidarity with village associations and environmental groups.',
  category_en = 'Vigil & action',
  location_en = 'Havaçor village, Ovacık',
  duration_en = 'Full day',
  body_en = '["Setting up the vigil site","Opening speeches","Messages from allied groups"]'::jsonb
where slug = 'havacor-dogaya-ve-yasam-nobeti-acilisi';
