"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export async function signOutAdmin() {
  await requireAdmin();
  const supabase = await createAuthServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
