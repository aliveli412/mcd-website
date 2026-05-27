import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

export function createClient() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}

/** @deprecated createClient kullanın */
export const supabase = createClient();
