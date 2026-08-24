"use client";
import { useState, useEffect } from "react";

const BASE = "https://cdn.shopify.com/s/files/1/0597/8554/3835/products/";

const CATEGORIES = ["All", "Executive", "Task", "Leather", "Heavy Duty", "Visitor", "Breakout", "Drafting"];

const ALL_CHAIRS = [
  {
    name: "Magnum Executive Chair",
    sub: "High Back",
    cat: "Executive",
    img1: BASE + "MAGNUM-H.jpg?v=1636757813",
    img2: BASE + "MAGNUM-HBACKVIEW.jpg?v=1636757813",
    alt: "Magnum Executive Chair High Back",
  },
  {
    name: "Bliss Leather Chair",
    sub: "High Back",
    cat: "Leather",
    img1: BASE + "MGOPJ-VC-H01BK_5.jpg?v=1636874830",
    img2: BASE + "MGOPJ-VC-H01BK_1.jpg?v=1636874830",
    alt: "Bliss Leather Chair High Back",
  },
  {
    name: "Rio Task Chair",
    sub: "High Mesh Back",
    cat: "Task",
    img1: BASE + "RIO-H-MB.jpg?v=1636772195",
    img2: BASE + "RIO-Hwithdimension.jpg?v=1636772195",
    alt: "Rio Task Chair High Mesh Back",
  },
  {
    name: "Hino Heavy Duty",
    sub: "Task Chair",
    cat: "Heavy Duty",
    img1: BASE + "HINO-MB.jpg?v=1636757372",
    img2: BASE + "HINO-MBBackView.jpg?v=1636757372",
    alt: "Hino Heavy Duty Task Chair",
  },
  {
    name: "Titan Chair",
    sub: "Heavy Duty",
    cat: "Heavy Duty",
    img1: BASE + "titan_chair_5__1_1_5000x_0c09e98e-c00d-4cfa-af28-15a8c17cb228.jpg?v=1642390370",
    img2: BASE + "titan_chair_45__1_5000x_233469c6-a02c-45d9-b105-2e6d7720b402.jpg?v=1642390370",
    alt: "Titan Chair",
  },
  {
    name: "Studio Mesh Visitor",
    sub: "Visitor Chair",
    cat: "Visitor",
    img1: BASE + "ys41-studio-front.jpg?v=1636713454",
    img2: BASE + "ys41-studio-back.jpg?v=1636713454",
    alt: "Studio Mesh Visitor Chair",
  },
  {
    name: "Rio Task Chair",
    sub: "Low Mesh Back",
    cat: "Task",
    img1: BASE + "RIO-L-MB.jpg?v=1636772281",
    img2: BASE + "RIO-Lwithdimension.jpg?v=1636772280",
    alt: "Rio Task Chair Low Mesh Back",
  },
  {
    name: "Intro Task Chair",
    sub: "Standard",
    cat: "Task",
    img1: BASE + "INTRO_BLACK.jpg?v=1636757545",
    img2: BASE + "INTROWithdimension.jpg?v=1636757545",
    alt: "Intro Task Chair",
  },
  {
    name: "Web Executive Chair",
    sub: "Low Back",
    cat: "Executive",
    img1: BASE + "WEB_L_white.jpg?v=1636785895",
    img2: BASE + "WEB_L_red_d143f25f-308a-4f74-bc82-8f6a80d2e1ce.jpg?v=1641174476",
    alt: "Web Executive Chair Low Back",
  },
  {
    name: "Hilton Executive Chair",
    sub: "High Back",
    cat: "Executive",
    img1: BASE + "HILTON-H.jpg?v=1636757206",
    img2: BASE + "HILTON-Hbacksideview.jpg?v=1636757206",
    alt: "Hilton Executive Chair High Back",
  },
  {
    name: "TR600 Heavy Duty",
    sub: "Task Chair",
    cat: "Heavy Duty",
    img1: BASE + "TR600-MB.jpg?v=1636774067",
    img2: BASE + "TR600-MBBackview.jpg?v=1636774067",
    alt: "TR600 Heavy Duty Task Chair",
  },
  {
    name: "Camry Executive Chair",
    sub: "High Back",
    cat: "Executive",
    img1: BASE + "CAMRY-H.jpg?v=1636755486",
    img2: BASE + "CAMRY-Hwithdimension.jpg?v=1636755486",
    alt: "Camry Executive Chair High Back",
  },
  {
    name: "Boston Executive Chair",
    sub: "High Back",
    cat: "Executive",
    img1: BASE + "BOSTON-H_rightside.jpg?v=1636755247",
    img2: BASE + "BOSTON-Hsideview.jpg?v=1636755248",
    alt: "Boston Executive Chair High Back",
  },
  {
    name: "Tonic Breakout Chair",
    sub: "Breakout",
    cat: "Breakout",
    img1: BASE + "TONIC-R.jpg?v=1636774017",
    img2: BASE + "TONIC-Rbackview.jpg?v=1636774017",
    alt: "Tonic Breakout Chair",
  },
  {
    name: "Drafting Chair",
    sub: "Medium Back",
    cat: "Drafting",
    img1: BASE + "EC070BMBLDrafting_2.jpg?v=1637384797",
    img2: BASE + "EC070BMBLDrafting_3.jpg?v=1637384797",
    alt: "Commercial Grade Drafting Chair",
  },
  {
    name: "Duro Plus Heavy Duty",
    sub: "Task Chair",
    cat: "Heavy Duty",
    img1: BASE + "DuroPlusCT14HABK_1.jpg?v=1636871891",
    img2: BASE + "DuroPlusCT14HABK_2.jpg?v=1636871891",
    alt: "Duro Plus Heavy Duty Task Chair",
  },
  {
    name: "Rose Hospitality Chair",
    sub: "Hospitality",
    cat: "Visitor",
    img1: BASE + "ROSE.jpg?v=1636772427",
    img2: BASE + "ROSEbackview.jpg?v=1636772428",
    alt: "Rose Hospitality Chair",
  },
  {
    name: "P350 Task Chair",
    sub: "High Back with Arm",
    cat: "Task",
    img1: BASE + "P350HC-MB.jpg?v=1636758228",
    img2: BASE + "P350H-MB.jpg?v=1636758211",
    alt: "P350 Task Chair High Back",
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
      {/* Image with crossfade */}
      <div style={{ position: "relative", aspectRatio: "4/5", background: "#F8FAFC", overflow: "hidden" }}>
        <img
          src={chair.img1}
          alt={chair.alt}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "darken",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <img
          src={chair.img2}
          alt={`${chair.alt} alternate`}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "darken",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(1.06)",
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
