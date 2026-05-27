# Admin girişi (e-posta + şifre)

Magic link kullanılmaz. Kullanıcılar Supabase Auth’ta oluşturulur; yalnızca `admin_users` tablosundaki hesaplar panele girebilir.

## 1. Supabase SQL

`docs/supabase/admin-users.sql` dosyasını SQL Editor’da çalıştırın.

## 2. Kullanıcı oluşturma

**Authentication → Users → Add user**

- E-posta ve güçlü bir şifre girin
- “Auto confirm user” işaretli olsun (e-posta onayı beklemeden giriş için)

## 3. Admin listesine ekleme

SQL Editor:

```sql
insert into public.admin_users (id, email)
select id, email from auth.users where email = 'munzurcevredernegi@gmail.com'
on conflict (id) do update set email = excluded.email;
```

Yeni yönetici eklerken aynı sorguyu e-posta ile tekrarlayın.

## 4. Supabase Auth ayarları

**Authentication → Providers → Email**

- Email provider açık
- İsteğe bağlı: “Confirm email” kapalı (dashboard’dan eklenen hesaplar için)

**Authentication → URL Configuration** (canlı site)

- Redirect URLs: `https://munzurcevredernegi.net/**` ve yerel `http://localhost:3000/**`

## 5. Yerel geliştirme

`npm run dev` sırasında `/admin` otomatik açılabilir (dev bypass). Gerçek girişi test için `NODE_ENV=production npm run start` veya bypass kodunu geçici kapatın.

## Yedek: ADMIN_EMAIL

`admin_users` tablosu yoksa veya kayıt bulunamazsa `.env` içindeki `ADMIN_EMAIL` tek hesap için yedek olarak kullanılır.
