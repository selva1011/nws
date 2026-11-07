import type { MetadataRoute } from "next";
import { PRODUCTS } from "./products/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nwsworkspace.com";
  return [
    ...["", "/company", "/products", "/services", "/contact", "/quote"].map(path => ({ url: `${base}${path}`, priority: path === "" ? 1 : 0.8 })),
    ...PRODUCTS.map(product => ({ url: `${base}/products/${product.slug}`, priority: 0.7 })),
  ];
}
