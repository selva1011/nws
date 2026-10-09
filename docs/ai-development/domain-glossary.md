# Domain Glossary

Defines terminology used in the NWS codebase, copy, and business context. Every definition is derived from verified source code, page content, or explicit observation.

Terms marked ⚠️ **require confirmation** are inferred from the source and have not been explicitly confirmed by the business owner.

---

## Product Terminology

**Chair category** — A classification applied to every product in `ALL_CHAIRS`. Current verified categories:
- `Executive` — High-back chairs, premium seating, typically leather or mesh with adjustable lumbar. Examples: BUTTERFLY HB, JAZZ HB, OSLO HB, VENTO HB, ZOOM HB.
- `Task` — Medium-back or mesh chairs for general office use. Examples: 803 NETTED MB, ACCORD MB, FLASH MB, ECCO MB.
- `Visitor` — Chairs without wheels, intended for guest or waiting areas. Examples: 8024-D Visitor, EV-05 Visitor, GILMA VC.
- `Sofa` — Multi-seat seating. Examples: METRO SOFA, Visitor 3 Seater Sky Sofa.
- `Training` — Stackable or flipper chairs for training rooms. Examples: Flip Training Chair (with/without pad).

**HB** — High Back. Used in product names (e.g., BUTTERFLY HB, HILITE HB).

**MB** — Medium Back. Used in product names (e.g., BUTTERFLY MB, HILITE MB).

**VC** — Visitor Chair. Used in product names (e.g., GILMA VC, SOLITAIRE VC).

**`sub`** — The second-line descriptor shown under a product name on product cards. Examples: "High Back", "Medium Back", "Visitor Chair", "Mesh Chair", "Sofa". This is a display label, not a category filter. ⚠️ *Confirm: is this the same as the product variant or model suffix?*

**`cat`** — The category field on each product data object. Used by the filter tabs on the Products page. Must match one of the `CATEGORIES` array values: `"All"`, `"Executive"`, `"Task"`, `"Visitor"`, `"Sofa"`, `"Training"`.

---

## Services Terminology

**Turnkey fitout** — A complete office fit-out service from civil work through furniture and AV integration, delivered ready for occupancy. Used in `app/services/page.tsx`.

**Trade-in** — NWS assesses existing furniture, offers a valuation, and handles disposal or refurbishment. Used in `app/services/page.tsx`.

**Space planning** — Design service that creates AutoCAD floor plans and 3D visualizations before furniture is ordered. Used in `app/services/page.tsx`.

---

## Company Terminology

**Certifications** — Verified from `app/company/page.tsx`: ISO 9001, ISO 14001, BIFMA, GreenGuard, MAKE IN INDIA.

**NWS** — Node Workspace Solutions. The company abbreviation used in the codebase, metadata, and branding.

**`nwsworkspace.com`** — The production domain. Used in `metadataBase` in `app/layout.tsx`.

---

## Technical Terminology

**App Router** — The Next.js routing system used in this project. Pages are `page.tsx` files inside `app/` subdirectories. Contrasts with the Pages Router (not used here).

**Server Component** — A React component that renders on the server and sends HTML to the client. Has no `"use client"` directive and cannot use hooks or browser APIs. Default in Next.js App Router.

**Client Component** — A React component with `"use client"` as the first line. Can use hooks, event handlers, and browser APIs. Hydrated in the browser.

**Turbopack** — The Rust-based bundler used by Next.js 16 in development mode. Faster than webpack. Production build still uses the standard Next.js bundler.

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
