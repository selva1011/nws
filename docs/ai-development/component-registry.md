# Component registry

Updated **2026-11-19** (white showroom catalogue). Direct imports, flat shared components, no barrel files or shared state provider. [Design system](design-system.md) owns CSS primitives; [Data flow](data-flow.md) owns behavior.

| Component | Props | Boundary / consumers | Contract |
|---|---|---|---|
| [Header](../../components/Header.tsx) | None | Client; root only | Sticky 64px white navigation, text brand link ("Node Workspace Solutions home"), nested-route current state, mobile disclosure, Escape focus recovery, enquiry CTA |
| [Footer](../../components/Footer.tsx) | None | Server; root only | Light-grey footer, text brand link, category/company/contact navigation, phone/email, enquiry CTA |
| [ProductCard](../../components/ProductCard.tsx) | `{ product: typeof PRODUCTS[number]; sizes?: string }` | Server-safe; home, catalogue, related products | Whole-tile link (`id="p-<slug>"`, `data-product`): framed display photo on a 4:5 bottom-aligned stage, title, reserved reveal line (verified style or "View details" + arrow), image ViewTransition. Hover/focus never changes layout; comparison checkboxes belong to catalogue, outside card links |
| [SeatFinder](../../components/SeatFinder.tsx) | None | Client; home | Four workspace choices, local selected state, category suggestions and accessible update |
| [ContactForm](../../components/ContactForm.tsx) | `{ mode?: 'contact' \| 'quote'; models?: string[] }` | Client; contact and quote | Native labeled fields; prepare/review local draft; mailto link; clipboard feedback and selectable fallback. Does not call API or claim delivery |
| [CatalogueView](../../app/products/CatalogueView.tsx) | `{ active: string }` | Hook-free; products Suspense fallback ("All") and CatalogueBrowser | "Seating" heading, model count, category link selector (`aria-current`), grouped `.catalogue-grid` sections |
| [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx) | None | Page-local client; products Suspense | Reads `type`/`category` with useSearchParams, renders CatalogueView, records the catalogue href in sessionStorage when a tile is opened, scrolls `#p-<slug>` into view on full loads |
| [ProductGallery](../../app/products/[slug]/ProductGallery.tsx) | `{ slug: string; name: string; images: { src, display, alt, label }[] }` | Detail-local client | Up to three verified photos on the stage; with more than one: thumbnails, arrow/Home/End keys, previous/next buttons and touch swipe. Zoom toggle, ViewTransition; one photo per product today |
| [BackToCatalogue](../../app/products/[slug]/BackToCatalogue.tsx) | `{ slug: string; category: string }` | Detail-local client | Link to the stored catalogue filter (when it contains the product) or the product category, anchored on `#p-<slug>` |

## Retained unmounted components

| Component | Constraint before reuse |
|---|---|
| [ScrollReveal](../../components/ScrollReveal.tsx) | Native IntersectionObserver/Web Animations; honors reduced motion. Currently unused; do not assume page-wide reveal infrastructure |
| [ImageCarousel](../../components/ImageCarousel.tsx) | Optional images; missing default/fallback files and one existing raw-img lint warning. Supply real assets and test before mounting |
| [PageTransition](../../components/PageTransition.tsx) | Undefined transition-fade class and empty transition callback; not the active product image transition mechanism |
| [Experience](../../components/Experience.tsx) | Contains unverified business stats. Do not mount without confirming content |

Buttons/fields/chips/FAQ rows are native markup with shared CSS classes, not a generic component framework. There is no modal, toast, tooltip or third-party table system. Use only the necessary interaction for the requested feature.
