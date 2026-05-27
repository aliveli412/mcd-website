-- Haber / etkinlik kapak görselleri — Supabase SQL Editor'da bir kez çalıştırın.
-- Hata: {"error":"Bucket not found"} → bu dosyayı çalıştırın, sonra görselleri yeniden yükleyin.

-- ÖNEMLİ: Bucket private ise public URL 404 "Bucket not found" verir.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-posters',
  'event-posters',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read posters" on storage.objects;
create policy "Public read posters"
  on storage.objects for select
  using (bucket_id = 'event-posters');

drop policy if exists "Authenticated upload posters" on storage.objects;
create policy "Authenticated upload posters"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-posters');
