import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NWS | Office Seating & Workspaces",
  description:
    "Discover Node Workspace Solutions, office seating and workspace solutions in Chennai.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="site-container section-space grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <p className="eyebrow mb-5">Hello, we’re NWS</p>
        <h1 className="display-title !text-[clamp(44px,5vw,68px)]">
          A space for your
          <br />
          kind of work.
        </h1>
        <p className="copy mt-7">
          Node Workspace Solutions brings together office seating and workspace
          services in Chennai. Explore the collection, get to know our approach,
          or start a conversation about your space.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/company" className="button-primary">
            Discover our story
          </Link>
          <Link href="/products" className="button-secondary">
            Explore seating
          </Link>
        </div>
      </div>
      <div className="product-stage relative aspect-square overflow-hidden rounded-[140px_140px_16px_16px]">
        <Image
          src="/products images/BUTTERFLY-HB.jpeg"
          alt="NWS Butterfly high back chair"
          fill
          preload
          sizes="(max-width: 767px) 90vw, 620px"
          className="object-contain p-8"
        />
      </div>
    </section>
  );
}
