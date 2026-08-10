import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="bg-[var(--color-light-base)]">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">

          <h1 className="text-5xl font-bold tracking-tight text-[var(--color-secondary)] md:text-6xl">
            Professional Services
            <span className="block text-[var(--color-primary)]">
              Built Around Your Needs
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-neutral)]">
            We provide reliable and professional services to businesses
            and customers across Chennai.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">

        <h2 className="text-center text-3xl font-bold">
          Our Services
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl border p-8">
            <h3 className="text-xl font-semibold">
              Service One
            </h3>

            <p className="mt-3 text-gray-600">
              Description about your first service goes here.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] p-8">
            <h3 className="text-xl font-semibold text-[var(--color-secondary)]">
              Service Two
            </h3>

            <p className="mt-3 text-[var(--color-neutral)]">
              Description about your second service goes here.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] p-8">
            <h3 className="text-xl font-semibold text-[var(--color-secondary)]">
              Service Three
            </h3>

            <p className="mt-3 text-[var(--color-neutral)]">
              Description about your third service goes here.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}