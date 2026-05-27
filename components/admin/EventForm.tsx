"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { createEvent, updateEvent } from "@/app/admin/etkinlikler/actions";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "@/components/admin/admin-styles";
import type { DbEvent } from "@/lib/events-db";
import { uploadPoster } from "@/lib/storage/upload-poster";

const CATEGORIES = [
  "Kültür-Sanat",
  "Çevre Eylemi",
  "Atölye",
  "Panel / Söyleşi",
  "Doğa Yürüyüşü",
  "Eğitim",
  "Doğa",
  "Halk Buluşması",
  "Basın & Örgütlenme",
  "Yürüyüş",
  "Nöbet & Eylem",
] as const;

export function EventForm({ event }: { event?: DbEvent }) {
  const isEdit = Boolean(event);
  const [posterPreview, setPosterPreview] = useState<string | null>(
    event?.poster_url ?? null,
  );
  const [posterUrl, setPosterUrl] = useState<string | null>(
    event?.poster_url ?? null,
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handlePosterChange(file: File | undefined) {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Afiş en fazla 2MB olabilir.");
      return;
    }

    setError(null);
    setUploading(true);
    setPosterPreview(URL.createObjectURL(file));

    try {
      const url = await uploadPoster(file);
      setPosterUrl(url);
      setMessage("Afiş yüklendi.");
    } catch (e) {
      setPosterPreview(event?.poster_url ?? null);
      setPosterUrl(event?.poster_url ?? null);
      setError(e instanceof Error ? e.message : "Afiş yüklenemedi");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const form = e.currentTarget;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const formData = new FormData(form, submitter ?? undefined);

    if (posterUrl) {
      formData.set("poster_url", posterUrl);
    }

    const result = isEdit
      ? await updateEvent(event!.id, formData)
      : await createEvent(formData);

    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setMessage(
      isEdit
        ? `Güncellendi: /etkinlikler/${result.data.slug}`
        : `Kaydedildi: /etkinlikler/${result.data.slug}`,
    );

    if (!isEdit) {
      form.reset();
      setPosterPreview(null);
      setPosterUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const defaultDate = event?.event_date?.slice(0, 10) ?? "";
  const defaultTime = event?.event_time?.slice(0, 5) ?? "";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isEdit ? (
        <input type="hidden" name="slug" value={event!.slug} />
      ) : null}

      <div>
        <h3 className="font-display text-xl tracking-wide uppercase">
          {isEdit ? "Etkinliği düzenle" : "+ Yeni etkinlik"}
        </h3>
        <p className="mt-1 text-sm text-cream/60">
          {isEdit
            ? "Değişiklikleri kaydedin veya taslağa alın."
            : "Bilgileri doldurup yayınlayın veya taslak olarak saklayın."}
        </p>
        {isEdit ? (
          <Link
            href="/admin/etkinlikler"
            className="mt-2 inline-block text-sm text-leaf-green hover:underline"
          >
            ← Listeye dön
          </Link>
        ) : null}
      </div>

      <Field
        label="Etkinlik adı"
        name="title"
        required
        defaultValue={event?.title_plain}
        placeholder="örn. Munzur koruma yürüyüşü"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tarih" name="event_date" type="date" defaultValue={defaultDate} />
        <Field label="Saat" name="event_time" type="time" defaultValue={defaultTime} />
      </div>

      <Field
        label="Konum"
        name="location"
        defaultValue={event?.location ?? ""}
        placeholder="örn. Tunceli — Munzur Vadisi"
      />
      <Field
        label="Süre"
        name="duration"
        defaultValue={event?.duration ?? ""}
        placeholder="örn. 4 saat"
      />

      <div>
        <label htmlFor="category" className={adminLabelClass}>
          Kategori
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={event?.category ?? CATEGORIES[0]}
          className={adminSelectClass}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-forest-deep text-cream">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className={adminLabelClass}>
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={event?.description ?? ""}
          placeholder="Etkinlik detayları..."
          className={`${adminInputClass} resize-y`}
        />
      </div>

      <fieldset className="space-y-4 rounded-xl border border-cream/15 p-5">
        <legend className="px-1 font-display text-lg tracking-wide uppercase text-cream">
          İngilizce (isteğe bağlı)
        </legend>
        <p className="text-sm text-cream/50">
          Ziyaretçi sitede EN seçtiğinde bu metinler gösterilir. Boş bırakılırsa
          Türkçe sürüm kullanılır.
        </p>
        <Field
          label="Etkinlik adı (EN)"
          name="title_en"
          defaultValue={event?.title_en ?? ""}
        />
        <Field
          label="Kategori (EN)"
          name="category_en"
          defaultValue={event?.category_en ?? ""}
          placeholder="e.g. Field trip"
        />
        <Field
          label="Konum (EN)"
          name="location_en"
          defaultValue={event?.location_en ?? ""}
        />
        <Field
          label="Süre (EN)"
          name="duration_en"
          defaultValue={event?.duration_en ?? ""}
          placeholder="e.g. 4 hours"
        />
        <div>
          <label htmlFor="description_en" className={adminLabelClass}>
            Açıklama (EN)
          </label>
          <textarea
            id="description_en"
            name="description_en"
            rows={4}
            defaultValue={event?.description_en ?? ""}
            className={`${adminInputClass} resize-y`}
          />
        </div>
        <div>
          <label htmlFor="body_en" className={adminLabelClass}>
            Detay metni (EN) — her satır bir paragraf
          </label>
          <textarea
            id="body_en"
            name="body_en"
            rows={4}
            defaultValue={event?.body_en?.join("\n") ?? ""}
            className={`${adminInputClass} resize-y`}
          />
        </div>
      </fieldset>

      <div>
        <label htmlFor="poster" className={adminLabelClass}>
          Afiş görseli
        </label>
        <div
          className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            uploading ? "border-leaf-green/50 bg-leaf-green/5" : "border-cream/20 bg-cream/3"
          }`}
        >
          {posterPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterPreview}
              alt="Afiş önizleme"
              className="mx-auto mb-4 max-h-48 rounded-lg object-contain"
            />
          ) : (
            <div className="mb-3 text-2xl" aria-hidden>
              📎
            </div>
          )}
          <input
            ref={fileRef}
            id="poster"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-4 w-full text-sm text-cream/70 file:mr-4 file:rounded-lg file:border-0 file:bg-leaf-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
            onChange={(ev) => handlePosterChange(ev.target.files?.[0])}
            disabled={uploading}
          />
        </div>
      </div>

      <label className="flex cursor-pointer gap-3 rounded-lg border border-cream/10 bg-cream/3 p-4">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={event?.featured ?? !isEdit}
          className="mt-1 h-4 w-4 accent-leaf-green"
        />
        <span>
          <span className="block text-sm font-semibold text-cream">
            Anasayfa slaytında öne çıkar
          </span>
        </span>
      </label>

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

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          name="status"
          value="draft"
          disabled={saving || uploading}
          className={adminBtnSecondary}
        >
          Taslak
        </button>
        <button
          type="submit"
          name="status"
          value="published"
          disabled={saving || uploading}
          className={adminBtnPrimary}
        >
          {saving ? "Kaydediliyor…" : isEdit ? "Güncelle" : "Yayınla"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={adminLabelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={adminInputClass}
      />
    </div>
  );
}
