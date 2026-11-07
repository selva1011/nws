import Image from "next/image";
import Link from "next/link";
import type { PRODUCTS } from "@/app/products/catalogue";

export default function ProductCard({ product }: { product: typeof PRODUCTS[number] }) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card group block rounded-2xl border border-slate-200 bg-white p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F8FAFC]">
        <Image src={product.img} alt={`${product.name} — ${product.sub}`} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 290px" className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105" />
        <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">{product.cat}</span>
      </div>
      <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-5">
        <div><h3 className="text-base font-bold tracking-tight">{product.name}</h3><p className="mt-1 text-sm text-slate-500">{product.sub}</p></div>
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 transition-colors group-hover:border-[#00A7C4] group-hover:bg-[#00A7C4]">↗</span>
      </div>
      <span className="sr-only">View product details</span>
    </Link>
  );
}
