import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact NWS | Office Seating in Chennai",
  description:
    "Talk to Node Workspace Solutions about office seating and workspace requirements in Chennai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="site-container section-space grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <div>
        <p className="eyebrow mb-5">Let’s talk seating</p>
        <h1 className="display-title !text-[clamp(44px,5vw,68px)]">
          Good spaces
          <br />
          start with a<br />
          conversation.
        </h1>
        <p className="copy mt-7">
          Ask about a model, discuss a workspace, or get help choosing where to
          start.
        </p>
        <div className="mt-10 space-y-6">
          <div className="border-t border-[var(--color-border)] pt-5">
            <h2 className="text-xs text-[var(--color-neutral)]">
              Email our team
            </h2>
            <a
              className="text-link break-all text-lg"
              href="mailto:sales@nwsworkspace.com"
            >
              sales@nwsworkspace.com
            </a>
          </div>
          <div className="border-t border-[var(--color-border)] pt-5">
            <h2 className="text-xs text-[var(--color-neutral)]">
              Give us a call
            </h2>
            <a className="text-link text-lg" href="tel:+919876543210">
              +91 98765 43210
            </a>
          </div>
          <div className="border-t border-[var(--color-border)] pt-5">
            <h2 className="text-xs text-[var(--color-neutral)]">Our home</h2>
            <p className="mt-2 text-lg">Chennai, Tamil Nadu</p>
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
