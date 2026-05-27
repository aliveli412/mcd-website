-- Mevcut haberler için İngilizce metinler (news-english.sql sonrası çalıştırın)
-- EN sitede bu alanlar doluysa İngilizce gösterilir.

update public.news set
  title_en = 'Nature and life vigil begins in Havaçor Valley',
  tag_en = 'LIFE VIGIL',
  excerpt_en = 'A one-month vigil in Ovacık, called jointly by Munzur Environment Association and village associations, aims to protect plant diversity and living habitats.',
  body_en = '["A one-month nature and life vigil has started in Havaçor Village, Ovacık district of Dersim. Munzur Environment Association, the Federation of Dersim Associations and local village associations are running the vigil together.","The statement stressed that vigils against mining, geothermal and solar energy projects are a solidarity call against plant destruction in the Munzur region.","Activists said they stand in solidarity with struggles in Pülümür, Hozat, Pertek and Çemişgezek."]'::jsonb,
  updated_at = now()
where slug = 'havacor-dogaya-ve-yasam-nobeti';

update public.news set
  title_en = 'Public meeting call against chrome mine in Pülümür',
  tag_en = 'PUBLIC MEETING',
  excerpt_en = 'Munzur Environment Association Dersim Branch invited all citizens to a public meeting against the chrome mine project planned by Dimin Mining.',
  body_en = '["Villagers and environmental groups are holding a public meeting against a planned chrome mine in Pülümür district.","Yusuf Topçu of the Munzur Environment Association Dersim Branch said local people do not want mining activity.","Topçu said stopping exploitation requires organising people and uniting local struggles."]'::jsonb,
  updated_at = now()
where slug = 'pulumur-krom-ocagi-halk-bulusmasi';

update public.news set
  title_en = 'Against solar plant projects: No consent, no to nature exploitation',
  tag_en = 'PRESS RELEASE',
  excerpt_en = 'Munzur Environment Association held a press statement against planned solar power plants in Pertek and Hozat.',
  body_en = '["The Munzur Environment Association Dersim Branch held a press statement against dams, HPPs, solar plants and mining projects in the region.","The statement stressed that planned solar plants in Pertek and Hozat threaten farming and livestock.","The association said the struggle will continue through public solidarity."]'::jsonb,
  updated_at = now()
where slug = 'ges-projelerine-karsi-basin-aciklamasi';

update public.news set
  title_en = 'One-month life vigil in Ovacık',
  tag_en = 'OVACIK',
  excerpt_en = 'The vigil started in Havaçor Valley marks a new stage in ecological struggle in the Munzur region.',
  body_en = '["A one-month nature and life vigil has started in Havaçor Village, Ovacık district of Dersim.","Havaçor Village Association said vigils continue against mining and energy projects.","A call for solidarity with similar struggles across Turkey was made."]'::jsonb,
  updated_at = now()
where slug = 'ovacik-havacor-bir-aylik-nobet';

update public.news set
  title_en = 'Full protection demanded for Munzur Springs',
  tag_en = 'MUNZUR SPRINGS',
  excerpt_en = 'Munzur Environment Association demands the valleys be declared fully protected sensitive areas, not only in part.',
  body_en = '["As protection status changes in Munzur and Pülümür valleys, Munzur Environment Association renewed its call for full protection.","The association said partial protection decisions are insufficient.","It stated that Munzur Valley should be declared a cultural and natural site along its entire length."]'::jsonb,
  updated_at = now()
where slug = 'munzur-gozeleri-tam-koruma-talebi';

update public.news set
  title_en = 'We will not allow exploitation at Munzur Springs',
  tag_en = 'MUNZUR SPRINGS',
  excerpt_en = 'Munzur Environment Association continues its struggle against the lowering of SIT (protected site) status.',
  body_en = '["Reactions continue against the lowering of protection status at Munzur Springs.","Munzur Environment Association said mining licences threaten the springs.","It announced that legal and social struggle will continue."]'::jsonb,
  updated_at = now()
where slug = 'munzur-gozeleri-talana-hayir';
