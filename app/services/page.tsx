import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workspace Services | NWS Chennai",
  description:
    "Discuss space planning, furniture sourcing, installation and workspace upgrades with Node Workspace Solutions.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    title: "Space planning & design",
    text: "Bring your room dimensions, team size and the way you work. Discuss a furniture layout that makes sense for your space.",
    details:
      "Useful to share: a floor plan, photographs, seating quantities and the types of work your space supports.",
  },
  {
    title: "Product supply & sourcing",
    text: "Build a shortlist across task, executive, visitor, training and lounge seating. Discuss suitable options for individual desks or a wider workspace.",
    details:
      "Ask about: model specifications, material and colour options, quantities, price and current availability.",
  },
  {
    title: "Delivery & installation",
    text: "Plan how your furniture will get from a shortlist to its place in the office. Discuss delivery access and assembly requirements before ordering.",
    details:
      "Useful to share: location, floor level, lift access, working hours and your preferred installation window. Confirm coverage, timing and charges with the team.",
  },
  {
    title: "After-sales support",
    text: "Have a question about an existing chair or a larger seating installation? Discuss the model and the support you need.",
    details:
      "Useful to share: product name, purchase information and clear photographs of the issue. Warranty terms and service availability need confirmation for your product.",
  },
  {
    title: "Workspace fitouts",
    text: "Bring the bigger picture together. Discuss furniture requirements as part of a new office or a wider workspace project.",
    details:
      "Useful to share: the project scope, plans, target timeline and any partners already involved. Agree the scope of work before proceeding.",
  },
  {
    title: "Refurbishment & upgrades",
    text: "Make a plan for the space you already have. Discuss what you want to keep, what needs attention and what you would like to change.",
    details:
      "Useful to share: an inventory, photographs, condition of existing furniture and your priorities. Repair, refurbishment and replacement options are assessed on enquiry.",
  },
];

export default function Services() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="site-container grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div>
            <p className="eyebrow mb-5">Workspace services</p>
            <h1 className="display-title !text-[clamp(44px,5.5vw,74px)]">
              The whole space.
              <br />
              Considered.
            </h1>
            <p className="copy mt-7">
              Seating is a good beginning. Bring us your plans for the rest,
              from a fresh layout to a workspace ready for its next chapter.
            </p>
            <Link className="button-primary mt-7" href="/quote">
              Discuss your workspace
            </Link>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-[100px_12px_12px_12px] md:h-[400px]">
            <Image
              src="/images/nws-hero.png"
              alt="Workspace inspiration with coordinated seating and desks"
              fill
              preload
              sizes="(max-width: 767px) 90vw, 600px"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>
      <section className="site-container section-space grid items-start gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
        <div className="md:sticky md:top-24">
          <p className="eyebrow mb-4">How we can help</p>
          <h2 className="section-title">
            From first ideas
            <br />
            to next steps.
          </h2>
          <p className="copy mt-6">
            Explore the areas you’d like to discuss. Each project starts by
            confirming the scope, availability and practical details with our
            team.
          </p>
        </div>
        <div>
          {services.map((service, i) => (
            <details
              key={service.title}
              className="faq-row first:border-t first:border-[var(--color-border)]"
              open={i === 0}
            >
              <summary>{service.title}</summary>
              <p className="copy">{service.text}</p>
              <p className="copy text-sm">{service.details}</p>
              <Link href="/quote" className="text-link mt-4">
                Include this in your enquiry
              </Link>
            </details>
          ))}
        </div>
      </section>
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] section-space">
        <div className="site-container">
          <h2 className="section-title mb-10">A simple way to get started.</h2>
          <ol className="grid gap-9 md:grid-cols-3">
            {[
              [
                "Share the picture",
                "Tell us about your space, your team and what you want to change.",
              ],
              [
                "Explore the options",
                "Review the collection and discuss the details that matter to your project.",
              ],
              [
                "Agree the next steps",
                "Confirm the product specifications, scope, pricing and timing before proceeding.",
              ],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span className="mb-5 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-selected)] text-sm font-semibold text-[var(--color-on-selected)]">
                  {i + 1}
                </span>
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="copy mt-3 text-sm">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
