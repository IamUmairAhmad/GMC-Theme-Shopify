# GMC Theme – feature checklist
Status key: **Done** (built, theme-check clean) · **Base** (provided by the Dawn base theme) · **Setup** (needs an app/admin configuration) · **Partial/Limit** (see note)
Reference list: https://shrine.io/pages/features. All code here is original; nothing is copied from Shrine.

## Product page
| Feature | Status | Where |
|---|---|---|
| Quantity breaks (+ gifts per tier, live variant price) | Done | Section "Quantity breaks". Real price cuts need Shopify automatic discounts (**Setup**) |
| Variant picker / dropdown upgrades | Done | Theme settings > GMC features > Variant picker |
| Urgency text, inventory, estimated shipping, emoji benefits, payment badges, shipping checkpoints, trust stars, bestseller badge, sizing chart, text+icon, custom field, breadcrumb, review avatars, divider, custom liquid | Done | Section "Product info blocks" |
| Complimentary product, product upsell, clickable discount, popup page, scroll-to, link button, image, MP4 video, countdown, image slider, container, tabs, manual reviews, dynamic savings | Done | Section "Product extra blocks" |
| Sticky add to cart (live price + sold-out sync) | Done | Section "Sticky add to cart" (on product template) |
| Subscriptions widget | Done / **Setup** | Needs a subscription app that creates selling plans |
| Bundle offer with variant selection | Done | Section "Bundle deals" (no automatic price cut; use discounts) |
| SKU, share, description, collapsible rows, rating stars | Base | Dawn product blocks (ratings read the `reviews.rating` metafield) |
| Product reviews list / live Trustpilot data | **Setup** | Needs a reviews app or Trustpilot account embed (paste into Trustpilot section) |
| Price in ATC button, quantity beside ATC | Done | Theme settings > Product page buttons |
| Image zoom (pan / lens / lightbox) | Done | Theme settings > Product image zoom |

## Sections
Done: ticker (horizontal, vertical), icon bar, before/after slider, content tabs, comparison table, pricing table, timeline, testimonials, Facebook-style testimonials, Trustpilot-style reviews, TikTok videos, featured-on, countdown, results/stats, video hero (MP4), 3D parallax hero, shoppable image, Instagram-style stories, music player, track order, product features, custom columns v1/v2, image & video slider (MP4), video player, blog grid (+ blog.gmc template), color changer, ATC button, section divider, scroll progress, sticky CTA, hide header/footer, redirect-to-page, Lottie animation, advertorial (3 page templates: advertorial, listicle, story).
Base (Dawn): image banner, slideshow, featured collection/product, collection list, rich text, collage, multirow, multicolumn, collapsible content, email signup, contact form, video, blog posts, custom liquid, page, related products, announcement bar.
Also Done: Section group (theme blocks: group, text, image, button, icon-with-text), advanced announcement bar (rotating messages, countdown, dismiss; add to the Header group), layout controls (extra spacing, max width, background color/image/MP4, focal points, image aspect ratios, mobile columns) on every GMC content section, editor-only empty-state hints, reduced-motion handling.
Advanced versions (Done): "Image + text (Advanced)" (image or MP4, badge, bullets with icons, rating line, quote, buttons, card mode, sticky media, mobile order, reveal-on-scroll), "Multicolumn (Advanced)" (up to 6 columns, swipe carousel on mobile, card/bordered styles, circle images, hover effects, step numbers, whole-column links), "Collapsible (Advanced)" (line/card styles, plus or chevron, single-open or expand-all, side image, page content rows, optional FAQ structured data). The original Dawn versions remain available.
Partial/Limit: TikTok section uses TikTok's public player URL and Lottie loads lottie-web from cdnjs; neither was tested against the live services.

## Every Dawn section (37)
Hide on mobile/desktop, background image, background MP4 upload, overlay (settings group "GMC extras").

