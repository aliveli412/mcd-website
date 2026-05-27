import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedAdmin } from "@/lib/admin/check-admin";
import { isAdminAuthBypassed } from "@/lib/admin/dev-bypass";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";
import {
  LOCALE_COOKIE,
  LOCALE_QUERY,
  parseLocale,
} from "@/lib/i18n/locale-constants";

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie.name, cookie.value);
  });
}

const LOCALE_HEADER = "x-mcd-locale";

function localeFromQuery(request: NextRequest): "tr" | "en" | null {
  const fromQuery = request.nextUrl.searchParams.get(LOCALE_QUERY);
  if (fromQuery === "en" || fromQuery === "tr") return fromQuery;
  return null;
}

function resolveLocale(request: NextRequest): "tr" | "en" {
  return localeFromQuery(request) ?? parseLocale(request.cookies.get(LOCALE_COOKIE)?.value);
}

function applyLocale(
  response: NextResponse,
  request: NextRequest,
  locale: "tr" | "en",
) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
}

export async function middleware(request: NextRequest) {
  const localeFromUrl = localeFromQuery(request);
  const locale = resolveLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  let supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (localeFromUrl) {
    applyLocale(supabaseResponse, request, localeFromUrl);
  }

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
          supabaseResponse = NextResponse.next({
            request: { headers: requestHeaders },
          });
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
      if (localeFromUrl) applyLocale(redirectResponse, request, localeFromUrl);
      return redirectResponse;
    }

    if (!(await isAllowedAdmin(user))) {
      await supabase.auth.signOut();
      loginUrl.searchParams.set("error", "unauthorized");
      const redirectResponse = NextResponse.redirect(loginUrl);
      copyCookies(supabaseResponse, redirectResponse);
      if (localeFromUrl) applyLocale(redirectResponse, request, localeFromUrl);
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
