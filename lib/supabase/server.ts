import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/env";

const url = getSupabaseUrl();
const serviceKey = getSupabaseServiceRoleKey();

if (!url || !serviceKey) {
  console.warn(
    "Supabase: NEXT_PUBLIC_SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik/hatalı (.env.local)",
  );
}

export const supabaseAdmin = createClient(
  url || "https://placeholder.supabase.co",
  serviceKey || "placeholder",
  { auth: { persistSession: false } },
);
