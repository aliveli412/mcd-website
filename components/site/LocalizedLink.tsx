"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/site/LocaleProvider";
import { localizedPath } from "@/lib/i18n/locale-url";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { locale } = useLocale();
  const path = href.startsWith("/") ? localizedPath(href, locale) : href;
  return <Link href={path} {...props} />;
}
