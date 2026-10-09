# Testing and Validation

Records every validation command available in this repository, their current results, and which issues are pre-existing.

> **Last verified:** 2026-10-09

---

## Available Commands

### 1. Install dependencies
```bash
npm install
```
**Purpose:** Install or restore all node_modules from `package-lock.json`.  
**Status:** ✅ Expected to succeed. Lockfile is committed (`package-lock.json`, lockfileVersion 3).

---

### 2. Development server
```bash
npm run dev
```
**Purpose:** Start Next.js 16 dev server with Turbopack on `http://localhost:3000`.  
**Status:** ✅ Server starts and all routes respond 200.  
**Note:** `next dev` re-generates the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md` on every start. This is expected behaviour.

---

### 3. Lint
```bash
npm run lint
```
**Underlying command:** `eslint` (via `eslint.config.mjs` — `next/core-web-vitals` + `next/typescript`)  
**Status:** ⚠️ **Exits with code 1 — 1 error and 10 warnings (all pre-existing)**

**Pre-existing error (do not hide or re-introduce):**
```
app/products/page.tsx:244  error  Calling setState synchronously within an effect  react-hooks/set-state-in-effect
```
This is the `useEffect(() => setPage(1), [active])` pattern. It is pre-existing and not introduced by the AI-development documentation.

**Pre-existing warnings (all are pre-existing):**
| File | Warning |
|---|---|
| `app/company/page.tsx` (×2) | `no-unused-vars`: `TEAM`, `MILESTONES` declared but never used |
| `app/company/page.tsx` (×2) | `no-img-element`: `<img>` instead of `next/image` |
| `app/page.tsx` (×2) | `no-img-element`: `<img>` instead of `next/image` |
| `app/products/page.tsx` | `no-img-element`: `<img>` instead of `next/image` |
| `app/quote/page.tsx` | `no-img-element`: `<img>` instead of `next/image` |
| `components/Footer.tsx` | `no-unused-vars`: `solutions` declared but never used |
| `components/ImageCarousel.tsx` | `no-img-element`: `<img>` instead of `next/image` |

**Agent rule:** Any task must not introduce new lint errors. Pre-existing warnings are acceptable. The `set-state-in-effect` error is a known pre-existing issue.

---

### 4. Type check
```bash
npx tsc --noEmit
```
**Note:** There is no `tsc` script in `package.json`. Run via `npx`.  
**Status:** ✅ Exits 0 — no TypeScript errors.

---

### 5. Unit / Component / Integration / E2E tests
```bash
# NOT AVAILABLE
```
**Status:** 🚫 No test runner is configured. No test files exist. Directories `__tests__/` and `*.test.*` files are absent.  
**Consequence:** There are no automated tests to run. All validation relies on type checking, linting, and build verification.

---

### 6. Production build
```bash
npm run build
```
**Status:** ✅ Exits 0. All 12 routes generated successfully.

**Build output (verified 2026-10-09):**
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/contact
├ ○ /company
├ ○ /contact
├ ○ /products
├ ○ /quote
├ ○ /services
└ ○ /sitemap.xml

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

### 7. Serve production build locally
```bash
npm run start
```
**Purpose:** Serves the `.next` build on `http://localhost:3000` using `next start`.  
**Status:** Available but not part of the standard validation sequence. Run manually when you need to verify production behaviour.

---

## Required Validation Sequence for Every Task

Run in this order:
```bash
npx tsc --noEmit   # must exit 0
npm run lint       # must not introduce new errors (pre-existing error is acceptable)
npm run build      # must exit 0
```

Do not claim a check passed if the command was not executed.

---

## Unavailable Checks

| Check | Reason unavailable |
|---|---|
| Unit tests | No test runner configured |
| Component tests | No test runner configured |
| Integration tests | No test runner configured |
| End-to-end tests | No Playwright/Cypress configured |
| Formatting check | No Prettier or similar configured |
| Coverage report | No test runner configured |

---

## Manual UI Verification

For any task that changes a page component, manually verify in the browser:

1. Start `npm run dev`.
2. Navigate to all affected pages.
3. Check that the visual layout, colours, and typography are unchanged (unless the task explicitly changes them).
4. Check responsive behaviour at mobile (375px) and desktop (1280px).
5. Verify any interactive elements (filters, forms, navigation) still work.

---

## Pre-Existing Issues (not caused by this documentation)

| Issue | Location | Severity |
|---|---|---|
| `react-hooks/set-state-in-effect` lint error | `app/products/page.tsx:244` | Pre-existing, low |
| 10 ESLint warnings (unused vars, `<img>` elements) | Various files | Pre-existing, low |
| CSS custom properties undefined | `components/ContactForm.tsx` | Pre-existing, medium — ContactForm may render with missing colours |
| Quote form does not submit data | `app/quote/page.tsx` | Pre-existing, high — known gap |
| `sitemap.ts` / `robot.ts` use `example.com` | `app/sitemap.ts`, `app/robot.ts` | Pre-existing, medium |
| `/about` contains placeholder content | `app/about/page.tsx` | Pre-existing, medium |
