-- İngilizce haber alanları (isteğe bağlı; boşsa sitede Türkçe gösterilir)
alter table public.news
  add column if not exists title_en text,
  add column if not exists tag_en text,
  add column if not exists excerpt_en text,
  add column if not exists body_en jsonb not null default '[]'::jsonb;
