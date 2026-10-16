# GMC Theme – setup guide
1. Online Store > Themes > Add theme > Upload zip. Preview before publishing.
2. **Theme settings > GMC: …** (six groups: Product page, Cart drawer, Header/menu/footer, Effects & buttons, Popup & marketing, Security & access) controls: free-shipping bar, gift, upsells, popup, zoom, variant style, hover effects, animations, header icons, mega-menu tile, country blocker, cart drawer extras, security.
3. **Add sections** in the editor ("Add section" list). Product page: add "Product info blocks" / "Product extra blocks", "Quantity breaks", "Subscription widget".
4. **Page templates:** create a Page and choose template `advertorial`, `listicle` or `story`. Blog: choose template `blog.gmc` on your blog.
5. **Any section:** scroll to "GMC extras" to hide on mobile/desktop or add a background image/MP4.
6. **Free gifts / toggle add-ons:** make the gift product price 0 (or add a 100% automatic discount), then paste its numeric variant ID in settings.
7. **Real quantity/bundle discounts:** create automatic discounts in Shopify admin; the theme only presents the offers.
8. **Icons:** use names from assets/gmc-icon-list.txt, e.g. `truck`, `shield-check`.
9. **Lottie:** upload the .json under Content > Files and paste its URL.
10. **Country blocker:** test with a VPN before relying on it; avoid blocking markets you advertise to.

## Editing in the Shopify Theme Editor
- **Theme settings** (Customize → Theme settings): six "GMC:" groups for product page, cart drawer, header/menu/footer, effects & buttons, popup & marketing, security & access. Colors live under Colors (color schemes).
- **Sections** (Add section): every GMC section has a preset, can be reordered, hidden per device, and given padding, background color/image/MP4, max width. Standard sections also get optional add-to-cart, swipe-on-mobile and slider-autoplay settings.
- **Blocks**: product info/extra blocks, quantity tiers, bundle products, tabs, testimonials etc. are blocks you add, reorder and delete. The Section group uses reusable theme blocks (group, text, image, button, icon+text).
- **Text you may want to change** is a setting (labels, placeholders, button text). Fixed storefront messages (discount-code feedback, "Expand all") are in Online Store → Languages → Edit default content, under "gmc".
- **Dynamic sources**: in the editor, click the connect icon next to any text, image, URL, product or color setting to bind it to a product/collection/page field or a metafield. The product extras also read the standard `reviews.rating` metafield and the "custom field" block can read any product metafield.
- **Merchant data the theme does not invent**: ratings, review counts, testimonials and policy claims are empty or placeholder text until you fill them in.
