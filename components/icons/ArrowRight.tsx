type ArrowRightProps = {
  className?: string;
  size?: number;
};

export function ArrowRight({ className, size = 14 }: ArrowRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
