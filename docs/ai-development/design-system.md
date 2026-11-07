# Existing design system

Source-based inventory, verified 2026-11-07. See Testing for the latest focused visual checks. Values below describe implementation; future quality expectations live in [Frontend guidelines](frontend-guidelines.md).

## Maturity and tokens

The visual language is recognizable (cyan actions, dark navy text/sections, white/light surfaces) but mostly implicit. There is no complete semantic token layer, typography scale, shared button/input primitive, theme switch, or icon system. Tailwind v4 is imported in [globals.css](../../app/globals.css); inline styles and arbitrary utility values coexist. No `@theme` override or Tailwind config is present.

| Role | Actual values / definition | Status |
|---|---|---|
| Primary action | `#00A7C4`, hover `#008CA6`; `:root { --cyan:#00A7C4; }` | One defined custom variable; mostly repeated literals |
| Dark/text | `#0F172A`, `#111827`, `#334155` | Repeated literals and slate utilities |
| Muted | `#64748B`, `#94A3B8` | Repeated; contrast not audited |
| Surface/border | White, `#F8FAFC`, `#F1F5F9`, `#E2E8F0` | Repeated across cards/forms |
| Additional existing accents | `#22D3EE` hero eyebrow, `#E6F7FA` icon/success surface, `#F0FDFE` hover surface, `#CBD5E1` pale text/background | Existing exceptions, not permission to expand the palette |
| Feedback | ContactForm emerald/rose Tailwind colors | Local success/error convention |
| Legacy semantic variables | `--color-primary`, `--color-secondary`, `--color-neutral`, `--color-border`, `--color-base`, `--color-light-base`, `--color-dark-base` | Referenced but undefined in project CSS; affected declarations cannot use intended values |

Undefined variables appear in ContactForm, contact/about text and unused Experience. Do not treat their names as usable tokens. Approved new brand values remain constrained by [AGENTS.md](../../AGENTS.md); new semantic tokens need an authorized change.

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
| Elevation | Cyan CTA shadows, low header shadow/backdrop blur, hover shadow on services, large soft ContactForm shadow | Per-component values, no elevation tokens |

Header is sticky at top with a 74px inner row; catalogue filters are in normal document flow. Check the interaction at real viewports before changing either. Fixed quote card padding may constrain narrow screens; this is a source-based risk, not a measured overflow failure.

## Motion, icons and interaction states

Globals define `.nav-link` underline transitions, `.pattern` 18px dot grid, `.product-scroll` hidden scrollbars, `.animate-phone-ring` and `.animate-pulse-ring` with infinite 3.6s animations. `html` enables smooth scrolling. Header uses 200/300ms transitions, product/home images a .55s zoom, catalogue pagination smooth scroll. A global reduced-motion override disables continuous animations and smooth scrolling. ScrollReveal uses IntersectionObserver and Web Animations with live reduced-motion handling; initial content remains visible.

Hover styles mix Tailwind variants, local React state and direct `event.currentTarget.style` assignments. Global focus-visible outlines and a skip link are present. Quote inputs/selects/textarea remove outline and mutate border on focus; ContactForm removes outline while its focus border token is undefined. Pending/disabled styling exists in ContactForm only; quote has no pending state. Catalogue filters/pages expose pressed/current state; its search field is labeled.

Icons are inline SVG in Header, emoji in services/quote, text arrows/checkmarks and footer social abbreviations. Sizes vary by use (e.g. header SVG 12/16/20px, services 56px icon container); no icon dependency exists. Dark sections are composition choices within a light site, not a dark-mode theme.

## Applying existing styles

Inspect the closest component and existing utilities before adding styles. Preserve aspect-ratio image containers, contextual max widths and responsive grid progression. Do not normalize all radii, introduce gradients, redesign the header, or define a new token system as incidental maintenance. A future authorized consolidation should retain visual intent and verify responsive/focus/motion states; it is proposed improvement work, not an implemented design system.

## 2026-11-07 catalogue refresh

Home, catalogue, detail and footer use spacious responsive compositions, navy text, light surfaces, contained product photos and rounded cards. Shared `.button-primary` uses cyan with dark text; `.button-secondary` uses a white bordered surface. ProductCard supplies CSS hover/focus image scaling; `.product-card` supplies restrained lift. New grids use 1→2→4 columns. Product tables retain row/column headers and the comparison table has a keyboard-focusable horizontal scroll region. Unchanged company/quote/contact styles retain their earlier limitations. No new token or styling dependency was introduced.
