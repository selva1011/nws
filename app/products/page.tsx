"use client";
import { useState, useEffect } from "react";

const BASE = "/products images/";

const CATEGORIES = ["All", "Executive", "Task", "Visitor", "Sofa", "Training"];

const ALL_CHAIRS = [
  {
    name: "8024-D Visitor",
    sub: "Visitor",
    cat: "Visitor",
    img: BASE + "8024-D Visitor.jpeg",
  },
  {
    name: "803 NETTED MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "803-NETTED-MB.jpeg",
  },
  {
    name: "804 VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "804-VC.JPEG",
  },
  {
    name: "805 MESH",
    sub: "Mesh Chair",
    cat: "Task",
    img: BASE + "805-MESH.JPEG",
  },
  {
    name: "805 NETTED MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "805-NETTED-MB.jpeg",
  },
  {
    name: "Accord MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "Accord MB.jpeg",
  },
  {
    name: "BUTTERFLY HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "BUTTERFLY-HB.jpeg",
  },
  {
    name: "BUTTERFLY MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "BUTTERFLY-MB.jpeg",
  },
  {
    name: "ECCO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "ECCO-MB.jpeg",
  },
  {
    name: "EV-05 Visitor",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "EV-05 Visitor.jpeg",
  },
  {
    name: "FLASH MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "FLASH-MB.jpeg",
  },
  {
    name: "Flip Training Chair",
    sub: "With Pad",
    cat: "Training",
    img: BASE + "FLIPTRAININGCHAIR-WITHPADWITHOUTWHEEL-SIDE.JPEG",
  },
  {
    name: "Flip Training Chair",
    sub: "Without Pad",
    cat: "Training",
    img: BASE + "FLIP_TRAINING_CHAIR_-_WITH_OUT_WHEEL_WITHOUT_PAD_-_SIDE.JPEG",
  },
  {
    name: "GILMA VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "GILMA-VC-SIDE.JPEG",
  },
  {
    name: "HILITE HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "HILITE-HB.jpeg",
  },
  {
    name: "HILITE MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "HILITE-MB.jpeg",
  },
  {
    name: "J-118-2",
    sub: "Chair",
    cat: "Task",
    img: BASE + "J-118-2.JPEG",
  },
  {
    name: "JAZZ HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "JAZZ-HB.jpeg",
  },
  {
    name: "JAZZ MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "JAZZ-MB.jpeg",
  },
  {
    name: "KAABLE CHAIR",
    sub: "Chair",
    cat: "Task",
    img: BASE + "KAABLE-CHAIR.jpeg",
  },
  {
    name: "Kaable-Mesh Visitor",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "Kaable-Mesh Visitor.jpeg",
  },
  {
    name: "METRO SOFA",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "METRO_SOFA.jpeg",
  },
  {
    name: "OSLO HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "OSLO-HB.jpeg",
  },
  {
    name: "OSLO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "OSLO-MB.jpeg",
  },
  {
    name: "SOLITAIRE VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "SOLITAIRE-VC.jpeg",
  },
  {
    name: "SPENCER",
    sub: "Chair",
    cat: "Task",
    img: BASE + "SPENCER.jpeg",
  },
  {
    name: "VENTO HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "VENTO-HB.jpeg",
  },
  {
    name: "VENTO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "VENTO-MB.jpeg",
  },
  {
    name: "VS 6009-1",
    sub: "Chair",
    cat: "Task",
    img: BASE + "VS 6009-1.JPEG",
  },
  {
    name: "Visitor 3 Seater Sky Sofa",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "Visitor 3 Seater Sky Sofa.jpeg",
  },
  {
    name: "Visitor 3 Seater Sofa",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "Visitor 3 Seater Sofa.jpg.jpeg",
  },
  {
    name: "ZOOM HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "ZOOM-HB.jpeg",
  },
];

function ChairCard({ chair }: { chair: typeof ALL_CHAIRS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ border: "1px solid #E2E8F0", borderRadius: 12, background: "#ffffff", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with zoom effect */}
      <div style={{ position: "relative", aspectRatio: "4/5", background: "#F8FAFC", overflow: "hidden" }}>
        <img
          src={chair.img}
          alt={chair.name}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "darken",
            transition: "transform 0.55s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>

      {/* Info — no price, no quote button */}
      <div style={{ padding: "14px 16px 18px" }}>
        <span style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 4 }}>
          {chair.cat}
        </span>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: hovered ? "#00A7C4" : "#0F172A", transition: "color 0.2s", marginBottom: 2 }}>
          {chair.name}
        </h3>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>{chair.sub}</span>
      </div>
    </div>
  );
}

export default function Products() {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [active]);

  const filtered = active === "All" ? ALL_CHAIRS : ALL_CHAIRS.filter(c => c.cat === active);
  
  const ITEMS_PER_PAGE = 8;
  const paginatedChairs = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "48px 24px 40px" }}>
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2" style={{ color: "#00A7C4" }}>Our Range</span>
          <h1 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Chair Collections
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#64748B", maxWidth: 480, lineHeight: "24px" }}>
            Hover any chair to see the alternate angle. Explore our full range of premium seating.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ borderBottom: "1px solid #E2E8F0", background: "#ffffff", position: "sticky", top: 72, zIndex: 40 }}>
        <div
          className="mx-auto flex items-center gap-2 overflow-x-auto"
          style={{ maxWidth: 1280, padding: "0 24px", height: 56, scrollbarWidth: "none" }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 18px", height: 36, borderRadius: 9999, border: "1px solid",
                borderColor: active === cat ? "#00A7C4" : "#E2E8F0",
                background: active === cat ? "#00A7C4" : "#ffffff",
                color: active === cat ? "#ffffff" : "#334155",
                cursor: "pointer", fontSize: 13, fontWeight: 700, flexShrink: 0, transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "48px 24px 80px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedChairs.map(chair => (
            <ChairCard key={chair.name + chair.sub} chair={chair} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  width: 40, height: 40, borderRadius: 8, border: "1px solid",
                  borderColor: page === i + 1 ? "#00A7C4" : "#E2E8F0",
                  background: page === i + 1 ? "#00A7C4" : "#ffffff",
                  color: page === i + 1 ? "#ffffff" : "#334155",
                  fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
