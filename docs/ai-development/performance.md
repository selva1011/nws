# Performance evidence and measurement

Source/build review **2026-11-18**. No Lighthouse, field telemetry, profiler or Core Web Vitals benchmark was run. Do not claim measured speed improvements.

## Implemented structure

- All page entries are Server Components. Quote renders per request because it resolves selected slugs from searchParams; the remaining marketing pages prerender, alongside 32 product details.
- Focused clients: Header, SeatFinder, CatalogueBrowser, ProductGallery and ContactForm. Company/services no longer ship client navigation/hover handlers.
- Catalogue data contains 32 records; All renders every tile (prerendered in the static fallback). Category filtering is a URL change rendered locally; no data request is required.
- All mounted photos use next/image with sizes and stable frames. Tiles, gallery and home/finder/about images use framed copies in `public/product-display/` (3.7 MB, native resolution, JPEG q 0.85); originals stay for metadata. The header loads no image. Catalogue hero, home hero and detail leading images use preload. Additional product photos are not fabricated.
- System fonts have no download dependency. No animation/icon/data-fetch packages, analytics or global provider were added.
- ScrollReveal and other unused components remain unmounted. User-driven transitions are CSS/React-native and respect reduced motion.
- The default Turbopack build passes. Build/start validation and browser limitations live in [Testing](testing-and-validation.md).

## Measurement procedure

1. Use a production build and record route, viewport, device and commit. Do not use dev timing as a production baseline.
2. Inspect image transfer sizes, decode/layout costs, preload usefulness and LCP on home/products/detail.
3. Observe layout shifts during image arrival and catalogue Suspense hydration. Stable frames do not prove zero CLS.
4. Profile category switching, the All view (32 tiles), tile hover, gallery zoom/swipe, mobile menu and form draft preparation on representative hardware.
5. Verify reduced motion, touch targets and keyboard interactions alongside performance.
6. Inspect bundles with existing tooling before proposing dependencies or optimizations. Record methodology and repeated measurements.
