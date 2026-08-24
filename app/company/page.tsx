"use client";
import { useRouter } from "next/navigation";

const TEAM = [
  { name: "Arjun Mehta", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format", alt: "Arjun Mehta" },
  { name: "Priya Nair", role: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format", alt: "Priya Nair" },
  { name: "Karan Shetty", role: "VP — Projects", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format", alt: "Karan Shetty" },
  { name: "Meena Choudhury", role: "National Sales Head", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format", alt: "Meena Choudhury" },
];

const MILESTONES = [
  { year: "2010", event: "Founded in Chennai with a single showroom and a team of 6." },
  { year: "2014", event: "Expanded to Bangalore and Hyderabad. First 500-seat corporate project delivered." },
  { year: "2017", event: "Achieved ISO 9001 certification. Launched in-house upholstery unit." },
  { year: "2020", event: "GreenGuard certification. Launched eco-range made from recycled materials." },
  { year: "2023", event: "Crossed 5,000 workspace installations. Now operating across 18 Indian states." },
];

export default function Company() {
  const router = useRouter();

  return (
    <div style={{ background: "#ffffff" }}>
      {/* Header */}
      <div
        className="relative flex items-end"
        style={{ minHeight: 380, background: "#0F172A", padding: "0 24px 56px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1772001936267-b6058748eff4?w=1400&h=500&fit=crop&auto=format"
          alt="NWS office interior"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 100%)" }} />
        <div className="relative z-10 mx-auto w-full" style={{ maxWidth: 1280 }}>
          <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-3" style={{ color: "#22D3EE" }}>About Us</span>
          <h1 className="font-extrabold text-white" style={{ fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Shaping Indian Workspaces<br />Since 2010
          </h1>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto grid lg:grid-cols-2 gap-12 items-center" style={{ maxWidth: 1280, padding: "80px 24px" }}>
        <div>
          <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-3" style={{ color: "#00A7C4" }}>Our Mission</span>
          <h2 className="font-extrabold mb-5" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.15 }}>
            To make ergonomic design accessible to every Indian professional.
          </h2>
          <p className="text-sm mb-4" style={{ color: "#64748B", lineHeight: "28px" }}>
            We started NWS because we saw a gap — between the premium ergonomic furniture available globally and what Indian businesses could actually access. Our goal has always been to bridge that gap: bringing world-class seating standards to startups, corporates, hospitals, and institutions at prices that make sense.
          </p>
          <p className="text-sm" style={{ color: "#64748B", lineHeight: "28px" }}>
            Today, with 15 years of experience and 5,000+ installations behind us, we remain committed to that original mission — one chair, one workspace, one team at a time.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ height: 380, background: "#CBD5E1" }}>
          <img
            src="https://images.unsplash.com/photo-1631193816258-28b44b21e78b?w=800&h=500&fit=crop&auto=format"
            alt="NWS team at work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <div className="text-center mb-12">
            <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2" style={{ color: "#00A7C4" }}>Our Journey</span>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", color: "#0F172A", letterSpacing: "-0.03em" }}>Key Milestones</h2>
          </div>
          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-[72px] top-0 bottom-0 hidden sm:block" style={{ width: 1, background: "#E2E8F0" }} />
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex gap-6 sm:gap-10 items-start py-6" style={{ borderBottom: "1px solid #E2E8F0" }}>
                <span className="font-extrabold flex-shrink-0 text-right" style={{ width: 56, color: "#00A7C4", fontSize: 15 }}>{m.year}</span>
                <div className="hidden sm:flex items-center justify-center flex-shrink-0 relative" style={{ width: 32, height: 32, zIndex: 1 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A7C4", border: "3px solid #F8FAFC" }} />
                </div>
                <p className="text-sm pt-1" style={{ color: "#334155", lineHeight: "24px" }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    

      {/* Certifications */}
      <div style={{ background: "#111827", padding: "64px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.03em" }}>
              Certified for Quality & Sustainability
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {["ISO 9001", "ISO 14001", "BIFMA", "GreenGuard", "MAKE IN INDIA"].map((c) => (
              <div key={c} className="rounded-xl flex flex-col items-center justify-center gap-1"
                style={{ background: "#ffffff", padding: "16px 24px", minWidth: 140, height: 72 }}>
                <span className="text-sm font-extrabold" style={{ color: "#334155" }}>{c}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/quote")}
              className="font-bold text-sm rounded-lg"
              style={{ background: "#00A7C4", color: "#ffffff", border: "none", height: 48, padding: "0 28px", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#008CA6")}
              onMouseLeave={e => (e.currentTarget.style.background = "#00A7C4")}
            >
              Work With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
