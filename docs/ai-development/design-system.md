# NWS design system

Implemented for the user-authorized white seating showroom on **2026-11-19**. It replaces the same day's dark theme, the 2026-11-18 plum/lavender palette and the earlier cyan/navy UI; none should be restored. The logo artwork stays removed; the brand name is rendered as text. [Frontend guidance](frontend-guidelines.md) owns quality requirements; [Testing](testing-and-validation.md) records what was verified.

## Visual direction

A quiet white showroom where real chair photography does the work. Near-black type, light-grey photo stages, charcoal for the selected category and bright yellow only for primary actions. The catalogue opens with a slim header and a wide, shallow hero, then "Seating", a compact category selector and dense, precisely aligned groups of chairs. Avoid decorative colour, badges, statistics and unverified product claims.

## Tokens

Canonical definitions: [globals.css](../../app/globals.css). Use the role tokens through Tailwind arbitrary values, for example `bg-[var(--color-surface)]`; do not hard-code hex values in components.

| Role | Token | Value |
|---|---|---|
| Main canvas | `--color-page` | `#FFFFFF` |
| Bands, footer, form panels | `--color-surface` | `#F5F5F5` |
| Secondary fill | `--color-raised` | `#EBEBEB` |
| Product photo stage | `--color-image-surface` | `#F4F4F4` |
| Headings, product names, body emphasis | `--color-text` | `#171717` |
| Supporting text | `--color-text-muted` | `#4A4A4A` |
| Placeholder | `--color-placeholder` | `#6B6B6B` |
| Primary action fill / hover | `--color-accent` / `--color-accent-hover` | `#FFD400` / `#F2C500` |
| Text on yellow | `--color-on-accent` | `#171717` |
| Deeper-gold small accents (underlines, arrows, current-nav rule) | `--color-gold` | `#8A6A00` |
| Selected fill / text on it | `--color-selected` / `--color-on-selected` | `#171717` / `#FFFFFF` |
| Keyboard focus outline | `--color-focus` | `#171717` |
| Decorative dividers | `--color-border` | `#E5E5E5` |
| Control outlines (chips, fields) | `--color-control` | `#858585` |
| Form error outline | `--color-error` | `#B42318` |
| Sticky header height | `--header-height` | `64px` |

The root declares `color-scheme: light`; the layout exports `themeColor: #ffffff`. `html` has `scroll-padding-top` of header height + 16px so hash targets clear the sticky header.

### Contrast (calculated from token values, WCAG 2.x)

| Pair | Ratio |
|---|---|
| Main text on white / surface / stage | 17.93 / 16.44 / 16.30 |
| Supporting text on white / surface / stage | 8.86 / 8.13 / 8.06 |
| Near-black on yellow / hover yellow | 12.52 / 10.89 |
| White on charcoal (selected category, step numbers) | 17.93 |
| Focus outline on white / surface | 17.93 / 16.44 |
| Deeper gold on white / surface / stage | 5.07 / 4.65 / 4.61 (also 3.54 on yellow) |
| Control outline on white / surface / stage | 3.69 / 3.38 / 3.35 |
| Placeholder on white / surface | 5.33 / 4.89 |
| Error on white / surface | 6.57 / 6.03 |

Yellow on white is 1.43:1, so yellow is never used for text, icons or outlines; it is only a button fill with near-black text. Decorative dividers are intentionally faint and must not be the only boundary of a control.

## State language

| State | Treatment |
|---|---|
| Category selector | Bordered 6px-radius links; hover: near-black border + surface fill; current (`aria-current="page"`): charcoal fill, white semibold text |
| Finder choices (`aria-pressed`) | Same chip style; pressed = charcoal fill, white text |
| Header / drawer current page | Semibold + 2px deeper-gold underline; hover underlines in near-black |
| Text links | Near-black semibold, 2px deeper-gold underline; hover underline turns near-black |
| Primary button | Yellow fill, near-black text; hover/active deeper yellow, press scale .98 |
| Secondary button | White fill, 1px near-black border; hover surface fill |
| Keyboard focus | 2px near-black outline, 3px offset (2px on fields) everywhere |
| Product tile hover (fine pointer only) / focus-visible | Photo lifts 3px over 180ms; reveal line fades in; name underlined in gold on hover |
| Gallery thumbnail selected | Charcoal 2px frame + ✓ badge |
| Mobile menu open | × icon, charcoal fill, white icon |
| Invalid field | Error-red outline after interaction (`:user-invalid`) plus the browser's message |
| Selected models in enquiry | Surface panel with a deeper-gold left rule |

## Product photography

The 32 originals are JPEGs on opaque white with very different baked-in margins (the chair fills 45–98% of the frame height; bottom margins range 0–23%). Fitting them directly into identical tiles gave mismatched sizes and floating bases.

