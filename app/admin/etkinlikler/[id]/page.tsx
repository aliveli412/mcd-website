import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { normalizeDbEvent } from "@/lib/data/normalize-event";
import { supabaseAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Etkinlik düzenle" };

export default async function AdminEventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const event = normalizeDbEvent(data as Record<string, unknown>);

  return (
    <div>
      <AdminPageHeader
        title={event.title_plain}
        description="Etkinlik bilgilerini güncelleyin."
        backHref="/admin/etkinlikler"
      />
      <div className={`${adminCardClass} max-w-2xl`}>
        <EventForm event={event} />
      </div>
    </div>
  );
}
