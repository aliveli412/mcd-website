import { FieldGalleryForm } from "@/components/admin/FieldGalleryForm";
import { FieldGalleryList } from "@/components/admin/FieldGalleryList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { FIELD_GALLERY_SETUP_HINT } from "@/lib/data/field-gallery-errors";
import { getFieldGalleryPhotosAdmin } from "@/lib/data/field-gallery";
import { FIELD_GALLERY_MAX } from "@/lib/field-gallery-db";

export const metadata = { title: "Mücadele sokakta" };

export default async function AdminFieldGalleryPage() {
  let list: Awaited<ReturnType<typeof getFieldGalleryPhotosAdmin>>["photos"] =
    [];
  let errorMessage: string | null = null;

  try {
    const result = await getFieldGalleryPhotosAdmin();
    list = result.photos;
    if (result.tableMissing) {
      errorMessage = FIELD_GALLERY_SETUP_HINT;
    }
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : "Veritabanı hatası";
  }

  const usedSlots = list.map((p) => p.sort_order);

  return (
    <div>
      <AdminPageHeader
        title="Mücadele sokakta"
        description={`Ana sayfa saha galerisi — en fazla ${FIELD_GALLERY_MAX} görsel.`}
      />

      {errorMessage ? (
        <p className="mb-8 rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {errorMessage}{" "}
          Görseller için <code className="text-xs">storage-event-posters.sql</code>{" "}
          gerekir.
        </p>
      ) : null}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className={adminCardClass}>
          {list.length < FIELD_GALLERY_MAX ? (
            <FieldGalleryForm usedSlots={usedSlots} />
          ) : (
            <p className="text-sm text-cream/60">
              Galeri dolu ({FIELD_GALLERY_MAX}/5). Yeni görsel için önce birini silin.
            </p>
          )}
        </div>
        <div className={adminCardClass}>
          <h3 className="font-display text-lg tracking-wide uppercase">
            Galeri ({list.length}/{FIELD_GALLERY_MAX})
          </h3>
          <FieldGalleryList photos={list} />
        </div>
      </div>
    </div>
  );
}
