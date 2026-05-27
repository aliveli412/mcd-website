import Image from "next/image";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { isSupabaseStorageUrl } from "@/lib/images";
import { SectionEyebrow, SectionTitle } from "@/components/site/SectionParts";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";
import type { SitePhoto } from "@/lib/site-photos";

const LAYOUT = [
  {
    className:
      "col-span-12 min-h-[240px] sm:min-h-[280px] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:min-h-0",
    featured: true,
    sizes: "(max-width: 1024px) 100vw, 50vw",
  },
  {
    className:
      "col-span-6 min-h-[180px] sm:min-h-[200px] lg:col-span-3 lg:col-start-7 lg:row-start-1 lg:min-h-0",
    sizes: "(max-width: 1024px) 50vw, 25vw",
  },
  {
    className:
      "col-span-6 min-h-[180px] sm:min-h-[200px] lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:min-h-0",
    sizes: "(max-width: 1024px) 50vw, 25vw",
  },
  {
    className:
      "col-span-6 min-h-[180px] sm:min-h-[200px] lg:col-span-3 lg:col-start-7 lg:row-start-2 lg:min-h-0",
    sizes: "(max-width: 1024px) 50vw, 25vw",
  },
  {
    className:
      "col-span-6 min-h-[180px] sm:min-h-[200px] lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:min-h-0",
    sizes: "(max-width: 1024px) 50vw, 25vw",
  },
] as const;

function FieldGalleryCard({
  photo,
  className,
  featured = false,
  featuredLabel,
  sizes,
}: {
  photo: SitePhoto;
  className: string;
  featured?: boolean;
  featuredLabel: string;
  sizes: string;
}) {
  const label = photo.caption ?? photo.alt;

  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl bg-forest-dark shadow-[0_8px_32px_rgba(42,53,32,0.12)] ring-1 ring-black/8 md:rounded-3xl ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        unoptimized={isSupabaseStorageUrl(photo.src)}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: photo.objectPosition ?? "center" }}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/35 to-forest-deep/5 transition-opacity duration-500 group-hover:via-forest-deep/45"
        aria-hidden
      />

      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-4 md:p-5">
        {featured ? (
          <span className="w-fit rounded-full bg-leaf-green/90 px-2.5 py-0.5 font-body text-[10px] font-bold tracking-widest text-cream uppercase">
            {featuredLabel}
          </span>
        ) : null}
        <p
          className={`leading-snug font-semibold text-cream ${
            featured
              ? "font-display text-xl tracking-wide md:text-2xl"
              : "text-sm md:text-[15px]"
          }`}
        >
          {label}
        </p>
      </figcaption>
    </figure>
  );
}

export async function FieldGallery({ photos }: { photos: SitePhoto[] }) {
  const field = getSiteContent(await getLocale()).fieldGallery;

  return (
    <section className="border-b border-black/6 bg-bone py-16 md:py-24">
      <SiteContainer>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>{field.eyebrow}</SectionEyebrow>
            <SectionTitle title={field.title} accent={field.accent} />
            <p className="mt-4 text-muted">{field.blurb}</p>
          </div>
          <p className="hidden max-w-[200px] text-right text-sm leading-relaxed text-muted lg:block">
            {field.aside}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-3 sm:gap-4 lg:mt-12 lg:h-[min(520px,58vw)] lg:max-h-[560px]">
          {photos.slice(0, LAYOUT.length).map((photo, index) => {
            const slot = LAYOUT[index];
            if (!slot) return null;
            return (
              <FieldGalleryCard
                key={`${photo.src}-${index}`}
                photo={photo}
                className={slot.className}
                featured={"featured" in slot ? slot.featured : false}
                featuredLabel={field.featured}
                sizes={slot.sizes}
              />
            );
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
