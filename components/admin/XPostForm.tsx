"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createXPost } from "@/app/admin/x/actions";
import {
  adminBtnPrimary,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";

export function XPostForm({ nextSortOrder }: { nextSortOrder: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createXPost(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      e.currentTarget.reset();
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display text-lg tracking-wide uppercase">Gönderi ekle</h3>
      <p className="text-sm text-cream/60">
        X&apos;te gönderiye gidin → Paylaş → Bağlantıyı kopyala → buraya yapıştırın.
      </p>

      <div>
        <label htmlFor="tweet_url" className={adminLabelClass}>
          Gönderi bağlantısı
        </label>
        <input
          id="tweet_url"
          name="tweet_url"
          type="url"
          required
          placeholder="https://x.com/munzurcevre2/status/..."
          className={adminInputClass}
          disabled={pending}
        />
      </div>

      <div>
        <label htmlFor="sort_order" className={adminLabelClass}>
          Sıra (küçük önce)
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          min={0}
          defaultValue={nextSortOrder}
          className={adminInputClass}
          disabled={pending}
        />
      </div>

      {error ? (
        <p className="text-sm text-terracotta" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={adminBtnPrimary}>
        {pending ? "Ekleniyor…" : "Ekle"}
      </button>
    </form>
  );
}
