/** Yerel geliştirmede /admin girişi atlanır. `next build` / canlıda kapalıdır. */
export function isAdminAuthBypassed(): boolean {
  return process.env.NODE_ENV === "development";
}
