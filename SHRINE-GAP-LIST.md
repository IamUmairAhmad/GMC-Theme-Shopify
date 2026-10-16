# GMC Theme: features still missing compared with Shrine Pro v1.0.4

Scope: only things GMC Theme does **not** have yet. Everything already built (FAQ, track order, block cart drawer, per-section colour scheme, Display-on, country blocker, etc.) is left out.
Method: every Shrine section, template, snippet and theme-setting was read read-only from the Shrine store, then compared with our schema and code. Items are written as feature descriptions. Each one is built with original code. No Shrine code, text or icons are copied.

Legend: **P1** drives sales, **P2** page-building power, **P3** polish. **[EXT]** depends on an outside app or service.

---
## 1. Product page (highest value)

| ID | Missing feature | Pri |
|---|---|---|
| PP-01 | **Quantity breaks inside the quantity selector**: up to 4 options, each with quantity, badge, image, label, benefit line, caption, % or fixed discount, price text, compare-price text, preselected option, styles normal/compact/vertical, and a variant picker per unit. Text boxes accept dynamic values (price, saving, quantity). Ours is a separate tier section without these fields. | P1 |
| PP-02 | **Gifts on quantity**: up to 4 gift products that unlock at a quantity, with locked/unlocked states, images and texts, gift-box colours. | P1 |
| PP-03 | **Bundle offer block**: pre-made bundle of 2–3 products, "main product" or "separate" type, per-product discount, dynamic total with savings line, per-product description, variant pickers, skip-cart. | P1 |
| PP-04 | **Product upsells block (multi)**: up to 3 upsell products, toggle styles (switch / checkbox / plus), preselected, per-product image, description, % / fixed discount, stacking row/column/slider, container styling. Ours supports one upsell. | P1 |
| PP-05 | **Sticky add-to-cart depth**: button function (add to cart, or scroll to info / variants / quantity breaks / pricing table), show always or after scroll, combined or separate variant picker, rating stars, button colour, separate desktop and mobile toggles (image, title, price, badge, picker, full-width, price in button, transparent background). Ours has a label only. | P1 |
| PP-06 | **Custom product field** types: text, number, textarea, pills, dropdown. Needs placeholder, max characters, min/max, required with custom error on the ATC button and sticky ATC. Ours is label + required only. | P1 |
| PP-07 | **Variant picker options**: type per option (pills / dropdown / swatches / image), custom labels, swatch size and radius, custom swatch colour list or from image alt, full-width dropdowns. | P1 |
| PP-08 | **Buy buttons options**: skip cart (go straight to checkout), uppercase labels, price inside button, custom button colour. | P1 |
| PP-09 | **Estimated shipping with real dates**: min/max days → formatted dates (six date formats), custom day and month labels, icon, alignment. | P2 |
| PP-10 | **Shipping checkpoints with dates**: four checkpoints, icon, top/bottom text, per-step day range, auto start/end date tokens, colour scheme. | P2 |
| PP-11 | **Sizing chart popup**: button (icon, size, underline), popup with heading, header row, rich body table, images above/below, caption, test mode. | P2 |
| PP-12 | **Rating stars block** (manual value, colours, outlined/full background stars, label, scroll-to-section link) and **Reviews slider block** (3 reviews with avatars, stars, alignment). | P2 |
| PP-13 | **Clickable discount**: auto-apply a code with non-applied and applied states (text, icon, colours). Ours exists but with fewer controls. | P2 |
| PP-14 | **Content blocks**: text-with-icon (3 lines with container, border, background), image block (width, mobile full, radius), video block (loop, muted autoplay, play/pause, sound button, timeline, ripple), urgency text, emoji benefits, payment badges with chosen icons. | P2 |
| PP-15 | **Gallery options**: thumbnail-slider layout, show variant image first, thumbnail counts, mobile thumbnails, mobile slide spacing and next-slide preview, pagination (numeric / dots under / dots overlay), hide arrows, dots colour, **trust badge overlay** (image, 4 positions, 3 sizes), separate mobile and desktop padding. | P2 |
| PP-16 | Per-block **margins** (top/bottom) on every product block, and **inline price layout / colours** (price first or second, price and compare colours, hide sale badge). | P3 |
| PP-17 | Collapsible tab extras: plus/caret icon, heading size, custom or filled icon, top border toggle. | P3 |
| PP-18 | Same block set available inside the **Featured product** section. | P2 |

