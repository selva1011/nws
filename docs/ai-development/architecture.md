# NWS Architecture

Documents the architecture **as currently implemented**. Improvement recommendations are in a separate section at the end.

---

## Application Bootstrapping

1. `npm run dev` starts Next.js 16 with Turbopack.
2. Next.js resolves `app/layout.tsx` as the root layout.
3. `layout.tsx` imports `app/globals.css` (Tailwind v4 + utility classes), renders `<Header>` from `components/Header.tsx`, then `{children}`, then `<Footer>` from `components/Footer.tsx`.
4. `metadataBase` is set to `https://nwsworkspace.com` in `layout.tsx`.

## Routing Flow

Next.js App Router file-system routing:

```
/             → app/page.tsx         (Home)
/about        → app/about/page.tsx   (Stub page, not in nav)
/company      → app/company/page.tsx
/contact      → app/contact/page.tsx
/products     → app/products/page.tsx
/quote        → app/quote/page.tsx
/services     → app/services/page.tsx
/api/contact  → app/api/contact/route.ts  (POST only)
/sitemap.xml  → app/sitemap.ts
/robots.txt   → app/robot.ts
```

All page routes pre-render as static at build time (`○` in build output). `/api/contact` is dynamic server-rendered on demand (`ƒ`).

## Component Hierarchy

```
RootLayout (Server)
├── <Header> (Client) — sticky nav, mobile menu
│   └── <Link>, <Image> (next/link, next/image)
├── {children}          — the matched page component
│   ├── Home (Client)
│   │   └── <ChairTile> (inline local Client component)
│   ├── Company (Client)
│   ├── ContactPage (Server)
│   │   └── <ContactForm> (Client)
│   ├── Products (Client)
│   │   └── <ChairCard> (inline local Client component)
│   ├── Quote (Client)
│   ├── Services (Client)
│   └── About (Server)
└── <Footer> (Server)
```

Components not currently mounted in any page:
- `ImageCarousel`, `PageTransition`, `Experience`

## State Flow

No global state management. All state is local React state (`useState`) within each Client Component.

Current state patterns:
- **UI interaction state** (`hovered` in `ChairTile`, `ChairCard`) — per-component `useState(false)`.
- **Filter / pagination state** (`active`, `page` in Products page) — page-level `useState`.
- **Form state** (`loading`, `message`, `status` in `ContactForm`; `form`, `sent` in Quote page) — page/component-level `useState`.

No `useContext`, `useReducer`, Zustand, Redux, or other state library is present.

## Data-Fetching Flow

All content data is static — no fetching occurs at runtime for page content.

```
const ALL_CHAIRS = [...] // defined at module scope in app/products/page.tsx
const SERVICES   = [...] // defined at module scope in app/services/page.tsx
const TEAM       = [...] // defined at module scope in app/company/page.tsx (UNUSED)
const MILESTONES = [...] // defined at module scope in app/company/page.tsx (UNUSED)
```

The only runtime data-fetching is the contact form submission (`ContactForm.tsx → fetch("/api/contact")`).

## API Boundary

One API route exists: `POST /api/contact`

**Request body (expected):**
```json
{ "name": "string", "email": "string", "phone": "string?", "message": "string" }
```

**Responses:**
- `200 { success: true }` — submission received
- `400 { message: "Missing required fields" }` — name, email, or message absent
- `500 { message: "Internal server error" }` — unexpected error

**Current implementation:** logs the body to `console.log`. Does not send email or persist to a database. This is a verified TODO in the source file.

**Note:** `quote/page.tsx` has its own form that calls `e.preventDefault()` and sets `sent = true` — it does not call any API. This is a known gap.

## Authentication Flow

No authentication. The site is fully public with no protected routes, sessions, or tokens.

## Error Handling

- `ContactForm.tsx`: `try/catch` around `fetch`; sets `status = "error"` and shows an error message. Uses `aria-live="polite"` on the message element.
- `app/api/contact/route.ts`: `try/catch` returns `500` on unexpected errors; validates required fields and returns `400`.
- No global error boundary (`error.tsx`) is configured in `app/`.
- No `not-found.tsx` customisation — Next.js default 404 is used.

