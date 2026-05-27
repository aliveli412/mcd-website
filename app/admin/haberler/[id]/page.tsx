import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { normalizeDbNews } from "@/lib/news-db";
import { supabaseAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Haber düzenle" };

export default async function AdminNewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const article = normalizeDbNews(data as Record<string, unknown>);

  return (
    <div>
      <AdminPageHeader
        title={article.title}
        description="Haber içeriğini güncelleyin."
        backHref="/admin/haberler"
      />
      <div className={`${adminCardClass} max-w-2xl`}>
        <NewsForm article={article} />
      </div>
    </div>
  );
}
