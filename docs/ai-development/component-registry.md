# Component registry

Shared component files export default components. Import directly using `@/components/Name`; no barrels, shared primitive library, variants system, custom hooks, or providers exist. [Frontend contracts](frontend-guidelines.md) · [Styles](design-system.md).

## Shared and standalone components

| Component / source | Props | Boundary / consumer | Behavior and reuse constraints |
|---|---|---|---|
| [Header](../../components/Header.tsx) | None | Client; root layout only | Sticky 74px navigation; pathname matching includes nested product routes and aria-current; local open state; phone and quote actions. Do not remount inside pages. Mobile disclosure exposes expanded/controls; closed contents are inert. |
| [Footer](../../components/Footer.tsx) | None | Server; root layout only | Scroll-revealed CTA, category/company navigation, telephone/email links, logo and copyright. |
| [ContactForm](../../components/ContactForm.tsx) | None | Client; contact page only | Fixed POST contact contract, HTML inputs, loading/success/error feedback. Reuse for the same contact workflow; not configurable for quote fields. Undefined CSS properties require care. |
| [ImageCarousel](../../components/ImageCarousel.tsx) | `{ images?: string[] }` | Client; no current consumer | Horizontal scroll-snap gallery; ref scrolls one viewport per arrow; Previous/Next labels. Generic indexed alt text; no disabled end state. Default `/chairs/chair1.jpg`–`chair3.jpg` and error fallback `/placeholder-chair.jpg` are absent; pass real assets explicitly. Test/fix before mounting. |
| [PageTransition](../../components/PageTransition.tsx) | `{ children: ReactNode }` | Client; no current consumer | Pathname effect feature-detects `startViewTransition`, invokes empty callback, keys wrapper by pathname, polite live region. `transition-fade` has no project CSS definition; no demonstrated route animation. Do not assume this is active infrastructure. |
| [Experience](../../components/Experience.tsx) | None | Client directive; no hooks; no current consumer | Three local stats (18 years, 420 projects, 96 clients), undefined color variables. Values differ from marketing page claims; confirm business data before mounting. |

## Product and motion components

| Component / source | Contract | Usage |
|---|---|---|
| [ProductCard](../../components/ProductCard.tsx) | `{ product: typeof PRODUCTS[number] }` | Linked, optimized image card; home, catalogue and related products. Server-safe; included in client catalogue bundle when imported there |
| [ScrollReveal](../../components/ScrollReveal.tsx) | `{ children: ReactNode; className?: string }` | Client boundary for IntersectionObserver/Web Animations reveal; home, catalogue, details and footer. Content stays visible without JS; respects live reduced-motion changes and cleans up observers/animations |
| [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx) | None | Client query/search/view/page controls, under the server catalogue's Suspense boundary |
| [ProductGallery](../../app/products/[slug]/ProductGallery.tsx) | `{ name: string; images: { src, alt, label }[] }` | Detail-local client component; takes one to three valid images, shows explicit unavailable slots, selection and zoom |

## Reuse decisions

- Need site navigation/footer: already present through layout; edit the existing component.
- Need same contact form: use ContactForm and inspect its handler contract; its success message does not establish delivery.
- Need category navigation or product presentation: reuse ProductCard and inspect the local catalogue content contract.
- Buttons, labels, fields, service cards and badges are inline native markup, not reusable APIs. Preserve the closest appropriate pattern and add focus/loading/disabled semantics as part of authorized UI work.
- Native catalogue comparison/specification tables exist; no generic table library, dialog, tooltip, toast or dropdown API exists. Quote uses native select controls; Header uses a custom disclosure. Do not invent registry entries for absent UI.

Potential reuse is not permission to mount unused components or alter visible behavior. Update this registry when props, exports, consumers, or reuse limitations change.
