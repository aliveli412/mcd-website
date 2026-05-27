export const FIELD_GALLERY_MAX = 5;

export type DbFieldGalleryPhoto = {
  id: string;
  image_url: string;
  alt: string;
  caption: string | null;
  object_position: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function normalizeFieldGalleryPhoto(
  row: Record<string, unknown>,
): DbFieldGalleryPhoto {
  return {
    id: String(row.id ?? ""),
    image_url: String(row.image_url ?? ""),
    alt: String(row.alt ?? ""),
    caption: (row.caption as string | null) ?? null,
    object_position: String(row.object_position ?? "center"),
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}
