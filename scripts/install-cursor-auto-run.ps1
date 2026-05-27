# Munzur sitesi — Cursor otomatik Run/Accept için permissions.json kurar
$ErrorActionPreference = "Stop"

$source = Join-Path $PSScriptRoot "..\docs\cursor\permissions.mcd.example.json"
$targetDir = Join-Path $env:USERPROFILE ".cursor"
$target = Join-Path $targetDir "permissions.json"

if (-not (Test-Path $source)) {
  Write-Error "Kaynak bulunamadı: $source"
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

if (Test-Path $target) {
  $backup = "$target.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
  Copy-Item $target $backup -Force
  Write-Host "Mevcut dosya yedeklendi: $backup"
}

Copy-Item $source $target -Force
Write-Host "Kuruldu: $target"
Write-Host ""
Write-Host "Cursor'da: Settings > Agent > Auto-run modunu acin:"
Write-Host "  - Allowlist (onerilen) veya"
Write-Host "  - Run Everything (tum komutlar otomatik)"
Write-Host ""
Write-Host "Degisiklik icin Cursor'i yeniden baslatin veya pencereyi yenileyin."
