import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import Experience from "@/components/Experience";
export default function HomePage() {



    return (
      <main>
        <section className="bg-[linear-gradient(180deg,var(--color-light-base),transparent)]">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <ImageCarousel />

            <div className="mx-auto mt-10 max-w-5xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--color-secondary)] sm:text-5xl">
                Premium workspace design
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-neutral)]">
                Thoughtfully designed workspaces and operational services that help teams perform.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Link
                  href="/services"
                  className="rounded-md bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Explore Our Categories
                </Link>
                <Link href="/contact" className="text-sm text-[var(--color-secondary)] underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Experience />

        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold text-[var(--color-secondary)]">Our Story</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[var(--color-neutral)]">
            Node Workspace Solutions began with a simple idea: transform functional spaces into places teams love to work. We combine design rigor with operational excellence to deliver turn-key workspace solutions.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 text-center">
          <h3 className="text-2xl font-semibold text-[var(--color-secondary)]">Why Node Workspace Solutions</h3>
          <p className="mx-auto mt-4 max-w-3xl text-[var(--color-neutral)]">
            We bring strategy, design and delivery together to reduce risk and accelerate setup times for modern teams.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white">
              Get in touch
            </Link>
          </div>
        </section>
      </main>
    );
  }