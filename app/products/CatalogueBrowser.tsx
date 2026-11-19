"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
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
  const [sort, setSort] = useState("collection");
  const [selected, setSelected] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const compareRef = useRef<HTMLElement>(null);
  const compareTrigger = useRef<HTMLButtonElement>(null);

  if (previousCategory !== active) {
    setPreviousCategory(active);
    setPage(1);
  }
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = PRODUCTS.filter(
    (product) =>
      (active === "All" || product.cat === active) &&
      `${product.name} ${product.sub} ${product.cat}`
        .toLowerCase()
        .includes(normalizedQuery),
  );
  if (sort !== "collection")
    filtered.sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const comparison = selected.map(
    (slug) => PRODUCTS.find((product) => product.slug === slug)!,
  );

  function selectCategory(category: string) {
    router.push(
      category === "All"
        ? "/products"
        : `/products?type=${encodeURIComponent(category)}`,
      { scroll: false },
    );
  }
  function toggleCompare(slug: string) {
    setSelected((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : current.length < 3
          ? [...current, slug]
          : current,
    );
  }
  function goToPage(next: number) {
    setPage(next);
    document
      .getElementById("collection")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  function closeComparison() {
    setShowComparison(false);
    compareTrigger.current?.focus();
  }

  return (
    <section id="collection" className="scroll-mt-20">
      <div className="border-b border-[var(--color-border)] bg-[#FCFBFC]">
        <div
          className="site-container product-scroll flex gap-2 overflow-x-auto py-5"
          role="group"
          aria-label="Product categories"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              aria-pressed={active === category}
              className="filter-chip"
            >
              {category === "All"
                ? "All seating"
                : category === "Sofa"
                  ? "Lounge & sofas"
                  : category}
              <span className="ml-2 opacity-70">
                {category === "All"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((product) => product.cat === category)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="site-container py-10 md:py-14">
        <div className="mb-9 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <h2 className="text-2xl font-medium tracking-tight">
              {active === "All" ? "The full collection" : `${active} seating`}
            </h2>
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-2 text-sm text-[var(--color-neutral)]"
            >
              {filtered.length
                ? `Showing ${(page - 1) * ITEMS_PER_PAGE + 1}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} models`
                : "No models found"}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-0 flex-1">
              <span className="field-label">Find a model</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search name or style…"
                className="field sm:!w-64"
              />
            </label>
            <label>
              <span className="field-label">Sort by</span>
              <select
                className="field !w-auto"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
              >
                <option value="collection">Collection order</option>
                <option value="az">Name: A–Z</option>
                <option value="za">Name: Z–A</option>
              </select>
            </label>
            <div
              className="flex gap-1 rounded-lg border border-[var(--color-border)] p-1"
              role="group"
              aria-label="Product view"
            >
              {(["grid", "table"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  aria-pressed={view === mode}
                  className={`min-h-10 rounded px-3 text-xs font-semibold capitalize ${view === mode ? "bg-[var(--color-primary)] text-white" : "hover:bg-[var(--color-primary-soft)]"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
        {!visible.length ? (
          <div className="rounded-xl bg-[var(--color-light-base)] px-6 py-20 text-center">
            <h3 className="text-2xl font-medium">Let’s find another seat.</h3>
            <p className="copy mx-auto mt-3">
              Try a different model name or browse all categories.
            </p>
            <button
              type="button"
              className="button-primary mt-6"
              onClick={() => {
                setQuery("");
                setPage(1);
                selectCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div key={`${active}-${page}-${view}`} className="catalogue-swap">
            {view === "grid" ? (
              <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((product) => (
                  <article key={product.slug}>
                    <ProductCard product={product} />
                    <label className="flex min-h-11 cursor-pointer items-center gap-2 border-t border-[var(--color-border)] text-xs text-[var(--color-neutral)]">
                      <input
                        type="checkbox"
                        checked={selected.includes(product.slug)}
                        disabled={
                          selected.length === 3 &&
                          !selected.includes(product.slug)
                        }
                        onChange={() => toggleCompare(product.slug)}
                        className="h-4 w-4 accent-[var(--color-primary)]"
                      />
                      <span>
                        Compare
                        <span className="sr-only">
                          {" "}
                          {product.name} {product.sub}
                        </span>
                      </span>
                    </label>
                  </article>
                ))}
              </div>
            ) : (
              <div
                className="overflow-x-auto rounded-xl border border-[var(--color-border)]"
                tabIndex={0}
                role="region"
                aria-label="Product list"
              >
                <table className="w-full min-w-[650px] text-left text-sm">
                  <caption className="sr-only">
                    Seating collection and comparison selection
                  </caption>
                  <thead className="bg-[var(--color-light-base)]">
                    <tr>
                      {["Model", "Category", "Style", "Compare"].map(
                        (label) => (
                          <th
                            key={label}
                            scope="col"
                            className="p-5 font-medium"
                          >
                            {label}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((product) => (
                      <tr
                        key={product.slug}
                        className="border-t border-[var(--color-border)]"
                      >
                        <th scope="row" className="p-4">
                          <Link
                            className="flex items-center gap-4 font-medium hover:underline"
                            href={`/products/${product.slug}`}
                          >
                            <Image
                              src={product.img}
                              alt=""
                              width={64}
                              height={64}
                              className="h-16 w-16 rounded-lg object-contain"
                            />
                            {product.name}
                          </Link>
                        </th>
                        <td className="p-5">{product.cat}</td>
                        <td className="p-5">{product.sub}</td>
                        <td className="p-5">
                          <label className="flex min-h-11 items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selected.includes(product.slug)}
                              disabled={
                                selected.length === 3 &&
                                !selected.includes(product.slug)
                              }
                              onChange={() => toggleCompare(product.slug)}
                              className="h-4 w-4 accent-[var(--color-primary)]"
                            />
                            <span className="sr-only">
                              Compare {product.name} {product.sub}
                            </span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {totalPages > 1 && (
          <nav
            aria-label="Product pages"
            className="mt-12 flex justify-center gap-2"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Page ${i + 1}`}
                aria-current={page === i + 1 ? "page" : undefined}
                onClick={() => goToPage(i + 1)}
                className={`h-11 w-11 rounded-lg border text-sm ${page === i + 1 ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-border)] hover:bg-[var(--color-primary-soft)]"}`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
        <p className="mt-8 text-center text-xs leading-6 text-[var(--color-neutral)]">
          Select up to 3 models to compare. Prices and specifications are
          confirmed on enquiry.
        </p>
        {showComparison && comparison.length > 0 && (
          <section
            ref={compareRef}
            tabIndex={-1}
            aria-label="Your seating comparison"
            className="mt-12 scroll-mt-28 rounded-xl border border-[var(--color-border)] p-5 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-5">
              <h2 className="text-2xl font-medium">
                Your shortlist, side by side.
              </h2>
              <button
                type="button"
                className="text-link shrink-0"
                onClick={closeComparison}
              >
                Close comparison
              </button>
            </div>
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Selected models comparison"
            >
              <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">
                  Compare selected seating models
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="p-3">
                      Details
                    </th>
                    {comparison.map((product) => (
                      <th scope="col" key={product.slug} className="p-3">
                        <Image
                          src={product.img}
                          alt=""
                          width={150}
                          height={150}
                          className="mb-4 h-36 w-36 object-contain"
                        />
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-link"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          className="mt-1 block min-h-11 text-xs font-normal underline"
                          onClick={() => toggleCompare(product.slug)}
                          aria-label={`Remove ${product.name} ${product.sub} from comparison`}
                        >
                          Remove
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["Category", "Style", "Price & specifications"].map(
                    (label) => (
                      <tr
                        key={label}
                        className="border-t border-[var(--color-border)]"
                      >
                        <th scope="row" className="p-3 font-medium">
                          {label}
                        </th>
                        {comparison.map((product) => (
                          <td
                            key={product.slug}
                            className="p-3 text-[var(--color-neutral)]"
                          >
                            {label === "Category"
                              ? product.cat
                              : label === "Style"
                                ? product.sub
                                : "Confirm on enquiry"}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <Link
              className="button-primary mt-7"
              href={`/quote?models=${selected.join(",")}`}
            >
              Enquire about this shortlist
            </Link>
          </section>
        )}
      </div>
      {selected.length > 0 && (
        <div className="sticky bottom-4 z-30 mx-auto mb-6 flex w-[calc(100%-36px)] max-w-xl flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--color-dark-base)] p-4 text-white shadow-xl">
          <p className="text-sm" aria-live="polite">
            {selected.length} of 3 selected
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSelected([]);
                setShowComparison(false);
              }}
              className="min-h-11 text-xs underline underline-offset-4"
            >
              Clear
            </button>
            <button
              ref={compareTrigger}
              type="button"
              className="button-secondary !min-h-11 !border-transparent !bg-[#EAE4F0] !py-2 !text-[#302237]"
              onClick={() => {
                setShowComparison(true);
                requestAnimationFrame(() => {
                  compareRef.current?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                  });
                  compareRef.current?.focus({ preventScroll: true });
                });
              }}
            >
              Compare models
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
