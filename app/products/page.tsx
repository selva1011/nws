import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import CatalogueBrowser from "./CatalogueBrowser";
import CatalogueView from "./CatalogueView";
import { PRODUCTS } from "./catalogue";

export const metadata: Metadata = {
  title: "Office Chairs & Seating Collection | NWS Chennai",
  description:
    "Explore 32 NWS seating models by category. Find task, executive, visitor and training chairs, and sofas for your workspace in Chennai.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "A seat for your kind of work | NWS",
    description: "Explore the NWS seating collection by category.",
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
      {/* Wide, shallow hero: photo on the right, heading on its quiet side. */}
      <section className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[66%]">
          <Image
            src="/images/nws-hero.png"
            alt=""
            fill
            preload
            sizes="(max-width: 767px) 100vw, 66vw"
            className="object-cover object-[84%_82%] md:object-[50%_80%]"
          />
          <div aria-hidden="true" className="catalogue-hero-fade absolute inset-0" />
        </div>
        <div className="site-container flex h-[188px] flex-col justify-center sm:h-[240px] md:h-[300px] lg:h-[340px]">
          <h1 className="max-w-[11ch] text-[clamp(26px,4.2vw,56px)] font-semibold leading-[1.04] tracking-[-0.045em] md:max-w-[14ch]">
            A seat for your kind of work.
          </h1>
          <p className="mt-3 max-w-[22ch] text-[13px] leading-5 text-[var(--color-text-muted)] sm:max-w-[34ch] sm:text-base sm:leading-7">
            Explore the shapes, styles and spaces of the NWS collection.
          </p>
        </div>
      </section>
      <Suspense fallback={<CatalogueView active="All" />}>
        <CatalogueBrowser />
      </Suspense>
    </>
  );
}
