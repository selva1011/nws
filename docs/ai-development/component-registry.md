# Component registry

All six files export a default component. Import directly using `@/components/Name`; no barrels, shared primitive library, variants system, custom hooks, or providers exist. [Frontend contracts](frontend-guidelines.md) · [Styles](design-system.md).

## Shared and standalone components

| Component / source | Props | Boundary / consumer | Behavior and reuse constraints |
|---|---|---|---|
| [Header](../../components/Header.tsx) | None | Client; root layout only | Sticky 74px navigation; pathname equality selects visual active link; local open state; phone and quote actions. Do not remount inside pages. Mobile accessibility limitations in issue register. |
| [Footer](../../components/Footer.tsx) | None | Server; root layout only | Logo, quick links, contact copy; local unused solutions array. Social/legal spans are not working links. |
| [ContactForm](../../components/ContactForm.tsx) | None | Client; contact page only | Fixed POST contact contract, HTML inputs, loading/success/error feedback. Reuse for the same contact workflow; not configurable for quote fields. Undefined CSS properties require care. |
| [ImageCarousel](../../components/ImageCarousel.tsx) | `{ images?: string[] }` | Client; no current consumer | Horizontal scroll-snap gallery; ref scrolls one viewport per arrow; Previous/Next labels. Generic indexed alt text; no disabled end state. Default `/chairs/chair1.jpg`–`chair3.jpg` and error fallback `/placeholder-chair.jpg` are absent; pass real assets explicitly. Test/fix before mounting. |
| [PageTransition](../../components/PageTransition.tsx) | `{ children: ReactNode }` | Client; no current consumer | Pathname effect feature-detects `startViewTransition`, invokes empty callback, keys wrapper by pathname, polite live region. `transition-fade` has no project CSS definition; no demonstrated route animation. Do not assume this is active infrastructure. |
| [Experience](../../components/Experience.tsx) | None | Client directive; no hooks; no current consumer | Three local stats (18 years, 420 projects, 96 clients), undefined color variables. Values differ from marketing page claims; confirm business data before mounting. |

## Local catalogue components

| Component / source | Contract | Usage |
|---|---|---|
| ChairTile in [app/page.tsx](../../app/page.tsx) | `{ chair: { label: string; type?: string; img: string; alt: string; isViewAll?: boolean }; onClick: () => void }` | Category navigation button, square image, hovered zoom; `isViewAll` affects label styling but current CHAIRS omit it |
| ChairCard in [app/products/page.tsx](../../app/products/page.tsx) | `{ chair: typeof ALL_CHAIRS[0] }` | Display-only div, 4:5 contained image, hover color/zoom; no price/detail/quote action |
| ProductsFallback in same file | None | Header-only Suspense fallback; duplicate header content must stay consistent if edited |
| ProductsContent in same file | None | Owns query category, pagination and grid; do not lift outside Suspense without checking rendering |

## Reuse decisions

- Need site navigation/footer: already present through layout; edit the existing component.
- Need same contact form: use ContactForm and inspect its handler contract; its success message does not establish delivery.
- Need category navigation or product presentation: inspect ChairTile/ChairCard first. They serve different semantics; only extract a shared component after an actual second use and authorized structural change.
- Buttons, labels, fields, service cards and badges are inline native markup, not reusable APIs. Preserve the closest appropriate pattern and add focus/loading/disabled semantics as part of authorized UI work.
- No dialog, tooltip, toast, data table, dashboard, skeleton library, or general dropdown API exists. Quote uses native select controls; Header uses a custom disclosure. Do not invent registry entries for absent UI.

Potential reuse is not permission to mount unused components or alter visible behavior. Update this registry when props, exports, consumers, or reuse limitations change.
