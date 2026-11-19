import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Node Workspace Solutions",
  description:
    "Meet NWS, a Chennai office seating and workspace solutions business. Explore our approach to choosing furniture for your working day.",
  alternates: { canonical: "/company" },
};

export default function Company() {
  return (
    <>
      <section className="site-container section-space">
        <div className="grid items-end gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-5">Node Workspace Solutions</p>
            <h1 className="display-title">
              Work is personal.
              <br />
              Your space
              <br />
              should be, too.
            </h1>
          </div>
          <div>
            <p className="copy">
              We’re NWS, an office seating and workspace solutions business in
              Chennai. We help people explore furniture for the places where
              their working day happens.
            </p>
            <Link href="/products" className="text-link mt-6">
              Get to know our collection
            </Link>
          </div>
        </div>
        <div className="relative mt-12 h-[320px] overflow-hidden rounded-2xl md:h-[500px]">
          <Image
            src="/images/nws-hero.png"
            alt="Inspiration for an open, naturally lit workspace"
            fill
            preload
            sizes="(max-width: 1370px) 100vw, 1320px"
            className="object-cover object-right"
          />
        </div>
      </section>
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] section-space">
        <div className="site-container grid gap-9 md:grid-cols-2 md:gap-20">
          <h2 className="section-title max-w-lg">
            A thoughtful space begins with the people in it.
          </h2>
          <div>
            <p className="copy">
              A focused morning at your own desk. A room full of new ideas. A
              welcoming place for the next conversation. Every setting asks
              something different of its furniture.
            </p>
            <p className="copy mt-5">
              Our collection brings together task, executive, visitor and
              training seating, alongside sofas for shared spaces. Start with
              the way you work, then explore the options with us.
            </p>
          </div>
        </div>
      </section>
      <section className="site-container section-space">
        <h2 className="section-title mb-10">Choose with a clearer picture.</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            [
              "Start with your space",
              "Think about the room, who uses it and how many seats it needs. Those practical details shape a useful shortlist.",
            ],
            [
              "See the actual model",
              "Browse original product photos and catalogue styles. Compare your preferred models side by side before you enquire.",
            ],
            [
              "Ask the right questions",
              "Confirm dimensions, materials, adjustments, availability and price with our team before making a decision.",
            ],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="border-t border-[var(--color-border)] pt-6"
            >
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="copy mt-4 text-sm">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/products" className="button-primary">
            Explore seating
          </Link>
          <Link href="/contact" className="button-secondary">
            Meet us in a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
