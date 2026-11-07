# Data flow and feature behavior

Verified from [home](../../app/page.tsx), [catalogue](../../app/products/page.tsx), [quote](../../app/quote/page.tsx), [ContactForm](../../components/ContactForm.tsx), and [POST handler](../../app/api/contact/route.ts). No fetching/cache library, persistent storage, global state, context, server action, or custom hook exists.

## Catalogue: URL → selection → local pagination

1. Home `CHAIRS` stores four category/image choices; tile clicks push `/products?type=${encodeURIComponent(c.type)}`.
2. `Products` wraps `ProductsContent` in Suspense with `ProductsFallback` (header only).
3. `typeParam = searchParams.get("type") || searchParams.get("category")`. A nonempty `type` wins even when invalid; empty `type` falls through.
4. `resolveCategory` trims/lowercases input, then selects the first CATEGORIES entry that equals it or is a prefix. CATEGORIES is `All`, `Executive`, `Task`, `Visitor`, `Sofa`, `Training`; unmatched/absent input → All. Thus `Task Chairs` and `taskanything` both match Task; this is existing permissive behavior, not a validated taxonomy parser.
5. `active` is derived from URL. `page` and `prevCategory` are local state. If resolved active changes, a guarded render-time state adjustment updates `prevCategory` and resets page to 1. There is **no pagination useEffect** in current code.
6. Filter ALL_CHAIRS by `cat`, then slice `(page - 1) * 8` through `page * 8`. The 32 records yield four All pages. Catalogue cards render a single image/name/sub/category; hover zooms that image.
7. Filter buttons push `/products` for All or `/products?type=…` otherwise, replacing other query keys. Page buttons change only local state and scroll to top smoothly. Page is not bookmarkable; browser back/forward category changes reset it when active changes.

Data shape is inferred by ChairCard as `typeof ALL_CHAIRS[0]`: `{ name, sub, cat, img }`, all strings. `sub` is a display descriptor, not filter state. Home keeps a separate category dataset; update both only when the task requires it. Product image filenames must preserve case and spaces.

Edge checks: absent query, empty/invalid input, legacy `category`, conflicting query keys, prefixed category labels, filter changes from a later page, and back/forward navigation. Unknown categories resolve to All; every current category has records. There is no zero-result UI for a future empty category, no product API, and no product detail selection passed to quote.

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

Header owns `open` and reads `usePathname`; mobile menu link clicks close it, but there is no pathname effect to reset it for every possible navigation. ChairTile/ChairCard own hover state. Only unused PageTransition uses `useEffect`/`useRef` to observe path changes; unused ImageCarousel holds a scroll-container ref. Content arrays are mostly module-local; Footer and Experience define arrays inside their functions. No application cache or revalidation policy exists beyond framework route rendering described in [Architecture](architecture.md).

## Change guidance

Preserve query precedence, URL history semantics, and payload/response shape unless a task changes them. Before wiring quote delivery, agree on destination, fields, validation and success meaning; new endpoints/env/dependencies need authorization. Follow ContactForm's pending/error/reset structure without copying its unresolved CSS variables or treating HTTP success as proven delivery. Update this document and the affected issue entry when behavior changes. Behavioral regression cases are in [Testing](testing-and-validation.md).
