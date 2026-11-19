import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { PRODUCTS } from "@/app/products/catalogue";

// Catalogue tile. The whole tile is a link; the reveal line is always laid out
// (opacity only) so hover/focus never moves neighbouring tiles.
export default function ProductCard({
  product,
  sizes = "(max-width: 479px) 46vw, (max-width: 1023px) 24vw, 180px",
}: {
  product: (typeof PRODUCTS)[number];
  sizes?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      id={`p-${product.slug}`}
      data-product={product.slug}
      className="product-tile"
    >
      <ViewTransition
        name={`product-${product.slug}`}
        share="product-image"
        default="none"
      >
        <span className="tile-stage product-stage block">
          <Image
            src={product.display}
            alt=""
            fill
            sizes={sizes}
            className="tile-photo"
          />
        </span>
      </ViewTransition>
      <span className="tile-name">{product.title}</span>
      <span className="tile-reveal">
        <span>{product.highlight ?? "View details"}</span>
        <span aria-hidden="true" className="tile-arrow">
          →
        </span>
      </span>
    </Link>
  );
}
