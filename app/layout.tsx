import type { Metadata } from "next";
import { Anton, DM_Sans, Caveat, Fraunces } from "next/font/google";
import { getLocale } from "@/lib/i18n/locale";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Munzur Çevre Derneği",
    template: "%s — Munzur Çevre Derneği",
  },
  description:
    "2003'ten beri Türkiye'nin her yerinde doğa ve özgür yaşam için mücadele ediyoruz.",
  metadataBase: new URL("https://munzurcevredernegi.net"),
  openGraph: {
    title: "Munzur Çevre Derneği",
    description: "2003'ten beri Türkiye genelinde ekolojik mücadele",
    url: "https://munzurcevredernegi.net",
    siteName: "Munzur Çevre Derneği",
    locale: "tr_TR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${dmSans.variable} ${caveat.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
