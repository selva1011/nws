import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "./products/catalogue";

export const metadata: Metadata = {
  title: "Office Chairs & Workspace Furniture in Chennai | NWS",
  description: "Discover office chairs, executive seating, visitor chairs and sofas at Node Workspace Solutions in Chennai. Explore product photos and details, and talk to our team.",
  alternates: { canonical: "/" },
  openGraph: { title: "Thoughtful spaces. Better work. | NWS", description: "Explore office seating and workspace solutions from NWS, Chennai.", url: "/", images: ["/images/nws-hero.png"] },
};

export default function Home() {
  const categories = [
    { name: "Executive", caption: "Room to think big.", image: "BUTTERFLY-HB.jpeg" },
    { name: "Task", caption: "For the everyday focus.", image: "805-MESH.JPEG" },
    { name: "Visitor", caption: "Make everyone welcome.", image: "8024-D Visitor.jpeg" },
    { name: "Sofa", caption: "Space to connect.", image: "METRO_SOFA.jpeg" },
  ];
  const featured = ["butterfly-hb", "805-mesh", "oslo-mb", "metro-sofa"].map(slug => PRODUCTS.find(product => product.slug === slug)!);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#F8FAFC]">
        <div className="mx-auto grid max-w-[1440px] md:min-h-[640px] md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 md:py-20 md:pl-12 lg:pl-20">
            <p className="eyebrow">Node Workspace Solutions · Chennai</p>
            <h1 className="mt-6 text-[clamp(44px,5.4vw,78px)] font-semibold leading-[1.02] tracking-[-0.06em]">Thoughtful spaces.<br /><span className="text-[#008CA6]">Better work.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-slate-600">Find the seat that fits your day. Explore office furniture for focused work, shared ideas and everything in between.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/products" className="button-primary">Explore our seating ↗</Link><Link href="/services" className="button-secondary">Workspace solutions</Link></div>
            <p className="mt-10 text-xs tracking-wide text-slate-500">Executive · Task · Visitor · Training · Sofas</p>
          </div>
          <div className="relative min-h-[330px] md:min-h-full"><Image src="/images/nws-hero.png" alt="Office seating and desks in a bright contemporary workspace" fill preload sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-[67%_center]" /><span className="absolute bottom-6 left-6 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold">A new perspective on your workspace.</span></div>
        </div>
      </section>
      <div className="border-y border-slate-200"><div className="mx-auto grid max-w-[1280px] gap-5 px-6 py-6 text-sm text-slate-600 sm:grid-cols-3">{["01 / Explore the collection", "02 / Compare the details", "03 / Talk to our team"].map(text => <p key={text}>{text}</p>)}</div></div>
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
        <ScrollReveal><section><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">A seat for every space</p><h2 className="mt-4 text-[clamp(30px,3.5vw,44px)] font-semibold tracking-[-0.04em]">Find your way to better work.</h2></div><Link href="/products" className="text-sm font-semibold underline decoration-[#00A7C4] decoration-2 underline-offset-4">All collections ↗</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{categories.map(category => <Link key={category.name} href={`/products?type=${category.name}`} className="group overflow-hidden rounded-2xl border border-transparent bg-[#F8FAFC] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-slate-200 focus-visible:-translate-y-0.5 focus-visible:border-slate-300"><div className="relative aspect-square bg-white"><Image src={`/products images/${category.image}`} alt={`${category.name} seating collection`} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 290px" className="object-contain p-6 transition-transform duration-200 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]" /></div><div className="flex items-center justify-between p-6"><div><h3 className="text-xl font-semibold tracking-tight">{category.name === "Sofa" ? "Sofas" : `${category.name} chairs`}</h3><p className="mt-2 text-sm text-slate-600">{category.caption}</p></div><span aria-hidden="true" className="text-[#008CA6]">↗</span></div></Link>)}</div></section></ScrollReveal>
        <ScrollReveal className="mt-20 md:mt-28"><section><div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Meet the collection</p><h2 className="mt-4 text-[clamp(30px,3.5vw,44px)] font-semibold tracking-[-0.04em]">Take a closer look.</h2></div><Link href="/products" className="text-sm font-semibold underline underline-offset-4">Browse all 32 models ↗</Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featured.map(product => <ProductCard key={product.slug} product={product} />)}</div></section></ScrollReveal>
        <ScrollReveal className="mt-20 md:mt-28"><section className="grid gap-8 rounded-3xl bg-[#F8FAFC] p-7 md:grid-cols-2 md:p-12"><div><p className="eyebrow">More than a chair</p><h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.04em]">Bring your whole<br />workspace together.</h2></div><div className="flex flex-col items-start justify-center"><p className="max-w-md text-base leading-7 text-slate-600">Planning a new office or refreshing a familiar space? Explore our workspace services and talk through what your team needs.</p><Link href="/services" className="button-secondary mt-6">Explore workspace services ↗</Link></div></section></ScrollReveal>
      </div>
    </>
  );
}
