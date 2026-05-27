-- Mevcut events tablosunu site şemasına yükseltir (eski tablo varsa bunu çalıştırın)
-- Supabase SQL Editor → Run

create table if not exists public.events (
  id uuid primary key default gen_random_uuid()
);

-- Eksik sütunlar (zaten varsa atlanır)
alter table public.events add column if not exists slug text;
alter table public.events add column if not exists title text;
alter table public.events add column if not exists title_plain text;
alter table public.events add column if not exists description text;
alter table public.events add column if not exists body jsonb not null default '[]'::jsonb;
alter table public.events add column if not exists category text;
alter table public.events add column if not exists date_display text;
alter table public.events add column if not exists date date;
alter table public.events add column if not exists event_time time;
alter table public.events add column if not exists location text;
alter table public.events add column if not exists duration text;
alter table public.events add column if not exists poster_url text;
alter table public.events add column if not exists featured boolean not null default false;
alter table public.events add column if not exists status text not null default 'draft';
alter table public.events add column if not exists schedule jsonb not null default '[]'::jsonb;
alter table public.events add column if not exists created_at timestamptz not null default now();
alter table public.events add column if not exists updated_at timestamptz not null default now();

-- Eski şema: event_date → date
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'events' and column_name = 'event_date'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'events' and column_name = 'date'
  ) then
    alter table public.events rename column event_date to date;
  elsif exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'events' and column_name = 'event_date'
  ) then
    update public.events set date = event_date where date is null and event_date is not null;
  end if;
end $$;

-- Eski şema: published (boolean) → status (text)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'events' and column_name = 'published'
  ) then
    update public.events
    set status = 'published'
    where published = true and status = 'draft';

    update public.events
    set status = 'draft'
    where published = false and status is null;
  end if;
end $$;

-- title_plain boşsa title'dan doldur
update public.events
set title_plain = title
where title_plain is null and title is not null;

-- status kısıtı (yoksa ekle)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'events_status_check' and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_status_check
      check (status in ('draft', 'published'));
  end if;
exception
  when others then null;
end $$;

create unique index if not exists events_slug_idx on public.events (slug);
create index if not exists events_status_idx on public.events (status);
create index if not exists events_featured_idx on public.events (featured) where featured = true;

alter table public.events enable row level security;

drop policy if exists "Public read published events" on public.events;
create policy "Public read published events"
  on public.events for select
  using (status = 'published');

-- Storage (policy zaten varsa hata verirse bu iki satırı atlayın)
insert into storage.buckets (id, name, public)
values ('event-posters', 'event-posters', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated upload posters" on storage.objects;
create policy "Authenticated upload posters"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-posters');

drop policy if exists "Public read posters" on storage.objects;
create policy "Public read posters"
  on storage.objects for select
  using (bucket_id = 'event-posters');
