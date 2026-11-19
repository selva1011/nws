import Link from "next/link";

const footerLink =
  "underline-offset-4 decoration-[var(--color-gold)] decoration-2 hover:text-[var(--color-text)] hover:underline";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-7 border-b border-[var(--color-border)] py-14 md:flex-row md:items-center md:py-20">
          <h2 className="max-w-xl text-[clamp(32px,4.5vw,58px)] font-medium leading-[1.08] tracking-[-.045em]">
            Make room for
            <br />a better workday.
          </h2>
          <Link href="/quote" className="button-primary self-start md:self-auto">
            Let’s plan your seating <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              aria-label="Node Workspace Solutions home"
              className={`inline-block text-xl font-bold tracking-[-0.02em] decoration-2 ${footerLink}`}
            >
              Node Workspace Solutions
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-[var(--color-text-muted)]">
              Office seating for individual spaces, growing teams and everything
              in between.
            </p>
            <p className="mt-6 text-xs text-[var(--color-text-muted)]">
              Chennai, Tamil Nadu, India
            </p>
          </div>
          <nav aria-label="Footer collections">
            <h3 className="text-sm font-semibold">Find your seat</h3>
            <ul className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)]">
              {["Executive", "Task", "Visitor", "Training", "Sofa"].map(
                (cat) => (
                  <li key={cat}>
                    <Link href={`/products?type=${cat}`} className={footerLink}>
                      {cat === "Sofa" ? "Lounge & sofas" : `${cat} chairs`}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <nav aria-label="Footer company">
            <h3 className="text-sm font-semibold">Discover NWS</h3>
            <ul className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)]">
              {[
                ["Our story", "/company"],
                ["Workspace services", "/services"],
                ["Seating collection", "/products"],
                ["Contact us", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link className={footerLink} href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-sm font-semibold">Start a conversation</h3>
            <address className="mt-5 space-y-4 text-sm not-italic text-[var(--color-text-muted)]">
              <a
                href="mailto:sales@nwsworkspace.com"
                className={`block break-all ${footerLink}`}
              >
                sales@nwsworkspace.com
              </a>
              <a href="tel:+919876543210" className={`block ${footerLink}`}>
                +91 98765 43210
              </a>
            </address>
            <Link href="/quote" className="text-link mt-5">
              Prepare an enquiry
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-[var(--color-border)] py-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} Node Workspace Solutions</span>
          <span>A space for your kind of work.</span>
        </div>
      </div>
    </footer>
  );
}