## Cart drawer
Done: free-shipping progress bar, second milestone (gift) bar, free gift (auto add/remove against real cart total), upsell products, toggle (optionally preselected) add-on, compare-at price + savings per line, total savings, countdown timer, policies checkbox (gates checkout button), payment/trust badges, icon+text lines, image, custom rich text, header/body/footer colors, full-width mobile, discount code field (reports Shopify's actual response; falls back to "checked at checkout").
Base: cart note.
Limit: free gifts/toggle add-ons are charged at their normal price unless the item is priced at 0 or covered by an automatic discount.

## Theme-wide
Done: 4 button hover effects, section load animation, promo popup, scroll-to-top, megamenu styling + promo tile, header blur/shadow, footer styling, highlighted text (`==text==`), cart/account/search icon choices, 2,500-icon library (Tabler, MIT), country blocker (crawler-safe), country selector section, security (copy/right-click deterrent).
Base: country/currency selector in header (Dawn setting) + GMC section.

## Testing performed vs. still required
Performed: Shopify Theme Check (no errors), JSON validity for all config/templates, JS syntax check, headless Chromium smoke test of gmc.js with mocked cart endpoints (swatches, highlight, zoom pan, icon sprite, free-gift add, add-on on submit, duplicate guard, hidden-field injection).
**Not performed (needs a Shopify preview/live store):** rendering of Liquid sections, theme-editor behavior, real cart/discount responses, subscriptions, Markets/country detection, mobile layout checks, keyboard-navigation pass, app compatibility.

## Theme-wide settings (v1.0.1)
All GMC options now live in six Theme-settings groups: **GMC: Product page**, **GMC: Cart drawer**, **GMC: Header, menu, footer**, **GMC: Effects & buttons**, **GMC: Popup & marketing**, **GMC: Security & access**.
Added in this pass: sale badges as real percent/amount off (from the compare-at price), footer layouts (default/centered/divided) + payment row + icon lines + custom text, menu hover styles and `[NEW]`-style menu badges, dropdown styles, 6 button hover effects, 5 entrance-animation styles, scroll-to-top side/shape, popup upgrade (email or offer type, image, exit-intent/scroll/delay triggers, once per visit/day/week, page targeting, real discount code shown after signup), article template `article.gmc` (scroll progress + reading time), quantity-break tiers accept a free gift or paid add-on.
Reuses base-theme features instead of duplicating: header country/currency selector (Dawn header settings), reveal-on-scroll and hover animations (Dawn Animations group; the GMC entrance styles are an optional extra).
Partial: "Add to cart buttons in supported sections" – provided as the Add-to-cart button section and the bundle/ATC blocks; not injected into every Dawn section. "Advanced section sliders" – Image & video slider (swipe, autoplay, MP4) plus the base slideshow.

---

## Section 6 — Reference-page review and integration checks

### A. Features explicitly shown on shrine.io/pages/features
The page lists 159 Pro rows (82 Shrine rows) in four categories (49 + 52 + 20 + 38). Re-checked on this pass: **no table row exists that is not already in the checklist above.** Everything in the tables is covered by the checklist rows above, with the honest status labels used there.

Items on the page that are not theme features (marketing or services, not built as theme code): lifetime support, updates, help center, Discord community, demo stores, Shrine-vs-Pro edition comparison, crypto-payment mention, social links. The sale countdown and cart-reserved timer shown on the page are built (`gmc-countdown`, cart timer setting).

### B. Integration behaviour (what was fixed or verified)
| Combination | Behaviour now | Status |
|---|---|---|
| Quantity breaks + free gifts | Gift is queued on submit and added only after Shopify confirms the main add (`cartUpdate` from `product-form`); falls back to a timed add if no cart UI is present. Gift must be $0 or covered by an automatic discount | Smoke-tested with mocked endpoints |
| Bundles + variant selection | Bundle block lets the shopper choose variants; chosen variant ids are added | Built, untested on live store |
| Upsells + cart drawer | Upsell add refetches `cart-drawer` and re-renders | Built, untested on live store |
| Sticky ATC + variant change | Follows `variantChange` (price, availability, id) | Built, untested on live store |
| Subscriptions + selling plans | Uses the product's real selling plans; still requires a subscription app/selling plans on the product | Built; per-variant plan filtering **not done** (see C) |
| Reviews + rating data | Trust stars use the manual rating, else the standard `reviews.rating` / `reviews.rating_count` metafields; nothing shows if neither exists | Built, untested with a real review app |
| Shipping progress + cart totals | Uses `cart.total_price` in the shopper's currency; optional per-currency thresholds (`USD:50, EUR:45`) | Built, untested on live store |
| Discount messaging | Discount-code click saves the code to the cart session; wording now says Shopify checks eligibility at checkout. The theme cannot verify eligibility itself | Built |
| Mobile + sticky elements | When the sticky ATC is visible, scroll-to-top, music player and sticky CTA lift above it | CSS only, not visually tested on devices |
| Country selection + Markets | Uses Shopify's standard localization form; country blocker reads `localization.country`. Prices, languages and shipping come from the merchant's Markets setup | Built, untested on live store |

### C. Known limits
- Subscription widget does not yet filter plans per selected variant.
- Quantity-break and bundle price reductions need Shopify automatic discounts; the theme only displays them.
- Nothing has been run on a live Shopify store; Liquid rendering is only theme-checked.

### D. My own recommended improvements (NOT Shrine Pro features)
1. Per-currency thresholds (added above).
2. Add-on queueing after confirmed main add (added above).
3. Metafield-driven review stars (added above).
4. Recommended next: per-variant selling-plan filter; a Shopify Function for quantity-break discounts; Lighthouse/accessibility pass on a live store.
