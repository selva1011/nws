# Frontend Guidelines

Documents only verified or explicitly confirmed conventions from the NWS codebase. Inconsistencies are called out explicitly.

---

## Component Design

### Server vs Client Components
- Default to Server Components. Use `"use client"` only when the component needs:
  - `useState`, `useEffect`, `useRef`, or any other hook
  - Event handlers (`onClick`, `onSubmit`, `onMouseEnter`, etc.)
  - Browser-only APIs (`window`, `document`, `navigator`)
  - `useRouter`, `usePathname`, or other Next.js navigation hooks

- The current codebase over-applies `"use client"` (several pages use it only for `useRouter` on one button). This is a known inconsistency — do not replicate it in new components.

- `"use client"` must be the **first line** of the file when present, before all imports.

### Component Composition
- Page-local sub-components (used only within one page) are **co-located** in the page file, defined above the default export. Examples: `ChairTile` in `app/page.tsx`, `ChairCard` in `app/products/page.tsx`.
- Components shared by two or more pages live in `components/`.
- Do not create a `components/` subfolder hierarchy — all shared components are flat in `components/`.

### Props and Types
- Prop types are declared inline as object type annotations on the function parameter:
  ```tsx
  // Verified pattern
  function ChairCard({ chair }: { chair: typeof ALL_CHAIRS[0] }) { ... }
  function Header() { ... }  // no props
  ```
- No separate `interface` or `type` files are present. Do not create them without approval.
- Use `type` inference from existing data arrays where practical (e.g., `typeof ALL_CHAIRS[0]`).

---

## Data

- All page content data is module-scope `const` arrays defined above the component in the same file.
- There is no shared data layer, context, or store.
- Do not extract data into separate files without approval.

---

## State Ownership

- Local UI state (`hovered`, `open`, `active`, `page`, `loading`, `sent`) lives in the component that directly uses it.
- No state is shared between components via context or global store.
- Lift state up only when two sibling components genuinely need the same state.

---

## Effects

- The only `useEffect` in the codebase resets pagination (`setPage(1)`) when the filter `active` changes (`app/products/page.tsx`). This pattern triggers an ESLint error (`react-hooks/set-state-in-effect`) and is a known pre-existing issue.
- **Do not replicate this pattern.** For new code, derive values directly from state rather than using an effect to synchronise one state from another.

---

## Asynchronous Operations and Data Fetching

- The only async operation is the contact form submission in `ContactForm.tsx`:
  ```tsx
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  ```
- Pattern: `setLoading(true)` → `try { await fetch(...) }` → `catch { setStatus("error") }` → `finally { setLoading(false) }`.
- No SWR, React Query, or other data-fetching library is used.
- No server actions (`"use server"`) are used.

---

## Forms

Two form patterns currently co-exist (inconsistency documented):

**Pattern A — `ContactForm.tsx` (correct pattern for new forms):**
- Controlled via uncontrolled HTML form (`event.currentTarget`, `new FormData(form)`).
- Submits via `fetch` to an API route.
- Tracks `loading`, `status` (`"success" | "error" | ""`), and `message`.
- Calls `form.reset()` on success.
- Shows inline feedback with `aria-live="polite"`.

**Pattern B — `quote/page.tsx` (known gap):**
- Controlled via `useState` object (each field tracked individually).
- `onSubmit` calls `setSent(true)` only — **no actual data submission**.
- Do not replicate this pattern.

For new forms, follow Pattern A.

---

## Loading, Empty, and Error States

- **Loading:** Disable the submit button and change its label (`loading ? "Sending request..." : "Send request"`). Verified in `ContactForm.tsx`.
- **Error:** Show an inline message block conditionally. Use `aria-live="polite"`.
- **Success:** Show an inline success message and reset the form.
- **Empty states:** Not currently implemented on the products page (all categories have products in the data set).
- **No global spinner, toast, or modal system** is present.

---

## Accessibility

