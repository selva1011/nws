# Frontend quality contract

Current design direction: [Design system](design-system.md). State contracts: [Data flow](data-flow.md). Components: [Registry](component-registry.md). Updated for the **2026-11-18** redesign; previous palette restrictions are superseded by this authorized change.

## Product priorities

1. Help visitors identify the setting they are furnishing, discover suitable categories and inspect actual product photographs.
2. Support a manageable shortlist: searchable/sortable results, up to three models compared side by side, and a product-aware enquiry.
3. Make the next action clear. The current form prepares an email; the visitor must send it. Never claim receipt, delivery or a response deadline from a local state update.
4. Keep prices, specifications, warranties, certifications and availability honest. Catalogue names/categories/styles are known; additional facts require business verification.

## Engineering conventions

- Keep page shells server-rendered; isolate state in Header, SeatFinder, CatalogueBrowser, ProductGallery and ContactForm. Company/services no longer need client boundaries.
- Preserve the catalogue `useSearchParams`/Suspense contract, query aliases and training-variant slugs. Keep metadata out of Client Components.
- Reuse local catalogue records, direct imports and inferred prop types. No speculative global store, service layer or primitive library.
- Use semantic CSS tokens and existing utilities with Tailwind layout. New design choices must remain coherent with the authorized direction, not the superseded cyan UI.
- Use next/image, original product paths and stable aspect ratios. Avoid fabricated angles, fake reviews or stock photography described as the real team/showroom.
- Use links for navigation, buttons for state changes, labeled native fields, details for simple disclosures and semantic tables for comparisons.

## Accessibility and complete states

- Verify 375px/1280px layouts, breakpoint edges, zoom and horizontal overflow. Tables may scroll inside their labeled regions; pages should not.
- Maintain visible keyboard focus, skip link, menu expanded state, checkbox labels and current pagination state. Closed menus must leave the focus order.
- Show clear empty-search recovery and a maximum-three selection state. Keep selected models while changing category/search/page/view. Focus comparison content on opening and restore focus on closing.
- Enquiry preparation uses native required/email validation; optional fields stay optional. Editing details invalidates the old draft. Clipboard failures retain a selectable text fallback. Never silently send an enquiry or reset unsent details.
- Respect reduced motion and avoid hover-only information. Keep animation secondary to content and selection feedback.
- Readability/semantic source checks are not an accessibility certification. Record actual browser, assistive-technology and contrast checks in [Testing](testing-and-validation.md).

## Scope

The redesign request authorizes the current complete UI and interaction changes. Later tasks follow AGENTS.md scope rules. Additional integrations, providers, dependencies, environment variables and delivery promises still require a concrete task. Retain the local repository deployment target unless explicitly changed.
