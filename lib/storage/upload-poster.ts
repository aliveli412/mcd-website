import { uploadPosterAction } from "@/app/admin/upload/actions";

/** Admin panel — sunucu üzerinden yükler (RLS / oturum sorunu olmaz). */
export async function uploadPoster(file: File): Promise<string> {
  const formData = new FormData();
  formData.set("file", file);

  const result = await uploadPosterAction(formData);
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result.url;
}
