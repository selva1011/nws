import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the professional services we provide in Chennai.",
};

const services = [
  {
    title: "Service One",
    description: "Detailed information about service one.",
  },
  {
    title: "Service Two",
    description: "Detailed information about service two.",
  },
  {
    title: "Service Three",
    description: "Detailed information about service three.",
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Our Services
        </h1>

        <p className="mt-4 text-[var(--color-neutral)]">
          Professional solutions designed for your requirements.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">

        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] p-8"
          >

            <h2 className="text-xl font-bold">
              {service.title}
            </h2>

            <p className="mt-4 text-[var(--color-neutral)]">
              {service.description}
            </p>

          </article>
        ))}

      </div>

    </section>
  );
}