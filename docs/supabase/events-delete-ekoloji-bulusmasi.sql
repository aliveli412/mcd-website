-- "Ekoloji Buluşması" etkinliğini kaldırır (Supabase SQL Editor).

delete from public.events
where slug in (
  'ekoloji-bulusmasi',
  'munzur-ekoloji-bulusmasi',
  'ekoloji-bulusma'
)
or title_plain ilike '%ekoloji buluşması%'
or title ilike '%ekoloji buluşması%';
