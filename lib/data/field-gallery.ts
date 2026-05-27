import { normalizeFieldGalleryPhoto } from "@/lib/field-gallery-db";
import { fieldGallery as defaultFieldGallery } from "@/lib/site-photos";
import type { SitePhoto } from "@/lib/site-photos";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isFieldGalleryTableMissing } from "@/lib/data/field-gallery-errors";

function mapToSitePhoto(row: {
  image_url: string;
  alt: string;
  caption: string | null;
  object_position: string;
}): SitePhoto {
  return {
    src: row.image_url,
    alt: row.alt,
    caption: row.caption ?? undefined,
    objectPosition: row.object_position || "center",
  };
}

export async function getFieldGalleryPhotos(): Promise<SitePhoto[]> {
  const { data, error } = await supabaseAdmin
    .from("field_gallery_photos")
    .select("image_url, alt, caption, object_position")
    .order("sort_order", { ascending: true });

  if (error) {
    if (isFieldGalleryTableMissing(error)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[field_gallery_photos] Tablo yok — varsayılan /photos görselleri kullanılıyor. SQL: docs/supabase/field-gallery.sql",
        );
      }
    } else {
      console.error("getFieldGalleryPhotos:", error.message);
    }
    return [...defaultFieldGallery];
  }

  if (!data?.length) {
    return [...defaultFieldGallery];
  }

  return data.map((row) => mapToSitePhoto(row));
}

export async function getFieldGalleryPhotosAdmin(): Promise<{
  photos: ReturnType<typeof normalizeFieldGalleryPhoto>[];
  tableMissing: boolean;
}> {
  const { data, error } = await supabaseAdmin
    .from("field_gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    if (isFieldGalleryTableMissing(error)) {
      return { photos: [], tableMissing: true };
    }
    throw error;
  }

  return {
    photos: (data ?? []).map((row) =>
      normalizeFieldGalleryPhoto(row as Record<string, unknown>),
    ),
    tableMissing: false,
  };
}
