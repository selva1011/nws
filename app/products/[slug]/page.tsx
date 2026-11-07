import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import ProductGallery from "./ProductGallery";
import { PRODUCTS } from "../catalogue";

export const dynamicParams = false;
export function generateStaticParams() { return PRODUCTS.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find(item => item.slug === slug);
  if (!product) notFound();
  return {
    title: `${product.name} — ${product.sub} | NWS Chennai`,
    description: product.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title: `${product.name} | NWS`, description: product.description, url: `/products/${slug}`, type: "website", images: product.images.map(image => ({ url: image.src, alt: image.alt })) },
    twitter: { card: "summary_large_image", title: `${product.name} | NWS`, description: product.description, images: [product.img] },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find(item => item.slug === slug);
  if (!product) notFound();
  const related = PRODUCTS.filter(item => item.cat === product.cat && item.slug !== slug).slice(0, 4);
  const url = `https://nwsworkspace.com/products/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Product", "@id": `${url}#product`, name: product.name, description: product.description, category: product.cat, image: product.images.map(image => `https://nwsworkspace.com${encodeURI(image.src)}`), url, additionalProperty: [{ "@type": "PropertyValue", name: "Catalogue style", value: product.sub }] },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://nwsworkspace.com" }, { "@type": "ListItem", position: 2, name: "Products", item: "https://nwsworkspace.com/products" }, { "@type": "ListItem", position: 3, name: product.name, item: url }] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-7 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs text-slate-600"><Link href="/" className="underline-offset-4 hover:underline">Home</Link><span aria-hidden="true">/</span><Link href="/products" className="underline-offset-4 hover:underline">Products</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-slate-900">{product.name}</span></nav>
        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
          <ProductGallery slug={product.slug} name={product.name} images={product.images} />
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,.045)] md:sticky md:top-28 md:p-8">
            <Link href={`/products?type=${product.cat}`} className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors duration-150 hover:border-[#00A7C4] hover:bg-[#F0FDFE] hover:text-[#008CA6]">{product.cat} collection <span className="ml-3" aria-hidden="true">↗</span></Link>
            <h1 className="mt-6 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.08] tracking-[-0.045em]">{product.name}</h1>
            <p className="mt-3 text-xl text-slate-600">{product.sub}</p>
            <p className="mt-6 text-base leading-7 text-slate-600">{product.description}</p>
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-sm"><div className="bg-slate-50 p-4"><dt className="text-xs uppercase tracking-wider text-slate-500">Category</dt><dd className="mt-1 font-semibold text-slate-900">{product.cat}</dd></div><div className="bg-slate-50 p-4"><dt className="text-xs uppercase tracking-wider text-slate-500">Style</dt><dd className="mt-1 font-semibold text-slate-900">{product.sub}</dd></div></dl>
            <div className="my-8 border-t border-slate-200 pt-7"><p className="text-sm font-bold">Let’s find the right fit.</p><p className="mt-2 text-sm leading-6 text-slate-600">Discuss this model, your seating quantity and workspace requirements with our team.</p><div className="mt-5 flex flex-wrap gap-3"><a href="tel:+919876543210" className="button-primary" aria-label={`Call NWS about ${product.name}`}>Call about this product ↗</a><a href="#specifications" className="button-secondary">View details ↓</a></div><p className="mt-4 text-xs text-slate-600">+91 98765 43210 · Chennai, Tamil Nadu</p></div>
            <p className="text-xs leading-6 text-slate-600">Pricing, dimensions, materials, colour options and availability are confirmed on enquiry.</p>
          </div>
        </div>
        <ScrollReveal className="mt-16 md:mt-24">
          <section id="specifications" className="grid scroll-mt-28 gap-8 border-t border-slate-200 pt-10 md:grid-cols-[1fr_1.5fr]">
            <div><p className="eyebrow">A closer look</p><h2 className="mt-4 text-3xl font-semibold tracking-tight">The details, clearly.</h2><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Use these catalogue details to identify your model. For measurements and configuration options, speak with our team before ordering.</p></div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><caption className="sr-only">{product.name} product specifications</caption><tbody>{[["Model", product.name], ["Category", product.cat], ["Catalogue style", product.sub], ["Dimensions & materials", "Confirm with our team"], ["Colours & configuration", "Confirm with our team"], ["Price & availability", "Contact us for details"]].map(([label, value]) => <tr key={label} className="border-b border-slate-200 last:border-0"><th scope="row" className="w-[42%] bg-slate-50 px-4 py-5 align-top font-medium text-slate-600 sm:px-6">{label}</th><td className="px-4 py-5 align-top font-medium text-slate-900 sm:px-6">{value}</td></tr>)}</tbody></table></div>
          </section>
        </ScrollReveal>
        {related.length > 0 && <ScrollReveal className="mt-20"><section><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Keep exploring</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">More in {product.cat.toLowerCase()} seating.</h2></div><Link href={`/products?type=${product.cat}`} className="text-sm font-bold underline underline-offset-4">View collection ↗</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map(item => <ProductCard key={item.slug} product={item} />)}</div></section></ScrollReveal>}
      </div>
      </div>
    </>
  );
}
