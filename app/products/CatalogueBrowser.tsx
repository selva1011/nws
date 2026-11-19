"use client";

import { useEffect, type MouseEvent } from "react";
import { useSearchParams } from "next/navigation";
import CatalogueView from "./CatalogueView";
import { CATALOGUE_RETURN_KEY, resolveCategory } from "./catalogue";

// The category lives in the URL (?type=, legacy ?category=), so links, Back
// and Forward restore the filter. Opening a product records the filter so the
// detail page can link back to it, anchored on that product's tile.
export default function CatalogueBrowser() {
  const params = useSearchParams();
  const active = resolveCategory(params.get("type") || params.get("category"));

  // Full page loads of /products?type=…#p-slug: the grid renders after
  // hydration, so bring the requested tile into view once it exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id.startsWith("p-")) document.getElementById(id)?.scrollIntoView();
  }, []);

  function rememberPosition(event: MouseEvent<HTMLDivElement>) {
    const tile = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[data-product]",
    );
    if (!tile) return;
    try {
      sessionStorage.setItem(
        CATALOGUE_RETURN_KEY,
        JSON.stringify({
          href: window.location.pathname + window.location.search,
        }),
      );
    } catch {
      // Storage can be unavailable (private mode); the back link falls back
      // to the product's own category.
    }
  }

  return (
    <div onClickCapture={rememberPosition}>
      <CatalogueView active={active} />
    </div>
  );
}
