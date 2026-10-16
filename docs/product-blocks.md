# Product page blocks

Add blocks to **Product info blocks** and **Product extras** sections on the product template.

## Estimated delivery
Counts real dates from today. Put `[start_date]` and `[end_date]` in the text. Choose a date format, skip weekends, and optionally type your own day and month names (comma separated).

## Shipping checkpoints
Four steps with dates. Same tokens as estimated delivery. Each step has an icon name from the icon library.

## Size chart popup
Paste a table as text. One row per line, commas between columns, first line is the header, `-` for an empty cell:

```
Size, Chest, Waist
S, 90, 74
M, 98, 82
```

## Payment badges
Type provider names (`visa, master, paypal, apple_pay`) or tick providers. Leave both empty to show the methods your store accepts.

## Upsells, bundles, quantity breaks
Upsells show up to three add-ons with a tick box. Bundles add several products together with an optional discount. Quantity breaks show tiers; a free gift tier needs a product priced at 0 or an automatic discount.

## Block limits
Blocks that only make sense once per page (delivery, checkpoints, payment badges, stars, bundle, upsells) are limited to one.
