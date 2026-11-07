import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import CatalogueBrowser from "./CatalogueBrowser";
import { PRODUCTS } from "./catalogue";

export const metadata: Metadata = {
  title: "Office Chairs & Seating Collection | NWS Chennai",
  description: "Explore 32 office seating models from NWS in Chennai. Compare executive, task, visitor, training chairs and sofas, view product details and call for pricing.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Find your next workspace seat | NWS", description: "Explore the NWS seating collection, compare models and view individual product details.", url: "/products", images: ["/products images/BUTTERFLY-HB.jpeg"] },
};

export default function Products() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "NWS seating collection", numberOfItems: PRODUCTS.length, itemListElement: PRODUCTS.map((product, i) => ({ "@type": "ListItem", position: i + 1, name: product.name, url: `https://nwsworkspace.com/products/${product.slug}` })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-[#F8FAFC]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-6 py-12 md:grid-cols-[1.35fr_1fr] md:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 flex gap-2 text-xs text-slate-500"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Collection</span></nav>
            <p className="eyebrow">The NWS collection</p>
            <h1 className="mt-5 max-w-2xl text-[clamp(40px,5vw,68px)] font-semibold leading-[1.02] tracking-[-0.055em]">Good work starts<br />with a better seat.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">From your first desk to the whole workspace. Explore seating, compare the details, and find a fit for the way you work.</p>
            <div className="mt-8 flex flex-wrap items-center gap-5"><a href="#collection" className="button-primary">Explore the collection <span aria-hidden="true">↓</span></a><span className="text-xs text-slate-500">32 models · 5 categories</span></div>
          </div>
          <Link href="/products/butterfly-hb" className="group relative mx-auto block w-full max-w-[400px] rounded-[32px] border border-slate-200 bg-white p-5">
            <div className="relative aspect-[1.15] overflow-hidden"><Image src="/products images/BUTTERFLY-HB.jpeg" alt="Butterfly HB high back executive chair" fill preload sizes="(max-width: 767px) 85vw, 400px" className="object-contain transition-transform duration-700 group-hover:scale-105" /></div>
            <div className="flex items-end justify-between border-t border-slate-100 pt-4"><div><span className="text-[10px] uppercase tracking-widest text-slate-500">In focus / Executive</span><p className="mt-1 font-bold">BUTTERFLY HB</p></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#0F172A] text-white" aria-hidden="true">↗</span></div>
          </Link>
        </div>
      </section>
      <Suspense fallback={<section className="mx-auto max-w-[1280px] px-6 py-12"><h2 className="text-2xl font-bold">Explore all seating</h2><p className="mt-3 text-slate-500">Choose a product to view its photo and details.</p><ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{PRODUCTS.map(product => <li key={product.slug}><Link className="underline underline-offset-4" href={`/products/${product.slug}`}>{product.name} · {product.sub}</Link></li>)}</ul></section>}><CatalogueBrowser /></Suspense>
    </>
  );
}