- [scripts/frame-product-photos.swift](../../scripts/frame-product-photos.swift) (macOS, not part of the build) crops each photo to its non-white content box plus a 1.5% margin at native resolution, without resampling, recolouring or rotating, and writes it under the same name to `public/product-display/`. Originals in `public/products images/` are untouched and still feed metadata/JSON-LD. Re-run after adding or replacing a photo.
- Display surfaces use `.product-stage` (`#F4F4F4`) with `mix-blend-mode: multiply`, so the photos' white backgrounds take the stage tone (other colours darken by about 4%). Dark chairs, light-grey/white chairs (ZOOM HB, OSLO HB, METRO SOFA) and chrome legs stay discernible. An element that creates its own blend group (opacity/transform layers in the gallery) must carry the stage background itself.
- Tiles: 4:5 stage, `object-fit: contain`, `object-position: center bottom`, padding 10% top/sides and 8% bottom, so every base sits on one baseline. Tall executive chairs fill the height; wide sofas fill the width and still sit on the baseline (checked together with a training chair; the catalogue has no stool).
- The seating-finder arch uses a white stage so its shape reads on the grey band.
- Known source limit: "Visitor 3 Seater Sofa" is a 307×207 original and looks soft when enlarged.

The workspace image (`public/images/nws-hero.png`) is inspiration only; do not imply it is a delivered NWS project.

## Catalogue layout

- **Hero** (`/products`): full-bleed, shallow (188px phone, 240px sm, 300px md, 340px lg). The photo occupies the right 66% from md up (full width on phones, cropped `object-[84%_82%]` / `md:object-[50%_80%]` to keep both chairs), with a white gradient (`.catalogue-hero-fade`) behind the heading on the quiet window side. One-line introduction; the image is decorative (`alt=""`).
- **Selector**: "Seating" heading, a polite model count, and the category links wrapping in one or two rows.
- **Groups**: All shows every category under an h3 with its count and a hairline; a category shows only its group. 40–64px between groups; 28px between rows; 16px columns (20px at xl).
- **Grid** (`.catalogue-grid`): fixed column counts so every section shares the same tracks: 2 (< 480px), 3 (480), 4 (640), 5 (768), 6 (1024), 8 (1280+). Measured tile widths: 169px at 390, 131px at 768, 149px at 1024, 147.5px at 1440. Short groups fill slots from the left and never stretch.
- **Tile** (`ProductCard`, `.product-tile`): one link per product (`id="p-<slug>"`), stage, name directly below (13px semibold, wraps with `overflow-wrap: anywhere`), then a reveal line that is always laid out (opacity only) so hover never moves neighbours. Reveal text is the verified catalogue style when it adds information ("High Back", "Medium Back", "Mesh Chair"), otherwise "View details", followed by a gold →. Hover rules apply only under `(hover: hover) and (pointer: fine)`; touch taps navigate immediately. Focus-visible shows the same lift and reveal. Reduced motion removes the lift.
- **Detail page**: back link + breadcrumb; gallery (square stage) beside category link, model name, style, Enquire (primary) and Call (secondary), a two-cell verified-features list and description. Phones stack the gallery first with the name and actions directly after. Then a specification table and "More …" related models on the catalogue grid.

## Type and composition

- System stack: `Avenir Next`, Avenir, `Segoe UI`, sans-serif; no font download.
- `.display-title`: 44–88px, weight 600, 1.02 line height, -.06em tracking (marketing pages). Catalogue hero h1: 26–56px semibold.
- `.section-title`: 30–50px, weight 500. `.copy`: 16px, 1.8 line height, 60ch, supporting colour. `.eyebrow`: 13px/600 supporting colour.
- `.site-container`: max 1320px, 24px gutters (18px under 640px). `.section-space`: 56–104px.
- Header: sticky 64px white row with hairline, text brand link, nav (lg+), yellow CTA (sm+, pinned right) and menu button (< lg). Footer: surface band.
- Buttons/fields: 8px radius, 48px minimum height. Chips: 6px radius, 40px. Tiles: 8px stage radius. Gallery: 16px.

## Brand

Header and footer show **Node Workspace Solutions** as a text link to `/` named "Node Workspace Solutions home". No logo image is rendered and the Organization JSON-LD has no `logo`. The favicon is the default framework icon; the social image is the workspace photo.

## Interaction utilities

`.button-primary`, `.button-secondary`, `.text-link`, `.field`, `.field-label`, `.filter-chip`, `.product-stage`, `.catalogue-grid`, `.product-tile` (+ `.tile-stage`, `.tile-photo`, `.tile-name`, `.tile-reveal`, `.tile-arrow`), `.faq-row` and `.catalogue-hero-fade` are the shared CSS contracts in Tailwind's components layer. Tailwind handles page layout, spacing and breakpoints. Do not add another styling framework.

Motion is tied to action: tile lift/reveal (180ms), gallery zoom and photo cross-fade, and the existing React ViewTransition between tile and gallery. Reduced-motion CSS disables transitions and the tile lift. Unsupported view-transition browsers navigate normally.

## Reference research

The user-supplied showroom screenshot set the target for catalogue density, base alignment, white space and category grouping; no assets, names or branding were copied from it. [Herman Miller office seating](https://www.hermanmiller.com/products/seating/office-chairs/) and [Steelcase office chairs](https://www.steelcase.com/products/office-chairs/) informed earlier category-first exploration.

Reviewed [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) for intentional composition and [Vercel agent-skills](https://github.com/vercel-labs/agent-skills) for frontend quality. No skill package, runtime dependency or external asset was installed.
