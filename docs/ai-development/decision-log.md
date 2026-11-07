# Decision Log

Records intentional documentation/architecture decisions. Older entries below are preserved as inherited records: their dates, rationale and approver claims were not independently re-established in the 2026-11-07 audit. Current implementation is verified in the linked reference documents; do not infer history from source alone.

**Format:** Add new entries at the top (most recent first).

---

## 2026-11-07 — Searchable catalogue and static product details

The user authorized a modern UI, clearer product information, three-image galleries, calling and search discoverability. Home/catalogue/detail content now uses server components with focused client controls. Product records moved into one local catalogue module because home cards, listings, detail metadata and sitemap need the same identifiers. No service/data fetching layer or new package was added.

Native IntersectionObserver/Web Animations provides scroll motion with reduced-motion handling. Each gallery supports three real photos but currently has only one supplied asset; missing photos are labeled, not synthesized. Unknown product facts and existing contact ownership remain explicitly unverified. Metadata describes known content without fabricated offers/reviews. This is a local repository update; no deployment was requested or performed.

---

## 2026-11-07 — Consolidate the repository intelligence layer

| Field | Value |
|---|---|
| **Status** | Implemented for this documentation task |
| **Context** | The user requested an evidence-based, progressive AI knowledge system without runtime changes. Existing docs contained useful guidance but stale catalogue/lint/robots claims and conflicting authority/check-order rules. |
| **Decision** | Retain `docs/ai-development/` as the canonical location; shorten root AGENTS; keep CLAUDE as a pointer; add focused route/component/data/design/performance/security/issue references. Merge product overview into AI context and UI quality into existing frontend guidance. |
| **Rationale** | Preserve useful existing navigation and history, reduce duplicate facts, and let future agents load only the relevant topic. |
| **Tradeoffs** | More small topic files to maintain; no duplicate uppercase taxonomy or per-feature documents until feature complexity warrants them. |
| **Scope** | Markdown only; managed Next.js block preserved; no application behavior, dependencies or tooling changed. |
| **References** | [Bootstrap](../../AGENTS.md), [AI context](ai-context.md), [Repository map](repository-map.md), [audit](testing-and-validation.md) |

---

## 2026-10-09 — AI-Development Foundation Established

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Problem** | The repository had no agent instructions beyond the auto-generated Next.js notice in `AGENTS.md`, a `CLAUDE.md` with only `@AGENTS.md`, and a default create-next-app README. Future AI-assisted changes had no project-specific guardrails. |
| **Decision** | Create `docs/ai-development/` documentation suite and extend `AGENTS.md` with project-specific instructions, without modifying any application source code. |
| **Alternatives considered** | (1) Single large AGENTS.md only — rejected because it would become too long to be useful. (2) Nested AGENTS.md per directory — rejected because `app/` and `components/` follow the same conventions and do not need different rules. |
| **Reasoning** | The `docs/ai-development/` structure allows AGENTS.md to stay concise while linking to deeper reference material. Nested instruction files were not needed because both source directories share the same stack, styling approach, and conventions. |
| **Consequences** | Future agents must read `AGENTS.md` and the relevant `docs/ai-development/` file before making changes. The auto-generated Next.js block in `AGENTS.md` must be preserved on all future edits. |
| **Affected areas** | `AGENTS.md`, `CLAUDE.md`, `docs/ai-development/` (new directory) |
| **Approver** | Selvaganapathi (repository owner) |

---

## 2026-10-09 — Modern Navbar Redesign & Direct Phone Call Integration

| Field | Value |
|---|---|
| **Status** | Accepted |
| **Problem** | The navigation bar used an older, plain design without active page states or direct call access, and mobile users needed an animated, accessible way to quickly call sales/inquiries. |
| **Decision** | Modernised `Header.tsx` with glassmorphic styling, pill navigation with active route detection (`usePathname`), smooth harmonic phone ring & pulse animations, a smooth morphing hamburger icon, and direct `tel:` links opening the user's phone app. |
| **Alternatives considered** | (1) Floating call widget only — rejected in favour of sticky header integration to avoid overlapping page content. (2) Heavy vibration animation — adjusted to a smooth, elegant harmonic ring and soft pulse. |
| **Reasoning** | Keeps the UI sleek, modern, and high-converting while seamlessly triggering native phone dialers on mobile devices. |
| **Affected areas** | `components/Header.tsx`, `app/globals.css` |
| **Approver** | Selvaganapathi (repository owner) |

---

<!-- Add new entries above this line, most recent first -->

---

## Template for Future Entries

```markdown
## YYYY-MM-DD — [Decision title]

| Field | Value |
|---|---|
| **Status** | Proposed / Accepted / Superseded |
| **Problem** | [What problem or question prompted this decision] |
| **Decision** | [What was decided] |
| **Alternatives considered** | [What else was considered and why it was rejected] |
| **Reasoning** | [Why this option was chosen] |
| **Consequences** | [What changes as a result; what new constraints exist] |
| **Affected areas** | [Files, directories, or systems affected] |
| **Approver** | [Who approved] |
```
