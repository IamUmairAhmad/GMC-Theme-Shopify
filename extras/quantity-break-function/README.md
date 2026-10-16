# Quantity-break discount (optional Shopify Function)

Status: **source only. Not built, deployed or tested.** A theme cannot change prices; this function would do it at checkout.

Needs a custom app (Shopify CLI): `shopify app init`, copy this folder into `extensions/`, `shopify app deploy`, then create a discount of this type and set its `$app:gmc-qb/config` metafield (see `src/run.js`). Check the current Functions API docs, as the target name/version may change.
Keep the tiers equal to the ones in your Quantity breaks section so the display matches the price.
