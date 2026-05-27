# Hostinger deploy — Munzur Çevre Derneği sitesi

Bu site **Next.js 16 (SSR)** kullanır; sadece statik HTML hosting yetmez. Hostinger’da **Node.js Web Application** (veya eşdeğeri) gerekir.

---

## 0. Ön koşullar

- [ ] Supabase projesi hazır
- [ ] Domain: `munzurcevredernegi.net` Hostinger’da bu siteye bağlı
- [ ] Resend API key (iletişim formu)
- [ ] Kod GitHub/GitLab’da (Hostinger Git deploy için) **veya** ZIP ile yükleme planı

---

## 1. Supabase SQL (sırayla, SQL Editor)

| Sıra | Dosya |
|------|--------|
| 1 | `docs/supabase/news.sql` |
| 2 | `docs/supabase/events.sql` |
| 3 | `docs/supabase/field-gallery.sql` |
| 4 | `docs/supabase/storage-event-posters.sql` |
| 5 | `docs/supabase/news-english.sql` |
| 6 | `docs/supabase/events-english.sql` |
| 7 | `docs/supabase/admin-users.sql` |
| 8 | (isteğe bağlı) `news-seed-2025-2026.sql`, `news-english-content.sql` |

`events-migrate.sql` yalnızca eski/events tablosu varsa.

Admin kullanıcı:

```sql
insert into public.admin_users (id, email)
select id, email from auth.users where email = 'SIZIN-EPOSTA@example.com'
on conflict (id) do update set email = excluded.email;
```

---

## 2. Supabase Auth (canlı)

**Authentication → URL Configuration**

| Alan | Değer |
|------|--------|
| Site URL | `https://munzurcevredernegi.net` |
| Redirect URLs | `https://munzurcevredernegi.net/**` |

**Authentication → Providers → Email** — açık, dashboard’dan eklenen kullanıcılar için “Confirm email” kapalı olabilir.

---

## 3. Yerelde son kontrol

```bash
npm ci
npm run build
```

Hata yoksa devam.

---

## 4. Hostinger Node.js uygulaması

hPanel → **Websites** → siteniz → **Node.js** / **Deploy** / **Git Repository** (menü plana göre değişir).

### Git ile (önerilen)

1. Projeyi GitHub’a push edin (`main` veya `master`).
2. Hostinger → Repository bağlayın → branch seçin.
3. Ayarlar:

| Ayar | Değer |
|------|--------|
| Node sürümü | **20** veya **22** |
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm run start` |
| Uygulama kökü | repo kökü (`package.json` burada) |
| Port | Hostinger’ın verdiği `PORT` (genelde otomatik) |

### Ortam değişkenleri (Hostinger → Environment variables)

`.env.local` dosyasını **yüklemeyin**. Panelde tek tek:

```env
NEXT_PUBLIC_SITE_URL=https://munzurcevredernegi.net

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_...
RESEND_FROM=Munzur Çevre Derneği <onboarding@resend.dev>

ADMIN_EMAIL=munzurcevredernegi@gmail.com
```

Değişken ekledikten sonra **Redeploy / Restart**.

---

## 5. Domain

- Node uygulamasına `munzurcevredernegi.net` bağlayın.
- SSL (Let’s Encrypt) açık olsun.

---

## 6. Canlı test listesi

- [ ] Ana sayfa açılıyor
- [ ] `/haberler` — kart tıklanınca detay
- [ ] EN dil değişimi
- [ ] `/iletisim` — form gönderimi → Gmail
- [ ] `/login` → admin girişi → `/admin`
- [ ] Admin’den haber/etkinlik kaydı

---

## Sık sorunlar

| Sorun | Çözüm |
|--------|--------|
| 500 / build fail | Hostinger logları; `SUPABASE_*` ve Node 20+ |
| Admin açılmıyor | `admin_users` + Auth kullanıcı; canlıda dev bypass yok |
| Form mail gitmiyor | `RESEND_API_KEY`, Resend domain doğrulama |
| Görseller yok | `public/news`, `public/logo` repoda; Supabase Storage URL’leri |

---

## Giriş adresleri (canlı)

- Site: https://munzurcevredernegi.net  
- Admin: https://munzurcevredernegi.net/login  
