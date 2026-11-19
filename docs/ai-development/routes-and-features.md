# Routes and features

All routes are public and use the root Header/Footer. Source and default build verified **2026-11-18**.

| URL | Source | Rendering / experience |
|---|---|---|
| `/` | [Home](../../app/page.tsx) | Static server shell; workspace image, five categories, interactive seating finder, featured models, FAQs |
| `/company` | [Company](../../app/company/page.tsx) | Static server page; NWS introduction and practical selection approach |
| `/products` | [Products](../../app/products/page.tsx) | Static metadata, shallow hero, grouped showroom grid (static "All" fallback) plus URL category filter (`?type=`, legacy `?category=`) |
| `/products/[slug]` | [Detail](../../app/products/[slug]/page.tsx) | 32 generated pages; back-to-catalogue link, gallery with zoom, verified catalogue fields/spec table, enquiry/call and related models; unknown slugs 404 |
| `/services` | [Services](../../app/services/page.tsx) | Static server page; six native service disclosures and three-step enquiry process |
| `/quote` | [Quote](../../app/quote/page.tsx) | Dynamic server shell resolves `models` query slugs; client email-draft form |
| `/contact` | [Contact](../../app/contact/page.tsx) | Static server shell; email/phone and client email-draft form |
| `/about` | [About](../../app/about/page.tsx) | Static brand introduction linking to company/collection; existing route retained |
| `/api/contact` | [POST](../../app/api/contact/route.ts) | Legacy logging-only endpoint; no current UI caller |
| `/sitemap.xml` | [Sitemap](../../app/sitemap.ts) | Main marketing pages and all product URLs |
| `/robots.txt` | [Robots](../../app/robots.ts) | Allows public pages, blocks /api/, references sitemap |

Header links to seating, services, company, contact and quote. Footer links to all categories and primary pages. About remains a secondary direct-access route and is omitted from the existing sitemap. No routes were added or removed.

Category aliases, precedence and local-state behavior are documented in [Data flow](data-flow.md). Quote’s models query contains catalogue slugs only. Unknown IDs are ignored; personal enquiry data is not placed in site URLs.

All seven fixed page files now export page-specific metadata/canonicals. Product details retain generated metadata and Product/BreadcrumbList JSON-LD. Catalogue retains ItemList and all-product fallback links. Root metadata uses the intended domain and Organization JSON-LD. No prices, reviews, certifications, stock or delivery promises are invented in structured data.

Sitemap, crawling declarations and local builds do not prove production indexing or deployment health. See [Testing](testing-and-validation.md).