## 2. Cart drawer depth (we have the 9 blocks, but each is shallower)

| ID | Missing feature | Pri |
|---|---|---|
| CD-01 | **Cart items controls**: image size and link, title size and link, variant display style, price position, compare-price source, price colours, single-item discounted prices, savings text and colour, quantity-selector styling. | P2 |
| CD-02 | **Subtotals**: total-savings line with left/right text, layout, colour, size and position; cart discount badges. | P2 |
| CD-03 | **Progress bar** with goal, messages and icon; **Checkpoints bar** with 3 goals (label, icon, text, amount). | P1 |
| CD-04 | **Countdown timer**: seconds, text size, colour scheme. | P3 |
| CD-05 | **Multiple gift blocks** (any count) with locked/unlocked look and "show only on selected products" rules; gift block position (above or below items). | P1 |
| CD-06 | **Multi upsell blocks** with position, "show only for these products", hide-if-in-cart, classic Add button label. | P1 |
| CD-07 | New blocks: **cart note**, **text with icon**, **image**, **icons with text** (richer), **payment badges** with chosen icons. | P2 |
| CD-08 | Drawer shell: heading text and alignment, desktop and mobile width, continue-shopping link, **test mode**. | P3 |

## 3. Header, announcement and tickers

| ID | Missing feature | Pri |
|---|---|---|
| HD-01 | **Transparent header over hero** (slideshow, hero, parallax): link/icon colours, highlighted and hover colours, **secondary logo swap**, option to hide announcement bars. | P1 |
| HD-02 | **Products mega menu**: show products and collections from a link list, collection images on desktop and mobile. | P2 |
| HD-03 | Active-link highlight with colour scheme, **secondary menu**, mobile menu title, mobile logo width. | P3 |
| AN-01 | **Announcement bar layout**: columns desktop/mobile (0 = auto), spacing, separators, slider type (slide / loop / fade) with desktop/mobile switches, autoplay speed. | P2 |
| AN-02 | Announcement block types: **discount code with copy button** and **social icons**; per-block icon (library or image), text sizes, vertical layout. | P2 |
| AN-03 | **Show/hide on specific products** (handle lists) for announcement bars and tickers. | P2 |
| TK-01 | **Horizontal ticker**: image items, italic/bold/uppercase, text and image sizes, spacing per device. | P3 |
| TK-02 | **Vertical ticker**: row count, styling, side content panel (heading, text, button / ATC), background image + overlay. | P3 |

## 4. Hero and banner sections

| ID | Missing feature | Pri |
|---|---|---|
| HS-01 | **Slideshow hero** (new section): min height presets/pixels per device, desktop + mobile background image or video per slide with overlays, prefix/heading/suffix, two buttons, content width, vertical/horizontal position, sound button, dots, drag, autoplay. | P1 |
| HS-02 | **3D parallax hero** depth: per-layer horizontal/vertical speed, zoom, rotation, stacking index, mobile image, hide-on-mobile, up to 10 layers, content block with heading prefix/suffix, background video. | P2 |
| HS-03 | **Slideshow**: separate mobile image per slide, per-slide Add-to-cart button, transparent container text colour. | P2 |
| HS-04 | **Image banner**: second image with per-device display rules, whole-banner link, ATC button, transparent container colour. | P3 |

## 5. Shared slider framework (Image slider, Multicolumn, Testimonials, Icon bar, Featured on, Reviews)

| ID | Missing feature | Pri |
|---|---|---|
| SL-01 | One reusable slider engine with: slide / loop / fade, drag, autoplay speed, centre mode, slides per page and per move, side preview of next/previous, adaptive height, dots and arrows (position, colour scheme, transparent), full page width, corner radius, separate desktop and mobile switches. | P2 |
| SL-02 | **Image/Video slider** section with description per slide (alignment, scheme), video slides (loop, muted, play/pause, sound, timeline). | P2 |
| SL-03 | **Testimonials** upgrade: styles, media ratio, stars and colour, quote marks, video testimonials, avatar, cards scheme. | P2 |
| SL-04 | **Icon bar** and **Icons with content** (new section: icon list beside heading, caption, text, button, ATC and video). | P2 |
| SL-05 | **Featured on**: grayscale logos, layouts, mobile slider with dots, open link in new tab. | P3 |

