import { unstable_noStore as noStore } from "next/cache";
import { normalizeDbXPost, type DbXPost } from "@/lib/x-posts";
import { supabaseAdmin } from "@/lib/supabase/server";

const HOMEPAGE_LIMIT = 6;

function isTableMissing(error: { code?: string; message?: string }): boolean {
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();
  if (code === "42P01" || code === "PGRST205") return true;
  return (
    msg.includes("x_posts") &&
    (msg.includes("schema cache") ||
      msg.includes("could not find the table") ||
      msg.includes("does not exist"))
  );
}

export async function getPublishedXPosts(
  limit = HOMEPAGE_LIMIT,
): Promise<DbXPost[]> {
  noStore();

  const { data, error } = await supabaseAdmin
    .from("x_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit + 10);

  if (error) {
    if (!isTableMissing(error)) {
      console.error("getPublishedXPosts:", error.code, error.message);
    }
    return [];
  }

  return (data ?? [])
    .map((row) => normalizeDbXPost(row as Record<string, unknown>))
    .filter((post) => post.status === "published")
    .slice(0, limit);
}

export async function getXPostsAdmin(): Promise<DbXPost[]> {
  const { data, error } = await supabaseAdmin
    .from("x_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (!isTableMissing(error)) {
      throw error;
    }
    return [];
  }

  return (data ?? []).map((row) =>
    normalizeDbXPost(row as Record<string, unknown>),
  );
}
