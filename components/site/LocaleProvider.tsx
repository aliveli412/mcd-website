"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locale";
import { getMessages, type Messages } from "@/lib/i18n/messages";
import { getSiteContent, type SiteContent } from "@/lib/i18n/site-content";

const LocaleContext = createContext<{
  locale: Locale;
  t: Messages;
  site: SiteContent;
} | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider
      value={{ locale, t: getMessages(locale), site: getSiteContent(locale) }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
