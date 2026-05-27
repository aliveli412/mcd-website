"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  createFieldGalleryPhoto,
  updateFieldGalleryPhoto,
} from "@/app/admin/saha/actions";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "@/components/admin/admin-styles";
import {
  FIELD_GALLERY_MAX,
  type DbFieldGalleryPhoto,
} from "@/lib/field-gallery-db";
import { uploadPoster } from "@/lib/storage/upload-poster";

const SLOT_LABELS = [
  "1 — Büyük kart (sol, öne çıkan)",
  "2 — Sağ üst",
  "3 — Sağ üst (yan)",
  "4 — Sağ alt",
  "5 — Sağ alt (yan)",
] as const;

export function FieldGalleryForm({
  photo,
  usedSlots,
}: {
  photo?: DbFieldGalleryPhoto;
  usedSlots: number[];
}) {
  const isEdit = Boolean(photo);
  const [imagePreview, setImagePreview] = useState<string | null>(
    photo?.image_url ?? null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    photo?.image_url ?? null,
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const availableSlots = SLOT_LABELS.map((label, index) => ({
    index,
    label,
    disabled:
      usedSlots.includes(index) && (!isEdit || photo?.sort_order !== index),
  }));

  async function handleImageChange(file: File | undefined) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Görsel en fazla 2MB olabilir.");
      return;
    }
    setError(null);
    setUploading(true);
    setImagePreview(URL.createObjectURL(file));
    try {
      const url = await uploadPoster(file);
      setImageUrl(url);
      setMessage("Görsel yüklendi.");
    } catch (e) {
      setImagePreview(photo?.image_url ?? null);
      setImageUrl(photo?.image_url ?? null);
      setError(e instanceof Error ? e.message : "Görsel yüklenemedi");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl?.trim() ?? "");

    const result = isEdit
      ? await updateFieldGalleryPhoto(photo!.id, formData)
      : await createFieldGalleryPhoto(formData);

    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(isEdit ? "Güncellendi." : "Eklendi. Ana sayfada görünür.");
    if (!isEdit) {
      e.currentTarget.reset();
      setImagePreview(null);
      setImageUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="font-display text-xl tracking-wide uppercase">
          {isEdit ? "Görseli düzenle" : "+ Yeni saha görseli"}
        </h3>
        {isEdit ? (
          <Link
            href="/admin/saha"
            className="mt-2 inline-block text-sm text-leaf-green hover:underline"
          >
            ← Listeye dön
          </Link>
        ) : null}
        <p className="mt-2 text-sm text-cream/55">
          Ana sayfadaki «Mücadele sokakta» bölümü — en fazla {FIELD_GALLERY_MAX}{" "}
          görsel.
        </p>
      </div>

      <input type="hidden" name="image_url" value={imageUrl ?? ""} readOnly />

      <div>
        <label htmlFor="cover" className={adminLabelClass}>
          Görsel yükle
        </label>
        <div className="rounded-xl border border-dashed border-cream/20 bg-cream/3 p-4">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt=""
              className="mb-3 max-h-48 w-full rounded-lg object-cover"
            />
          ) : null}
          <input
            ref={fileRef}
            id="cover"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            className="w-full text-sm text-cream/70 file:rounded-lg file:border-0 file:bg-leaf-green file:px-3 file:py-1.5 file:text-cream"
            onChange={(ev) => handleImageChange(ev.target.files?.[0])}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image_url_display" className={adminLabelClass}>
          veya görsel URL
        </label>
        <input
          id="image_url_display"
          type="url"
          value={imageUrl ?? ""}
          onChange={(e) => {
            const v = e.target.value.trim();
            setImageUrl(v || null);
            if (v) setImagePreview(v);
          }}
          placeholder="https://...supabase.co/storage/..."
          className={adminInputClass}
        />
      </div>

      <div>
        <label htmlFor="alt" className={adminLabelClass}>
          Alt metin (zorunlu)
        </label>
        <input
          id="alt"
          name="alt"
          required
          defaultValue={photo?.alt ?? ""}
          placeholder="Görseli kısaca tanımlayın"
          className={adminInputClass}
        />
      </div>

      <div>
        <label htmlFor="caption" className={adminLabelClass}>
          Altyazı (kart üzerinde)
        </label>
        <input
          id="caption"
          name="caption"
          defaultValue={photo?.caption ?? ""}
          placeholder="örn. Halkın sesi, ortak eylem"
          className={adminInputClass}
        />
      </div>

      <div>
        <label htmlFor="object_position" className={adminLabelClass}>
          Odak noktası
        </label>
        <input
          id="object_position"
          name="object_position"
          defaultValue={photo?.object_position ?? "center"}
          placeholder="center, center 30%, top"
          className={adminInputClass}
        />
      </div>

      <div>
        <label htmlFor="sort_order" className={adminLabelClass}>
          Konum
        </label>
        <select
          id="sort_order"
          name="sort_order"
          required={isEdit}
          defaultValue={photo?.sort_order ?? ""}
          className={adminSelectClass}
        >
          {!isEdit ? <option value="">Otomatik (boş yer)</option> : null}
          {availableSlots.map(({ index, label, disabled }) => (
            <option key={index} value={index} disabled={disabled}>
              {label}
              {disabled ? " (dolu)" : ""}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-leaf-green" role="status">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving || uploading}
        className={adminBtnPrimary}
      >
        {saving ? "Kaydediliyor…" : isEdit ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}
