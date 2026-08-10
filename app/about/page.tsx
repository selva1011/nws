import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about our company, experience and services in Chennai.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">

      <h1 className="text-4xl font-bold">
        About Us
      </h1>

      <p className="mt-6 text-lg leading-8 text-gray-600">
        We are a professional company focused on providing reliable,
        high-quality services to our customers.
      </p>

      <h2 className="mt-12 text-2xl font-bold">
        Why Choose Us?
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        We focus on quality, transparency and customer satisfaction.
      </p>

    </section>
  );
}