# Component registry

Updated **2026-11-18**. Direct imports, flat shared components, no barrel files or shared state provider. [Design system](design-system.md) owns CSS primitives; [Data flow](data-flow.md) owns behavior.

| Component | Props | Boundary / consumers | Contract |
|---|---|---|---|
| [Header](../../components/Header.tsx) | None | Client; root only | Sticky 80px navigation, nested-route current state, mobile disclosure, Escape focus recovery, enquiry CTA |
| [Footer](../../components/Footer.tsx) | None | Server; root only | Plum footer, category/company/contact navigation, phone/email, enquiry CTA |
| [ProductCard](../../components/ProductCard.tsx) | `{ product: typeof PRODUCTS[number] }` | Server-safe; home, catalogue, related products | Linked next/image stage, name/category/style and image ViewTransition; comparison checkboxes belong to catalogue, outside card links |
| [SeatFinder](../../components/SeatFinder.tsx) | None | Client; home | Four workspace choices, local selected state, category suggestions and accessible update |
| [ContactForm](../../components/ContactForm.tsx) | `{ mode?: 'contact' \| 'quote'; models?: string[] }` | Client; contact and quote | Native labeled fields; prepare/review local draft; mailto link; clipboard feedback and selectable fallback. Does not call API or claim delivery |
| [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx) | None | Page-local client; products Suspense | Category/search/sort/view/page, up to three comparison selections, inline table and quote handoff |
| [ProductGallery](../../app/products/[slug]/ProductGallery.tsx) | `{ slug: string; name: string; images: { src, alt, label }[] }` | Detail-local client | Up to three verified photos, keyboard thumbnail selection, zoom, ViewTransition; one current photo per product |

## Retained unmounted components

| Component | Constraint before reuse |
|---|---|
| [ScrollReveal](../../components/ScrollReveal.tsx) | Native IntersectionObserver/Web Animations; honors reduced motion. Currently unused; do not assume page-wide reveal infrastructure |
| [ImageCarousel](../../components/ImageCarousel.tsx) | Optional images; missing default/fallback files and one existing raw-img lint warning. Supply real assets and test before mounting |
| [PageTransition](../../components/PageTransition.tsx) | Undefined transition-fade class and empty transition callback; not the active product image transition mechanism |
| [Experience](../../components/Experience.tsx) | Contains unverified business stats. Do not mount without confirming content |

Buttons/fields/chips/FAQ rows are native markup with shared CSS classes, not a generic component framework. There is no modal, toast, tooltip or third-party table system. Use only the necessary interaction for the requested feature.
