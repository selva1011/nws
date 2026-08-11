"use client";

import { useRef } from "react";

export default function ImageCarousel({
  images = ["/chairs/chair1.jpg", "/chairs/chair2.jpg", "/chairs/chair3.jpg"],
}: {
  images?: string[];
}) {
  const el = useRef<HTMLDivElement | null>(null);

  function scroll(dir: "left" | "right") {
    const node = el.current;
    if (!node) return;
    const width = node.clientWidth;
    node.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={el}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-3 py-6"
        aria-label="Chair images carousel"
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="snap-center min-w-[280px] sm:min-w-[420px] md:min-w-[520px] rounded-2xl overflow-hidden bg-white/5 border border-white/6 shadow-lg"
          >
            <img
              src={src}
              alt={`Chair ${i + 1}`}
              className="h-56 w-full object-cover sm:h-72 md:h-80"
              onError={(e) => {
                // graceful fallback to a simple gradient if image missing
                (e.currentTarget as HTMLImageElement).src = "/placeholder-chair.jpg";
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <button
          aria-label="Previous"
          onClick={() => scroll("left")}
          className="rounded-full bg-[rgba(255,255,255,0.06)] p-2 text-white shadow-md backdrop-blur-md hover:bg-[rgba(255,255,255,0.1)]"
        >
          ‹
        </button>
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button
          aria-label="Next"
          onClick={() => scroll("right")}
          className="rounded-full bg-[rgba(255,255,255,0.06)] p-2 text-white shadow-md backdrop-blur-md hover:bg-[rgba(255,255,255,0.1)]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
