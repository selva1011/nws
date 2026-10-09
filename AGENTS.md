<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# NWS — Agent Instructions

> **Source of truth hierarchy:** this file → `docs/ai-development/` → source code → ask the user.
> Read the relevant `docs/ai-development/` file before working in an unfamiliar area.

## Application

Node Workspace Solutions (NWS) is a marketing and product-catalogue website for an ergonomic office furniture company based in Chennai, India.  
Production domain: `nwsworkspace.com`  
Repository: `https://github.com/selva1011/nws`

## Technology Stack (verified)

| Item | Value |
|---|---|
| Framework | Next.js 16.3.0, App Router, Turbopack |
| Language | TypeScript 5, strict mode |
| React | 19.2.8 |
| Runtime | Node.js (active: v24; no engine field in package.json) |
| Package manager | **npm only** — `package-lock.json` is present. Never use yarn, pnpm, or bun. |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + inline `style={{}}` props |
| Deployment | Vercel |

## Setup and Commands

```bash
npm install          # install dependencies
npm run dev          # dev server → http://localhost:3000
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npx tsc --noEmit     # TypeScript check (no tsc script in package.json)
npm run build        # production build
npm run start        # serve production build locally
```

No test runner is configured. No formatter is configured. See `docs/ai-development/testing-and-validation.md` for current validation status.

## Repository Structure

```
app/               Next.js App Router pages and API route
  layout.tsx       Root layout — <Header> + {children} + <Footer>
  page.tsx         Home page
  about/           Stub page (placeholder content, not in nav)
  company/         Company/About page
  contact/         Contact page (server component)
  products/        Product catalogue with filter + pagination
  quote/           Quote request form
  services/        Services page
  api/contact/     POST route — receives form data (logs only; email TODO)
  globals.css      Tailwind import + project utility classes
  sitemap.ts       XML sitemap
  robot.ts         robots.txt
components/        Shared components
  Header.tsx       Sticky nav with mobile menu
  Footer.tsx       Site footer
  ContactForm.tsx  Contact form (fetch → /api/contact)
  ImageCarousel.tsx Scroll carousel (exists, not currently used in pages)
  PageTransition.tsx View Transitions wrapper (exists, not currently used)
  Experience.tsx   Stats display (exists, not currently used)
public/            Static assets
  logo.png
  banner_1/2/3.jpg
  images/          nws-hero.png
  products images/ 32 product JPEG files (directory name contains a space)
docs/ai-development/ Agent documentation — read before working in each area
```

## Path Alias

`@/` resolves to the repository root. Example: `import Header from "@/components/Header"`.

## Architecture Rules

- Pages live in `app/<route>/page.tsx`. Do not create pages elsewhere.
- Shared components live in `components/`. Do not put components inside `app/`.
- All data (products, team, services) is hard-coded as `const` arrays in the relevant page file. There is no external API, CMS, or database.
- The only API route is `app/api/contact/route.ts` (POST). Do not add new routes without approval.
- `app/layout.tsx` is the only place `<Header>` and `<Footer>` are rendered. Do not render them inside pages.
- `next.config.ts` is intentionally minimal (empty config object). Do not add options without approval.

## Client vs Server Boundary

- Prefer Server Components for pages that do not require browser APIs or event handlers.
- Use `"use client"` only when the component uses `useState`, `useEffect`, `useRouter`, event handlers, or browser-only APIs.
- The current codebase over-applies `"use client"`. Do not remove existing directives without verifying the component uses no client-only APIs.

## Styling Conventions

- Tailwind v4 utility classes for layout, spacing, grid, flexbox, and responsive breakpoints.
- Inline `style={{}}` props for brand colours, font sizes, and component-specific measurements.
- **Do not introduce a new CSS-in-JS library, CSS Modules, or additional styling system.**
- Brand colour tokens (use these exact values; do not introduce new ones):
  - Primary cyan: `#00A7C4` (hover: `#008CA6`)
  - Dark bg: `#0F172A` / `#111827`
  - Light bg: `#F8FAFC`
  - Body text: `#0F172A`, `#334155`
  - Muted text: `#64748B`, `#94A3B8`
- CSS utility classes defined in `app/globals.css`: `.eyebrow`, `.section-title`, `.pattern`, `.nav-link`, `.product-scroll`. Use them before adding new ones.
- **`ContactForm.tsx` references CSS custom properties (`var(--color-primary)` etc.) that are not defined in `globals.css`.** This is a known gap — do not rely on those variables in new components.

## Component Conventions

