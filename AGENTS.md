<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NWS — Agent Instructions

Node Workspace Solutions is a Chennai office-furniture marketing and catalogue site.
Repository: `selva1011/nws`. Intended production domain: `nwsworkspace.com`.

## Start here — progressive context

1. Read this file; do not load every document by default.
2. For first orientation, read [AI context](docs/ai-development/ai-context.md).
3. Select one task-specific document below, then inspect the actual source and its callers.
4. Treat documentation as an index, never as a substitute for verifying code before editing.

| Task | First document | Source area |
|---|---|---|
| Find an implementation | [Repository map](docs/ai-development/repository-map.md) | `app/`, `components/` |
| Add/change a page or metadata | [Routes and features](docs/ai-development/routes-and-features.md) | `app/`, `app/layout.tsx` |
| Change catalogue filters/pagination | [Data flow](docs/ai-development/data-flow.md) | `app/products/page.tsx`, `app/page.tsx` |
| Change forms/API or debug submission | [Data flow](docs/ai-development/data-flow.md), [Security](docs/ai-development/security.md) | `components/ContactForm.tsx`, `app/api/contact/route.ts`, `app/quote/page.tsx` |
| Reuse/build a component | [Component registry](docs/ai-development/component-registry.md) | `components/`, page-local components |
| Change styling/responsiveness | [Design system](docs/ai-development/design-system.md), [Frontend quality](docs/ai-development/frontend-guidelines.md) | `app/globals.css`, affected component |
| Change rendering/dependencies | [Architecture](docs/ai-development/architecture.md) | Root layout and imports |
| Improve loading/speed | [Performance](docs/ai-development/performance.md) | Images, client boundaries, product Suspense |
| Validate/debug tooling | [Testing](docs/ai-development/testing-and-validation.md) | `package.json`, configs |
| Investigate a limitation | [Known issues](docs/ai-development/known-issues.md) | Source evidence linked per issue |
| Plan a task | [Workflow](docs/ai-development/development-workflow.md), [Templates](docs/ai-development/task-and-plan-templates.md) | Affected files only |
| Interpret business terms/history | [Glossary](docs/ai-development/domain-glossary.md), [Decisions](docs/ai-development/decision-log.md) | Page content; confirm business claims |

## Evidence and authority

- Instructions: explicit user task → this file → relevant `docs/ai-development/` guidance.
- Implementation facts: current source/configuration and executed checks. Correct stale docs; never change source merely to match docs.
- Label inferences, unknowns, proposals, and historical records. Page copy does not prove business claims.
- Ask about material scope ambiguities; proceed with already authorized work. Do not invent requirements.

## Stack and structure

- Next.js **16.3.0**, App Router; React/React DOM **19.2.8**; TypeScript strict mode.
- Tailwind **v4** via `@tailwindcss/postcss`; inline styles for many brand/size values.
- **npm only**. Exact installed/locked versions and runtime snapshot: [AI context](docs/ai-development/ai-context.md).
- `app/`: pages, root layout, global CSS, metadata, one POST route.
- `components/`: flat shared components. `public/`: static assets, including `products images/` (space and case matter).
- `@/` resolves to repository root. No CMS, database, auth, global store, or test runner is implemented.
- Vercel is the stated deployment target; hosted settings are not verified by repository inspection.

## Implementation rules

- Pages: `app/<route>/page.tsx`. Shared components: `components/`. Keep single-page subcomponents in their page file.
- Render Header/Footer only from `app/layout.tsx`.
- Prefer Server Components. Put `"use client"` first when hooks, handlers, navigation hooks, or browser APIs require it. Verify before removing existing directives.
- Do not export metadata from Client Components. Preserve the product page's `useSearchParams`/Suspense boundary.
- Content is hard-coded locally; preserve existing ownership. No speculative data/service layer.
- Use inline prop types or infer from existing arrays. Avoid unnecessary `any`; validate untrusted input at runtime.
- Imports are direct, without component barrel files. Search existing patterns before introducing abstractions.
- Tailwind handles layout/spacing/breakpoints; use established inline styles for brand/measurements. No new styling system.
- Reuse existing CSS utilities; see [Design system](docs/ai-development/design-system.md) for actual tokens and exceptions.
- Approved brand values: `#00A7C4` / hover `#008CA6`; dark `#0F172A`, `#111827`; light `#F8FAFC`; text `#0F172A`, `#334155`, `#64748B`, `#94A3B8`.
- Existing `--color-*` references are unresolved. Do not reuse them in new UI without an approved fix.
- Use `next/image` for new images; preserve current paths including `/products images/`. Check installed image docs before new configuration.
- For submissions, reuse ContactForm's loading/error/reset approach, but verify delivery: the current API only logs. Quote's success-only handler is not a working submission pattern.
- No new visual behavior, copy, or user flow unless authorized by the task. Follow [Frontend quality](docs/ai-development/frontend-guidelines.md).

## Scope and safety

Get approval unless the task already authorizes the change:

- Visible UI/layout/copy/user flows; new routes (including APIs); folder restructuring or shared data/type extraction.
- Dependencies, package scripts, build/tooling configuration, additional styling systems, environment variables.
- `next.config.ts` is intentionally minimal. Do not add options speculatively.

Never:

- Modify the managed Next.js block above, generated `.next/` or `next-env.d.ts` manually.
- Manually edit `package-lock.json`, install packages silently, commit secrets, or reveal/copy environment values.
- Invent API contracts, business facts, integrations, authentication, or delivery guarantees.
- Hide pre-existing failures, suppress image lint warnings, or claim unexecuted checks passed.

## Required workflow and completion

1. Read relevant docs; inspect affected source and call sites; find an existing pattern.
2. Restate verified requirements, expected files, and scope before edits. Resolve material questions.
3. Make the smallest coherent authorized change; update only affected documentation.
4. Run **`npm run lint` → `npx tsc --noEmit` → `npm run build`** in that order.
5. For UI/behavior changes, perform focused browser checks described in [Testing](docs/ai-development/testing-and-validation.md).
6. Review the complete diff for scope, generated files, and sensitive content.
7. Report files, commands/results, assumptions, pre-existing issues, and verification limits.

Done means the objective is met, types/build pass, lint has no new errors, and no unrelated behavior changes.
Current check results belong in Testing, not this bootstrap. No test/format commands exist beyond the documented scripts.

## Documentation maintenance

| Change | Update canonical document |
|---|---|
| Route/metadata added, removed, renamed | Routes and features; repository map task entry if affected |
| Shared component/API changed | Component registry; data flow for request contracts |
| Token/layout pattern changed | Design system; frontend guidance if the contract changes |
| Rendering/dependency boundary changed | Architecture; decision log for intentional decisions |
| State/submission/query behavior changed | Data flow |
| New limitation resolved/discovered | Known issues; Testing if validation changes |
| Tooling/version changed | AI context; Testing/workflow as applicable |
| New complex feature | Add focused feature documentation only when existing documents are insufficient |

Keep one canonical owner per concept; link instead of copying. Link volatile facts to source, date validation snapshots, remove stale references. `CLAUDE.md` delegates here; do not maintain parallel instruction copies.
