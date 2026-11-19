import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { PRODUCTS } from "@/app/products/catalogue";

export default function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
    >
      <ViewTransition
        name={`product-${product.slug}`}
        share="product-image"
        default="none"
      >
        <div className="product-stage relative aspect-[1/1.05] overflow-hidden rounded-xl">
          <Image
            src={product.img}
            alt={`${product.name} — ${product.sub}`}
            fill
            sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 320px"
            className="product-photo object-contain p-6"
          />
          <span className="absolute left-4 top-4 text-[11px] text-[var(--color-neutral)]">
            {product.cat}
          </span>
        </div>
      </ViewTransition>
      <div className="flex items-center justify-between gap-3 py-5">
        <div>
          <h3 className="text-[15px] font-semibold tracking-[-.02em]">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-neutral)]">
            {product.sub}
          </p>
        </div>
        <span
          className="product-arrow grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-border)] transition-colors"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
