"use client";

import { useTransition } from "react";
import { signOutAdmin } from "@/app/admin/actions";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => signOutAdmin())}
      className="cursor-pointer rounded-lg border border-cream/20 px-3 py-1.5 text-sm text-cream/70 transition-colors hover:border-cream/40 hover:text-cream disabled:opacity-50"
    >
      {pending ? "Çıkış…" : "Çıkış"}
    </button>
  );
}
