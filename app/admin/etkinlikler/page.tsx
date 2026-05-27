import { EventForm } from "@/components/admin/EventForm";
import { EventList } from "@/components/admin/EventList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { normalizeDbEvent } from "@/lib/data/normalize-event";
import type { DbEvent } from "@/lib/events-db";
import { supabaseAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Etkinlikler" };

export default async function AdminEventsPage() {
  const { data: events, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (events ?? []).map((row) =>
    normalizeDbEvent(row as Record<string, unknown>),
  ) as DbEvent[];

  return (
    <div>
      <AdminPageHeader
        title="Etkinlikler"
        description="Yeni etkinlik ekleyin, yayınlayın veya düzenleyin."
      />

      {error ? (
        <p className="mb-8 rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          Veritabanı hatası: {error.message}.{" "}
          <code className="text-xs">docs/supabase/events.sql</code> dosyasını
          Supabase SQL Editor&apos;da çalıştırdınız mı?
        </p>
      ) : null}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className={adminCardClass}>
          <EventForm />
        </div>
        <div className={adminCardClass}>
          <h3 className="font-display text-lg tracking-wide uppercase">
            Tüm etkinlikler ({list.length})
          </h3>
          <EventList events={list} />
        </div>
      </div>
    </div>
  );
}
