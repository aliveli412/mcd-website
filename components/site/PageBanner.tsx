import Image from "next/image";
import type { ReactNode } from "react";
import type { SitePhoto } from "@/lib/site-photos";
import { SiteContainer } from "@/components/layout/SiteContainer";

type PageBannerProps = {
  photo: SitePhoto;
  children: ReactNode;
};

export function PageBanner({ photo, children }: PageBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-dark py-16 text-cream md:py-24">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/88 to-forest-dark/72" />
      </div>
      <SiteContainer className="relative z-10">{children}</SiteContainer>
    </section>
  );
}
