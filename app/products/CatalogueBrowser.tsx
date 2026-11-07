"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { CATEGORIES, PRODUCTS, resolveCategory } from "./catalogue";

export default function CatalogueBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const active = resolveCategory(params.get("type") || params.get("category"));
  const [page, setPage] = useState(1);
  const [previousCategory, setPreviousCategory] = useState(active);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");
  if (previousCategory !== active) { setPreviousCategory(active); setPage(1); }

  const filtered = PRODUCTS.filter((product) => (active === "All" || product.cat === active) && `${product.name} ${product.sub} ${product.cat}`.toLowerCase().includes(query.trim().toLowerCase()));
  const totalPages = Math.ceil(filtered.length / 8);
  const visible = filtered.slice((page - 1) * 8, page * 8);
  const selectCategory = (category: string) => router.push(category === "All" ? "/products" : `/products?type=${encodeURIComponent(category)}`, { scroll: false });

  return (
    <section id="collection" className="scroll-mt-24">
      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-6 py-4" aria-label="Product categories">
          {CATEGORIES.map((category) => <button key={category} onClick={() => selectCategory(category)} aria-pressed={active === category} className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${active === category ? "bg-[#0F172A] text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>{category}<span className="ml-2 text-xs opacity-65">{category === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === category).length}</span></button>)}
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-6 py-10 md:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-bold tracking-tight">{active === "All" ? "The seating collection" : `${active} collection`}</h2><p role="status" className="mt-2 text-sm text-slate-500">{filtered.length ? `Showing ${(page - 1) * 8 + 1}–${Math.min(page * 8, filtered.length)} of ${filtered.length} products` : "No products found"}</p></div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative min-w-0 flex-1"><span className="sr-only">Search products</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search by name or style…" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm md:w-64" /></label>
            <div className="flex rounded-xl border border-slate-200 p-1" aria-label="Product view">
              {(["grid", "table"] as const).map(mode => <button key={mode} onClick={() => setView(mode)} aria-pressed={view === mode} className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${view === mode ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-slate-100"}`}>{mode}</button>)}
            </div>
          </div>
        </div>
        {!visible.length ? <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center"><h3 className="text-xl font-bold">Let’s find another seat.</h3><p className="mt-2 text-slate-500">Try a different model name or browse all categories.</p><button className="button-secondary mt-6" onClick={() => { setQuery(""); setPage(1); selectCategory("All"); }}>Clear filters</button></div> : view === "grid" ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visible.map(product => <ScrollReveal key={product.slug}><ProductCard product={product} /></ScrollReveal>)}</div> : <div className="overflow-x-auto rounded-2xl border border-slate-200" tabIndex={0} role="region" aria-label="Product comparison table"><table className="w-full min-w-[580px] text-left text-sm"><caption className="sr-only">Compare product names, categories and catalogue styles</caption><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr>{["Product", "Category", "Style", "Explore"].map(label => <th key={label} scope="col" className="px-5 py-4">{label}</th>)}</tr></thead><tbody>{visible.map(product => <tr key={product.slug} className="border-t border-slate-200"><th scope="row" className="px-5 py-3"><Link className="flex items-center gap-4 hover:underline" href={`/products/${product.slug}`}><Image src={product.img} alt="" width={64} height={64} className="h-16 w-16 rounded-lg object-contain" />{product.name}</Link></th><td className="px-5 py-3 text-slate-600">{product.cat}</td><td className="px-5 py-3 text-slate-600">{product.sub}</td><td className="px-5 py-3"><Link href={`/products/${product.slug}`} className="font-semibold underline underline-offset-4" aria-label={`View ${product.name}, ${product.sub}`}>Details ↗</Link></td></tr>)}</tbody></table></div>}
        {totalPages > 1 && <nav aria-label="Product pages" className="mt-10 flex justify-center gap-2">{Array.from({ length: totalPages }, (_, i) => <button key={i} aria-label={`Page ${i + 1}`} aria-current={page === i + 1 ? "page" : undefined} onClick={() => { setPage(i + 1); document.getElementById("collection")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }} className={`h-11 w-11 rounded-full text-sm font-bold ${page === i + 1 ? "bg-[#0F172A] text-white" : "border border-slate-200 hover:bg-slate-50"}`}>{i + 1}</button>)}</nav>}
      </div>
    </section>
  );
}
