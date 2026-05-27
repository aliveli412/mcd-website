import { NewsForm } from "@/components/admin/NewsForm";
import { NewsList } from "@/components/admin/NewsList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { normalizeDbNews } from "@/lib/news-db";
import { supabaseAdmin } from "@/lib/supabase/server";

export const metadata = { title: "Haberler" };

export default async function AdminNewsPage() {
  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (data ?? []).map((row) =>
    normalizeDbNews(row as Record<string, unknown>),
  );

  return (
    <div>
      <AdminPageHeader
        title="Haberler"
        description="Basın duyuruları ve dernek haberlerini yönetin."
      />

      {error ? (
        <p className="mb-8 rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          Veritabanı hatası: {error.message}.{" "}
          <code className="text-xs">docs/supabase/news.sql</code> dosyasını
          çalıştırdınız mı?
        </p>
      ) : null}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className={adminCardClass}>
          <NewsForm />
        </div>
        <div className={adminCardClass}>
          <h3 className="font-display text-lg tracking-wide uppercase">
            Tüm haberler ({list.length})
          </h3>
          <NewsList articles={list} />
        </div>
      </div>
    </div>
  );
}
