import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
};

export function SiteContainer({ children, className = "" }: SiteContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-5 md:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
