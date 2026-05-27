"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/app/actions/set-locale";
import { useLocale } from "@/components/site/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/locale-url";

const styles = {
  header: {
    group:
      "inline-flex rounded-full border border-cream/35 bg-cream/10 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    active:
      "bg-leaf-green text-cream shadow-sm ring-1 ring-leaf-green/40",
    inactive:
      "text-cream/90 hover:bg-cream/15 hover:text-cream active:bg-cream/20",
  },
  mobile: {
    group:
      "inline-flex w-full max-w-[200px] rounded-full border border-forest-dark/12 bg-bone p-1",
    active: "bg-forest-dark text-cream shadow-sm",
    inactive:
      "text-forest-dark/75 hover:bg-forest-dark/8 hover:text-forest-dark active:bg-forest-dark/12",
  },
} as const;

export function LocaleSwitcher({
  className = "",
  variant = "header",
}: {
  className?: string;
  variant?: keyof typeof styles;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, t } = useLocale();
  const [pending, startTransition] = useTransition();
  const s = styles[variant];

  function switchTo(next: Locale) {
    if (next === locale || pending) return;

    const href = localizedPath(pathname, next, searchParams);

    startTransition(async () => {
      await setLocale(next);
      router.replace(href);
      router.refresh();
    });
  }

  function btnClass(active: boolean) {
    return [
      "min-w-[2.75rem] cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-green",
      "disabled:cursor-wait disabled:opacity-60",
      active ? s.active : s.inactive,
    ].join(" ");
  }

  return (
    <div
      className={`${s.group} ${className}`.trim()}
      role="group"
      aria-label={t.localeSwitcherAria}
    >
      <button
        type="button"
        disabled={pending}
        onClick={() => switchTo("tr")}
        className={btnClass(locale === "tr")}
        aria-current={locale === "tr" ? "true" : undefined}
      >
        {t.localeSwitchTr}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => switchTo("en")}
        className={btnClass(locale === "en")}
        aria-current={locale === "en" ? "true" : undefined}
      >
        {t.localeSwitchEn}
      </button>
    </div>
  );
}
