"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteFieldGalleryPhoto,
  moveFieldGalleryPhoto,
} from "@/app/admin/saha/actions";
import {
  adminBtnDanger,
  adminBtnMuted,
} from "@/components/admin/admin-styles";
import type { DbFieldGalleryPhoto } from "@/lib/field-gallery-db";

const SLOT_NAMES = [
  "Büyük kart",
  "Sağ üst",
  "Sağ üst 2",
  "Sağ alt",
  "Sağ alt 2",
];

export function FieldGalleryList({ photos }: { photos: DbFieldGalleryPhoto[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error ?? "İşlem başarısız");
        return;
      }
      router.refresh();
    });
  }

  if (photos.length === 0) {
    return (
      <p className="mt-6 text-sm text-cream/50">
        Henüz veritabanında görsel yok — soldan ekleyin veya{" "}
        <code className="text-cream/70">field-gallery.sql</code> çalıştırın.
        Tablo boşsa sitede varsayılan /photos görselleri görünür.
      </p>
    );
  }

  return (
    <>
      {error ? (
        <p className="mb-4 text-sm text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="mt-6 space-y-3">
        {photos.map((photo, index) => (
          <li
            key={photo.id}
            className="flex flex-col gap-3 rounded-xl border border-cream/10 bg-cream/3 p-4 sm:flex-row sm:items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.image_url}
              alt=""
              className="h-20 w-28 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold tracking-widest text-leaf-green uppercase">
                {SLOT_NAMES[photo.sort_order] ?? `Konum ${photo.sort_order + 1}`}
              </div>
              <div className="mt-1 truncate text-sm font-semibold text-cream">
                {photo.caption || photo.alt}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending || index === 0}
                onClick={() => run(() => moveFieldGalleryPhoto(photo.id, "up"))}
                className={adminBtnMuted}
              >
                ↑
              </button>
              <button
                type="button"
                disabled={pending || index === photos.length - 1}
                onClick={() =>
                  run(() => moveFieldGalleryPhoto(photo.id, "down"))
                }
                className={adminBtnMuted}
              >
                ↓
              </button>
              <Link
                href={`/admin/saha/${photo.id}`}
                className="rounded-lg border border-cream/20 px-3 py-1.5 text-xs font-semibold text-cream no-underline hover:bg-cream/8"
              >
                Düzenle
              </Link>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (!confirm("Bu görsel silinsin mi?")) return;
                  run(() => deleteFieldGalleryPhoto(photo.id));
                }}
                className={adminBtnDanger}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
