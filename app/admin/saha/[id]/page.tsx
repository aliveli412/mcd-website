import { notFound } from "next/navigation";
import { FieldGalleryForm } from "@/components/admin/FieldGalleryForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { getFieldGalleryPhotosAdmin } from "@/lib/data/field-gallery";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminFieldGalleryEditPage({ params }: PageProps) {
  const { id } = await params;
  const { photos: list } = await getFieldGalleryPhotosAdmin();
  const photo = list.find((p) => p.id === id);
  if (!photo) notFound();

  const usedSlots = list
    .filter((p) => p.id !== id)
    .map((p) => p.sort_order);

  return (
    <div>
      <AdminPageHeader
        title="Görseli düzenle"
        description="Mücadele sokakta — ana sayfa galerisi"
        backHref="/admin/saha"
        backLabel="← Galeri"
      />
      <div className={`${adminCardClass} max-w-xl`}>
        <FieldGalleryForm photo={photo} usedSlots={usedSlots} />
      </div>
    </div>
  );
}
