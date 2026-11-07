# Known issues and investigation queue

Verified from source on 2026-11-07 unless explicitly marked suspected. **High** affects core lead/trust flows; **Medium** affects usability, discoverability or robustness; **Low** is maintenance. Confidence describes evidence, not severity. Next actions are proposals, not authorized runtime changes. Validation results belong in [Testing](testing-and-validation.md).

## Verified findings

| ID / severity / confidence | Finding and impact | Source evidence | Proposed next action / effort |
|---|---|---|---|
| K01 · High · High | Quote reports receipt/follow-up while sending nothing; enquiries are lost on reload | [quote/page.tsx](../../app/quote/page.tsx), `handle` only sets sent | Agree delivery destination and field contract; implement real pending/error/success handling. Medium effort; new integration decisions required |
| K02 · High · High | Contact returns success after logging only; no durable lead or email, despite follow-up copy | [route.ts](../../app/api/contact/route.ts), [ContactForm](../../components/ContactForm.tsx) | Establish delivery/storage and honest acknowledgement; verify end-to-end. Medium effort |
| K03 · Medium · High | Contact trusts truthiness, accepts nonstring/whitespace values, logs personal/free text; no application abuse controls | [route.ts](../../app/api/contact/route.ts) | Validate bounded request types, minimize logs, inspect hosted controls before choosing abuse protection. Medium effort; [Security](security.md) |
| K04 · Medium · High | Undefined --color-* properties invalidate intended color/border/focus declarations | [globals.css](../../app/globals.css), [ContactForm](../../components/ContactForm.tsx), [contact](../../app/contact/page.tsx), [about](../../app/about/page.tsx), [Experience](../../components/Experience.tsx) | Authorize a consistent token mapping or existing palette substitution; visually check focus and contrast. Small/medium effort |
| K05 · Medium · High | Sitemap uses example.com, omits company/products/quote; singular robot.ts does not generate robots.txt | [sitemap.ts](../../app/sitemap.ts), [robot.ts](../../app/robot.ts), [route evidence](routes-and-features.md) | Correct host/route list and filename with approval; verify generated endpoints. Small effort |
| K06 · Medium · High | Quote labels are not associated with inputs/selects/textarea; focus treatment is inconsistent | [quote/page.tsx](../../app/quote/page.tsx); labels have no htmlFor/control ids | Add explicit associations and visible focus; keyboard/screen-reader checks. Small effort |
| K07 · Medium · High | Mobile disclosure button lacks aria-expanded/aria-controls; collapsed content remains mounted with only grid/opacity clipping; active links/filters/pages lack current/selected semantics | [Header](../../components/Header.tsx), [catalogue](../../app/products/page.tsx) | Fix disclosure state and collapsed focusability; announce active states; test keyboard/AT. Small/medium effort; actual tab order untested |
| K08 · Medium · High | No main landmark/skip link; continuous phone motion and smooth scrolling have no reduced-motion override | [layout](../../app/layout.tsx), page roots, [globals.css](../../app/globals.css) | Add appropriate landmarks/navigation bypass and reduced-motion support as scoped UI work. Small effort |
| K09 · Medium · High | Home/catalogue copy promises an alternate image angle, but hover only scales one image | [home ChairTile](../../app/page.tsx), [catalogue ChairCard](../../app/products/page.tsx) | Confirm intended behavior; correct copy or supply actual alternate media. Small effort for copy; assets unknown |
| K10 · Medium · High | Contact is absent from primary/footer links; footer social/legal labels are inert; about is generic stub | [Header](../../components/Header.tsx), [Footer](../../components/Footer.tsx), [about](../../app/about/page.tsx) | Owner decides intended navigation/legal destinations and stub fate. Small implementation effort after content decisions |
| K11 · Medium · High | No automated behavior tests, tracked CI workflow, or custom route error/loading/recovery UI | [package.json](../../package.json), tracked app inventory | Start with catalogue/form regression coverage and agreed CI; tooling requires approval. Medium effort; default framework errors still exist |
| K12 · Low · High | Ten lint warnings: three unused arrays and seven img occurrences | [Testing](testing-and-validation.md) | Remove or confirm unused content; optimize media in separately scoped changes. Small/medium effort |
| K13 · Low · High | Unmounted carousel defaults and placeholder-chair.jpg are nonexistent; PageTransition uses undefined transition-fade and empty transition callback | [ImageCarousel](../../components/ImageCarousel.tsx), [PageTransition](../../components/PageTransition.tsx), public/CSS inventory | Fix and test before mounting, or remove only if authorized. Small effort; no current user-path impact |
| K14 · Low · High | Repeated page-level styling/data and broad client pages; no shared primitive/token contract | [Design system](design-system.md), [Architecture](architecture.md) | Extract only proven shared needs and measure client cost; avoid blanket refactoring. Scope-dependent effort |

## Suspected issues and unknowns — do not report as confirmed failures

| ID / severity / confidence | Evidence / uncertainty | Next verification |
|---|---|---|
| U01 · Medium · Medium | Header inner row 74px vs filter top 72px; quote fixed 48px inner padding may crowd mobile | Browser check at narrow widths, breakpoint edges, zoom and scroll before claiming overlap/overflow |
| U02 · Medium · Medium | Small muted text, cyan buttons and focus colors may have contrast issues | Measure actual foreground/background pairs and states; no compliance audit performed |
| U03 · Medium · Medium | Raw eager img, remote Unsplash, client hydration and fallback may affect LCP/CLS/interaction cost | Follow [Performance](performance.md); no measured bottleneck or CWV score available |
| U04 · High business impact · Unknown accuracy | Certification/warranty/statistics/team claims and phone/email copy appear in source; unused Experience stats differ from company copy | Owner verifies truth, current contact details, response/confidentiality promises; code presence is not proof |
| U05 · Scope-dependent · Unknown | Deployment health, log retention, platform rate/body limits/security headers, dependency advisories | Inspect deployment/account settings or run a separately scoped audit; none verified here |

## Resolved documentation drift

Previous documentation reported an active set-state-in-effect lint error and local filter state. Current catalogue derives category from query parameters and uses guarded render-time pagination reset; lint now exits 0. Old statements that robot.ts generated robots.txt, all labels were associated, Geist was loaded, or products had no Suspense fallback were corrected. This records observed present behavior, not who changed it or when.

## Recommended order

1. K01–K03: make lead receipt real and input handling deliberate; confirm U04 business promises.
2. K04–K08: fix style/focus/accessibility/crawling basics; verify U01–U02 in a browser.
3. K09–K11: align copy/navigation with actual flows and add targeted regression protection.
4. Measure U03 before optimizing; handle K12–K14 only within a justified scope.
