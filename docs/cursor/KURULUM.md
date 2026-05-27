# Cursor — bu projede Run / Accept otomatik

Cursor’da agent komut çalıştırırken çıkan **Run**, **Accept**, **Allow network** pencerelerini azaltmak için üç katman var.

## 1. IDE (en önemli — siz bir kez yapın)

1. **Cursor Settings** → **Agent** → **Auto-run**
2. Şunlardan birini seçin:
   - **Allowlist** (önerilen) — aşağıdaki allowlist ile birlikte
   - **Run Everything** — tüm komutlar otomatik (dikkatli kullanın)

3. PowerShell’de proje kökünden:

```powershell
cd D:\projects\mcd-website
.\scripts\install-cursor-auto-run.ps1
```

Bu, `C:\Users\<siz>\.cursor\permissions.json` dosyasını Munzur sitesi için `npm`, `git`, `npx`, MCP vb. allowlist ile günceller.

4. Cursor’u **yeniden başlatın** veya **Developer: Reload Window**.

> Not: `permissions.json` şu an **kullanıcı genelinde** geçerlidir; sadece bu projeye özel değildir. Diğer projelerde de aynı allowlist uygulanır.

## 2. CLI agent (bu repo içinde)

`.cursor/cli.json` — bu klasörde `cursor` CLI kullanırsanız `approvalMode: unrestricted` ve ağ izni tanımlıdır.

## 3. Hooks (isteğe bağlı)

Hook’ların `allow` cevabı her zaman IDE onayını kaldırmaz; asıl çözüm **Auto-run + permissions.json**’dır.

---

## Hâlâ onay istiyorsa

- **Sandbox / Network**: Komutta “Allow network” çıkıyorsa, agent `required_permissions: full_network` ile çalışmalı; siz yine de bir kez onaylayabilirsiniz.
- **MCP**: Settings → MCP → ilgili sunucu için auto-approve veya `mcpAllowlist` içinde `*:*` (örnek dosyada var).
- **Ekip politikası**: Kurumsal Cursor hesabında admin auto-run’u kilitliyorsa allowlist genişletilemez.

## Geri alma

```powershell
Remove-Item "$env:USERPROFILE\.cursor\permissions.json"
# veya yedek dosyayı geri kopyalayın (.backup-*)
```
