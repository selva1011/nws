# Existing design system

Source-based inventory, verified 2026-11-07. See Testing for the latest focused visual checks. Values below describe implementation; future quality expectations live in [Frontend guidelines](frontend-guidelines.md).

## Maturity and tokens

The visual language uses cyan actions, navy text/dark sections, white product stages and light slate supporting surfaces. A small semantic CSS token layer now covers the established palette and motion timings; Tailwind utilities, inline styles and some repeated literals still coexist. There is no complete typography scale, shared field primitive, theme switch or icon system. Tailwind v4 is imported in [globals.css](../../app/globals.css); no `@theme` override or Tailwind config is present.

| Role | Actual values / definition | Status |
|---|---|---|
| Primary action | `--color-primary: #00A7C4`, `--color-primary-hover: #008CA6`, `--color-primary-soft: #F0FDFE` | Cyan uses navy text for normal-size actions; measured contrast is 6.23:1 on the base cyan and 4.51:1 on hover |
| Dark/text | `--color-secondary: #0F172A`, `--color-dark-base: #111827`; slate `#334155` | Navy anchors headings, controls and footer hierarchy |
| Muted | `--color-neutral: #64748B`, plus slate `#94A3B8` on dark surfaces | `#64748B` on white measures 4.76:1; other pairs still require per-component checks |
| Surface/border | `--color-base: #FFFFFF`, `--color-light-base: #F8FAFC`, `--color-border: #E2E8F0` | White product stages preserve source photography; light slate separates supporting surfaces |
| Additional existing accents | `#22D3EE` hero eyebrow, `#E6F7FA` icon/success surface, `#F0FDFE` hover surface, `#CBD5E1` pale text/background | Existing exceptions, not permission to expand the palette |
| Feedback | ContactForm emerald/rose Tailwind colors | Local success/error convention |
| Motion | `--motion-control: 160ms`, `--motion-content: 220ms`, `--motion-section: 420ms`; standard/emphasized easing | Shared timing baseline for controls, swaps and selected section reveals |

The formerly unresolved `--color-*` variables now map to the established brand palette, restoring ContactForm, contact/about and unused Experience declarations. Approved new brand values remain constrained by [AGENTS.md](../../AGENTS.md); extend the semantic layer only as part of an authorized design-system change.

## Typography, spacing and composition

| Concern | Verified pattern | Source / consistency |
|---|---|---|
| Font | Arial, Helvetica, sans-serif | globals.css body; no next/font import |
| Eyebrow | 11px / 800 / uppercase / .18em tracking | `.eyebrow` exists; pages often repeat equivalent styles inline |
| Section title | `clamp(28px,3vw,42px)` / 800 / -.04em / line-height 1.1 | `.section-title`; headings also use per-page clamps |
| Hero | Home `clamp(38px,6vw,68px)`; company `clamp(30px,5vw,56px)` | Different intentional compositions, not a formal scale |
| Body | Frequently text-sm (14px), 24–28px line height; card labels 10–14px | Mixed utility and inline values |
| Containers | Main marketing/catalogue width 1280px; quote 900px; contact max-w-4xl; about max-w-5xl | Width is contextual, not universally 1280px |
| Gutters/sections | Often 24px horizontal; 64/72/80px section padding; gaps 4/6/8/12 utilities | Implicit rhythm with exceptions; quote card fixed 48px padding |
| Layout | Home 1→2→4 columns; catalogue 1→2→3→4; services 1→2→3 | Breakpoint-driven utilities |
| Breakpoints | sm 40rem, md 48rem, lg 64rem (640/768/1024px at default 16px root) | Installed Tailwind default theme; no override |
| Radii | CTA/input 8px, product card 12px, service/form rounded-2xl, navigation pills; ContactForm larger rounding | Inconsistent component families; no semantic radius scale |
| Elevation | Low header shadow/backdrop blur, restrained product-card lift, detail-panel shadow and ContactForm shadow | Per-component values, no elevation tokens |

Header is sticky at top with a 74px inner row; catalogue filters use matching `top-[74px]` and a translucent white surface. Fixed quote card padding may constrain narrow screens; this is a source-based risk, not a measured overflow failure.

## Motion, icons and interaction states

Globals define `.nav-link`, `.pattern`, `.product-scroll`, button/card interactions and semantic timing/easing tokens. Phone ring/pulse motion runs once on hover/focus instead of continuously. Controls use roughly 150–160ms feedback, product/result changes 200–220ms, React shared-image route transitions 280ms, and selected section reveals 420ms. Catalogue pagination scrolls smoothly only when reduced motion is not requested. The global reduced-motion override disables animation, positional hover and smooth scrolling. ScrollReveal uses IntersectionObserver and Web Animations with live reduced-motion handling; initial content remains visible.

Hover styles still mix Tailwind variants and direct `event.currentTarget.style` assignments in older pages. Global focus-visible outlines and a skip link are present. Catalogue filters/pages/view controls expose pressed/current state; its search field is labeled and uses an explicit focus ring. Product thumbnails expose selection, support arrow/Home/End keys and crossfade stacked images without changing the frame. ContactForm now resolves its token-based focus colors. Quote still has no pending state.

Icons are inline SVG in Header, emoji in services/quote, text arrows/checkmarks and footer social abbreviations. Sizes vary by use (e.g. header SVG 12/16/20px, services 56px icon container); no icon dependency exists. Dark sections are composition choices within a light site, not a dark-mode theme.

## Applying existing styles

Inspect the closest component and existing utilities before adding styles. Preserve stable aspect-ratio image containers, white product-photo stages, contextual max widths and responsive grid progression. Use semantic variables before repeating the core palette or motion values. Do not normalize all radii, introduce gradients or redesign unrelated pages as incidental maintenance. Any further consolidation should retain visual intent and verify responsive/focus/motion states.

## 2026-11-07 catalogue refresh

Home, catalogue, detail and footer use spacious responsive compositions, navy text, light supporting surfaces, white product stages and rounded cards. Shared `.button-primary` uses cyan with dark text; older company/services/quote cyan actions now use the same readable foreground. ProductCard supplies a subtle 200ms hover/focus scale and React's built-in ViewTransition pairs a selected product image with its detail gallery where supported. Catalogue result swaps use a short opacity/translate animation rather than per-card scroll reveals. Product tables retain row/column headers and the comparison table has a keyboard-focusable horizontal scroll region. No styling or motion dependency was added.
