"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteXPost } from "@/app/admin/x/actions";
import { adminBtnDanger } from "@/components/admin/admin-styles";
import type { DbXPost } from "@/lib/x-posts";

export function XPostList({ posts }: { posts: DbXPost[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (posts.length === 0) {
    return (
      <p className="mt-6 text-sm text-cream/50">
        Henüz gönderi yok. Soldan X bağlantısı ekleyin; ana sayfada görünür.
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
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cream/10 bg-cream/3 p-4"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-widest text-leaf-green uppercase">
                Sıra {post.sort_order}
              </p>
              <a
                href={post.tweet_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-sm text-cream/85 hover:text-leaf-green"
              >
                {post.tweet_url}
              </a>
            </div>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setError(null);
                startTransition(async () => {
                  const result = await deleteXPost(post.id);
                  if (!result.ok) {
                    setError(result.error);
                    return;
                  }
                  router.refresh();
                });
              }}
              className={adminBtnDanger}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
