-- Ana sayfa «Mücadele sokakta» bento galerisi (en fazla 5 görsel)

create table if not exists public.field_gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text not null,
  caption text,
  object_position text not null default 'center',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint field_gallery_sort_order_range check (sort_order >= 0 and sort_order < 5)
);

create unique index if not exists field_gallery_sort_order_uidx
  on public.field_gallery_photos (sort_order);

alter table public.field_gallery_photos enable row level security;

drop policy if exists "Public read field gallery" on public.field_gallery_photos;
create policy "Public read field gallery"
  on public.field_gallery_photos for select
  using (true);
