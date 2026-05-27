import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedAdmin } from "@/lib/admin/check-admin";
import { isAdminAuthBypassed } from "@/lib/admin/dev-bypass";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie.name, cookie.value);
  });
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !isAdminAuthBypassed()
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";

    if (!user) {
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      copyCookies(supabaseResponse, redirectResponse);
      return redirectResponse;
    }

    if (!(await isAllowedAdmin(user))) {
      await supabase.auth.signOut();
      loginUrl.searchParams.set("error", "unauthorized");
      const redirectResponse = NextResponse.redirect(loginUrl);
      copyCookies(supabaseResponse, redirectResponse);
      return redirectResponse;
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
