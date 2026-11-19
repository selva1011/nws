# Data flow and feature behavior

Verified from source for the **2026-11-19** white showroom catalogue. No database, CMS, global store, server action or automatic email delivery exists.

## Catalogue

[Catalogue data](../../app/products/catalogue.ts) owns 32 original records. `PRODUCTS` adds a stable slug, `title` (name plus style when two models share a name, e.g. the two Flip Training Chairs), `highlight` (the catalogue style when it says more than the category; otherwise null), the framed `display` photo path, `images` (original + display, up to three), `specs` and a description. Training variants include their descriptor in the slug. Optional `extraPhotos` and `specs` (Dimensions, Materials, Adjustments, Finishes, Warranty) exist on the record type but no product has verified values yet. Helpers: `categoryName`, `categoryTitle`, `displayPhoto`, `resolveCategory`.

Photos: originals stay in `/products images/`; framed display copies with the same file names live in `/product-display/` (see [Design system](design-system.md#product-photography)). Metadata, Open Graph and JSON-LD keep the originals.

[Products](../../app/products/page.tsx) renders the hero, ItemList JSON-LD and a Suspense boundary whose fallback is [CatalogueView](../../app/products/CatalogueView.tsx) in "All" mode, so the static HTML contains all 32 grouped tiles. [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx) is the client wrapper:

1. Category is `resolveCategory(type || category)`: nonempty `type` takes precedence; matching trims/case-folds and supports existing prefixes; unknown values resolve to All.
2. The category selector is a list of links (`/products`, `/products?type=…`) with `scroll={false}` and `aria-current="page"` on the active one. Each choice is a history entry, so browser Back/Forward restore the filter; Next.js restores the scroll position (verified in Chrome).
3. All shows every category under its heading in `CATEGORIES` order; a category shows only its group. There is no search, sort, table view, pagination or comparison (removed 2026-11-19). A polite status line reports the model count.
4. Clicking a product tile stores `{ href }` (current path + query) in `sessionStorage` under `CATALOGUE_RETURN_KEY`. On a full load with `#p-<slug>`, the browser scrolls that tile into view after hydration.

## Product details and finder

[Detail routes](../../app/products/[slug]/page.tsx) statically generate all 32 slugs, await params and return 404 for unknown models. Product/BreadcrumbList metadata uses factual catalogue fields. Enquire links pass a single slug to `/quote?models=`; Call uses the existing repository phone number (`tel:+919876543210`).

[BackToCatalogue](../../app/products/[slug]/BackToCatalogue.tsx) reads the stored catalogue href. When that filter contains the product (All or the same category), it links there with `#p-<slug>`; otherwise, or with no stored value (direct/shared visits, unavailable storage), it links to `/products?type=<category>#p-<slug>`. The specification table lists Model, Category and Catalogue style plus any present `specs` fields, and names the missing fields with an enquiry link instead of placeholder rows.

[ProductGallery](../../app/products/[slug]/ProductGallery.tsx) supports up to three verified photos. With more than one: thumbnails (`aria-pressed`), ArrowLeft/ArrowRight/Home/End on the stage and thumbnails (wrapping), previous/next buttons and a horizontal touch swipe (> 40px, pointer type not mouse). Selecting the stage toggles zoom. Current records have one photograph, so the single-photo state (no thumbnails or arrows) is what ships; the multi-photo state was exercised with temporary local data only. ProductCard and gallery share a named React ViewTransition.

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
