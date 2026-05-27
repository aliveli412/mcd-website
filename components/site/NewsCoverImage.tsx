import Image from "next/image";

type NewsCoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const coverBase =
  "absolute inset-0 z-0 h-full w-full object-cover";

export function NewsCoverImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: NewsCoverImageProps) {
  const coverClass = `${coverBase} ${className}`.trim();

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={coverClass}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      draggable={false}
      className={coverClass}
      sizes={sizes}
      priority={priority}
    />
  );
}
