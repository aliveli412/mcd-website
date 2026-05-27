"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { createNews, updateNews } from "@/app/admin/haberler/actions";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
} from "@/components/admin/admin-styles";
import { NEWS_GRADIENT_OPTIONS, type DbNews } from "@/lib/news-db";
import { uploadPoster } from "@/lib/storage/upload-poster";

export function NewsForm({ article }: { article?: DbNews }) {
  const isEdit = Boolean(article);
  const [imagePreview, setImagePreview] = useState<string | null>(
    article?.image_url ?? null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(
    article?.image_url ?? null,
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<ReactNode>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
      setMessage(
        <>
          Görsel yüklendi.{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="break-all underline"
          >
            Bağlantıyı test et
          </a>
        </>,
      );
    } catch (e) {
      setImagePreview(article?.image_url ?? null);
      setImageUrl(article?.image_url ?? null);
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

    const form = e.currentTarget;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const formData = new FormData(form, submitter ?? undefined);
    const savedImageUrl = imageUrl?.trim() || null;

    const result = isEdit
      ? await updateNews(article!.id, formData, savedImageUrl)
      : await createNews(formData, savedImageUrl);

    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    const imageNote = result.data.imageUrl
      ? " Kapak görseli kaydedildi."
      : " Uyarı: kapak görseli URL’si boş — önce yükleyip sonra Yayınla’ya basın.";
    setMessage(
      (isEdit
        ? `Güncellendi: /haberler/${result.data.slug}`
        : `Kaydedildi: /haberler/${result.data.slug}`) + imageNote,
    );

    if (!isEdit) {
      form.reset();
      setImagePreview(null);
      setImageUrl(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isEdit ? <input type="hidden" name="slug" value={article!.slug} /> : null}

      <div>
        <h3 className="font-display text-xl tracking-wide uppercase">
          {isEdit ? "Haberi düzenle" : "+ Yeni haber"}
        </h3>
        {isEdit ? (
          <Link
            href="/admin/haberler"
            className="mt-2 inline-block text-sm text-leaf-green hover:underline"
          >
            ← Listeye dön
          </Link>
        ) : null}
      </div>

      <Field label="Başlık" name="title" required defaultValue={article?.title} />
      <Field label="Etiket (üst kategori)" name="tag" required defaultValue={article?.tag} placeholder="örn. HALK BULUŞMASI" />

      <div>
        <label htmlFor="excerpt" className={adminLabelClass}>
          Özet
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={article?.excerpt ?? ""}
          className={`${adminInputClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="body" className={adminLabelClass}>
          Metin (her satır bir paragraf)
        </label>
        <textarea
          id="body"
          name="body"
          rows={8}
          defaultValue={article?.body?.join("\n") ?? ""}
          placeholder="Her paragrafı ayrı satıra yazın..."
          className={`${adminInputClass} resize-y`}
        />
      </div>

      <fieldset className="space-y-4 rounded-xl border border-cream/15 bg-cream/3 p-5">
        <legend className="px-1 font-display text-sm tracking-widest text-leaf-green uppercase">
          İngilizce (isteğe bağlı)
        </legend>
        <p className="text-sm text-cream/50">
          Ziyaretçi sitede EN seçtiğinde bu metinler gösterilir. Boş bırakılırsa
          Türkçe sürüm kullanılır.
        </p>
        <Field
          label="Başlık (EN)"
          name="title_en"
          defaultValue={article?.title_en ?? ""}
        />
        <Field
          label="Etiket (EN)"
          name="tag_en"
          defaultValue={article?.tag_en ?? ""}
          placeholder="e.g. PRESS RELEASE"
        />
        <div>
          <label htmlFor="excerpt_en" className={adminLabelClass}>
            Özet (EN)
          </label>
          <textarea
            id="excerpt_en"
            name="excerpt_en"
            rows={3}
            defaultValue={article?.excerpt_en ?? ""}
            className={`${adminInputClass} resize-y`}
          />
        </div>
        <div>
          <label htmlFor="body_en" className={adminLabelClass}>
            Metin (EN) — her satır bir paragraf
          </label>
          <textarea
            id="body_en"
            name="body_en"
            rows={6}
            defaultValue={article?.body_en?.join("\n") ?? ""}
            className={`${adminInputClass} resize-y`}
          />
        </div>
      </fieldset>

      <input type="hidden" name="image_url" value={imageUrl ?? ""} readOnly />

      <div>
        <label htmlFor="image_url_display" className={adminLabelClass}>
          Kapak görseli URL
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
          placeholder="/news/ornek.jpg veya https://..."
          className={adminInputClass}
        />
      </div>

      <div>
        <label htmlFor="cover" className={adminLabelClass}>
          veya görsel yükle
        </label>
        <div className="rounded-xl border border-dashed border-cream/20 bg-cream/3 p-4">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt=""
              className="mb-3 max-h-40 rounded-lg object-contain"
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
        <label htmlFor="gradient" className={adminLabelClass}>
          Kart rengi
        </label>
        <select
          id="gradient"
          name="gradient"
          defaultValue={
            article?.gradient ?? NEWS_GRADIENT_OPTIONS[0].value
          }
          className={adminSelectClass}
        >
          {NEWS_GRADIENT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value} className="bg-forest-deep text-cream">
              {label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-cream/50">
        Yayın tarihi, &quot;Yayınla&quot; dediğiniz günün tarihi olarak otomatik
        atanır.
        {article?.published_at ? (
          <>
            {" "}
            Mevcut:{" "}
            {new Date(article.published_at).toLocaleDateString("tr-TR", {
              timeZone: "Europe/Istanbul",
            })}
          </>
        ) : null}
      </p>

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

      <div className="flex flex-wrap gap-3">
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
