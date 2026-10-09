# Task and Implementation Plan Templates

Use these templates when creating a new task ticket or implementation plan for AI-assisted work on this repository.

---

## Task Template

Copy this template when defining a new task.

```markdown
## Task: [Short title]

### Objective
[One sentence: what will be different when this task is done.]

### Business Context
[Why is this needed? What user or business problem does it solve?]

### In Scope
- [List specific changes that are included]

### Out of Scope
- [List explicitly what must NOT change]

### Confirmed Requirements
- [ ] [Requirement 1 — verifiable and specific]
- [ ] [Requirement 2]

### Acceptance Criteria
- [ ] [Behaviour that can be tested manually or automatically]
- [ ] [Another observable outcome]

### UI References
[Link to designs, screenshots, or describe the expected visual outcome. If none, state "no UI change".]

### API Contracts
[Describe any API route changes — request body, response shape, status codes. If none, state "no API changes".]

### Edge Cases
- [What happens if the user submits an empty form?]
- [What happens on network error?]
- [What happens on mobile?]

### Accessibility Requirements
- [Any specific a11y requirements beyond the existing baseline]

### Test Requirements
[What must be verified? Manual browser check? Specific lint / type / build outcomes?]

### Unresolved Questions
- [ ] [Question that must be answered before implementation starts]

### Dependencies
[Other tasks or files that must be completed or reviewed first]
```

---

## Implementation Plan Template

Copy this template when preparing to implement a task.

```markdown
## Implementation Plan: [Task title]

### Relevant Existing Files
| File | Why it is relevant |
|---|---|
| `app/example/page.tsx` | Contains the component being changed |
| `components/ExampleForm.tsx` | Will be updated |

### Verified Current Behaviour
[Describe what the code currently does in the affected area, based on reading the actual files.]

### Proposed Approach
[Step-by-step description of what will change and why.]

### Files Expected to Change
- `app/example/page.tsx` — [what changes]
- `components/ExampleForm.tsx` — [what changes]

### Data and Control Flow
[Describe how data or events move through the affected code paths after the change.]

### Risks
- [Risk 1: e.g., "Changing the form submission handler may affect the success message display"]
- [Risk 2]

### Assumptions Requiring Confirmation
- [ ] [Something that is assumed but not verified in the repository — ask if material]

### Test Plan
- [ ] `npx tsc --noEmit` exits 0
- [ ] `npm run lint` introduces no new errors
- [ ] `npm run build` exits 0
- [ ] Navigate to [affected route] in browser and verify [specific behaviour]
- [ ] Verify on mobile viewport (375px)

### Validation Commands
```bash
npx tsc --noEmit
npm run lint
npm run build
```

### Rollback Considerations
[How would this change be reverted if needed? Is it a clean, isolatable diff?]

### Completion Checklist
- [ ] All files changed are listed above
- [ ] No unrelated files modified
- [ ] No new lint errors introduced
- [ ] `npx tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] Manual browser verification complete
- [ ] No secrets or generated files committed
- [ ] Summary report written
```
