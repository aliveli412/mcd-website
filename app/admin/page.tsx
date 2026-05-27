import Link from "next/link";
import { redirect } from "next/navigation";
import { adminCardClass } from "@/components/admin/admin-styles";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import { supabaseAdmin } from "@/lib/supabase/server";

type AdminPageProps = {
  searchParams: Promise<{ code?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { code } = await searchParams;
  if (code) {
    redirect(`/auth/callback?code=${code}&next=/admin`);
  }

  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [eventsRes, newsRes, publishedEvents, publishedNews] = await Promise.all([
    supabaseAdmin.from("events").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("news").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabaseAdmin
      .from("news")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
  ]);

  const stats = [
    {
      label: "Etkinlikler",
      total: eventsRes.count ?? 0,
      published: publishedEvents.count ?? 0,
      href: "/admin/etkinlikler",
    },
    {
      label: "Haberler",
      total: newsRes.count ?? 0,
      published: publishedNews.count ?? 0,
      href: "/admin/haberler",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Yönetim paneli"
        description={`Hoş geldin${user?.email ? `, ${user.email}` : ""}. İçerikleri buradan yönetebilirsin.`}
        backHref="/admin"
        backLabel=""
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {stats.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${adminCardClass} block no-underline transition-colors hover:border-leaf-green/30`}
          >
            <p className="text-xs font-bold tracking-widest text-leaf-green uppercase">
              {item.label}
            </p>
            <p className="mt-3 font-display text-4xl text-cream">{item.total}</p>
            <p className="mt-2 text-sm text-cream/55">
              {item.published} yayında · {item.total - item.published} taslak
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-leaf-green">
              Yönet →
            </span>
          </Link>
        ))}
      </div>

      <div className={`${adminCardClass} mt-6`}>
        <h2 className="font-display text-lg tracking-wide uppercase">Hızlı işlemler</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link
              href="/admin/etkinlikler"
              className="inline-flex rounded-lg bg-leaf-green px-4 py-2.5 text-sm font-semibold text-cream no-underline hover:bg-leaf-green/90"
            >
              + Etkinlik ekle
            </Link>
          </li>
          <li>
            <Link
              href="/admin/haberler"
              className="inline-flex rounded-lg border border-cream/20 px-4 py-2.5 text-sm font-semibold text-cream no-underline hover:bg-cream/8"
            >
              + Haber ekle
            </Link>
          </li>
          <li>
            <Link
              href="/admin/saha"
              className="inline-flex rounded-lg border border-cream/20 px-4 py-2.5 text-sm font-semibold text-cream no-underline hover:bg-cream/8"
            >
              Saha galerisi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
