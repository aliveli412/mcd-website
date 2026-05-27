-- SEO alanları (haber + etkinlik)
-- Supabase SQL Editor'da bir kez çalıştırın.

alter table public.events add column if not exists meta_title text;
alter table public.events add column if not exists meta_description text;
alter table public.events add column if not exists og_image text;

alter table public.news add column if not exists meta_title text;
alter table public.news add column if not exists meta_description text;
alter table public.news add column if not exists og_image text;
