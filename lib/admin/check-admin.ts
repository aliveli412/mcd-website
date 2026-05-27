import type { User } from "@supabase/supabase-js";
import { isAdminEmailLegacy } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/** Supabase Auth oturumu + admin_users tablosu (yoksa ADMIN_EMAIL yedek). */
export async function isAllowedAdmin(user: Pick<User, "id" | "email">): Promise<boolean> {
  if (!user.id || !user.email) return false;

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    if (error.code !== "42P01") {
      console.error("isAllowedAdmin:", error.message);
    }
    return isAdminEmailLegacy(user.email);
  }

  if (data) return true;
  return isAdminEmailLegacy(user.email);
}
