# Data flow and feature behavior

Verified from source for the **2026-11-18** redesign. No database, CMS, global store, server action or automatic email delivery exists.

## Catalogue

[Catalogue data](../../app/products/catalogue.ts) owns 32 original records. `PRODUCTS` adds a stable slug, description and one original photo per model. Training variants include their descriptor in the slug. Product files and identifiers were preserved.

[Products](../../app/products/page.tsx) provides server metadata, ItemList and an all-model link fallback around Suspense. [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx) owns interaction:

1. Category is `resolveCategory(type || category)`: nonempty type takes precedence; matching trims/case-folds and supports existing prefixes; unknown values resolve to All. Category navigation pushes history with `scroll: false`.
2. Category changes reset page to 1 through a guarded render-time update. Search matches name, descriptor and category; search and sorting reset pagination. Name sorting uses localeCompare. Search/sort/view/page are local, not encoded in the URL.
3. Filter and sort before slicing eight per page. Grid and table show the same results. Pagination scroll respects reduced motion. Empty results offer Clear filters.
4. Comparison stores up to three slugs locally, independently of filters/page/view. At capacity, unchecked boxes are disabled; selected models can still be removed. The bottom bar opens an inline comparison region and moves focus there. Closing restores the trigger. Clear removes the whole selection.
5. Comparison displays only known fields (category/style); price/specifications say to confirm on enquiry. The shortlist link passes comma-separated slugs to `/quote?models=…`. State is not persisted across route changes or refresh.

## Product details and finder

[Detail routes](../../app/products/[slug]/page.tsx) statically generate all 32 slugs, await params and return 404 for unknown models. Product/BreadcrumbList metadata uses factual catalogue fields. Enquire links pass a single slug to quote; call links use the existing repository phone number.

[ProductGallery](../../app/products/[slug]/ProductGallery.tsx) supports up to three verified photos, selected thumbnail state, ArrowLeft/ArrowRight/Home/End and zoom. Current records have one photograph; no empty photo placeholders or generated angles are rendered. ProductCard and gallery retain named React ViewTransition image continuity.

[SeatFinder](../../components/SeatFinder.tsx) locally selects one of four work settings and renders category links with explanatory copy. It is a category guide, not an ergonomic assessment or specification recommendation. Changing the setting updates the text/image and polite live region.

## Enquiries: review → email app or copy

Both [contact](../../app/contact/page.tsx) and [quote](../../app/quote/page.tsx) mount [ContactForm](../../components/ContactForm.tsx). Props: `mode?: 'contact' | 'quote'`, `models?: string[]`. Quote is request-rendered because it reads awaited searchParams. It accepts the first three comma-separated slugs from a string `models` parameter, resolves against PRODUCTS and ignores unknown IDs; user-provided raw model labels are never trusted.

Fields: required name/email/message, optional phone/company; quote adds optional seating quantity and timeframe. Inputs have IDs, associated labels and native constraints. Text input limits are 120 characters; message is limited to 1,500. No budget field is required.

Submit prevents navigation, reads FormData and prepares a local plain-text draft. The review region receives focus and shows:

- An encoded `mailto:sales@nwsworkspace.com` link. The visitor opens their email app and sends the message themselves.
- Copy enquiry, with pending/disabled state, success feedback and a failure fallback directing the visitor to selectable text.
- A read-only textarea containing the complete draft.

Changing a form field invalidates the draft and copy status. Input is preserved. Refresh/navigation loses local form state. There is no fetch, automatic transmission, durable draft, inbox receipt or delivery callback. Browser/mail-client URI length and clipboard support vary; the copy/select fallback is deliberate. Never display “request received” for draft preparation.

The phone `+91 98765 43210` and email are retained from the repository and still require owner verification before launch.

## Legacy POST endpoint

[POST /api/contact](../../app/api/contact/route.ts) remains public and unchanged, but the redesigned UI does not call it. It parses JSON, checks name/email/message truthiness, logs name/email/phone/message and returns `200 { success: true }`; missing values return 400 and parse/errors return 500. It does not send mail or persist leads. Nonstrings/whitespace are not rejected reliably. [Security](security.md) owns its risk assessment.

## Other state

Header tracks the pathname for which the mobile menu is open; link clicks close it and Escape closes/restores trigger focus. Native details own FAQ/service disclosure state. All content remains local. [Testing](testing-and-validation.md) owns regression checks.
