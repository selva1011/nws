import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SeatFinder from "@/components/SeatFinder";
import { PRODUCTS } from "./products/catalogue";

export const metadata: Metadata = {
  title: "Office Chairs & Workspace Furniture in Chennai | NWS",
  description:
    "Find a seat for your kind of work. Explore NWS office chairs, compare seating and plan your workspace with Node Workspace Solutions in Chennai.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Your workday. Better seated. | NWS",
    description:
      "Office seating for individual spaces and growing teams in Chennai.",
    url: "/",
    images: ["/images/nws-hero.png"],
  },
};

export default function Home() {
  const categories = [
    { name: "Task", label: "Everyday focus", image: "OSLO-MB.jpeg" },
    { name: "Executive", label: "Space to think", image: "BUTTERFLY-HB.jpeg" },
    { name: "Visitor", label: "A warm welcome", image: "8024-D Visitor.jpeg" },
    {
      name: "Training",
      label: "Shared learning",
      image: "FLIPTRAININGCHAIR-WITHPADWITHOUTWHEEL-SIDE.JPEG",
    },
    { name: "Sofa", label: "A softer setting", image: "METRO_SOFA.jpeg" },
  ];
  const featured = ["butterfly-hb", "805-mesh", "oslo-mb", "metro-sofa"].map(
    (slug) => PRODUCTS.find((product) => product.slug === slug)!,
  );
  return (
    <>
      <section className="site-container pb-8 pt-10 md:pt-16">
        <div className="mb-10 grid items-end gap-7 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
            <p className="eyebrow mb-5">Node Workspace Solutions / Chennai</p>
            <h1 className="display-title">
              Your workday.
              <br />
              Better seated.
            </h1>
          </div>
          <div className="max-w-md pb-1">
            <p className="copy">
              For the desk that’s yours. For the team you’re building. Find
              seating that belongs in your workday.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link href="/products" className="button-primary">
                Explore seating <span aria-hidden="true">↗</span>
              </Link>
              <a className="text-link" href="#seat-finder">
                Help me choose
              </a>
            </div>
          </div>
        </div>
        <div className="relative h-[350px] overflow-hidden rounded-2xl sm:h-[430px] lg:h-[490px]">
          <Image
            src="/images/nws-hero.png"
            alt="Bright workspace inspiration with desk seating, wood finishes and natural light"
            fill
            preload
            sizes="(max-width: 1370px) 100vw, 1320px"
            className="object-cover object-[65%_center]"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-xl bg-white/95 p-4 backdrop-blur-sm sm:bottom-6 sm:left-auto sm:right-6 sm:w-[310px]">
            <div>
              <p className="text-xs text-[var(--color-neutral)]">
                Consider your whole workspace
              </p>
              <Link
                href="/services"
                className="mt-1 block text-sm font-semibold"
              >
                From a seat to a space <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EAE4F0]"
            >
              ↗
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] py-6 text-xs text-[var(--color-neutral)]">
          <span>32 seating models to explore</span>
          <span>For individuals & teams</span>
          <span>Product advice from our Chennai team</span>
        </div>
      </section>
      <section className="site-container section-space !pt-10 md:!pt-16">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <h2 className="section-title">A seat for every setting.</h2>
          <Link href="/products" className="text-link">
            View the whole collection
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?type=${category.name}`}
              className="group"
            >
              <div className="product-stage relative aspect-[.9] overflow-hidden rounded-xl">
                <Image
                  src={`/products images/${category.image}`}
                  alt={`${category.name} seating`}
                  fill
                  sizes="(max-width: 639px) 44vw, (max-width: 1023px) 30vw, 250px"
                  className="object-contain p-3 transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold">
                  {category.name === "Sofa"
                    ? "Lounge & sofas"
                    : `${category.name} chairs`}
                </h3>
                <span aria-hidden="true">↗</span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-neutral)]">
                {category.label}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <SeatFinder />
      <section className="site-container section-space">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-4">Meet the collection</p>
            <h2 className="section-title">Worth a closer look.</h2>
          </div>
          <Link href="/products" className="text-link">
            Explore all models
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <section className="site-container pb-16 md:pb-24">
        <div className="grid overflow-hidden rounded-2xl bg-[#ECE7E2] md:grid-cols-2">
          <div className="relative min-h-[310px]">
            <Image
              src="/images/nws-hero.png"
              alt="Workspace inspiration with desks and seating"
              fill
              sizes="(max-width: 767px) 90vw, 660px"
              className="object-cover object-right"
            />
          </div>
          <div className="flex flex-col items-start justify-center p-7 md:p-14">
            <p className="eyebrow">Thinking beyond one chair?</p>
            <h2 className="section-title mt-4">
              Big plans.
              <br />A thoughtful start.
            </h2>
            <p className="copy mt-6">
              A new office, a growing team or a space ready for a refresh. Bring
              us your ideas, your quantities and your questions.
            </p>
            <Link href="/quote" className="button-primary mt-7">
              Plan a workspace enquiry
            </Link>
          </div>
        </div>
      </section>
      <section className="site-container grid gap-8 pb-20 md:grid-cols-[1fr_1.3fr] md:gap-20 md:pb-28">
        <div>
          <p className="eyebrow mb-4">Before you choose</p>
          <h2 className="section-title">
            A few good
            <br />
            questions.
          </h2>
          <Link href="/contact" className="text-link mt-6">
            Have another question?
          </Link>
        </div>
        <div>
          {[
            [
              "Where should I start?",
              "Choose the setting first: a desk, a meeting space, a reception area or a training room. Use the seating finder above, then compare models in the collection.",
            ],
            [
              "Can I enquire about seating for a whole team?",
              "Yes. Include your seating quantity, the spaces you are furnishing and any preferred models in your enquiry. You can prepare an email from the planning page.",
            ],
            [
              "Where can I find prices and dimensions?",
              "Prices, dimensions, materials, configuration options and availability need to be confirmed with the NWS team for your chosen model. Product pages show the catalogue information currently available.",
            ],
            [
              "How do I send an enquiry?",
              "Select a product and choose Enquire about this chair, or use Plan your seating. The form prepares an email for you to send through your email app. You can also copy the enquiry or call the team.",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="faq-row">
              <summary>{question}</summary>
              <p className="copy text-sm">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
