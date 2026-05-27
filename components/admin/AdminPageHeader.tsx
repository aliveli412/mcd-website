import Link from "next/link";
import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  backHref = "/admin",
  backLabel = "← Panel",
  action,
}: {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string | null;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        {backLabel ? (
          <Link
            href={backHref}
            className="text-sm text-cream/50 transition-colors hover:text-leaf-green"
          >
            {backLabel}
          </Link>
        ) : null}
        <h1
          className={`font-display text-3xl tracking-wide text-cream uppercase ${backLabel ? "mt-2" : ""}`}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-cream/60">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
