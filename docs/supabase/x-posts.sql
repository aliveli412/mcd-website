-- Ana sayfada gösterilecek X (Twitter) gönderileri — admin panelden URL eklenir
create table if not exists public.x_posts (
  id uuid primary key default gen_random_uuid(),
  tweet_id text not null unique,
  tweet_url text not null,
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index if not exists x_posts_published_sort_idx
  on public.x_posts (status, sort_order);

alter table public.x_posts enable row level security;
