# Decision Log

Records architectural and structural decisions made for this repository. Use this file to capture future decisions that affect patterns, libraries, tooling, or conventions.

**Format:** Add new entries at the top (most recent first).

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