## 6. Add-to-cart button inside content sections

| ID | Missing feature | Pri |
|---|---|---|
| AT-01 | "Add to cart" button (custom product + skip-cart option) in: image-with-text, multirow, rich-text, multicolumn, image banner, slideshow, icons-with-content, content tabs, comparison table / slider, vertical ticker, custom columns. We only have it on three sections. | P1 |
| AT-02 | **Rating-stars**, **text-with-icon**, and **image** blocks available in rich-text, image-with-text and custom columns. | P3 |

## 7. Other sections

| ID | Missing feature | Pri |
|---|---|---|
| SC-01 | **Custom columns (full)**: 6 columns with desktop/mobile widths, per-column visibility, vertical alignment, gaps, and 13 block types (heading, rich text, rating, buttons, ATC, text-with-icon, icon content, image, video, accordion, payment badges, email signup, custom liquid), each assignable to a column. | P2 |
| SC-02 | **Bundle deals section**: dynamic price change, skip-cart, per-product % / fixed discount, horizontal layouts, up to 5 products. | P1 |
| SC-03 | **Pricing table**: card styles, product and variant linked, badge, icon, benefits, button function. | P2 |
| SC-04 | **Shoppable image modal**: product image, price, discount badge, ATC with skip-cart, open on hover/click, mobile modal position, hotspot ripple, per-device hotspot position. | P2 |
| SC-05 | **Product features**: hotspots with modals plus **bullet points with leader lines** (direction, bend, per-device position). | P2 |
| SC-06 | **Results**: percentage bars per row, image or video, caption, ATC button. | P3 |
| SC-07 | **Comparison table** styling (logo, labels, tick / cross styles, highlighted vs regular cells, minimal style) and **before/after slider** styling (labels, line colour, arrow style, placement, buttons). | P3 |
| SC-08 | **Content tabs**: icons on tabs, image / video per tab, ATC, button style (animation), header layout, full-width buttons. | P3 |
| SC-09 | **Collapsible content**: video media, icon per row, collapse icon, top border. | P3 |
| SC-10 | **Instagram stories**: several stories per user, verified badge, close-friends ring, time posted, background, media fit, autoplay speed. | P3 |
| SC-11 | **Promo popup**: display modes, delay and frequency, countdown, success state showing a discount code with copy button, heading prefix/suffix. | P2 |
| SC-12 | **Music player**: standalone section + global: volume, position, offsets, ripple, colour scheme. Ours takes only a URL. | P3 |
| SC-13 | **Footer blocks**: email-signup block, featured product block, featured collection block, per-block desktop/mobile column width, image link. | P2 |
| SC-14 | **Featured collection**: same-height cards option and badge selector. | P3 |
| SC-15 | **Sections group** (pair two sections side by side by ID) and "Display section ID" checkbox on every section (helps scroll-to links). | P3 |

## 8. Global theme settings

| ID | Missing feature | Pri |
|---|---|---|
| TS-01 | **Animation controls**: repeat on scroll, duration, initial delay, children delay, start opacity / X / Y / zoom. | P2 |
| TS-02 | **Typography**: heading and body line-height and letter-spacing. | P3 |
| TS-03 | **Link and action button hover effects** (glow / centre / left / arrow). | P3 |
| TS-04 | **Variant pills** accent colour + bold text; **Variant dropdown** styling group (scheme, border, overlay, hover, radius, shadow). | P2 |
| TS-05 | **Product cards**: badge position, push-to-side, **custom badges from tags** (`custom-badge-…`), sale badge text and discount icon, title line limit, add-button style, accent icon style. | P1 |
| TS-06 | **Scrollbar** style, colours, width; **custom cursor** image. | P3 |
| TS-07 | Secondary logo and mobile logo width. | P2 |

## 9. Templates

| ID | Missing feature | Pri |
|---|---|---|
| TP-01 | **Classic customer account templates**: account, login, register, order, addresses, reset password, activate account (we ship none; stores with classic accounts get the bare default). | P2 |
| TP-02 | Default product template pre-built with the full block set (title, stars, price, picker, quantity breaks, buy buttons, checkpoints, sticky ATC, reviews, tabs) and sample extra sections. | P3 |

