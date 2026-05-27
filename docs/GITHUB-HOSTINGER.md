# GitHub → Hostinger otomatik deploy

## Akış

```
Bilgisayar (Cursor) → git push → GitHub → Hostinger otomatik build
```

---

## Bir kez: GitHub repo

1. https://github.com/new  
2. Repository name: `mcd-website` (veya istediğiniz isim)  
3. **Private** önerilir (`.env` zaten repoda yok)  
4. README / .gitignore **eklemeyin** (boş repo)  
5. **Create repository**

Terminal (proje klasöründe):

```powershell
cd D:\projects\mcd-website
git remote add origin https://github.com/KULLANICI_ADINIZ/mcd-website.git
git branch -M main
git push -u origin main
```

`KULLANICI_ADINIZ` → kendi GitHub kullanıcı adınız.

---

## Bir kez: Hostinger

1. **Deploy Your Node.js Web App** → **Continue with GitHub**  
2. GitHub hesabınızı bağlayın, `mcd-website` reposunu seçin  
3. Branch: **main**  
4. Ayarlar:

| Alan | Değer |
|------|--------|
| Node | 20 veya 22 |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Root directory | `/` (boş veya repo kökü) |

5. **Environment variables** → `docs/DEPLOY.md` listesindeki tüm değişkenler  
6. **Deploy**

Otomatik deploy: Hostinger panelinde genelde **Auto deploy on push** açıktır; her `git push` sonrası yeniden build eder.

---

## Her gün (siz)

```powershell
cd D:\projects\mcd-website
git add .
git commit -m "Açıklama: ne değişti"
git push
```

1–3 dakika sonra canlı site güncellenir.

---

## Supabase (unutmayın)

Canlı URL: `https://munzurcevredernegi.net`  
Redirect: `https://munzurcevredernegi.net/**`
