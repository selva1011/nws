# Development workflow

[AGENTS.md](../../AGENTS.md) owns repository instructions and approval boundaries. This document explains execution; [Testing](testing-and-validation.md) owns commands/results.

## Selective task workflow

1. Read the task and bootstrap. Choose the relevant task document from its table; do not read the whole knowledge base for each change.
2. Use [Repository map](repository-map.md) to locate implementation. Inspect every affected file, callers, local types/data and relevant installed Next.js guide. Search existing patterns before adding abstractions.
3. Restate verified requirements, expected files, scope and unresolved material questions. Explicitly distinguish code behavior, business assumptions and proposed improvements.
4. Resolve scope-critical questions before dependent implementation. Continue independent authorized investigation; do not repeatedly request authorization already provided by the task.
5. Make the smallest coherent change. For larger work, use logical reviewable steps rather than unrelated refactors. [Templates](task-and-plan-templates.md) are optional planning aids; do not create bureaucracy for a small edit.
6. Update only canonical documents affected by the implementation. The bootstrap maintenance matrix identifies owners. Remove stale references and link rather than copy explanations.
7. Run `npm run lint`, then `npx tsc --noEmit`, then `npm run build`. Run relevant browser/behavior checks; no unit/E2E runner currently exists.
8. Review the diff and final status for unintended application, tooling, generated or sensitive changes. Preserve pre-existing user work.
9. Report changed files, commands/results, behavior/assumptions, pre-existing failures, and verification limits. Never report a check as passed if unavailable or failed.

## Evidence and disagreement

User instructions and AGENTS.md govern what is allowed. Current source/configuration and executed checks establish what is implemented. If documentation describes old behavior, verify and correct the document within scope; do not change working source to fit it. Ask only when the discrepancy leaves a material product requirement unresolved. Existing decision records are historical statements, not proof of current behavior or independently verified approval history.

## Scope-specific rules

- New routes, dependencies/scripts/tooling, environment variables, structural extraction and UI behavior need authorization as described in AGENTS.md. Explicit task authorization counts; a large diff alone does not invalidate it.
- API changes must inspect both producer and consumer. The actual contact request/response shape is in [Data flow](data-flow.md); quote currently has no network contract.
- Never edit generated .next/next-env files or the managed AGENTS block manually. Dependency lockfiles are tool-generated, not hand-edited.
- Do not install tooling just to complete an audit. Disclose unavailable verification. A sandbox-denied required check should be retried through the available approval mechanism, without disguising it as a code failure.
- Pre-existing lint/test issues are documented, not silently fixed or suppressed. A successful type/build check is not proof of delivery, accessibility, or business correctness.
- UI changes require inspecting existing tokens, reusable components and relevant states. Prefer [Frontend guidelines](frontend-guidelines.md) over inventing another style system.

## Documentation maintenance example

For a catalogue query change: update Data flow, Routes if the URL contract changes, Testing's manual regression cases, and the matching issue entry if resolved. Do not rewrite unrelated design/security docs. For a shared component prop change: update the Registry and callers. Record an architecture decision only when an intentional boundary/policy changes, labeling inference and proposals honestly.
