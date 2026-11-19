import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import BackToCatalogue from "./BackToCatalogue";
import ProductGallery from "./ProductGallery";
import { PRODUCTS, SPEC_FIELDS, categoryTitle } from "../catalogue";

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();
  return {
    title: `${product.name} — ${product.sub} | NWS Chennai`,
    description: product.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.name} | NWS`,
      description: product.description,
      url: `/products/${slug}`,
      type: "website",
      images: product.images.map((image) => ({
        url: image.src,
        alt: image.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | NWS`,
      description: product.description,
      images: [product.img],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = PRODUCTS.filter(
    (item) => item.cat === product.cat && item.slug !== slug,
  ).slice(0, 4);
  const url = `https://nwsworkspace.com/products/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.name,
        description: product.description,
        category: product.cat,
        image: product.images.map(
          (image) => `https://nwsworkspace.com${encodeURI(image.src)}`,
        ),
        url,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Catalogue style",
            value: product.sub,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://nwsworkspace.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: "https://nwsworkspace.com/products",
          },
          { "@type": "ListItem", position: 3, name: product.name, item: url },
        ],
      },
    ],
  };
  const specRows: [string, string][] = [
    ["Model", product.name],
    ["Category", categoryTitle(product.cat)],
    ["Catalogue style", product.sub],
    ...SPEC_FIELDS.flatMap((field): [string, string][] =>
      product.specs[field] ? [[field, product.specs[field]]] : [],
    ),
  ];
  const missingSpecs = SPEC_FIELDS.filter((field) => !product.specs[field]);
  const noun = product.cat === "Sofa" ? "sofa" : "chair";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="site-container pb-20 pt-5 md:pb-28 md:pt-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <BackToCatalogue slug={product.slug} category={product.cat} />
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]"
          >
            <Link href="/" className="underline-offset-4 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="underline-offset-4 hover:underline">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[var(--color-text)]">
              {product.title}
            </span>
          </nav>
        </div>
        <div className="grid items-start gap-7 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <ProductGallery
            slug={product.slug}
            name={product.title}
            images={product.images}
          />
          <div className="md:sticky md:top-24 md:py-2">
            <Link
              href={`/products?type=${product.cat}`}
              className="text-[13px] font-semibold text-[var(--color-text-muted)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4 hover:text-[var(--color-text)]"
            >
              {categoryTitle(product.cat)}
            </Link>
            <h1 className="mt-2 text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.06] tracking-[-0.04em]">
              {product.name}
            </h1>
            <p className="mt-1 text-lg text-[var(--color-text-muted)]">
              {product.sub}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/quote?models=${product.slug}`}
                className="button-primary"
              >
                Enquire about this {noun} <span aria-hidden="true">→</span>
              </Link>
              <a
                href="tel:+919876543210"
                className="button-secondary"
                aria-label={`Call +91 98765 43210 about ${product.title}`}
              >
                Call +91 98765 43210
              </a>
            </div>
            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] text-sm">
              {[
                ["Category", categoryTitle(product.cat)],
                ["Catalogue style", product.sub],
              ].map(([label, value]) => (
                <div key={label} className="bg-[var(--color-page)] p-4">
                  <dt className="text-xs text-[var(--color-text-muted)]">{label}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[15px] leading-7 text-[var(--color-text-muted)]">
              {product.description}
            </p>
          </div>
        </div>
        <section
          id="specifications"
          aria-labelledby="specifications-heading"
          className="mt-16 grid gap-6 border-t border-[var(--color-border)] pt-10 md:mt-20 md:grid-cols-[1fr_1.6fr] md:gap-12"
        >
          <div>
            <h2
              id="specifications-heading"
              className="text-2xl font-semibold tracking-[-0.03em]"
            >
              Specifications
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Verified catalogue details for this model.
            </p>
          </div>
          <div>
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                {product.title} specifications
              </caption>
              <tbody>
                {specRows.map(([label, value]) => (
                  <tr
                    key={label}
                    className="border-b border-[var(--color-border)] first:border-t"
                  >
                    <th
                      scope="row"
                      className="w-[40%] py-4 pr-4 align-top font-medium text-[var(--color-text-muted)]"
                    >
                      {label}
                    </th>
                    <td className="py-4 align-top font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {missingSpecs.length > 0 && (
              <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                {missingSpecs.join(", ").replace(/, ([^,]*)$/, " and $1")} are
                not yet listed for this model.{" "}
                <Link
                  href={`/quote?models=${product.slug}`}
                  className="font-semibold text-[var(--color-text)] underline decoration-[var(--color-gold)] decoration-2 underline-offset-4"
                >
                  Ask our team
                </Link>{" "}
                to confirm them, along with pricing and availability.
              </p>
            )}
          </div>
        </section>
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16 md:mt-20">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-3">
              <h2
                id="related-heading"
                className="text-xl font-medium tracking-[-0.02em]"
              >
                More {categoryTitle(product.cat).toLowerCase()}
              </h2>
              <Link href={`/products?type=${product.cat}`} className="text-link !py-0 text-[13px]">
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="catalogue-grid">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
