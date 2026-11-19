# Known issues and verification limits

Source reviewed **2026-11-19**. These are current limitations, not invented requirements. [Testing](testing-and-validation.md) owns executed checks.

| ID | Priority | Current finding | Next action |
|---|---|---|---|
| K01 | Business decision | Enquiries prepare local email drafts. Visitors must send them; no automatic delivery, inbox verification or durable lead storage exists | Confirm the desired delivery provider/workflow before adding an integration |
| K02 | Medium | Legacy `/api/contact` is still public, logs personal input and returns success without delivery, although no current UI calls it | Decide whether to retire it or implement a validated delivery contract |
| K03 | Medium | Legacy POST checks truthiness only; no bounded schema, trim/type validation or application abuse control | Inspect hosting controls and agree endpoint scope before changing it; [Security](security.md) |
| K11 | Medium | No automated browser regression runner or tracked CI configuration | Run the manual acceptance checklist; add tooling only through an authorized task |
| K12 | Low | One existing raw-img lint warning in unmounted ImageCarousel | Fix if this component is to be used; no suppression added |
| K13 | Low | Unmounted ImageCarousel has missing default/fallback assets; PageTransition has undefined transition-fade/empty callback; Experience contains unverified stats | Validate or remove in a specifically scoped cleanup; none is mounted |
| K14 | Low | Favicon is still the default framework triangle, not an NWS mark. `public/logo.png` is kept but unreferenced since the logo artwork was removed | Owner decides on a favicon/brand mark and whether to delete the old logo file |
| K15 | Content | No product has more than one verified photo, so the gallery thumbnails/arrows/swipe ship unused; they were exercised only with temporary local data | Add verified `extraPhotos` (and re-run the framing script) to enable them |
| K16 | Content | No product has verified dimensions, materials, adjustments, finishes or warranty; the hover reveal can only use the catalogue style, so many neighbours share "Medium Back" or "View details" | Add verified `specs` per model; the spec table renders them automatically |
| K17 | Low | "Visitor 3 Seater Sofa" original is 307×207px and looks soft on the detail gallery | Obtain a higher-resolution photo |
| K18 | Verification | The phone number used for Call (`+91 98765 43210`) follows a common placeholder pattern and is unverified (see U04) | Owner confirms the real sales number before launch |
| K19 | Low | `scripts/frame-product-photos.swift` needs macOS (ImageIO); there is no cross-platform equivalent or build step | Run manually on macOS after photo changes, or replace with an approved tool |
| U01 | Verification | White showroom checked in Chrome at 1440px and at 1024/768/390px through a same-origin iframe; no Safari/Firefox, real touch device, zoom or clipboard check. One-tap touch navigation is verified by CSS scoping, not on a device | Complete cross-browser, real-device, zoom and clipboard checks before launch; see [Testing](testing-and-validation.md) |
| U02 | Verification | No complete WCAG/assistive-technology audit or real-device performance measurement | Validate the actual rendered design; source checks do not certify accessibility |
| U03 | Content | Each product has one supplied photo; dimensions/materials/pricing/availability are unverified | Obtain real extra views and verified model specifications |
| U04 | Content | Existing phone and email are retained but ownership/accuracy is not verified | Owner must confirm contact details before production launch |
| U05 | Operations | Hosted domain/deployment health, logging retention, security controls and dependency advisories were not audited | Inspect actual infrastructure in a separately scoped task |

## Resolved in the redesign

- Removed false “request received”/follow-up success states. Both forms explain the email-draft handoff and preserve editable input.
- Associated all current form labels with controls; added shared visible focus and native required/email validation.
- Contact is present in primary/footer navigation; about is a brand-specific introduction rather than generic placeholder text.
- Company/services are Server Components with page metadata; removed old hover DOM mutations and unverified certification/warranty/installation promises from mounted page copy.
- Replaced old palette and page layouts with the documented design contract. No fabricated alternate product images or missing-photo placeholders.
- 2026-11-19: removed logo artwork from header, footer and JSON-LD; replaced the palette with the white/charcoal/yellow showroom; rebuilt the catalogue (grouped grid, aligned bases via framed photos, URL category filter, back-to-catalogue link). The narrow-phone thumbnail badge overlap no longer applies (thumbnails only render for multi-photo products).
- The default Turbopack production build passed in this session. Earlier environment failure snapshots are superseded by the current [Testing](testing-and-validation.md) results.

Do not interpret an issue list as authorization for unrelated backend, dependency, security or content changes.
