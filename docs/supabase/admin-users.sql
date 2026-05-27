-- Yönetim paneline girebilecek hesaplar (Supabase Auth'ta oluşturduğunuz kullanıcılar)
create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- İstemci erişimi yok; uygulama service role ile kontrol eder.

-- Örnek: Auth'ta kullanıcı oluşturduktan sonra (e-postayı kendi Auth kaydınızla eşleştirin):
-- insert into public.admin_users (id, email)
-- select id, email from auth.users where email = 'munzurcevredernegi@gmail.com'
-- on conflict (id) do update set email = excluded.email;
