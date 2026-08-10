import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact our team for enquiries, services and more information.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">

      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Contact Us
        </h1>

        <p className="mt-4 text-gray-600">
          Have a question? Send us a message and we'll get back to you.
        </p>
      </div>

      <div className="mt-12">
        <ContactForm />
      </div>

    </section>
  );
}