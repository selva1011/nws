# Routes and features

All implemented routes are public. All pages use [app/layout.tsx](../../app/layout.tsx), hence the shared Header/Footer. There are no administrative or authenticated areas.

| URL | Source / default export | Rendering and feature |
|---|---|---|
| `/` | [app/page.tsx](../../app/page.tsx) · Home | Client entry, static route; hero, four category tiles, catalogue/quote CTAs |
| `/company` | [app/company/page.tsx](../../app/company/page.tsx) · Company | Client entry, static; mission, badges, quote CTA; TEAM/MILESTONES unrendered |
| `/products` | [app/products/page.tsx](../../app/products/page.tsx) · Products | Static shell + Suspense fallback; ProductsContent reads query in browser; 32 chairs, six filters, eight items/page |
| `/services` | [app/services/page.tsx](../../app/services/page.tsx) · Services | Client entry, static; six services, four-step process, quote CTA |
| `/quote` | [app/quote/page.tsx](../../app/quote/page.tsx) · Quote | Client entry, static; controlled form → local success |
| `/contact` | [app/contact/page.tsx](../../app/contact/page.tsx) · ContactPage | Server page, static; mounts ContactForm |
| `/about` | [app/about/page.tsx](../../app/about/page.tsx) · AboutPage | Server page, static; generic placeholder content |
| `/api/contact` | [app/api/contact/route.ts](../../app/api/contact/route.ts) · POST | Dynamic handler; only explicit method is POST; [contract](data-flow.md) |
| `/sitemap.xml` | [app/sitemap.ts](../../app/sitemap.ts) · sitemap | Generated static metadata route; four placeholder-domain entries |

The successful alternate Webpack build also lists framework `/_not-found`. `app/favicon.ico` is an asset, not a marketing page. See [Testing](testing-and-validation.md) for observed build output.

## Navigation and query contract

Header links to home/logo, company, products, services, quote and a `tel:` URI. Footer quick links point to company/products/services/quote. Neither links to `/contact` or `/about`. Footer social abbreviations and Privacy/Terms text are spans, not navigation links.

Home tiles link to `/products?type=Executive`, `Task`, `Visitor`, or `Sofa`. Catalogue also accepts `category` as a fallback query key; exact normalization, query precedence, page reset, and browser-history implications are in [Data flow](data-flow.md). There is no product detail route or per-card action.

## Metadata and crawling

Root metadata defines `metadataBase` as `https://nwsworkspace.com`, site title/description and OpenGraph. Contact and about export page metadata. The five client pages inherit root metadata; do not add metadata exports directly to them.

Sitemap currently includes only `/`, `/about`, `/services`, `/contact` under `https://www.example.com`. It omits company/products/quote and sets `lastModified` with `new Date()` during generation, not from content history.

**`app/robot.ts` does not generate `/robots.txt`.** The installed convention is `app/robots.ts` (plural), documented in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`; the build route table has no robots route. The unused function also contains an example.com sitemap URL. Renaming/fixing it is proposed work, not part of documentation changes.

## Modification checks

For an authorized new route, start with the relevant local framework guide; reuse root shell; choose server/client ownership deliberately; inspect Header/Footer only if navigation changes are requested. Verify metadata/sitemap inclusion intentionally. For catalogue changes also inspect home category links. For forms follow [Data flow](data-flow.md) and [Security](security.md). Update this map when routes or metadata behavior change.
