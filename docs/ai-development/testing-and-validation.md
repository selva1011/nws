# Testing and validation

Validation for the **2026-11-19 white showroom session** (white/charcoal/yellow palette, rebuilt catalogue, framed display photos, detail-page changes; logo artwork stays removed). Results replace the earlier dark-theme snapshot. Source checks and HTTP responses do not prove email delivery, assistive-technology compatibility or cross-browser rendering.

## Required checks

Executed in order on the final code:

| Command | Result |
|---|---|
| `npm run lint` | Exit 0; 0 errors, 1 existing `@next/next/no-img-element` warning in unmounted `components/ImageCarousel.tsx:31` |
| `npx tsc --noEmit` | Exit 0; no diagnostics |
| `npm run build` | Next.js 16.3 Turbopack; compiled, typechecked, 45 pages generated |
| `git diff --check` | No whitespace errors |

No packages, package scripts, lockfiles or config were changed. `scripts/frame-product-photos.swift` is a standalone macOS utility, not wired into any script or build. Editor Tailwind "canonical class" hints were left to match the existing `[var(--x)]` convention; they are not lint errors.

## Photo framing

- Measured all 32 originals: chair content fills 45–98% of the frame height; top margins 1–31%, bottom 0–23%. Generated 32 framed copies (3.7 MB) into `public/product-display/`; `git status` shows originals unchanged. No EXIF orientation tags; profiles untagged/sRGB, preserved by ImageIO.
- Before applying the treatment, a tall executive chair (VENTO HB), a wide visitor sofa (Visitor 3 Seater Sky Sofa) and a training chair (no stool exists in the catalogue), plus the worst-framed photos (8024-D, 803 NETTED MB, SPENCER, METRO SOFA, ZOOM HB), were rendered in the tile geometry. Originals floated at different heights and sizes; framed copies all sit on the baseline.

## Production checks (`npm run start -- --port 3001`, server stopped afterwards)

- All **38 sitemap URLs** return 200; unknown product 404. Each page has two "Node Workspace Solutions home" text links and no `logo.png` reference.
- `/products` static HTML contains all 32 tiles in five groups (Suspense fallback), so crawlers and pre-hydration visitors see the full catalogue.
- All 32 `/product-display/` files return 200; all 32 catalogue tile images loaded in Chrome (no broken images).
- Root HTML: `theme-color` `#ffffff`, `color-scheme` `light`. Compiled CSS contains no dark-theme values or removed utilities; the tile hover rules are inside `@media (hover:hover) and (pointer:fine)` and reduced motion sets `.product-tile .tile-photo{transform:none!important}`.

## Browser verification (Chrome, production build)

Exact viewport widths used a same-origin iframe (the 1440px view also ran in the real tab). No horizontal overflow at 1440, 1024, 768 or 390px.

| Area | Observed |
|---|---|
| Grid tracks | 8 × 147.5px at 1440, 6 × 149px at 1024, 5 × 131px at 768, 2 × 169px at 390; identical tracks in every group |
| Group cases | Full row (Task, first 8), partially filled final row (Task, 7 of 8), short groups (Training 2, Lounge & sofas 3) start left in normal-size slots; long names ("Visitor 3 Seater Sky Sofa", "Flip Training Chair (Without Pad)") wrap without breaking row alignment |
| Surfaces | Dark chairs, light-grey/white chairs (ZOOM HB, OSLO HB, METRO SOFA) and chrome/thin legs (8024-D, VS 6009-1, J-118-2) discernible on the `#F4F4F4` stage |
| Hover | Photo lifts −3px, reveal fades to opacity 1 ("View details →" for the sofa; "Mesh Chair →" for 805 MESH), gold name underline; **0 of 32 tiles moved** (bounding rects compared before/after) |
| Keyboard | Tab reaches tiles in order; focused tile shows 2px `#171717` outline, the same lift and reveal; Enter opens the detail page |
| Category + Back | Selecting Task updates the URL to `?type=Task`, keeps scroll (420px), shows one group and marks Task current. Detail → browser Back restores `?type=Task` at the same scroll (700px); Back again restores All at 420px; Forward restores Task at 700px |
| Back link | From the catalogue: "Back to task chairs" → `/products?type=Task#p-<slug>`, tile lands under the header. Saved All filter → "Back to all seating". Direct visit (storage cleared) or saved filter without the product → product's own category. Full load of `/products?type=Sofa#p-…` scrolls the tile into view |
| Detail page | Desktop: gallery beside category, name, style, Enquire and Call. 390px: gallery first, then name, Enquire and Call immediately after. Gallery photo blends into the stage (after fixing a blend-group bug). Call `tel:+919876543210`; accessible name now starts with the visible text |
| Gallery (multi-photo) | Exercised on the dev server with **temporary** extra photos on VENTO HB, reverted afterwards: Next button, stage ArrowRight (wraps), synthetic touch swipe left/right, thumbnail End (moves focus, updates `aria-pressed`); swipes did not toggle zoom |
| Enquiry | Enquire → `/quote?models=805-mesh` with "805 MESH (Mesh Chair)" preselected. Contact form: invalid email and empty message show `#B42318` outlines with browser messages; focus moves to the email field with the near-black outline. Nothing was sent |
| Other pages | Home, services, company, about, contact and footer render in the white theme; finder chips select with charcoal; console clean on reloaded pages |

## Contrast

Calculated from sRGB token values; full table in [Design system](design-system.md#contrast-calculated-from-token-values-wcag-2x). Minimums: main text 16.30:1, supporting text 8.06:1, near-black on yellow 10.89:1 (hover), white on charcoal 17.93:1, focus outline 16.44:1, deeper gold 4.61:1, control outlines 3.35:1, placeholder 4.89:1, error 6.03:1. These are token calculations plus visual review, not an automated rendered-contrast audit.

## Still not verified

| Area | Cases |
|---|---|
| Touch | One-tap navigation on a real touch device (verified only by hover rules being scoped to fine pointers and no click interception); real-finger swipe in the gallery |
| Browsers/devices | Safari, Firefox, iOS/Android, 200% zoom, forced colours |
| Motion | `prefers-reduced-motion` was checked in compiled CSS, not by toggling the OS setting |
| Accessibility | Screen-reader pass, full WCAG audit |
| Production | Owner verifies phone/email (the number looks like a placeholder), hosted image availability and actual sending |

There is no configured unit/E2E test runner or tracked CI. No Lighthouse, deployment, inbox receipt or screen-reader audit was performed.
