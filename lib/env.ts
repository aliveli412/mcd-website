/** .env satırındaki tırnak, yorum veya yapıştırma artığını temizler. */
export function cleanEnv(value: string | undefined): string {
  if (!value) return "";
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  const hash = v.indexOf("#");
  if (hash > 0) v = v.slice(0, hash).trim();
  return v;
}

/** Supabase JWT anahtarından yalnızca geçerli token kısmını alır. */
export function extractSupabaseKey(value: string | undefined): string {
  const cleaned = cleanEnv(value);
  const match = cleaned.match(
    /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
  );
  return match?.[0] ?? cleaned;
}

export function getSupabaseUrl(): string {
  const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (url && !url.includes("supabase.co")) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL hatalı: Supabase proje adresi olmalı (https://xxxx.supabase.co), şu an:",
      url,
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  return extractSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseServiceRoleKey(): string {
  return extractSupabaseKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
