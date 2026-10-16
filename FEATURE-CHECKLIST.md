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
Partial/Limit: "Section group" (Shopify OS2 sections cannot be nested without theme blocks; header/footer groups are Shopify-native); "advanced" announcement bar/image-with-text/multicolumn are the Dawn versions plus GMC extras (background, MP4, hide-by-device) and the ticker sections.

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
