/** Supabase / PostgREST — tablo henüz oluşturulmamış. */
export function isFieldGalleryTableMissing(error: {
  code?: string;
  message?: string;
}): boolean {
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();

  if (code === "42P01" || code === "PGRST205") return true;

  return (
    msg.includes("field_gallery_photos") &&
    (msg.includes("schema cache") ||
      msg.includes("could not find the table") ||
      msg.includes("does not exist"))
  );
}