- Server Components: no `"use client"`, no hooks, no browser APIs, may use async/await.
- Client Components: must have `"use client"` as the first line.
- Local sub-components (e.g., `ChairCard`, `ChairTile`) are co-located in the page file. Move to `components/` only when reused across more than one page.
- Prop types are defined inline (object type annotation on the parameter). No separate `interface` files observed.
- Data arrays are defined as `const` at module scope above the component.

## Routing Conventions

- App Router file-system routing — add `page.tsx` inside a new `app/<route>/` directory.
- Client-side navigation uses `useRouter().push(path)` (client components) or `<Link href>` (either).
- Do not use the Pages Router.

## Form Conventions

- Two separate form implementations exist:
  - `ContactForm.tsx` — fetches `/api/contact` and handles success/error state correctly.
  - `quote/page.tsx` — **sets state to "sent" without sending data**. This is a known gap.
- New forms should follow the `ContactForm.tsx` pattern: `fetch` the relevant API route, set `loading`/`status`/`message` state, call `form.reset()` on success.

## Image Conventions

- Static images: `<img>` tags with `src` pointing to `/public` paths or Unsplash CDN URLs. `next/image` is used only in `Header.tsx` and `Footer.tsx` (logo).
- ESLint warns on `<img>` throughout the codebase — this is a pre-existing condition. Do not silence warnings in new code; use `next/image` for any new images.
- Product images are in `public/products images/` (space in name). Reference them as `/products images/filename.jpeg`.

## SEO / Metadata

- Root metadata: defined in `app/layout.tsx` (`export const metadata`).
- Page-level metadata: defined in the relevant `page.tsx` using `export const metadata` (Server Components only).
- Do not add metadata exports to `"use client"` pages — this is a Next.js constraint.

## Environment Variables

- No `.env` files exist in the repository (gitignored).
- No `NEXT_PUBLIC_*` or server-side env vars are currently used.
- Do not add environment variables without documenting them and getting approval.
- Never commit secrets or `.env` files.

## What Must Not Be Changed Without Approval

- Any visible UI, layout, copy, or user flow.
- Dependencies (`package.json`, `package-lock.json`).
- Build tooling (`next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`).
- Package scripts.
- The `AGENTS.md` auto-generated block (`<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END:nextjs-agent-rules -->`).
- Generated files: `.next/`, `next-env.d.ts`.

## Required Workflow for Every Task

1. Read the task description and any relevant `docs/ai-development/` file.
2. Inspect the actual files affected — do not rely on memory of this file alone.
3. Search for an existing pattern before creating a new abstraction.
4. Restate the verified requirements before writing code.
5. List unanswered questions and ask before proceeding if any are material.
6. Make the smallest coherent change required — avoid unrelated refactoring.
7. Run `npm run lint`, then `npx tsc --noEmit`, then `npm run build`.
8. Review the diff for unintended changes before finishing.
9. Report: files changed, commands run, results, assumptions, limitations.

## Definition of Done

- [ ] The change achieves the stated objective.
- [ ] No existing page, route, or visible behaviour is altered unless explicitly required.
- [ ] `npx tsc --noEmit` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run lint` introduces no **new** errors (pre-existing warnings are acceptable).
- [ ] No secrets, env values, or generated files are committed.

## Prohibited Actions

- Do not invent API routes, response shapes, environment variables, or business rules.
- Do not claim a check passed if the command was not executed or failed.
- Do not modify generated files (`.next/`, `next-env.d.ts`) directly.
- Do not install new packages without explicit approval.
- Do not alter the folder structure without explicit approval.
- Do not expose or copy the contents of any `.env` file.
- Do not treat warnings as errors or hide pre-existing failures.

## Further Documentation

- [`docs/ai-development/repository-map.md`](docs/ai-development/repository-map.md) — detailed directory responsibilities
- [`docs/ai-development/architecture.md`](docs/ai-development/architecture.md) — bootstrapping, routing, state, data flow
- [`docs/ai-development/frontend-guidelines.md`](docs/ai-development/frontend-guidelines.md) — component, styling, accessibility standards
- [`docs/ai-development/development-workflow.md`](docs/ai-development/development-workflow.md) — task workflow and edge-case rules
- [`docs/ai-development/testing-and-validation.md`](docs/ai-development/testing-and-validation.md) — all validation commands and current results
- [`docs/ai-development/task-and-plan-templates.md`](docs/ai-development/task-and-plan-templates.md) — templates for new tasks and implementation plans
- [`docs/ai-development/decision-log.md`](docs/ai-development/decision-log.md) — architectural decisions
- [`docs/ai-development/domain-glossary.md`](docs/ai-development/domain-glossary.md) — domain terminology
