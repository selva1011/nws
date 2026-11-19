# Known issues and verification limits

Source reviewed **2026-11-18**. These are current limitations, not invented requirements. [Testing](testing-and-validation.md) owns executed checks.

| ID | Priority | Current finding | Next action |
|---|---|---|---|
| K01 | Business decision | Enquiries prepare local email drafts. Visitors must send them; no automatic delivery, inbox verification or durable lead storage exists | Confirm the desired delivery provider/workflow before adding an integration |
| K02 | Medium | Legacy `/api/contact` is still public, logs personal input and returns success without delivery, although no current UI calls it | Decide whether to retire it or implement a validated delivery contract |
| K03 | Medium | Legacy POST checks truthiness only; no bounded schema, trim/type validation or application abuse control | Inspect hosting controls and agree endpoint scope before changing it; [Security](security.md) |
| K11 | Medium | No automated browser regression runner or tracked CI configuration | Run the manual acceptance checklist; add tooling only through an authorized task |
| K12 | Low | One existing raw-img lint warning in unmounted ImageCarousel | Fix if this component is to be used; no suppression added |
| K13 | Low | Unmounted ImageCarousel has missing default/fallback assets; PageTransition has undefined transition-fade/empty callback; Experience contains unverified stats | Validate or remove in a specifically scoped cleanup; none is mounted |
| U01 | Verification | Browser connection unavailable; native Chrome access timed out during redesign validation | Complete mobile/desktop, keyboard, zoom, clipboard and comparison checks before launch |
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
- The default Turbopack production build passed in this session. Earlier environment failure snapshots are superseded by the current [Testing](testing-and-validation.md) results.

Do not interpret an issue list as authorization for unrelated backend, dependency, security or content changes.
