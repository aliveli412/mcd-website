import { XPostForm } from "@/components/admin/XPostForm";
import { XPostList } from "@/components/admin/XPostList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminCardClass } from "@/components/admin/admin-styles";
import { getXPostsAdmin } from "@/lib/data/x-posts";

export const metadata = { title: "X paylaşımları" };

export default async function AdminXPostsPage() {
  const list = await getXPostsAdmin();
  const nextSortOrder =
    list.length === 0 ? 0 : Math.max(...list.map((p) => p.sort_order)) + 1;

  return (
    <div>
      <AdminPageHeader
        title="X paylaşımları"
        description="Ana sayfadaki X bölümünde gösterilecek gönderi bağlantılarını yönetin."
      />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className={adminCardClass}>
          <XPostForm nextSortOrder={nextSortOrder} />
        </div>
        <div className={adminCardClass}>
          <h3 className="font-display text-lg tracking-wide uppercase">
            Liste ({list.length})
          </h3>
          <XPostList posts={list} />
        </div>
      </div>
    </div>
  );
}
