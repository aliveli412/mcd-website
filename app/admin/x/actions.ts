"use server";

import type { ActionResult } from "@/lib/admin/action-result";
import { requireAdmin } from "@/lib/admin/require-admin";
import { revalidateXPosts } from "@/lib/admin/revalidate";
import { parseTweetIdFromUrl } from "@/lib/x-posts";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function createXPost(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const url = (formData.get("tweet_url") as string)?.trim();
    const sortOrder = Number(formData.get("sort_order") ?? 0);
    const tweetId = parseTweetIdFromUrl(url);

    if (!tweetId || !url) {
      return {
        ok: false,
        error: "Geçerli bir X gönderi bağlantısı girin (x.com/.../status/...).",
      };
    }

    const { error } = await supabaseAdmin.from("x_posts").insert({
      tweet_id: tweetId,
      tweet_url: url,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      status: "published",
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Bu gönderi zaten listede." };
      }
      throw error;
    }

    revalidateXPosts();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Gönderi eklenemedi",
    };
  }
}

export async function deleteXPost(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();

    const { error } = await supabaseAdmin.from("x_posts").delete().eq("id", id);
    if (error) throw error;

    revalidateXPosts();
    return { ok: true, data: undefined };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Gönderi silinemedi",
    };
  }
}
