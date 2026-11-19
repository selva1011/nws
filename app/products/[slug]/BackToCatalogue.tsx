"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  CATALOGUE_RETURN_KEY,
  categoryTitle,
  resolveCategory,
} from "../catalogue";

const noSubscription = () => () => {};
function readReturn() {
  try {
    return sessionStorage.getItem(CATALOGUE_RETURN_KEY);
  } catch {
    return null;
  }
}

// Links back to the catalogue filter the visitor last used, anchored on this
// product's tile. Direct/shared visits, or a saved filter that does not
// contain this product, fall back to the product's own category.
export default function BackToCatalogue({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) {
  const stored = useSyncExternalStore(noSubscription, readReturn, () => null);
  let href = `/products?type=${category}#p-${slug}`;
  let label = categoryTitle(category);
  try {
    const saved = stored ? JSON.parse(stored) : null;
    if (typeof saved?.href === "string" && saved.href.startsWith("/products")) {
      const params = new URLSearchParams(saved.href.split("?")[1] ?? "");
      const savedCategory = resolveCategory(params.get("type") || params.get("category"));
      // Reuse the saved filter only when this product appears in it.
      if (savedCategory === "All" || savedCategory === category) {
        href = `${saved.href}#p-${slug}`;
        label = categoryTitle(savedCategory);
      }
    }
  } catch {
    // Ignore malformed storage and keep the category fallback.
  }
  return (
    <Link href={href} className="text-link !py-1 text-[13px]">
      <span aria-hidden="true">←</span> Back to {label.toLowerCase()}
    </Link>
  );
}
