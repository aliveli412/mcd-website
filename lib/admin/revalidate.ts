import { revalidatePath } from "next/cache";

export function revalidatePublicSite() {
  revalidatePath("/");
  revalidatePath("/etkinlikler");
  revalidatePath("/haberler");
}

export function revalidateFieldGallery() {
  revalidatePath("/");
}

export function revalidateEvents() {
  revalidatePublicSite();
  revalidatePath("/admin");
  revalidatePath("/admin/etkinlikler");
}

export function revalidateNews(slug?: string) {
  revalidatePublicSite();
  revalidatePath("/admin");
  revalidatePath("/admin/haberler");
  if (slug) {
    revalidatePath(`/haberler/${slug}`);
  }
}
