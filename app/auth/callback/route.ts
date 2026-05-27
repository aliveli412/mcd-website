import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isAllowedAdmin } from "@/lib/admin/check-admin";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  let next = searchParams.get("next") ?? "/admin";

  if (!next.startsWith("/")) {
    next = "/admin";
  }

  const authError = searchParams.get("error_description") ?? searchParams.get("error");
  if (authError) {
    if (process.env.NODE_ENV === "development") {
      console.error("[auth/callback] Supabase redirect error:", authError);
    }
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  if (code || (tokenHash && type)) {
    const supabase = await createAuthServerClient();

    const { error } = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({
          type: type as EmailOtpType,
          token_hash: tokenHash!,
        });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && (await isAllowedAdmin(user))) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/login?error=unauthorized`);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("[auth/callback] Session error:", error.message);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
