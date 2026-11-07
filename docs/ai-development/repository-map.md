# Repository map

Task → document → source. Paths are repository-relative below; open the affected implementation and its callers, not every file. [Bootstrap](../../AGENTS.md).

| Task / concept | Source files | Responsibility / related document |
|---|---|---|
| Shell, shared metadata, global styles | [app/layout.tsx](../../app/layout.tsx), [app/globals.css](../../app/globals.css) | Root HTML, only Header/Footer mounts, Tailwind import; [Architecture](architecture.md), [Design system](design-system.md) |
| Navigation, calls, mobile menu | [components/Header.tsx](../../components/Header.tsx) | `NAV_LINKS`, `open`, pathname styling, phone anchors; [Registry](component-registry.md) |
| Footer/contact text | [components/Footer.tsx](../../components/Footer.tsx) | Quick links, company contact text; social/legal text are not links |
| Home categories and CTAs | [app/page.tsx](../../app/page.tsx) | `CHAIRS`, `ChairTile`, Unsplash hero, router pushes; [Data flow](data-flow.md) |
| Catalogue/query/pagination | [app/products/page.tsx](../../app/products/page.tsx) | `ALL_CHAIRS`, `resolveCategory`, `ProductsContent`, `ChairCard`, Suspense; [Data flow](data-flow.md) |
| Quote request | [app/quote/page.tsx](../../app/quote/page.tsx) | Controlled fields, local `sent`; no API integration |
| Contact submission | [app/contact/page.tsx](../../app/contact/page.tsx), [components/ContactForm.tsx](../../components/ContactForm.tsx), [app/api/contact/route.ts](../../app/api/contact/route.ts) | Page → form → handler; [Data flow](data-flow.md), [Security](security.md) |
| Company copy and certifications | [app/company/page.tsx](../../app/company/page.tsx) | Mission, badges, quote CTA; TEAM/MILESTONES unused; [Glossary](domain-glossary.md) |
| Service content/process | [app/services/page.tsx](../../app/services/page.tsx) | Six SERVICES entries, four process steps, quote CTA |
| Generic about stub | [app/about/page.tsx](../../app/about/page.tsx) | Separate from company page; [Routes](routes-and-features.md) |
| Sitemap / robots investigation | [app/sitemap.ts](../../app/sitemap.ts), [app/robot.ts](../../app/robot.ts) | Placeholder sitemap, misnamed robots file; [Routes](routes-and-features.md) |
| Existing unused UI | [components/ImageCarousel.tsx](../../components/ImageCarousel.tsx), [components/PageTransition.tsx](../../components/PageTransition.tsx), [components/Experience.tsx](../../components/Experience.tsx) | Check registry limitations before reuse |
| Toolchain/scripts | [package.json](../../package.json), [package-lock.json](../../package-lock.json), [next.config.ts](../../next.config.ts), [tsconfig.json](../../tsconfig.json), [eslint.config.mjs](../../eslint.config.mjs), [postcss.config.mjs](../../postcss.config.mjs) | Approval rules in bootstrap; [Testing](testing-and-validation.md) |
| AI guidance | [AGENTS.md](../../AGENTS.md), [CLAUDE.md](../../CLAUDE.md), this directory | Canonical bootstrap, Claude pointer, task-specific references |

## Assets and placement

| Existing path | Contents / usage |
|---|---|
| [public/logo.png](../../public/logo.png) | Header/Footer next/image; quote success uses img |
| [public/products images/](<../../public/products images/>) | 32 JPEGs; preserve filename case and spaces; used by home/catalogue |
| [public/banner_1.jpg](../../public/banner_1.jpg), [banner_2.jpg](../../public/banner_2.jpg), [banner_3.jpg](../../public/banner_3.jpg), [public/images/nws-hero.png](../../public/images/nws-hero.png) | Available but not referenced by current app/components |
| [app/favicon.ico](../../app/favicon.ico) | Metadata favicon asset |
| `public/*.svg` | Starter assets; no current app/components references |

New pages belong in `app/<route>/page.tsx`; reused components in flat `components/`; page-local helpers stay with their page; assets in `public/`. New routes, folder restructuring, data extraction, and environment variables require authorization under AGENTS.md. No `src/`, `lib/`, `hooks/`, providers, tests, proxy/middleware, or tracked CI/deployment configuration exists in this snapshot; do not send agents searching for them.

Generated/ignored paths (`.next/`, `node_modules/`, `next-env.d.ts`, `*.tsbuildinfo`) are not application source. Read installed framework guides deliberately; exclude generated code from general indexing. Never read environment values for documentation.
