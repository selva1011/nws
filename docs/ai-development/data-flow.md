# Data flow and feature behavior

Verified from [home](../../app/page.tsx), [catalogue](../../app/products/page.tsx), [quote](../../app/quote/page.tsx), [ContactForm](../../components/ContactForm.tsx), and [POST handler](../../app/api/contact/route.ts). No fetching/cache library, persistent storage, global state, context, server action, or custom hook exists.

## Catalogue and product details

The 32 original records live in [catalogue.ts](../../app/products/catalogue.ts), shared by home features, catalogue, details and sitemap. Inferred product shape includes original `name`, `sub`, `cat`, `img` plus a unique `slug`, factual `description`, and `images: { src, alt, label }[]`. Add up to three **real** product photos there. All current records have one photo; gallery slots explicitly mark unavailable photos rather than duplicating or generating angles. Training variants include their descriptor in the slug.

[Products](../../app/products/page.tsx) is a Server Component with metadata, hero and ItemList. Its Suspense boundary retains `useSearchParams` in [CatalogueBrowser](../../app/products/CatalogueBrowser.tsx). The fallback includes links to every detail page, making all products discoverable in the server HTML.

1. Category = `resolveCategory(searchParams.get("type") || searchParams.get("category"))`. Existing trimming, case-insensitive prefix matching, nonempty `type` precedence and invalid→All behavior are preserved.
2. Category changes use router push (without jumping the viewport); guarded render-time state resets pagination when the resolved category changes. Back/forward retain those URL semantics.
3. Search matches name, descriptor and category, case-insensitively after trimming. Search is local and resets page to 1. Grid/table mode is also local and preserves filters/page.
4. Filter first, then slice eight per page. Page buttons announce current state and scroll to the collection, instantly under reduced motion. The no-results state offers a clear-filters action.
5. Product cards/table rows link to `/products/[slug]`. Detail routes generate static params, await route params, and reject unknown products. Their tables show known catalogue fields and explicitly ask the buyer to confirm unknown specifications/pricing.
6. The local ProductGallery selects among up to three photos and toggles image zoom with a keyboard-operable button; missing slots are noninteractive. New product actions use `tel:` and do not submit the existing non-delivering forms.

Phone links still use the existing repository number `+91 98765 43210`; the user requested calling but has not supplied a verified replacement. Additional photos and detailed specifications remain content dependencies.

## Contact: browser → server → logging

The server contact page mounts ContactForm. Inputs are uncontrolled HTML fields with `name`/`id` and associated labels. Native validation requires name/email/message and uses email input validation; phone is optional. `FormData.get` values are serialized as JSON. Client constraints are bypassable.

| Stage | Behavior |
|---|---|
| Start | Prevent default; `loading=true`; clear feedback; retain form reference |
| Send | `fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })` |
| Any HTTP 2xx | Set success feedback and `form.reset()`; no response JSON is parsed |
| Non-2xx/network error | Generic error feedback; inputs retained; server error details are not surfaced |
| Finally | `loading=false`; button re-enabled |

Button is disabled while pending and label changes. Feedback uses a conditionally mounted `aria-live="polite"` element; screen-reader announcement reliability has not been tested. There is no timeout, retry, deduplication, delivery tracking, or durable lead state.

### Current endpoint contract (not a validated schema)

Expected JSON fields: `name`, `email`, `message` strings, optional `phone` string. The handler does **not** enforce these types, trim whitespace, validate email syntax, or bound lengths.

| Condition in handler | Response |
|---|---|
| Falsy name, email, or message | `400 { "message": "Missing required fields" }` |
| Truthy required fields | Logs name/email/phone/message; `200 { "success": true }` |
| JSON parsing/destructuring or other exception | `500 { "message": "Internal server error" }` |

Truthy nonstrings/whitespace can pass. JSON `null` or malformed JSON can reach the catch. Unknown fields are not used. No email or database call occurs. A successful response proves only that this handler reached its success return, not that anyone received the enquiry. See [Security](security.md) for the trust boundary.

## Quote: local state only

Eight string fields: name, company, email, phone, seats, budget, timeline, message. First four are required HTML inputs; email has native email validation. Options for seats/budget/timeline are inline arrays in the page.

`handle` prevents default and sets `sent=true`. Success replaces the form, interpolates the entered name and promises follow-up. “Submit Another Request” sets `sent=false` and **retains** field values. Refresh loses state. There is no fetch, loading/error path, API response, persistence, or integration with ContactForm. Do not silently map quote fields into the contact payload: that would be a new business/API decision.

## Other state and content

Header owns `open` and reads `usePathname`; mobile menu link clicks close it, but there is no pathname effect to reset it for every possible navigation. Product presentation uses CSS hover/focus states; ScrollReveal uses IntersectionObserver and the Web Animations API. Only unused PageTransition uses `useEffect`/`useRef` to observe path changes; unused ImageCarousel holds a scroll-container ref. Content remains local; catalogue.ts is the single shared product-content owner. No application cache or revalidation policy exists beyond framework route rendering described in [Architecture](architecture.md).

## Change guidance

Preserve query precedence, URL history semantics, and payload/response shape unless a task changes them. Before wiring quote delivery, agree on destination, fields, validation and success meaning; new endpoints/env/dependencies need authorization. Follow ContactForm's pending/error/reset structure without copying its unresolved CSS variables or treating HTTP success as proven delivery. Update this document and the affected issue entry when behavior changes. Behavioral regression cases are in [Testing](testing-and-validation.md).
