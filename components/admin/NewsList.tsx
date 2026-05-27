"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteNews, setNewsStatus } from "@/app/admin/haberler/actions";
import {
  adminBtnDanger,
  adminBtnMuted,
  adminBtnPrimary,
} from "@/components/admin/admin-styles";
import type { DbNews } from "@/lib/news-db";

const btnPrimary = `${adminBtnPrimary} !px-3 !py-1.5 !text-xs`;
const btnMuted = adminBtnMuted;
const btnDanger = adminBtnDanger;

export function NewsList({ articles }: { articles: DbNews[] }) {
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

  if (articles.length === 0) {
    return <p className="mt-6 text-sm text-cream/50">Henüz haber yok.</p>;
  }

  return (
    <>
      {error ? (
        <p className="mb-4 text-sm text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="mt-6 space-y-3">
        {articles.map((article) => (
          <li
            key={article.id}
            className="flex flex-col gap-3 rounded-xl border border-cream/10 bg-cream/3 p-4 sm:flex-row sm:items-start"
          >
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold tracking-widest text-leaf-green uppercase">
                {article.tag}
              </div>
              <div className="mt-1 font-semibold text-cream">{article.title}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-cream/50">
                <span
                  className={
                    article.status === "published"
                      ? "text-leaf-green"
                      : "text-cream/40"
                  }
                >
                  {article.status === "published" ? "Yayında" : "Taslak"}
                </span>
                {article.published_at ? (
                  <span>
                    {new Date(article.published_at).toLocaleDateString("tr-TR")}
                  </span>
                ) : null}
                {article.title_en?.trim() ? (
                  <span className="rounded bg-leaf-green/20 px-1.5 py-0.5 font-semibold text-leaf-green">
                    EN
                  </span>
                ) : null}
              </div>
              <Link
                href={`/haberler/${article.slug}`}
                target="_blank"
                className="mt-2 inline-block text-xs text-leaf-green hover:underline"
              >
                Sitede gör →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-col">
              <Link
                href={`/admin/haberler/${article.id}`}
                className="rounded-lg border border-cream/20 px-3 py-1.5 text-center text-xs font-semibold text-cream no-underline hover:bg-cream/8"
              >
                Düzenle
              </Link>
              {article.status === "published" ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => run(() => setNewsStatus(article.id, "draft"))}
                  className={btnMuted}
                >
                  Taslağa al
                </button>
              ) : (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    run(() => setNewsStatus(article.id, "published"))
                  }
                  className={btnPrimary}
                >
                  Yayınla
                </button>
              )}
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (!confirm(`"${article.title}" silinsin mi?`)) return;
                  run(() => deleteNews(article.id));
                }}
                className={btnDanger}
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
