// GMC Theme — quantity-break discount (original code, NOT yet deployed or tested).
// Config JSON (discount metafield "$app:gmc-qb"/"config"):
//   {"tiers":[{"qty":2,"percent":10},{"qty":3,"percent":15}],"productIds":["gid://shopify/Product/123"]}
// productIds is optional; leave empty to apply to every product line.
export function cartLinesDiscountsGenerateRun(input) {
  let cfg = { tiers: [], productIds: [] };
  try { cfg = JSON.parse(input.discount.metafield?.value || "{}"); } catch (e) { return { operations: [] }; }
  const tiers = (cfg.tiers || []).slice().sort((a, b) => b.qty - a.qty);
  const only = cfg.productIds || [];
  const candidates = [];
  for (const line of input.cart.lines) {
    if (line.merchandise.__typename !== "ProductVariant") continue;
    if (only.length && !only.includes(line.merchandise.product.id)) continue;
    const tier = tiers.find((t) => line.quantity >= t.qty);
    if (!tier) continue;
    candidates.push({
      message: `Buy ${tier.qty}+ save ${tier.percent}%`,
      targets: [{ cartLine: { id: line.id } }],
      value: { percentage: { value: tier.percent } },
    });
  }
  if (!candidates.length) return { operations: [] };
  return { operations: [{ productDiscountsAdd: { candidates, selectionStrategy: "FIRST" } }] };
}
