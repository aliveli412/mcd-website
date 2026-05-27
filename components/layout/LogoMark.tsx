"use client";

import Image from "next/image";
import { LocalizedLink } from "@/components/site/LocalizedLink";

export const MCD_LOGO_PATH = "/logo/mcd-logo-transparent.png";

/** Şeffaf arka planlı logo (345×149) */
export const MCD_LOGO_WIDTH = 345;
export const MCD_LOGO_HEIGHT = 149;

type LogoMarkProps = {
  /** Header (cream) · footer (dark) · login (centered on dark) */
  variant?: "nav" | "footer" | "centered";
};

export function LogoMark({ variant = "nav" }: LogoMarkProps) {
  const isFooter = variant === "footer";
  const isCentered = variant === "centered";

  const imageClass = isFooter
    ? "h-[4.25rem] w-auto max-w-[min(100%,320px)] sm:h-[4.75rem]"
    : isCentered
      ? "h-[4.5rem] w-auto max-w-[300px] sm:h-20"
      : "h-[3.25rem] w-auto max-w-[260px] sm:h-[3.75rem] sm:max-w-[300px]";

  return (
    <LocalizedLink
      href="/"
      className={`group inline-flex shrink-0 items-center no-underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-green ${
        isCentered ? "justify-center" : ""
      }`}
    >
      <Image
        src={MCD_LOGO_PATH}
        alt="Munzur Çevre Derneği"
        width={MCD_LOGO_WIDTH}
        height={MCD_LOGO_HEIGHT}
        className={imageClass}
        priority={variant === "nav"}
        unoptimized
      />
    </LocalizedLink>
  );
}
