"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInAdmin } from "@/app/login/actions";
import { LogoMark } from "@/components/layout/LogoMark";

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized:
    "Bu hesap yönetim paneline erişemez. Supabase admin_users listesine ekleyin.",
  auth: "Oturum açılamadı. Lütfen tekrar deneyin.",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorKey = searchParams.get("error");
  const next = searchParams.get("next") ?? "/admin";

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const urlError = errorKey ? ERROR_MESSAGES[errorKey] : null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    const result = await signInAdmin(email, password, next);

    setLoading(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    router.push(result.redirectTo);
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-col bg-forest-deep text-cream">
      <div className="px-6 py-6">
        <Link
          href="/"
          className="text-sm text-cream/60 transition-colors hover:text-leaf-green"
        >
          ← Ana siteye dön
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="mb-10 flex justify-center">
            <LogoMark variant="centered" />
          </div>

          <div className="rounded-2xl border border-cream/10 bg-forest-deep/80 p-8 shadow-[0_24px_64px_rgba(0,0,0,0.35)] md:p-10">
            <h1 className="font-display text-2xl tracking-wide uppercase md:text-3xl">
              Yönetim paneli
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Supabase&apos;de tanımlı yönetici hesabınızla e-posta ve şifre ile
              giriş yapın.
            </p>

            {urlError ? (
              <p
                role="alert"
                className="mt-6 rounded-lg border border-terracotta/40 bg-terracotta/15 px-4 py-3 text-sm text-cream"
              >
                {urlError}
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold tracking-widest text-cream/60 uppercase"
                >
                  E-posta
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="munzurcevredernegi@gmail.com"
                  disabled={loading}
                  className="w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-leaf-green focus:ring-2 focus:ring-leaf-green/30 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold tracking-widest text-cream/60 uppercase"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-base text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-leaf-green focus:ring-2 focus:ring-leaf-green/30 disabled:opacity-60"
                />
              </div>

              {formError ? (
                <p role="alert" className="text-sm text-terracotta">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-leaf-green px-4 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-leaf-green/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Giriş yapılıyor…" : "Giriş yap"}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs text-cream/45">
            Munzur Çevre Derneği · Yalnızca yetkili kullanıcılar
          </p>
        </div>
      </div>
    </div>
  );
}
