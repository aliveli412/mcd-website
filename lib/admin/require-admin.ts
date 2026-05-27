import type { User } from "@supabase/supabase-js";
import { createAuthServerClient } from "@/lib/supabase/auth-server";
import { isAllowedAdmin } from "@/lib/admin/check-admin";
import { isAdminAuthBypassed } from "@/lib/admin/dev-bypass";

function devBypassUser(): User {
  const email = process.env.ADMIN_EMAIL?.trim() || "dev@localhost";
  return {
    id: "dev-bypass",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email,
  } as User;
}

export async function requireAdmin() {
  if (isAdminAuthBypassed()) {
    return devBypassUser();
  }

  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await isAllowedAdmin(user))) {
    throw new Error("Yetkisiz erişim");
  }

  return user;
}
