# NWS design system

Implemented for the user-authorized seating-focused redesign on **2026-11-18**. This replaces the previous cyan/navy UI contract. The NWS name, logo and original product files remain unchanged. [Frontend guidance](frontend-guidelines.md) owns quality requirements; [Testing](testing-and-validation.md) records verification limits.

## Visual direction

A contemporary furniture catalogue: generous product photography, plum actions, lavender stages, warm white backgrounds, large sans-serif headings and practical selection tools. The homepage leads with a clear seating proposition and workspace imagery, then categories, a guided finder, selected models and common questions. Avoid a dashboard aesthetic, decorative statistics, invented badges and unsupported product claims.

## Tokens

Canonical definitions: [globals.css](../../app/globals.css).

| Role | Token / value |
|---|---|
| Primary action / hover | `--color-primary: #493653`, `--color-primary-hover: #302237`; white foreground |
| Soft action / finder surface | `--color-primary-soft: #EAE4F0` |
| Main text | `--color-secondary: #302A34` |
| Supporting text | `--color-neutral: #685F6E` |
| Borders | `--color-border: #DDD7DF` |
| White / light surface | `--color-base: #FFFFFF`, `--color-light-base: #F7F5F8` |
| Footer / dark surface | `--color-dark-base: #302237`; supporting text `#CDC3D2` |
| Page / product stage | `#FCFBFC` / `#F2EFF4` |
| Secondary editorial surface | `#ECE7E2` |

The logo retains its original colour artwork. It is rendered white in the footer. Product files are unmodified; CSS multiply blending on tinted stages integrates their white backgrounds. Detail photographs can be inspected through the zoom control. Do not generate alternate product views or imply that the inspirational interior is a delivered NWS project.

## Type and composition

- System stack: `Avenir Next`, Avenir, `Segoe UI`, sans-serif; no font download or new dependency.
- `.display-title`: responsive 44–88px, weight 500, 1.02 line height, -.065em tracking. Smaller page-specific limits apply to forms and secondary pages.
- `.section-title`: responsive 30–50px, weight 500, 1.1 line height. `.copy`: 16px, 1.8 line height, maximum 60ch.
- `.eyebrow` is a sentence-case supporting label, 13px/600; labels should provide context, not decorate every section.
- `.site-container`: maximum 1320px, 24px gutters, 18px on narrow screens. `.section-space`: 56–104px vertical space.
- Buttons/fields: 8px radius and minimum 50px height. Product frames: 12px radius. Editorial photography/form panels: 16px. Rounded arch stages are reserved for the seating finder/about feature.
- Header: sticky 80px row. Catalogue categories remain in normal flow; comparison selection has a bottom sticky bar. Anchors account for header clearance.
- Product cards: one column on small phones, two at sm and four at lg. Home categories: two, three, then five columns. Comparison/list tables intentionally scroll inside labeled regions.

## Interaction utilities

`.button-primary`, `.button-secondary`, `.text-link`, `.field`, `.field-label`, `.filter-chip`, `.product-stage` and `.faq-row` are the common CSS contracts. Shared styles live in Tailwind’s components layer so responsive utilities can override them. Tailwind handles page layout, spacing and breakpoints. Do not reintroduce hard-coded cyan controls or another styling framework.

Filters expose pressed state; checkboxes expose comparison selection; page controls expose current state. Native details/summary handles FAQs and services. Inputs have labels and visible focus. Mobile navigation closes on link selection or Escape and returns focus to its trigger on Escape.

Motion is tied to action: image hover, gallery zoom, a 220ms result swap and existing React ViewTransition image continuity. No mounted scroll-reveal wrappers or continuous decorative animation remain. Reduced-motion CSS disables transforms/transitions where applicable. Unsupported view-transition browsers navigate normally.

## Reference research

[Herman Miller office seating](https://www.hermanmiller.com/products/seating/office-chairs/) informed category-first exploration; [Steelcase office chairs](https://www.steelcase.com/products/office-chairs/) informed filter and comparison discovery. These are research references, not copied branding or assets.

Reviewed [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) for intentional composition and [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) for frontend quality. Existing Find Skills and Sites guidance supported the workflow. No skill package, runtime dependency or external asset was installed.
