export const adminLabelClass =
  "mb-1.5 block text-xs font-semibold tracking-widest text-cream/70 uppercase";

export const adminInputClass =
  "w-full rounded-lg border border-cream/15 bg-cream/6 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/35 focus:border-leaf-green focus:outline-none";

/** Native select listesi — açık tema ile cream metin okunmaz; koyu liste + option stilleri */
export const adminSelectClass = `${adminInputClass} [color-scheme:dark] [&>option]:bg-forest-deep [&>option]:text-cream`;

export const adminBtnPrimary =
  "cursor-pointer rounded-lg bg-leaf-green px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-leaf-green/90 disabled:opacity-50";

export const adminBtnSecondary =
  "cursor-pointer rounded-lg border border-cream/20 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/8 disabled:opacity-50";

export const adminBtnDanger =
  "cursor-pointer rounded-lg border border-terracotta/40 px-3 py-1.5 text-xs font-semibold text-terracotta transition-colors hover:bg-terracotta/10 disabled:opacity-50";

export const adminBtnMuted =
  "cursor-pointer rounded-lg border border-cream/20 px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-cream/8 disabled:opacity-50";

export const adminCardClass =
  "rounded-2xl border border-cream/10 bg-forest-deep/80 p-6 md:p-8";