## 10. External / not recommended

| ID | Item | Note |
|---|---|---|
| EX-01 | Currency converter snippet **[EXT]** | Hard-wired to a third-party app. Use Shopify Markets instead. |
| EX-02 | Print-on-demand snippet **[EXT]** | Hard-wired to one dropshipping app. Skip. |
| EX-03 | Review display **[EXT]** | Needs a review app. Already supported through our `@app` block and `reviews.rating` metafields. |
| EX-04 | Remote script in Shrine's `theme.liquid` | Loads a script from an outside domain and has an "Authentication token" setting. **Do not replicate**; it is a licence-check and supply-chain risk. |

---
## Suggested build order
1. **Sales engine (P1)**: PP-01 → PP-05 → PP-06/07/08 → PP-04 → PP-03 → PP-02 → CD-03/05/06 → SC-02 → TS-05
2. **Page building (P1/P2)**: AT-01 → HD-01 → HS-01 → SL-01 and the sections that use it → SC-01 → SC-04/05 → SC-11/13
3. **Polish (P2/P3)**: remaining product blocks, cart depth, settings, templates

---
## 11. Added in the second, deeper pass (page sections, product card, text tokens, behaviours)

| ID | Missing feature | Pri |
|---|---|---|
| DP-01 | **Quantity breaks as a variant-picker style**: a variant option can be shown as quantity-break cards (for stores whose quantities are separate SKUs), mixed per option, e.g. "swatches, dropdown, quantity breaks". Works with the clickable discount block. | P1 |
| DP-02 | **Dynamic text tokens** usable in every text field of breaks, bundles and pickers: quantity, price, compare price, price each, compare price each, amount saved, amount saved rounded, option name / lowercase / uppercase / selected, option index. Per-option texts are comma-split, with an "empty" placeholder to skip one. | P1 |
| DP-03 | **Sale badge text with tokens** (for example "Save [percentage]") and **custom badges list driven by product tags** (for example BEST SELLER). | P1 |
| DP-04 | **Product card options**: card style choice, add-button style, limit titles to N lines, badge position and push-to-side, sold-out badge scheme, quick-add on cards, accent-icon style. | P1 |
| DP-05 | **Collection and search grid**: "make all cards same height", a badges selector (sale / sold-out / both / none) and a Display-on setting on the blog page. | P3 |
| DP-06 | **Cart page** (not the drawer): discount-code field block with placeholder, button label and error text. | P2 |
| DP-07 | **Clickable discount** remembers the applied code when the shopper navigates back. | P3 |
| DP-08 | **Bundle** pricing: free-item price text, dynamic prices after a variant change, two modes: "main" (tied to the main button, includes gifts and upsells) and "separate" (own button). | P2 |
| DP-09 | **Sizing chart** built from simple text: commas make columns, new lines make rows, an empty-cell placeholder. | P3 |
| DP-10 | **Payment badges** chosen by a list of about 24 named providers (Apple Pay, Klarna, Afterpay, iDEAL, etc.). | P3 |
| DP-11 | **Icon picker with a very large library**: Shrine accepts any Google Material Symbol name with a "filled" switch, plus custom image icons, in nearly every block. Ours uses a smaller bundled set. | P2 |
| DP-12 | **Copy-to-clipboard button** (discount code), **countdown-timer** and **modal** components reusable by any block. | P2 |
| DP-13 | Section **"Display on" is a select in each Shrine section**; per-column and per-block visibility in Custom columns. We have it per section only. | P3 |

### Checked in the second pass and found already equal or better in GMC
Customer pages (login, register, account, orders, addresses, reset and activate password) in Shrine are plain styled pages with only a padding setting, so the gap is only that we ship no templates for them (TP-01). The 404 page, article, blog, collection banner, list-collections and password pages match what we have. Translations are equal (both ship the Dawn language set).

### Not verified (honest limits)
- I read Shrine's code and settings, not its live storefront behaviour; animation feel, slider smoothness and mobile polish still need a side-by-side visual test once we can preview both themes.
- Shrine's `shrine.null.js` (125 KB) and `secondary.js` (70 KB) are minified; I listed their components but did not read the logic. Behaviours are written from the settings and snippet markup.
- Our own side was compared from schemas and code, not by re-testing every section in a browser.

