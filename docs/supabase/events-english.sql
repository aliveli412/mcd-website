-- İngilizce etkinlik alanları (isteğe bağlı; boşsa EN sitede Türkçe gösterilir)
alter table public.events
  add column if not exists title_en text,
  add column if not exists title_plain_en text,
  add column if not exists description_en text,
  add column if not exists category_en text,
  add column if not exists location_en text,
  add column if not exists duration_en text,
  add column if not exists body_en jsonb not null default '[]'::jsonb;
