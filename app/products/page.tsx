import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CatalogueBrowser from "./CatalogueBrowser";
import { PRODUCTS } from "./catalogue";

export const metadata: Metadata = {
  title: "Office Chairs & Seating Collection | NWS Chennai",
  description:
    "Explore and compare 32 NWS seating models. Find task, executive, visitor and training chairs, and sofas for your workspace in Chennai.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "A seat for your kind of work | NWS",
    description:
      "Explore the NWS seating collection and compare your shortlist.",
    url: "/products",
    images: ["/products images/BUTTERFLY-HB.jpeg"],
  },
};

export default function Products() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NWS seating collection",
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: product.name,
      url: `https://nwsworkspace.com/products/${product.slug}`,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-[#EAE4F0]">
        <div className="site-container py-10 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-9 flex gap-3 text-xs text-[var(--color-neutral)]"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Seating</span>
          </nav>
          <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <h1 className="display-title !text-[clamp(40px,5.6vw,74px)]">
              A seat for your
              <br />
              kind of work.
            </h1>
            <div className="max-w-md">
              <p className="copy">
                Explore the shapes, styles and spaces of the NWS collection.
                Pick up to three models to compare side by side.
              </p>
              <Link href="/#seat-finder" className="text-link mt-4">
                Not sure where to start? Try the seating finder
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <section className="site-container section-space">
            <h2 className="section-title">Explore all seating</h2>
            <p className="copy mt-4">
              Choose a model to view its photo and details.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    className="text-link"
                    href={`/products/${product.slug}`}
                  >
                    {product.name} · {product.sub}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        }
      >
        <CatalogueBrowser />
      </Suspense>
    </>
  );
}