---
## 12. Third pass: hidden behaviours found in the page code and scripts

| ID | Missing feature | Pri |
|---|---|---|
| TH-01 | **Separate secondary variant picker** that keeps the sticky bar and the main picker in sync (combined "Black/S" dropdown or one dropdown per option). Also needed by PP-05. | P1 |
| TH-02 | **Product-info upsell logic**: selected upsell products are added together with the main product in one request, and their price changes follow the chosen variant. | P1 |
| TH-03 | **Bundle and quantity-gift logic** as scripts: live price recalculation, gift unlock states, cart cleanup when quantity drops. | P1 |
| TH-04 | **Cart drawer scripts**: cart note, gift auto-add and remove, upsell add, countdown timer, item removal without reload. We cover gift, upsell and timer; the **cart note** block is missing (CD-07). | P2 |
| TH-05 | **Section pairing script** (Sections group): puts two sections side by side and can reverse their order on mobile. | P3 |
| TH-06 | **Dynamic dates script** for delivery estimates (day and month names per language). | P2 |
| TH-07 | **Custom product field validation** that disables every Add to Cart button until required fields are filled, and writes the answers into line-item properties. | P1 |
| TH-08 | **Brand information** in the footer (headline, description, image, width) and **nine social networks** with "Follow on Shop". We have the settings group; the footer block for brand image width and per-column widths is missing (SC-13). | P3 |
| TH-09 | **Gift-card and password pages** use the full theme styling (buttons, inputs, cards, fonts). Ours use only the base styling. | P3 |
| TH-10 | **Disable copy / right-click / inspect** and **country block** exist in ours; Shrine's country check calls an outside lookup service **[EXT]**. We already have our own version. No action. | none |

## Review coverage (what has now been read)
All 61 sections, all 17 page templates and group files, all 140+ snippets by name (about 40 read in detail), the global settings (about 180), `settings_data` defaults, header, footer, theme layout, password layout, gift card, cart drawer snippet, variant picker snippets, product card, facets, the two main scripts (component list only, because both are minified), the translation set, and the asset list.

## Still pending on our side (not Shrine gaps)
1. Rebuild `GMC-Theme.zip` (current one predates FAQ, reviews, track order, cart-drawer blocks and per-section colour schemes).
2. Update `FEATURE-CHECKLIST.md` for features added after section H.
3. Live browser tests not yet done: gift auto-add threshold, upsell add, bundle add, section add-to-cart, slider autoplay, Countdown / Progress / Checkpoints drawer blocks.
4. Subscription plans and Markets need a store with a selling-plan app and a second market.
5. The default home template still points at the demo product handle `gmc-test-tee`.
6. Master-prompt sections 9–11 were never received.

---
## 13. Fourth pass (file list was cut at 250; the last 35 files and store data now read)

- **No new missing feature found.** The last 35 files were: `shipping-checkpoints`, `text-with-icon-block`, `social-icons`, `share-button`, `upsell-block`, `video-player`, `sizing-chart`, `separate-atc-btn`, `text-with-price`, all page templates, and the market-specific template files.
- **Market-specific templates** (`*.context.*.json`): these are created by Shopify itself when a merchant customises a page per market, on any Online Store 2.0 theme. Not a theme feature, nothing to build. Shrine's only market override is a mobile sticky bar on the product page.
- **Store data**: Shrine's store has one theme, one Contact page, three menus, and Shopify's standard category metaobjects (colour, material, etc.). Nothing theme-specific is required from the store, so our theme needs no special setup data to match.
- **Icon font**: Shrine loads Google Material Symbols from the web for every icon. Ours bundles icons locally (faster, no outside call). The gap is only icon variety (DP-11), not the loading method.
- **Not read**: the CSS files (`base.css` and component styles) were skimmed by size and class names only. They describe looks, not features. A visual side-by-side is the right check for those.

## 14. Fifth pass
- Small stylesheets read in full (predictive search, customer pages, quick add, bundle deals, content tabs, pricing table, password, gift card): no feature beyond what the matching sections already do.
- `base.css` (328 KB) is too large for the store tool and its download link is blocked from this workspace, so it was **not** read. It holds general look-and-feel only; check it by visual comparison.
