# NWS: product and implementation context

Verified from repository source and installed/locked packages on **2026-11-07**. This is orientation, not a requirement to read the entire knowledge base. [Task index](../../AGENTS.md) · [Source map](repository-map.md).

## Product and journeys

NWS presents ergonomic office seating and workspace services for a Chennai business. Source copy addresses startups, corporates, hospitals, institutions, and Indian professionals ([home](../../app/page.tsx), [company](../../app/company/page.tsx), [services](../../app/services/page.tsx)). The likely primary users are workplace buyers and project decision makers; that persona is an inference, not user research.

| Journey | Actual implementation | Boundary |
|---|---|---|
| Discover seating | Home category tiles → `/products?type=…` → filter and paginate 32 records | No prices, product detail pages, cart, checkout, or inventory |
| Evaluate company/services | Company mission/certifications and six service cards → `/quote` | Marketing claims are content, not independently verified credentials |
| Request a quote | Eight controlled fields → local success screen | No network request or durable lead |
| Contact | `/contact` → ContactForm → POST `/api/contact` | HTTP success acknowledges logging only |
| Call | Header `tel:` anchors | Opens the device's calling handler; actual phone ownership/delivery unverified |

The site is public. `/about` is a generic stub separate from `/company`. `/contact` is implemented but not linked by the header/footer. Business metrics, warranty/certification claims, contact details, and response promises require owner confirmation before reuse or expansion.

## System in one paragraph

One Next.js App Router application, one root layout, seven page routes, one POST endpoint. Root layout imports global CSS and mounts Header (client) and Footer (server). Five pages are client entry points; contact and about are server pages. Content stays in local arrays/JSX. Products derive category from the URL and pagination from local state; contact is the only application `fetch`. There are no providers, custom hooks, service modules, global stores, server actions, database, CMS, auth, or application cache/revalidation layer. Three standalone components are unmounted. See [Architecture](architecture.md) for boundaries and [Data flow](data-flow.md) for behavior.

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

Global CSS and root layout affect every page. Header affects all navigation and calling links. Home category values are coupled to catalogue normalization. Catalogue Suspense is required for its query hook in a static build. Contact UI success is not a delivery guarantee. Keep production behavior changes separately authorized from documentation maintenance.
