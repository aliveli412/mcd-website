-- Munzur Çevre Derneği — events + event-posters bucket
--
-- Tablo ZATEN varsa ve "column featured does not exist" aldıysanız:
--   → events-migrate.sql dosyasını çalıştırın (bu dosyayı değil).

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  title_plain text not null,
  description text not null,
  body jsonb not null default '[]'::jsonb,
  category text not null,
  date_display text,
  date date,
  event_time time,
  location text,
  duration text,
  poster_url text,
  featured boolean not null default false,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  schedule jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_status_idx on public.events (status);
create index if not exists events_featured_idx on public.events (featured) where featured = true;

alter table public.events enable row level security;

drop policy if exists "Public read published events" on public.events;
create policy "Public read published events"
  on public.events for select
  using (status = 'published');

insert into storage.buckets (id, name, public)
values ('event-posters', 'event-posters', true)
on conflict (id) do nothing;

-- Admin yüklemesi service role ile sunucudan yapılır; isteğe bağlı authenticated yolu:
drop policy if exists "Authenticated upload posters" on storage.objects;
create policy "Authenticated upload posters"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-posters');

drop policy if exists "Public read posters" on storage.objects;
create policy "Public read posters"
  on storage.objects for select
  using (bucket_id = 'event-posters');
