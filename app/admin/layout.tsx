import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { isAdminAuthBypassed } from "@/lib/admin/dev-bypass";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bypass = isAdminAuthBypassed();
  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = bypass ? { data: { user: null } } : await supabase.auth.getUser();
  const displayEmail =
    user?.email ?? process.env.ADMIN_EMAIL?.trim() ?? "dev@localhost";

  return (
    <div className="min-h-full bg-ink text-cream">
      {bypass ? (
        <div className="border-b border-amber-500/40 bg-amber-500/15 px-6 py-2 text-center text-xs text-amber-100">
          Geliştirme modu — giriş atlandı. Canlıda{" "}
          <code className="text-amber-50">npm run build</code> ile auth zorunlu.
        </div>
      ) : null}
      <header className="border-b border-cream/10 bg-forest-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/admin"
              className="font-display text-lg tracking-wide text-cream uppercase no-underline hover:text-leaf-green"
            >
              MCD Admin
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-cream/45 transition-colors hover:text-leaf-green"
            >
              Siteyi aç ↗
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-cream/55">{displayEmail}</span>
            {bypass ? null : <SignOutButton />}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-4">
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
