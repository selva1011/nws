"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const spaces = [
  {
    label: "My desk",
    category: "Task",
    title: "A place to settle into your day.",
    copy: "Start with task seating for your desk. Compare medium-back and mesh styles, then ask about the fit and adjustments of your preferred model.",
    image: "/product-display/OSLO-MB.jpeg",
    secondary: "Executive",
  },
  {
    label: "A team workspace",
    category: "Task",
    title: "Different people. One considered space.",
    copy: "Build your shortlist around the desks your team uses. Share quantities and the way your space works when you enquire.",
    image: "/product-display/805-MESH.JPEG",
    secondary: "Executive",
  },
  {
    label: "A welcome area",
    category: "Visitor",
    title: "Make a good first seat.",
    copy: "Explore visitor chairs for meetings and reception, or sofas for a more relaxed waiting area. Confirm dimensions before planning your layout.",
    image: "/product-display/8024-D Visitor.jpeg",
    secondary: "Sofa",
  },
  {
    label: "A learning space",
    category: "Training",
    title: "Room for the next good idea.",
    copy: "Explore training chairs with and without writing pads. Start with the format that suits your room and ask about the practical details.",
    image: "/product-display/FLIPTRAININGCHAIR-WITHPADWITHOUTWHEEL-SIDE.JPEG",
    secondary: "Visitor",
  },
];

export default function SeatFinder() {
  const [selected, setSelected] = useState(0);
  const space = spaces[selected];
  return (
    <section
      id="seat-finder"
      className="scroll-mt-28 border-y border-[var(--color-border)] bg-[var(--color-surface)] section-space"
    >
      <div className="site-container grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow">A little help choosing</p>
          <h2 className="section-title mt-4 max-w-lg">
            Where will your
            <br />
            next chair go?
          </h2>
          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Choose your workspace"
          >
            {spaces.map((item, index) => (
              <button
                key={item.label}
                className="filter-chip"
                type="button"
                aria-pressed={index === selected}
                onClick={() => setSelected(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true" className="mt-9">
            <h3 className="text-xl font-medium tracking-tight">
              {space.title}
            </h3>
            <p className="copy mt-4">{space.copy}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href={`/products?type=${space.category}`}
                className="button-primary"
              >
                Explore {space.category.toLowerCase()} seating
              </Link>
              <Link
                className="text-link"
                href={`/products?type=${space.secondary}`}
              >
                Also explore {space.secondary.toLowerCase()}
              </Link>
            </div>
          </div>
        </div>
        <div className="product-stage relative min-h-[340px] overflow-hidden rounded-[120px_120px_16px_16px] !bg-[var(--color-page)] sm:min-h-[430px]">
          <Image
            key={space.image}
            src={space.image}
            alt={`${space.category} seating example`}
            fill
            sizes="(max-width: 1023px) 90vw, 520px"
            className="object-contain p-8"
          />
        </div>
      </div>
    </section>
  );
}
