"use server";

import { isAllowedAdmin } from "@/lib/admin/check-admin";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export type SignInResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string };

export async function signInAdmin(
  email: string,
  password: string,
  nextPath: string,
): Promise<SignInResult> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || !password) {
    return { ok: false, error: "E-posta ve şifre gerekli." };
  }

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    return { ok: false, error: "Supabase ayarları eksik (.env.local)." };
  }

  const safeNext = nextPath.startsWith("/") ? nextPath : "/admin";
  const supabase = await createAuthServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: trimmedEmail,
    password,
  });

  if (error) {
    const message =
      error.message === "Invalid login credentials"
        ? "E-posta veya şifre hatalı."
        : error.message;
    return { ok: false, error: message };
  }

  if (!data.user || !(await isAllowedAdmin(data.user))) {
    await supabase.auth.signOut();
    return {
      ok: false,
      error:
        "Bu hesap yönetim paneline yetkili değil. Supabase admin_users listesine eklenmeli.",
    };
  }

  return { ok: true, redirectTo: safeNext };
}
