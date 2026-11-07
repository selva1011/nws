"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, resolveCategory } from "./catalogue";

const ITEMS_PER_PAGE = 8;

export default function CatalogueBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const active = resolveCategory(params.get("type") || params.get("category"));
  const [page, setPage] = useState(1);
  const [previousCategory, setPreviousCategory] = useState(active);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

  if (previousCategory !== active) {
    setPreviousCategory(active);
    setPage(1);
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = PRODUCTS.filter((product) =>
    (active === "All" || product.cat === active)
    && `${product.name} ${product.sub} ${product.cat}`.toLowerCase().includes(normalizedQuery),
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const resultKey = `${active}-${page}-${view}`;

  function selectCategory(category: string) {
    router.push(category === "All" ? "/products" : `/products?type=${encodeURIComponent(category)}`, { scroll: false });
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    document.getElementById("collection")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section id="collection" className="scroll-mt-24 bg-white">
      <div className="sticky top-[74px] z-40 border-y border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="product-scroll mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-6 py-3" aria-label="Product categories">
          {CATEGORIES.map((category) => {
            const isActive = active === category;
            const count = category === "All" ? PRODUCTS.length : PRODUCTS.filter((product) => product.cat === category).length;
            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "border-[#00A7C4] bg-[#F0FDFE] text-[#0F172A]"
                    : "border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {category}
                <span className={`ml-2 text-xs ${isActive ? "text-[#008CA6]" : "text-slate-500"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-10 md:py-14">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              {active === "All" ? "The seating collection" : `${active} collection`}
            </h2>
            <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 text-sm text-slate-600">
              {filtered.length
                ? `Showing ${(page - 1) * ITEMS_PER_PAGE + 1}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} products`
                : "No products found"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search products</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setPage(1); }}
                placeholder="Search by name or style…"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:border-[#008CA6] focus:outline-none focus:ring-4 focus:ring-[#00A7C4]/10 md:w-72"
              />
            </label>
            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Product view">
              {(["grid", "table"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  aria-pressed={view === mode}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors duration-150 ${
                    view === mode ? "bg-[#0F172A] text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!visible.length ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <h3 className="text-xl font-bold">Let’s find another seat.</h3>
            <p className="mt-2 text-slate-600">Try a different model name or browse all categories.</p>
            <button className="button-secondary mt-6" type="button" onClick={() => { setQuery(""); setPage(1); selectCategory("All"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div key={resultKey} className="catalogue-swap">
            {view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((product) => <ProductCard key={product.slug} product={product} />)}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200" tabIndex={0} role="region" aria-label="Product comparison table">
                <table className="w-full min-w-[580px] text-left text-sm">
                  <caption className="sr-only">Compare product names, categories and catalogue styles</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                    <tr>{["Product", "Category", "Style", "Explore"].map((label) => <th key={label} scope="col" className="px-5 py-4">{label}</th>)}</tr>
                  </thead>
                  <tbody>
                    {visible.map((product) => (
                      <tr key={product.slug} className="border-t border-slate-200 transition-colors duration-150 hover:bg-slate-50/80 focus-within:bg-slate-50/80">
                        <th scope="row" className="px-5 py-3">
                          <Link className="flex items-center gap-4 font-semibold underline-offset-4 hover:underline" href={`/products/${product.slug}`}>
                            <Image src={product.img} alt="" width={64} height={64} className="h-16 w-16 rounded-lg bg-white object-contain" />
                            {product.name}
                          </Link>
                        </th>
                        <td className="px-5 py-3 text-slate-600">{product.cat}</td>
                        <td className="px-5 py-3 text-slate-600">{product.sub}</td>
                        <td className="px-5 py-3"><Link href={`/products/${product.slug}`} className="font-semibold text-slate-900 underline decoration-[#00A7C4] decoration-2 underline-offset-4" aria-label={`View ${product.name}, ${product.sub}`}>Details ↗</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {totalPages > 1 ? (
          <nav aria-label="Product pages" className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrent = page === pageNumber;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  aria-label={`Page ${pageNumber}`}
                  aria-current={isCurrent ? "page" : undefined}
                  onClick={() => goToPage(pageNumber)}
                  className={`h-11 w-11 rounded-full border text-sm font-bold transition-[background-color,border-color,transform] duration-150 active:scale-95 ${
                    isCurrent
                      ? "border-[#00A7C4] bg-[#00A7C4] text-[#0F172A]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
