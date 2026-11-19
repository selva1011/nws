import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, categoryName, categoryTitle } from "./catalogue";

// Hook-free so the page can prerender it as the Suspense fallback ("All") and
// CatalogueBrowser can render it for the URL-selected category.
export default function CatalogueView({ active }: { active: string }) {
  const groups = (active === "All" ? CATEGORIES.slice(1) : [active]).map(
    (cat) => ({ cat, products: PRODUCTS.filter((product) => product.cat === cat) }),
  );
  const total = groups.reduce((sum, group) => sum + group.products.length, 0);
  return (
    <section
      id="collection"
      aria-labelledby="seating-heading"
      className="site-container pb-20 pt-9 md:pb-28 md:pt-12"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2
          id="seating-heading"
          className="text-[28px] font-semibold tracking-[-0.03em] md:text-[32px]"
        >
          Seating
        </h2>
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-[var(--color-text-muted)]"
        >
          {active === "All"
            ? `${total} models in ${groups.length} categories`
            : `${total} ${total === 1 ? "model" : "models"} in ${categoryTitle(active).toLowerCase()}`}
        </p>
      </div>
      <nav aria-label="Seating categories" className="mt-4">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={cat === "All" ? "/products" : `/products?type=${cat}`}
                scroll={false}
                aria-current={active === cat ? "page" : undefined}
                className="filter-chip"
              >
                {categoryName(cat)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {groups.map(({ cat, products }) => (
        <section
          key={cat}
          aria-labelledby={`group-${cat}`}
          className="mt-12 first-of-type:mt-10 md:mt-16"
        >
          <div className="mb-5 flex items-baseline gap-3 border-b border-[var(--color-border)] pb-3">
            <h3
              id={`group-${cat}`}
              className="text-xl font-medium tracking-[-0.02em]"
            >
              {categoryTitle(cat)}
            </h3>
            <span className="text-xs text-[var(--color-text-muted)]">
              {products.length} {products.length === 1 ? "model" : "models"}
            </span>
          </div>
          <ul className="catalogue-grid">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-16 max-w-xl text-xs leading-6 text-[var(--color-text-muted)]">
        Prices, dimensions, materials and availability are confirmed on
        enquiry. Open a model to see its photo and send an enquiry.
      </p>
    </section>
  );
}
