import { Fragment, type ReactNode } from "react";

export type SectionTitleProps = {
  title: string;
  accent?: string | string[];
  light?: boolean;
  className?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isAccentPart(part: string, accents: string[]) {
  return accents.some(
    (accent) => part.localeCompare(accent, "tr", { sensitivity: "base" }) === 0,
  );
}

function highlightAccents(text: string, accent: string | string[]): ReactNode {
  const accents = (Array.isArray(accent) ? accent : [accent]).filter(Boolean);
  if (accents.length === 0) return text;

  const sorted = [...accents].sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "giu");
  const parts = text.split(re).filter((part) => part.length > 0);

  return parts.map((part, index) =>
    isAccentPart(part, sorted) ? (
      <span key={index} className="text-leaf-green">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function renderTitle(title: string, accent?: string | string[]) {
  const lines = title.split("\n");
  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 ? <br /> : null}
      {accent ? highlightAccents(line, accent) : line}
    </Fragment>
  ));
}

export function SectionTitle({
  title,
  accent,
  light = false,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`max-w-[800px] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-normal tracking-wide uppercase ${
        light ? "text-cream" : "text-forest-dark"
      } ${className}`.trim()}
    >
      {renderTitle(title, accent)}
    </h2>
  );
}
