"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteEvent,
  setEventStatus,
} from "@/app/admin/etkinlikler/actions";
import {
  adminBtnDanger,
  adminBtnMuted,
  adminBtnPrimary,
} from "@/components/admin/admin-styles";
import type { DbEvent } from "@/lib/events-db";

const btnPrimary = `${adminBtnPrimary} !px-3 !py-1.5 !text-xs`;
const btnMuted = adminBtnMuted;
const btnDanger = adminBtnDanger;

export function EventList({ events }: { events: DbEvent[] }) {
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

  if (events.length === 0) {
    return <p className="mt-6 text-sm text-cream/50">Henüz kayıt yok.</p>;
  }

  return (
    <>
      {error ? (
        <p className="mb-4 text-sm text-terracotta" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="mt-6 space-y-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex flex-col gap-3 rounded-xl border border-cream/10 bg-cream/3 p-4 sm:flex-row sm:items-start"
          >
            <div className="flex min-w-0 flex-1 gap-4">
              {event.poster_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.poster_url}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-leaf-green to-river-blue text-xs font-display text-cream">
                  MCD
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-cream">
                  {event.title_plain}
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-cream/50">
                  <span
                    className={
                      event.status === "published"
                        ? "text-leaf-green"
                        : "text-cream/40"
                    }
                  >
                    {event.status === "published" ? "Yayında" : "Taslak"}
                  </span>
                  {event.featured ? (
                    <span className="text-river-blue">Slider</span>
                  ) : null}
                  <span>{event.category}</span>
                </div>
                <Link
                  href={`/etkinlikler/${event.slug}`}
                  className="mt-2 inline-block text-xs text-leaf-green hover:underline"
                  target="_blank"
                >
                  Sitede gör →
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
              <Link
                href={`/admin/etkinlikler/${event.id}`}
                className="rounded-lg border border-cream/20 px-3 py-1.5 text-center text-xs font-semibold text-cream no-underline hover:bg-cream/8"
              >
                Düzenle
              </Link>
              {event.status === "published" ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    run(() => setEventStatus(event.id, "draft"))
                  }
                  className={btnMuted}
                >
                  Taslağa al
                </button>
              ) : (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    run(() => setEventStatus(event.id, "published"))
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
                  if (
                    !confirm(
                      `"${event.title_plain}" silinsin mi? Bu işlem geri alınamaz.`,
                    )
                  ) {
                    return;
                  }
                  run(() => deleteEvent(event.id));
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
