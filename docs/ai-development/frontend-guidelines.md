# Frontend quality contract

Current design direction: [Design system](design-system.md). State contracts: [Data flow](data-flow.md). Components: [Registry](component-registry.md). Updated for the **2026-11-19** white showroom catalogue; the dark, plum/lavender and cyan directions are superseded.

## Product priorities

1. Help visitors identify the setting they are furnishing, discover suitable categories and inspect actual product photographs.
2. Make the collection easy to scan: category groups on shared grid tracks, aligned chair bases, the model name under every photo, and a dedicated detail page with a product-aware enquiry.
3. Make the next action clear. The current form prepares an email; the visitor must send it. Never claim receipt, delivery or a response deadline from a local state update.
4. Keep prices, specifications, warranties, certifications and availability honest. Catalogue names/categories/styles are known; additional facts require business verification.

## Engineering conventions

- Keep page shells server-rendered; isolate client code in Header, SeatFinder, CatalogueBrowser, BackToCatalogue, ProductGallery and ContactForm. Keep CatalogueView and ProductCard hook-free so the catalogue prerenders.
- Preserve the catalogue `useSearchParams`/Suspense contract, query aliases and training-variant slugs. Keep metadata out of Client Components.
- Reuse local catalogue records, direct imports and inferred prop types. No speculative global store, service layer or primitive library.
- Use role-based CSS tokens and existing utilities with Tailwind layout. Keep the white/charcoal/yellow direction: yellow only as primary-action fill, charcoal for selection, deeper gold for small accents, near-black focus.
- Use next/image and stable aspect ratios. Show product photos from `/product-display/` on `.product-stage` (bottom-aligned in tiles); keep originals for metadata. Regenerate display copies with the framing script when photos change. Avoid fabricated angles, fake reviews or stock photography described as the real team/showroom.
- Use links for navigation (including the category selector and whole product tiles), buttons for state changes, labeled native fields, details for simple disclosures and semantic tables for specifications.

## Accessibility and complete states

- Verify 390px, 768px, 1024px and 1440px layouts, breakpoint edges, zoom and horizontal overflow. Tables may scroll inside their labeled regions; pages should not.
- Maintain visible keyboard focus, skip link, menu expanded state and current category state. Closed menus must leave the focus order.
- Pair every colour state with a non-colour cue (outline weight, ✓, underline, label or icon) and keep text ≥4.5:1 and control boundaries ≥3:1 against their surface; the [Design system](design-system.md) lists the verified pairs and state treatments.
- Keep the category in the URL so Back/Forward restore filter and scroll. Hover-only effects must be scoped to `(hover: hover) and (pointer: fine)`, mirrored on `:focus-visible`, and must not change layout. Show only verified product attributes; use "View details" when data is sparse.
- Enquiry preparation uses native required/email validation; optional fields stay optional. Editing details invalidates the old draft. Clipboard failures retain a selectable text fallback. Never silently send an enquiry or reset unsent details.
- Respect reduced motion and avoid hover-only information. Keep animation secondary to content and selection feedback.
- Readability/semantic source checks are not an accessibility certification. Record actual browser, assistive-technology and contrast checks in [Testing](testing-and-validation.md).

## Scope

The redesign request authorizes the current complete UI and interaction changes. Later tasks follow AGENTS.md scope rules. Additional integrations, providers, dependencies, environment variables and delivery promises still require a concrete task. Retain the local repository deployment target unless explicitly changed.
