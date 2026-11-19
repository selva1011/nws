# NWS: product and implementation context

Product/source context updated **2026-11-18**; the package-version snapshot below retains its original verification date. This is orientation, not a requirement to read the entire knowledge base. [Task index](../../AGENTS.md) · [Source map](repository-map.md).

## Product and journeys

NWS is a Chennai office-seating catalogue for individuals and teams. The user authorized a complete UI/UX and palette redesign on **2026-11-18**, preserving the NWS name, logo and original product images. [Design system](design-system.md) supersedes the old cyan/navy visual rules.

| Journey | Current implementation | Boundary |
|---|---|---|
| Discover seating | Home categories and interactive four-setting finder → collection | Category guidance, not a verified ergonomic assessment |
| Choose a model | Search, sorting, URL categories, eight-per-page grid/table and up to three-model comparison | No prices, stock, saved account or checkout |
| Inspect a chair | 32 detail routes, original photo zoom, known catalogue facts and related models | Extra photos/specifications need verified source material |
| Plan seating | Product/shortlist slugs → quote form → review draft → mailto/copy | Visitor must send the email; no automatic delivery/storage |
| Contact | Contact form uses the same email-draft flow; phone/email links | Existing contact ownership needs business verification |

Company/services/about are brand-specific server-rendered pages. Unsupported certification, warranty, delivery and business-statistic promises were removed from mounted copy. Service scope and product details are confirmed on enquiry.

## System in one paragraph

One Next.js App Router app, seven fixed page routes, 32 product details and one legacy POST endpoint. Root layout mounts Header/Footer and owns the main landmark. All page entry files are Server Components with focused clients for navigation, finder, catalogue, gallery and enquiries. Quote reads searchParams and renders on demand; other marketing pages/product details prerender. Content stays local; catalogue.ts owns product records. No database, CMS, auth, global store, server action, automatic email service or application fetch remains in mounted UI. The legacy contact API still logs arbitrary submissions; it has no UI caller. Four standalone components are unmounted. See [Architecture](architecture.md) and [Data flow](data-flow.md).

## Toolchain snapshot

Versions agree between installed package metadata and `package-lock.json` on the verification date. These are volatile facts; recheck when dependencies change.

| Package/tool | Declared in package.json | Installed / locked |
|---|---|---|
| Next.js | `16.3.0` | `16.3.0` |
| React / React DOM | `19.2.8` | `19.2.8` each |
| TypeScript | `^5` | `5.9.3` |
| Tailwind / PostCSS plugin | `^4` | `4.3.3` each |
| ESLint | `^9` | `9.39.5` |
| eslint-config-next | `16.3.0` | `16.3.0` |
| Node | No engines field | Observed `v24.18.1`, not locked |

Sources: [package.json](../../package.json), [lockfile](../../package-lock.json), [TypeScript config](../../tsconfig.json), [PostCSS](../../postcss.config.mjs), [ESLint](../../eslint.config.mjs). npm is the mandated manager. Turbopack is used by the configured Next dev/build commands. Arial/Helvetica/system sans-serif is the actual font stack; the old README's Geist claim was incorrect.

## What to load next

- Implementation location: [Repository map](repository-map.md).
- Route or metadata work: [Routes and features](routes-and-features.md).
- Component reuse: [Registry](component-registry.md).
- State, filters, forms, API contract: [Data flow](data-flow.md).
- Visual values: [Design system](design-system.md); future UI quality: [Frontend guidelines](frontend-guidelines.md).
- Risk evaluation: [Known issues](known-issues.md), [Security](security.md), [Performance](performance.md).
- Workflow/checks/history: [Development workflow](development-workflow.md), [Testing](testing-and-validation.md), [Decision log](decision-log.md).

No separate feature directory is needed for the current small application: Data flow owns the complete catalogue and lead-form workflows. Add a feature document only when that flow outgrows this separation.

## High-impact boundaries

Global CSS and the root shell affect every route. Preserve the catalogue Suspense/query contract and original model slugs. Quote resolves only known catalogue IDs. Draft preparation is not delivery. Do not revive old palette rules or unsupported business claims. Validation results belong in [Testing](testing-and-validation.md).
