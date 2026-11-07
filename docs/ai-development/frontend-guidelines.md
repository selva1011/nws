# Frontend engineering and UI/UX quality contract

[Design system](design-system.md) describes what exists; this file distinguishes established patterns from requirements for future authorized UI work. [Registry](component-registry.md) identifies reusable APIs. A documentation task does not authorize visual changes.

## Established implementation conventions

- Server Components by default; client directives where hooks, handlers or browser APIs require them. Existing client pages must be inspected before removing directives. Company/services use navigation and hover handlers; they are not immediately server-safe.
- Flat shared components, page-local helpers, direct imports with `@/` or relative paths. Props are inline object types; ProductCard derives its shape from PRODUCTS. Do not introduce type/data folders without authorization.
- State lives with its owner. Catalogue active category is URL-derived, not duplicated local filter state. [Data flow](data-flow.md) is the canonical behavioral specification.
- Tailwind layout/spacing/responsive utilities plus inline component values; existing global utilities before new classes. No additional styling system.
- Content arrays are local; app/products/catalogue.ts is shared by catalogue consumers. Avoid speculative abstractions or dependencies.
- Names: PascalCase components/files; framework `page.tsx`; module constants often SCREAMING_SNAKE_CASE; state/handlers camelCase. No enforced import-order formatter.
- Use ContactForm's asynchronous pending/error/reset structure for comparable form behavior after verifying the endpoint. Its color variables now map to the established palette; do not copy quote's success-only handler.

## Source-based experience assessment

| Principle | Current evidence | Improvement direction (not implemented) |
|---|---|---|
| Clarity/hierarchy | Strong hero, category tiles, section eyebrows, obvious quote CTAs | Align “Shop Now” and alternate-angle copy with actual browsing/zoom capability |
| Consistency | Shared shell, semantic palette/motion variables, cyan identity and reusable product cards | Consolidate remaining legacy inline controls only within affected feature work |
| Restraint | Phone motion is interaction-triggered; product results move as one region and selected sections reveal once | Keep new motion tied to continuity or state feedback |
| Feedback/trust | Contact pending/error text; quote success with no delivery | Correct submission semantics before decorative polish |
| Accessibility | Landmarks/skip link, disclosure state, selected catalogue/gallery controls, alt text and ContactForm labels/live feedback | Fix remaining quote labels and complete browser/AT checks |
| Responsiveness | Responsive grids and mobile header | Verify narrow quote layout and header/filter sticky offset |
| Performance | Static routes, few dependencies, aspect-ratio product frames | Measure image cost and client boundary impact |
| Delight | Stable gallery crossfades, shared product-image route transition and restrained hover changes | Verify touch and browser-specific transition behavior before adding more motion |

## Required considerations for future UI changes

1. **Purpose and composition:** state the user's goal, primary action, hierarchy and expected next step. Keep copy honest about capabilities; confirm business claims before adding them. Preserve brand rather than imitating another product's visual identity.
2. **Responsive planning:** inspect 375px and 1280px views plus relevant breakpoint transitions. Preserve readable line lengths/gutters and purposeful density. Test long labels, zoom, sticky stacking and horizontal overflow; avoid arbitrary fixed widths that constrain content.
3. **Semantics and keyboard:** use links for navigation and buttons for actions; associate every form label with its control. Provide visible focus. Disclosure controls should expose expanded/controlled state and closed content should not remain keyboard-accessible. Selected filters and current pagination need programmatic state. Use appropriate landmarks/headings.
4. **Complete states:** define pending, disabled, success, error/retry and empty states where relevant. Success must correspond to the actual operation. Preserve user input after failure; avoid duplicate submissions. No need to add skeletons where loading does not occur.
5. **Motion:** keep transitions purposeful, respect reduced-motion preferences, and avoid hover-only information. Prefer CSS hover/focus variants over direct DOM mutations; use React state when interaction state affects actual content. Do not add animation libraries for minor effects.
6. **Visual consistency:** use the established palette and spacing patterns, existing utilities and contextual radii. Token consolidation is proposed work requiring scope, not a claim that a full token system exists. Avoid unexplained gradients, excessive glass effects and decorative complexity.
7. **Accessibility verification:** test keyboard order, focus recovery, screen-reader labels/status announcements, contrast and zoom for affected UI. Current source inspection is not certification of WCAG compliance.
8. **Rendering and media:** preserve metadata/Suspense contracts; keep unnecessary client JavaScript out of new static content. Use next/image for new images with meaningful alt text and stable sizing. Configuration changes still require authorization.
9. **Type/data boundaries:** reuse local inferred contracts, avoid unnecessary any, and validate network input at runtime. Never infer authorization or persistence from frontend state.

The current site has no shared modal, toast, table, tooltip, dashboard or empty-state system. Add only the interaction needed by the approved feature; do not build a general framework first. [Known issues](known-issues.md) owns severity and next actions, and [Testing](testing-and-validation.md) owns verification procedures.
