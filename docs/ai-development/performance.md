# Performance: evidence and measurement

This is a source/build assessment, **not** a measured Core Web Vitals or bundle audit. No Lighthouse, field telemetry, profiler, or network transfer benchmark was run.

## Observed architecture

- All seven pages are classified static by the successful alternate Webpack build; the default Turbopack build is environment-blocked (see [Testing](testing-and-validation.md)). Static output still includes hydration work for client components. Product Suspense initially supplies only the header fallback; content depends on query-aware client rendering.
- Five page entries are client components; company/services need modest navigation/hover interactions. Narrowing these boundaries is a potential optimization, not proof of a current speed failure.
- ALL_CHAIRS holds 32 records in the client catalogue module; only eight cards render per page. No API fetch or server round trip is needed to filter.
- Home/company use remote Unsplash img URLs. Catalogue, home tiles, quote success and unused carousel also use img. No loading=lazy is supplied for those images. Header/Footer logos use next/image; Header specifies priority. Consult installed image docs before altering its loading props.
- Product images have a 4:5 container and home tiles are square; these reserve layout space. Other media and the product fallback still need measured layout-shift checks; do not claim zero CLS.
- Body uses system fonts; there is no font download integration. No analytics, global store, animation package or data-fetch library is imported.
- Header blur/shadows, looping phone animations and JavaScript hover state are candidates for profiling, not established bottlenecks. Three unused components have no active import path and should not be counted as mounted runtime overhead.

Evidence: [layout](../../app/layout.tsx), [home](../../app/page.tsx), [company](../../app/company/page.tsx), [catalogue](../../app/products/page.tsx), [Header](../../components/Header.tsx), [CSS](../../app/globals.css), [registry](component-registry.md).

## Proposed measurement procedure

1. Use the documented build/start commands and record commit, runtime, route, viewport and environment. Compare equivalent production builds; dev timing is not a performance baseline.
2. In browser DevTools, record image transfer sizes/cache behavior, LCP element and request priority on home/company/catalogue. Inspect remote image failures separately from application failures.
3. Capture layout shifts during initial render, catalogue hydration, and image arrival. Inspect the Suspense fallback transition.
4. Profile filter/pagination/menu interactions and hover on a representative mobile device or declared throttling setup. Record repeat runs, not a single anecdote.
5. Review client bundle composition with existing build artifacts/DevTools. Adding an analyzer dependency requires approval. Report bytes and methodology before claiming improvement.
6. Verify reduced-motion behavior and touch/keyboard interactions along with visual performance. Do not trade accessibility or success semantics for cosmetic speed.

Suggested work order: reliable lead delivery and accessibility first; then measure images/client boundaries before optimization. Recommendations and priorities are tracked in [Known issues](known-issues.md). No numeric performance budget has been agreed or validated.
