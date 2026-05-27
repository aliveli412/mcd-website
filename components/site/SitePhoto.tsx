import Image from "next/image";
import type { SitePhoto as SitePhotoType } from "@/lib/site-photos";

type SitePhotoProps = SitePhotoType & {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export function SitePhoto({
  src,
  alt,
  caption,
  objectPosition,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill = true,
}: SitePhotoProps) {
  return (
    <figure className={`relative overflow-hidden ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={imageClassName}
        style={objectPosition ? { objectPosition } : undefined}
      />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/85 to-transparent px-4 py-3 text-xs font-medium tracking-wide text-cream/90">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