Verified practices:
- `aria-label` on icon-only buttons: `<button aria-label="Toggle menu">`, `<button aria-label="Previous">`.
- `aria-live="polite"` on form feedback messages in `ContactForm.tsx`.
- Form inputs have associated `<label>` elements with `htmlFor` matching `id`.
- Images have `alt` text (product images, logo, hero images).

Not verified / not implemented:
- No keyboard navigation testing documented.
- No focus management after route transitions.
- No skip-navigation link.
- Colour contrast of `#94A3B8` on white (muted text) may not meet WCAG AA — not audited.

---

## Responsive Behaviour

- Responsive breakpoints via Tailwind: `sm:`, `md:`, `lg:` (Tailwind defaults — 640px, 768px, 1024px).
- Maximum content width: `max-w-[1280px]` / `style={{ maxWidth: 1280 }}` consistently used.
- Mobile menu: visible below `lg:` (1024px), hidden above. Controlled by `open` state in `Header.tsx`.
- All grids switch from 1-column mobile to multi-column desktop using responsive Tailwind grid classes.

---

## CSS and Styling Conventions

See `architecture.md#Styling Architecture` for the full breakdown.

Summary for new code:
1. Use Tailwind utility classes for layout, spacing, and responsive behaviour.
2. Use inline `style={{}}` props for brand colours and font sizes.
3. Use the `.eyebrow`, `.section-title`, `.nav-link`, `.pattern`, `.product-scroll` utility classes from `globals.css` where applicable — check for existing classes before adding new ones.
4. Do not add CSS custom properties to components — the `var(--color-*)` pattern in `ContactForm.tsx` is broken and should not be replicated.
5. Do not introduce CSS Modules, Styled Components, Emotion, or any other styling library.

**Brand colour reference:**
```
#00A7C4  primary cyan (hover: #008CA6)
#0F172A  darkest bg / primary text
#111827  dark section bg
#F8FAFC  light section bg
#334155  medium text
#64748B  muted text
#94A3B8  subtle muted text
```

---

## Hover Effects

Mouse hover is handled via two verified approaches:

1. **`useState(false)` + `onMouseEnter` / `onMouseLeave`** — used in `ChairTile` and `ChairCard` to control zoom transform and colour change via inline styles.
2. **Direct DOM mutation via `e.currentTarget.style.*`** — used on CTA buttons in page files for background-colour transitions.
3. Tailwind `hover:` variants — used in `Header.tsx` (nav links, mobile menu button).

All three approaches co-exist. For new hover effects, prefer Tailwind `hover:` on simple elements and `useState` for multi-property transitions.

---

## Performance

- Product images use `<img>` with native browser loading (no `loading="lazy"` currently set).
- `next/image` is used for the logo (`Header.tsx`, `Footer.tsx`) with `priority` on the header logo.
- No `loading="lazy"` on product grid images — this is a potential improvement, not a current practice.
- No `React.memo` or other memoisation used.

---

## Error Boundaries

No `error.tsx` is configured in `app/`. React's default error boundary behaviour applies. Adding a global error boundary is a recommended improvement (see `architecture.md`).

---

## Naming Conventions (verified)

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase | `ContactForm.tsx`, `Header.tsx` |
| Page files | `page.tsx` (fixed by Next.js) | `app/products/page.tsx` |
| Component functions | PascalCase | `export default function Products()` |
| Local sub-components | PascalCase | `function ChairCard(...)` |
| Data constants | SCREAMING_SNAKE_CASE | `ALL_CHAIRS`, `CATEGORIES`, `SERVICES` |
| State variables | camelCase | `active`, `hovered`, `setSent` |
| Event handlers | camelCase verb | `handle`, `handleSubmit`, `scroll` |

---

## Import Conventions

- Path alias `@/` for absolute imports: `import Header from "@/components/Header"`.
- Relative imports also used within the same directory context.
- No barrel files (`index.ts`) are present in `components/`. Import directly: `import Header from "@/components/Header"`, not `import { Header } from "@/components"`.
- Import order is not enforced (no `eslint-plugin-import` configured).
