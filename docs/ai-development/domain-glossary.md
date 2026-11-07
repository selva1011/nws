# Domain Glossary

Defines terminology used in the NWS codebase, copy, and business context. Implementation terms are derived from source. Marketing/service descriptions explain page copy and are not independent verification of actual services or credentials. Sources: [catalogue](../../app/products/page.tsx), [services](../../app/services/page.tsx), [company](../../app/company/page.tsx).

Terms marked ⚠️ **require confirmation** are inferred from the source and have not been explicitly confirmed by the business owner.

---

## Product Terminology

**Chair category** — A classification applied to every product in `ALL_CHAIRS`. Current verified categories:
- `Executive` — Catalogue category whose current entries use the High Back descriptor; material/adjustment specifications are not in the data. Examples: BUTTERFLY HB, JAZZ HB, OSLO HB, VENTO HB, ZOOM HB.
- `Task` — Catalogue grouping including Medium Back, Mesh Chair, and generic Chair descriptors. Examples: 803 NETTED MB, ACCORD MB, FLASH MB, ECCO MB.
- `Visitor` — Catalogue grouping with Visitor / Visitor Chair descriptors; wheel configuration is not modeled. Examples: 8024-D Visitor, EV-05 Visitor, GILMA VC.
- `Sofa` — Catalogue grouping containing Metro and visitor three-seater models. Examples: METRO SOFA, Visitor 3 Seater Sky Sofa.
- `Training` — Two Flip Training Chair entries distinguished by With Pad / Without Pad; stackability is not modeled. Examples: Flip Training Chair (with/without pad).

**HB** — High Back. Used in product names (e.g., BUTTERFLY HB, HILITE HB).

**MB** — Medium Back. Used in product names (e.g., BUTTERFLY MB, HILITE MB).

**VC** — Visitor Chair. Used in product names (e.g., GILMA VC, SOLITAIRE VC).

**`sub`** — The second-line descriptor shown under a product name on product cards. Examples: "High Back", "Medium Back", "Visitor Chair", "Mesh Chair", "Sofa". This is a display label, not a category filter. ⚠️ *Confirm: is this the same as the product variant or model suffix?*

**`cat`** — The category field on each product data object. Used by the filter tabs on the Products page. Current product values are `"Executive"`, `"Task"`, `"Visitor"`, `"Sofa"`, `"Training"`. `"All"` is a filter option, not a product category. Query normalization is documented in [Data flow](data-flow.md).

---

## Services Terminology

**Turnkey fitout** — A complete office fit-out service from civil work through furniture and AV integration, delivered ready for occupancy. Used in `app/services/page.tsx`.

**Trade-in** — NWS assesses existing furniture, offers a valuation, and handles disposal or refurbishment. Used in `app/services/page.tsx`.

**Space planning** — Design service that creates AutoCAD floor plans and 3D visualizations before furniture is ordered. Used in `app/services/page.tsx`.

---

## Company Terminology

**Certifications** — Labels rendered in `app/company/page.tsx`: ISO 9001, ISO 14001, BIFMA, GreenGuard, MAKE IN INDIA. Actual certification status is unverified; obtain owner confirmation before relying on these claims.

**NWS** — Node Workspace Solutions. The company abbreviation used in the codebase, metadata, and branding.

**`nwsworkspace.com`** — The intended production domain; live deployment was not verified. Used in `metadataBase` in `app/layout.tsx`.

---

## Technical Terminology

**App Router** — The Next.js routing system used in this project. Pages are `page.tsx` files inside `app/` subdirectories. Contrasts with the Pages Router (not used here).

**Server Component** — A component rendered on the server into the React Server Component payload, with HTML produced during prerendering. Does not use client state/effect hooks or browser APIs. Check import boundaries as well as directives. Default in Next.js App Router.

**Client Component** — A component inside a `"use client"` boundary. Can use client hooks, event handlers and browser APIs; may still have prerendered HTML. See [Architecture](architecture.md) for the catalogue Suspense exception.

**Turbopack** — The bundler used by the configured Next.js 16.3 dev and build commands; build output confirms it. No comparative speed benchmark was performed.

**`BASE`** — A constant defined in page files as the URL prefix for product images:
```ts
const BASE = "/products images/";
```
Used in both `app/page.tsx` and `app/products/page.tsx`. Note the space in the directory name.

---

## Terms Requiring Confirmation

The following terms appear in the source but their business definitions have not been confirmed:

- ⚠️ **"ergonomic zoning"** — used in services copy (`Space Planning & Design` feature list). Likely means grouping workstation types by function (focus, collaboration, etc.).
- ⚠️ **"Kaable"** — product brand or model line name used in `KAABLE-CHAIR.jpeg` and `Kaable-Mesh Visitor.jpeg`. Spelling is as-is in the source.
- ⚠️ **"Accord MB"** — product model. "Accord" may be a brand name or internal model designation.
- ⚠️ **Team members** (Arjun Mehta, Priya Nair, Karan Shetty, Meena Choudhury) — declared in `app/company/page.tsx` (`TEAM` constant) but never rendered. Confirm if these are real employees before rendering.
- ⚠️ **Milestones** (2010–2023 timeline) — declared in `app/company/page.tsx` (`MILESTONES` constant) but never rendered. Confirm accuracy before rendering.
