-- Haberler tablosu
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  tag text not null,
  title text not null,
  excerpt text not null,
  body jsonb not null default '[]'::jsonb,
  gradient text not null default 'from-forest-mid to-forest-dark',
  image_url text,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_status_idx on public.news (status);
create index if not exists news_published_at_idx on public.news (published_at desc);

alter table public.news enable row level security;

create policy "Public read published news"
  on public.news for select
  using (status = 'published');

-- Gerçek basın haberleri için: news-seed-2025-2026.sql dosyasını çalıştırın.
