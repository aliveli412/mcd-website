import { supabaseAdmin } from "@/lib/supabase/server";

export const EVENT_POSTERS_BUCKET = "event-posters";

export type EnsureBucketResult =
  | { ok: true }
  | { ok: false; error: string };

/** Service role ile public bucket yoksa oluşturur. */
export async function ensureEventPostersBucket(): Promise<EnsureBucketResult> {
  const { data: buckets, error: listError } =
    await supabaseAdmin.storage.listBuckets();

  if (listError) {
    return {
      ok: false,
      error: `Bucket listesi: ${listError.message}. SUPABASE_SERVICE_ROLE_KEY doğru mu?`,
    };
  }

  const existing = buckets?.find(
    (b) => b.id === EVENT_POSTERS_BUCKET || b.name === EVENT_POSTERS_BUCKET,
  );

  if (existing) {
    if (existing.public) return { ok: true };

    const { error: updateError } = await supabaseAdmin.storage.updateBucket(
      EVENT_POSTERS_BUCKET,
      {
        public: true,
        fileSizeLimit: "2097152",
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      },
    );

    if (updateError) {
      return {
        ok: false,
        error: `${updateError.message} — Dashboard → Storage → event-posters → Public bucket açın.`,
      };
    }

    return { ok: true };
  }

  const { error: createError } = await supabaseAdmin.storage.createBucket(
    EVENT_POSTERS_BUCKET,
    {
      public: true,
      fileSizeLimit: "2097152",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    },
  );

  if (createError && !/already exists/i.test(createError.message)) {
    return {
      ok: false,
      error: `${createError.message} — Terminalde: node scripts/setup-storage.mjs veya Dashboard → Storage → New bucket → event-posters (Public).`,
    };
  }

  const { data: after } = await supabaseAdmin.storage.listBuckets();
  const created = after?.some(
    (b) => b.id === EVENT_POSTERS_BUCKET || b.name === EVENT_POSTERS_BUCKET,
  );
  if (!created) {
    return {
      ok: false,
      error:
        "Bucket oluşturulamadı. Supabase Dashboard → Storage → New bucket → event-posters, Public işaretli.",
    };
  }

  return { ok: true };
}
