"use client";
import { useRouter } from "next/navigation";

const SERVICES = [
  {
    icon: "📐",
    title: "Space Planning & Design",
    desc: "Our in-house design team creates optimized floor plans and 3D visualizations tailored to your workspace dimensions, team size, and workflow — before a single chair is ordered.",
    features: ["AutoCAD floor plans", "3D walkthroughs", "Ergonomic zoning", "Lighting & acoustics advisory"],
  },
  {
    icon: "🪑",
    title: "Product Supply & Sourcing",
    desc: "We supply the full spectrum — from task chairs and executive seating to conference tables and reception counters — all ISO-certified and available across 40+ designs.",
    features: ["40+ furniture designs", "ISO 9001 certified stock", "Custom upholstery options", "Bulk order discounts"],
  },
  {
    icon: "🔧",
    title: "Professional Installation",
    desc: "Our trained install crews handle delivery, assembly, and positioning across any floor area — with zero disruption to your business operations.",
    features: ["Pan-India install network", "Weekend installations", "Zero-damage guarantee", "Same-day completion"],
  },
  {
    icon: "🔄",
    title: "After-Sales & Warranty",
    desc: "Every product ships with a manufacturer warranty backed by our in-house service team. We offer scheduled maintenance contracts for large installations.",
    features: ["3-year product warranty", "On-site service visits", "Spare parts stocking", "Annual maintenance contracts"],
  },
  {
    icon: "🏢",
    title: "Complete Turnkey Fitouts",
    desc: "From bare concrete to move-in ready — we manage civil work coordination, furniture, lighting fixtures, and AV integration for your full office fitout project.",
    features: ["Project management", "Civil coordination", "AV & tech integration", "Handover documentation"],
  },
  {
    icon: "♻️",
    title: "Refurbishment & Trade-in",
    desc: "Upgrading your fleet? We assess your existing furniture, offer fair trade-in valuations, and responsibly recycle or refurbish old pieces — minimizing landfill waste.",
    features: ["Free site assessment", "Fair trade-in pricing", "Eco-responsible disposal", "Phased upgrade planning"],
  },
];

export default function Services() {
  const router = useRouter();

  return (
    <div style={{ background: "#ffffff" }}>
      {/* Header */}
      <div style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", padding: "64px 24px 56px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 640 }}>
          <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-3" style={{ color: "#00A7C4" }}>What We Do</span>
          <h1 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            End-to-End Workspace Services
          </h1>
          <p className="mt-4 text-base" style={{ color: "#64748B", lineHeight: "28px" }}>
            From first consultation to long-term support — we handle every stage of your workspace transformation.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "72px 24px 80px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl transition-all duration-200"
              style={{ border: "1px solid #E2E8F0", padding: "32px", background: "#ffffff" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 28px -6px rgba(0,167,196,0.12)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div className="flex items-center justify-center rounded-2xl mb-5 text-2xl" style={{ width: 56, height: 56, background: "#E6F7FA" }}>
                {s.icon}
              </div>
              <h3 className="font-bold mb-3" style={{ fontSize: 18, color: "#0F172A" }}>{s.title}</h3>
              <p className="text-sm mb-5" style={{ color: "#64748B", lineHeight: "24px" }}>{s.desc}</p>
              <ul className="flex flex-col gap-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#334155" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A7C4", flexShrink: 0, display: "block" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process strip */}
      <div style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "64px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="text-center mb-12">
            <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2" style={{ color: "#00A7C4" }}>How It Works</span>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(22px, 2.5vw, 34px)", color: "#0F172A", letterSpacing: "-0.03em" }}>
              Our Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-0 relative">
            {[
              { step: "01", label: "Consultation", desc: "We understand your space, budget, and requirements." },
              { step: "02", label: "Design", desc: "Our team creates a bespoke floor plan and product selection." },
              { step: "03", label: "Supply", desc: "Products are manufactured, quality-checked, and dispatched." },
              { step: "04", label: "Install & Hand Over", desc: "Our crew installs and you walk into a ready workspace." },
            ].map((p, i) => (
              <div key={p.step} className="flex flex-col items-center text-center gap-3 px-6" style={{ position: "relative" }}>
                {i < 3 && (
                  <div className="hidden sm:block absolute right-0 top-6" style={{ width: 1, height: 40, background: "#E2E8F0" }} />
                )}
                <span className="font-extrabold text-2xl" style={{ color: "#00A7C4" }}>{p.step}</span>
                <span className="font-bold text-sm" style={{ color: "#0F172A" }}>{p.label}</span>
                <span className="text-xs" style={{ color: "#64748B", lineHeight: "20px" }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#111827", padding: "64px 24px" }}>
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6" style={{ maxWidth: 1280 }}>
          <div>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.03em" }}>
              Need a service for your workspace?
            </h2>
            <p style={{ color: "#94A3B8", marginTop: 6, fontSize: 14 }}>Talk to us — no commitment, free assessment.</p>
          </div>
          <button
            onClick={() => router.push("/quote")}
            className="font-bold text-sm rounded-lg transition-all flex-shrink-0"
            style={{ background: "#00A7C4", color: "#ffffff", border: "none", height: 48, padding: "0 28px", cursor: "pointer" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#008CA6")}
            onMouseLeave={e => (e.currentTarget.style.background = "#00A7C4")}
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </div>
  );
}