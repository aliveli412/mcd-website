# Magic link — yerel geliştirme

E-postadaki giriş linki **canlı domaine** gidiyorsa iki ayar eksiktir.

## 1. `.env.local`

```env
# Site (magic link için) — localhost portunuz
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Supabase — Dashboard → Settings → API (localhost DEĞİL!)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

`npm run dev` farklı portta çalışıyorsa (ör. 3001) URL’yi ona göre yazın.

Sunucuyu yeniden başlatın.

## 2. Supabase Dashboard

**Authentication → URL Configuration**

| Alan | Yerel geliştirme |
|------|------------------|
| **Site URL** | İsteğe bağlı `http://localhost:3000` (ayrı dev projesi önerilir) |
| **Redirect URLs** | `http://localhost:3001/**` (port sizde neyse) |
| | `http://127.0.0.1:3001/**` |
| | `https://munzurcevredernegi.net/**` (canlı) |

**Önemli:** Sadece `/admin` yetmez. Link önce `/auth/callback?next=/admin` adresine gider; bu yüzden `/**` veya en azından `/auth/callback` ekleyin.

Yanlış: `http://localhost:3001/admin`  
Doğru: `http://localhost:3001/**`

Kaydedin. Yeni magic link isteyin (eskisi production’a gidebilir).

## 3. PKCE / aynı tarayıcı

Magic link, bağlantıyı **istediğiniz tarayıcıda** açmalısınız (Chrome’da istediyseniz Chrome’da açın). Başka cihaz veya tarayıcıda açılırsa “geçersiz veya süresi dolmuş” hatası görülür.

Kod güncellemesinden sonra mutlaka **yeni** link isteyin; eski maillerdeki linkler çalışmaz.

## Kontrol

`/login` sayfasında (development) altta hedef URL görünür. Gönderim sonrası “Hedef: http://localhost:3000/auth/callback?...” yazmalı.