## Styling Architecture

Two co-existing approaches:

**1. Tailwind CSS v4 utilities** (in `className`):
- Used for: layout (`flex`, `grid`), spacing (`gap-*`, `px-*`, `py-*`), responsive breakpoints (`sm:`, `md:`, `lg:`), display, overflow, position utilities.
- Tailwind is loaded via `app/globals.css` → `@import "tailwindcss"`.
- Configured via `postcss.config.mjs` using `@tailwindcss/postcss`.
- No `tailwind.config.*` file exists — Tailwind v4 uses automatic content detection.

**2. Inline `style={{}}` props**:
- Used for: brand colours, font sizes, `clamp()` expressions, `letterSpacing`, `lineHeight`, `maxWidth`, `minHeight`, box shadows, border radius, background values.
- This is the established pattern for all colour and typography values in page components.

**Utility classes** (`app/globals.css`):
```css
.eyebrow         /* brand eyebrow label style */
.section-title   /* large section heading */
.nav-link        /* animated underline on hover */
.pattern         /* dot-grid radial gradient background */
.product-scroll  /* hides scrollbar on product scroll containers */
```

**CSS custom properties** (referenced in `ContactForm.tsx` but **not defined** in `globals.css`):
- `--color-primary`, `--color-secondary`, `--color-neutral`, `--color-border`, `--color-base`, `--color-light-base`, `--color-dark-base`
- These variables resolve to `undefined` at runtime, causing ContactForm to render with missing colours. This is a known gap.

## Configuration Flow

| Config | Loaded by | Scope |
|---|---|---|
| `next.config.ts` | Next.js at build/dev | Build-time Next.js options |
| `tsconfig.json` | TypeScript compiler | Type checking and IDE |
| `postcss.config.mjs` | PostCSS via Next.js | CSS processing pipeline |
| `eslint.config.mjs` | ESLint | Linting |

No environment variables are currently used by the application.

## SEO Configuration

- `metadataBase`: `https://nwsworkspace.com` (set in `layout.tsx`)
- Default metadata in `layout.tsx`: title, description, OpenGraph
- Page-level metadata: `app/contact/page.tsx` and `app/about/page.tsx` export their own `metadata` objects
- `app/sitemap.ts`: generates `/sitemap.xml` — **base URL is `example.com` placeholder, not updated**
- `app/robot.ts`: generates `/robots.txt` — **same placeholder issue**

---

## Known Gaps and Improvement Recommendations

These are documented recommendations, not implemented changes. All require approval before implementation.

| # | Gap | Recommendation |
|---|---|---|
| 1 | CSS custom properties in `ContactForm.tsx` are undefined | Define `--color-*` variables in `globals.css :root`, or replace them with Tailwind classes |
| 2 | Quote form does not submit data | Wire to `POST /api/contact` or a dedicated `/api/quote` route |
| 3 | `/about` contains placeholder content | Replace with real NWS content or remove the route |
| 4 | `sitemap.ts` and `robot.ts` use `example.com` | Update base URL to `nwsworkspace.com` |
| 5 | `TEAM`, `MILESTONES`, `solutions` arrays declared but unused | Render or remove |
| 6 | `ImageCarousel`, `PageTransition`, `Experience` components unused | Wire into pages or remove |
| 7 | No `error.tsx` in `app/` | Add a global error boundary for unexpected runtime errors |
| 8 | No `not-found.tsx` | Add a branded 404 page |
| 9 | No tests | Add Vitest + React Testing Library or Playwright |
| 10 | No formatter | Add Prettier |
| 11 | No CI | Add GitHub Actions workflow running lint + type check + build |
| 12 | No Node engine declaration | Add `"engines": { "node": ">=20" }` to `package.json` |
| 13 | `public/products images/` has a space in the name | Rename to `products-images/` and update all references (requires search-and-replace across 3 files) |
| 14 | ESLint error: `react-hooks/set-state-in-effect` in products page | Replace `useEffect(() => setPage(1), [active])` with derived state or `useMemo` |
