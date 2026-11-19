import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { PRODUCTS } from "@/app/products/catalogue";

export const metadata: Metadata = {
  title: "Plan Your Seating | NWS Chennai",
  description:
    "Prepare an enquiry for your preferred NWS chairs, team seating or workspace project.",
  alternates: { canonical: "/quote" },
};

export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ models?: string | string[] }>;
}) {
  const params = await searchParams;
  const slugs =
    typeof params.models === "string"
      ? params.models.split(",").slice(0, 3)
      : [];
  const models = PRODUCTS.filter((product) => slugs.includes(product.slug)).map(
    (product) => `${product.name} (${product.sub})`,
  );
  return (
    <section className="site-container section-space grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <div className="lg:sticky lg:top-24">
        <p className="eyebrow mb-5">Your next workspace starts here</p>
        <h1 className="display-title !text-[clamp(42px,5vw,66px)]">
          A better seat.
          <br />A clearer plan.
        </h1>
        <p className="copy mt-7">
          One chair or a whole workspace. Share what you’re looking for and
          prepare an enquiry for the NWS team.
        </p>
        <ol className="mt-9 space-y-6">
          {[
            [
              "Choose your seating",
              "Have a model in mind? Your selection will be included below.",
            ],
            [
              "Share your plans",
              "Tell us about quantities, timing and the space.",
            ],
            [
              "Send your enquiry",
              "Review your email draft and send it from your email app.",
            ],
          ].map(([title, copy], i) => (
            <li key={title} className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-selected)] text-xs font-semibold text-[var(--color-on-selected)]">
                {i + 1}
              </span>
              <div>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                  {copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <p className="text-sm">Prefer a conversation?</p>
          <a className="text-link mt-2" href="tel:+919876543210">
            Call +91 98765 43210
          </a>
          <br />
          <Link href="/products" className="text-link mt-3">
            Keep exploring the collection
          </Link>
        </div>
      </div>
      <ContactForm mode="quote" models={models} />
    </section>
  );
}
