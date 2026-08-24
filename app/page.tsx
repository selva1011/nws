"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BASE = "https://cdn.shopify.com/s/files/1/0597/8554/3835/products/";

const CHAIRS = [
  {
    label: "Executive Chairs",
    img1: BASE + "MAGNUM-H.jpg?v=1636757813",
    img2: BASE + "MAGNUM-HBACKVIEW.jpg?v=1636757813",
    alt: "Magnum Executive Chair High Back",
  },
  {
    label: "Mesh Task Chairs",
    img1: BASE + "RIO-H-MB.jpg?v=1636772195",
    img2: BASE + "RIO-Hwithdimension.jpg?v=1636772195",
    alt: "Rio Task Chair High Mesh Back",
  },
  {
    label: "Leather Chairs",
    img1: BASE + "MGOPJ-VC-H01BK_5.jpg?v=1636874830",
    img2: BASE + "MGOPJ-VC-H01BK_1.jpg?v=1636874830",
    alt: "Bliss Leather Chair High Back",
  },
  {
    label: "Heavy Duty",
    img1: BASE + "HINO-MB.jpg?v=1636757372",
    img2: BASE + "HINO-MBBackView.jpg?v=1636757372",
    alt: "Hino Heavy Duty Task Chair",
  },
];

function ChairTile({ chair, onClick }: { chair: { label: string; img1: string; img2: string; alt: string; isViewAll?: boolean }; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        border: "none",
        padding: 0,
        cursor: "pointer",
        background: "#F1F5F9",
        overflow: "hidden",
        display: "block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={chair.img1}
        alt={chair.alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.55s ease, transform 0.55s ease",
          opacity: hovered ? 0 : 1,
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />
      <img
        src={chair.img2}
        alt={`${chair.alt} alternate`}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.55s ease, transform 0.55s ease",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(1.06)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          background: chair.isViewAll ? "#00A7C4" : "#ffffff",
          padding: "10px 18px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: chair.isViewAll ? "#ffffff" : "#0F172A",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          {chair.label}
        </span>
      </div>
    </button>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "88vh", background: "#0F172A" }}
      >
        <img
          src="https://images.unsplash.com/photo-1631193816258-28b44b21e78b?w=1600&h=900&fit=crop&auto=format"
          alt="Modern ergonomic office space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.65) 100%)" }} />

        <div className="relative z-10 flex flex-col items-center text-center gap-6" style={{ padding: "0 24px", maxWidth: 760 }}>
          <span className="text-xs font-extrabold tracking-[0.22em] uppercase" style={{ color: "#22D3EE" }}>
            For Your Workspace
          </span>
          <h1
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
          >
            Ergonomic Chairs &amp;<br />Workspace Solutions
          </h1>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: "28px", maxWidth: 520 }}>
            Engineered for comfort. Built for performance. Trusted by 100+ corporates across India.
          </p>
          <button
            onClick={() => router.push("/products")}
            style={{
              background: "#00A7C4",
              color: "#ffffff",
              border: "none",
              height: 52,
              padding: "0 40px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 8,
              boxShadow: "0 10px 30px rgba(0,167,196,0.35)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#008CA6")}
            onMouseLeave={e => (e.currentTarget.style.background = "#00A7C4")}
          >
            Shop Now
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.45 }}>
          <div style={{ width: 1, height: 40, background: "white" }} />
          <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── CHAIR GRID ── */}
      <section style={{ background: "#ffffff", padding: "80px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2" style={{ color: "#00A7C4" }}>
                Our Collections
              </span>
              <h2
                className="font-extrabold"
                style={{ fontSize: "clamp(26px, 3vw, 38px)", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1 }}
              >
                Browse by Category
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#94A3B8" }}>Hover any tile to see the chair from a second angle</p>
            </div>
            <button
              onClick={() => router.push("/products")}
              style={{ color: "#00A7C4", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              View all chairs →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAIRS.map((c) => (
              <ChairTile key={c.label} chair={c} onClick={() => router.push("/products")} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => router.push("/products")}
              style={{
                background: "#00A7C4", color: "#ffffff", border: "none", height: 50, padding: "0 36px",
                borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700,
                boxShadow: "0 8px 20px rgba(0,167,196,0.22)", transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#008CA6")}
              onMouseLeave={e => (e.currentTarget.style.background = "#00A7C4")}
            >
              View More Chairs
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
    

      {/* ── CTA BAND ── */}
      <section style={{ background: "#00A7C4", padding: "64px 24px" }}>
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6" style={{ maxWidth: 1280 }}>
          <div>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.03em" }}>
              Ready to transform your workspace?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 6, fontSize: 15 }}>
              Talk to our experts and get a free space assessment.
            </p>
          </div>
          <button
            onClick={() => router.push("/quote")}
            style={{
              background: "#ffffff", color: "#00A7C4", border: "none", height: 50, padding: "0 32px",
              borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, flexShrink: 0,
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F0FDFE")}
            onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
          >
            Get a Free Quote
          </button>
        </div>
      </section>
    </div>
  );
}
