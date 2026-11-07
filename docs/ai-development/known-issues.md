# Known issues and investigation queue

Verified from source on 2026-11-07 unless explicitly marked suspected. **High** affects core lead/trust flows; **Medium** affects usability, discoverability or robustness; **Low** is maintenance. Confidence describes evidence, not severity. Next actions are proposals, not authorized runtime changes. Validation results belong in [Testing](testing-and-validation.md).

## Verified findings

| ID / severity / confidence | Finding and impact | Source evidence | Proposed next action / effort |
|---|---|---|---|
| K01 · High · High | Quote reports receipt/follow-up while sending nothing; enquiries are lost on reload | [quote/page.tsx](../../app/quote/page.tsx), `handle` only sets sent | Agree delivery destination and field contract; implement real pending/error/success handling. Medium effort; new integration decisions required |
| K02 · High · High | Contact returns success after logging only; no durable lead or email, despite follow-up copy | [route.ts](../../app/api/contact/route.ts), [ContactForm](../../components/ContactForm.tsx) | Establish delivery/storage and honest acknowledgement; verify end-to-end. Medium effort |
| K03 · Medium · High | Contact trusts truthiness, accepts nonstring/whitespace values, logs personal/free text; no application abuse controls | [route.ts](../../app/api/contact/route.ts) | Validate bounded request types, minimize logs, inspect hosted controls before choosing abuse protection. Medium effort; [Security](security.md) |
| K06 · Medium · High | Quote labels are not associated with inputs/selects/textarea; focus treatment is inconsistent | [quote/page.tsx](../../app/quote/page.tsx); labels have no htmlFor/control ids | Add explicit associations and visible focus; keyboard/screen-reader checks. Small effort |
| K10 · Medium · High | Contact is linked from the footer but not primary navigation; `/about` remains a generic stub | [Header](../../components/Header.tsx), [Footer](../../components/Footer.tsx), [about](../../app/about/page.tsx) | Owner decides intended primary navigation and stub fate. Small implementation effort after content decisions |
| K11 · Medium · High | No automated behavior tests, tracked CI workflow, or custom route error/loading/recovery UI | [package.json](../../package.json), tracked app inventory | Start with catalogue/form regression coverage and agreed CI; tooling requires approval. Medium effort; default framework errors still exist |
| K12 · Low · High | Six lint warnings: two unused company arrays and four img occurrences | [Testing](testing-and-validation.md) | Remove or confirm unused content; optimize remaining media in separately scoped changes. Small/medium effort |
| K13 · Low · High | Unmounted carousel defaults and placeholder-chair.jpg are nonexistent; PageTransition uses undefined transition-fade and empty transition callback | [ImageCarousel](../../components/ImageCarousel.tsx), [PageTransition](../../components/PageTransition.tsx), public/CSS inventory | Fix and test before mounting, or remove only if authorized. Small effort; no current user-path impact |
| K14 · Low · High | Legacy pages retain repeated inline styles and broad client boundaries; the semantic token layer does not provide complete UI primitives | [Design system](design-system.md), [Architecture](architecture.md) | Extract only proven shared needs and measure client cost; avoid blanket refactoring. Scope-dependent effort |

## Suspected issues and unknowns — do not report as confirmed failures

| ID / severity / confidence | Evidence / uncertainty | Next verification |
|---|---|---|
| U01 · Medium · Medium | Header and catalogue filter now share the 74px sticky offset; quote fixed 48px inner padding may still crowd mobile | Browser check at narrow widths, breakpoint edges, zoom and scroll before claiming overflow is resolved |
| U02 · Medium · Medium | Navy-on-cyan primary controls and core muted text pairs were measured, but small text, focus and legacy inline combinations have no full contrast audit | Measure every actual foreground/background/state pair in browser tooling |
| U03 · Medium · Medium | Product journeys use next/image and stable frames; remaining raw images, client hydration and route transitions still lack LCP/CLS/interaction measurements | Follow [Performance](performance.md); no measured bottleneck or CWV score available |
| U04 · High business impact · Unknown accuracy | Certification/warranty/statistics/team claims and phone/email copy appear in source; unused Experience stats differ from company copy | Owner verifies truth, current contact details, response/confidentiality promises; code presence is not proof |
| U05 · Scope-dependent · Unknown | Deployment health, log retention, platform rate/body limits/security headers, dependency advisories | Inspect deployment/account settings or run a separately scoped audit; none verified here |

## Resolved documentation drift

Previous documentation reported an active set-state-in-effect lint error and local filter state. Current catalogue derives category from query parameters and uses guarded render-time pagination reset; lint now exits 0. Old statements that robot.ts generated robots.txt, all labels were associated, Geist was loaded, or products had no Suspense fallback were corrected. The implemented sitemap/robots routes now use the intended domain and include public product routes. Semantic color variables, a main/skip link, disclosure/selection state, reduced-motion handling and honest single-photo gallery copy are also present. This records observed present behavior, not who changed it or when.

## Recommended order

1. K01–K03: make lead receipt real and input handling deliberate; confirm U04 business promises.
2. K06 and K10: complete remaining form-label and navigation/content decisions; verify U01–U02 in a browser.
3. K11: add targeted regression protection after tooling approval.
4. Measure U03 before optimizing; handle K12–K14 only within a justified scope.
