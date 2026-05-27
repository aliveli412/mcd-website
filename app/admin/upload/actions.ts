"use server";

import { requireAdmin } from "@/lib/admin/require-admin";
import {
  ensureEventPostersBucket,
  EVENT_POSTERS_BUCKET,
} from "@/lib/storage/ensure-bucket";
import { supabaseAdmin } from "@/lib/supabase/server";

const BUCKET = EVENT_POSTERS_BUCKET;
const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export type UploadPosterResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function uploadPosterAction(
  formData: FormData,
): Promise<UploadPosterResult> {
  try {
    await requireAdmin();

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Dosya seçilmedi." };
    }
    if (file.size > MAX_BYTES) {
      return { ok: false, error: "Görsel en fazla 2MB olabilir." };
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return { ok: false, error: "Yalnızca JPEG, PNG veya WebP yükleyebilirsiniz." };
    }

    const bucketReady = await ensureEventPostersBucket();
    if (!bucketReady.ok) {
      return { ok: false, error: bucketReady.error };
    }

    const safeName = file.name.replace(/[^\w.\-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    const body = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin.storage.from(BUCKET).upload(filename, body, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("bucket not found") || msg.includes("bucket_not_found")) {
        return {
          ok: false,
          error:
            "Supabase'de event-posters bucket yok. Dashboard → SQL Editor'da docs/supabase/storage-event-posters.sql dosyasını çalıştırın.",
        };
      }
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename);

    try {
      const check = await fetch(publicUrl, { method: "HEAD", cache: "no-store" });
      if (!check.ok) {
        return {
          ok: false,
          error: `Görsel yüklendi ama adres açılmıyor (HTTP ${check.status}). Storage → event-posters bucket'ının Public olduğunu kontrol edin.`,
        };
      }
    } catch {
      return {
        ok: false,
        error:
          "Görsel URL doğrulanamadı. NEXT_PUBLIC_SUPABASE_URL ve bucket ayarlarını kontrol edin.",
      };
    }

    return { ok: true, url: publicUrl };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Görsel yüklenemedi";
    if (message.toLowerCase().includes("bucket not found")) {
      return {
        ok: false,
        error:
          "Supabase'de event-posters bucket yok. SQL Editor'da storage-event-posters.sql çalıştırın.",
      };
    }
    return { ok: false, error: message };
  }
}
