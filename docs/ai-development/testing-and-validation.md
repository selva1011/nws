# Testing and validation

Validation for the **2026-11-18 redesign session**. Current results replace the older default-build failure snapshot. Source checks and HTTP responses do not prove visual quality, client interaction correctness, accessibility compliance or email delivery.

## Required checks

Executed in order after the implementation, then repeated after the final contrast/cascade correction:

| Command | Result |
|---|---|
| `npm run lint` | Exit 0; 0 errors, 1 existing `@next/next/no-img-element` warning in unmounted `components/ImageCarousel.tsx:31` |
| `npx tsc --noEmit` | Exit 0; no diagnostics |
| `npm run build` | Default Next.js 16.3 Turbopack build; compiled, typechecked and generated successfully |
| `git diff --check` | No whitespace errors |

No packages, package scripts, dependency lockfiles or config were changed. Edited TSX/CSS was formatted using the already-installed VS Code Prettier extension CLI; no formatter was installed or added to package.json.

## Production smoke checks

`npm run start -- --port 3001` initially failed with sandbox EPERM; approved execution started successfully. The temporary owned server was stopped after checks. This also verifies that start can use the completed production build. For development use `npm run dev`; for production run build successfully before start.

HTTP smoke run: **43 requests**, consisting of the seven marketing routes, a category query, robots, sitemap, all 32 products and an unknown product. Known routes returned 200; unknown product returned 404. Synthetic quote query included two known models and one invalid ID; rendered text contained only the two known model names.

The unknown-product request also produced a framework `Internal: NoFallbackError` log while the response was 404. No assertion of clean runtime logs is made; investigate this framework diagnostic if it occurs for known product URLs.

HTML assertions on returned marketing/product pages: exactly one main and H1; all rendered label `for` targets exist; quote text explains that the visitor must send the email. These inspect server output and do not exercise hydrated catalogue/form controls. No personal data was submitted and no email was sent.

## Source, assets and docs

- Catalogue assertions: 32 unique slugs, all original image paths present, distinct training variants, null/empty/case/prefix/unknown category resolution.
- Original catalogue records/product files/logo unchanged. No new imagery, environment values or dependencies added.
- Local documentation links resolve; the managed Next.js AGENTS block is byte-for-byte unchanged.
- Custom shared styles use Tailwind’s components layer so responsive utilities can override display/spacing/type. No old cyan/navy literals remain in mounted redesigned UI (original logo artwork is retained).

Calculated core text contrast from sRGB token values:

| Foreground / background | Ratio |
|---|---|
| White / primary plum | 10.85:1 |
| White / dark plum | 14.90:1 |
| Muted `#685F6E` / lavender | 4.88:1 |
| Muted / product stage | 5.34:1 |
| Muted / editorial beige | 4.95:1 |
| Footer supporting text / dark plum | 8.75:1 |

These are token calculations, not a full rendered-state/contrast audit.

## Browser verification blocker

Computer-use inventory returned **browser access host unavailable**. Native Chrome access then timed out. No browser screenshots or 375px/1280px interaction checks were completed. Do not describe the redesign as visually or end-to-end verified until the checklist below is run in an available browser.

## Manual acceptance checklist still required

| Area | Cases |
|---|---|
| Responsive layouts | All seven pages and representative long-name product at 375px/1280px; 640/768/1024px transitions; zoom; no page overflow; tables scroll within their regions |
| Header | Mobile open/close; closed links absent from tab order; Escape returns focus; navigation closes menu; active nested product route; sticky clearance |
| Finder and FAQs | Four choices update copy/image/category links; keyboard and touch; FAQ/service disclosure toggles |
| Catalogue | Direct `type` and legacy `category`; precedence, invalid/case/prefix inputs; category changes/back/forward reset page; search empty state and clear; A–Z/Z–A; grid/table consistency; eight/page |
| Comparison | Select 1/2/3, fourth disabled; remove/clear; preserve across filters/search/page/view; open/close focus; horizontal table scroll; valid shortlist arrives in quote |
| Product | Original image, zoom, thumbnail key support, related links, correct product-to-quote link, no fabricated specs |
| Forms | Native required/email validation; prepare synthetic enquiry; fields/model quantities in draft; editing invalidates old draft; opening email draft does not claim delivery; clipboard success/failure fallback; no automatic request/reset |
| Motion/accessibility | Reduced-motion preference, focus visibility, touch targets, screen-reader announcements and selected states |
| Production | Owner verifies phone/email, hosted route/image availability and actual sending through an email client |

There is no configured unit/E2E test runner or tracked CI. No Lighthouse, live deployment, inbox receipt or screen-reader audit was performed. New tooling/integrations need an authorized task.
