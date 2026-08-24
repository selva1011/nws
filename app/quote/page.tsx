"use client";
import { useState } from "react";

export default function Quote() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    seats: "", budget: "", timeline: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "70vh", padding: 24 }}>
        <div className="flex flex-col items-center text-center gap-5" style={{ maxWidth: 440 }}>
          <div className="flex items-center justify-center rounded-full text-3xl" style={{ width: 80, height: 80, background: "#E6F7FA" }}>✓</div>
          <img src="/logo.png" alt="NWS" style={{ height: 36, objectFit: "contain" }} />
          <h2 className="font-extrabold" style={{ fontSize: 28, color: "#0F172A", letterSpacing: "-0.03em" }}>
            Quote Request Received!
          </h2>
          <p className="text-sm" style={{ color: "#64748B", lineHeight: "24px" }}>
            Thank you, <strong>{form.name || "there"}</strong>. Our team will review your requirements and get back to you within one business day.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm font-bold rounded-lg"
            style={{ background: "#00A7C4", color: "#ffffff", border: "none", height: 44, padding: "0 24px", cursor: "pointer" }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "64px 24px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: 900 }}>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="block text-[11px] font-extrabold tracking-[0.18em] uppercase mb-2" style={{ color: "#00A7C4" }}>
            Request a Quote
          </span>
          <h1 className="font-extrabold" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#0F172A", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Let&rsquo;s Build Your Workspace
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#64748B", maxWidth: 480, margin: "12px auto 0", lineHeight: "24px" }}>
            Fill in the details below and our team will prepare a custom proposal for you within 24 hours — at no cost.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl" style={{ background: "#ffffff", border: "1px solid #E2E8F0", padding: "48px" }}>
          <form onSubmit={handle} className="flex flex-col gap-6">

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { key: "name", label: "Full Name *", placeholder: "Rajesh Iyer", type: "text", required: true },
                { key: "company", label: "Company Name *", placeholder: "TechCorp India Pvt. Ltd.", type: "text", required: true },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.required}
                    className="w-full text-sm rounded-lg outline-none"
                    style={{ height: 44, padding: "0 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
                  />
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { key: "email", label: "Email Address *", placeholder: "rajesh@techcorp.in", type: "email", required: true },
                { key: "phone", label: "Phone Number *", placeholder: "+91 98765 43210", type: "tel", required: true },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.required}
                    className="w-full text-sm rounded-lg outline-none"
                    style={{ height: 44, padding: "0 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
                  />
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>Number of Seats</label>
                <select
                  value={form.seats}
                  onChange={e => setForm({ ...form, seats: e.target.value })}
                  className="w-full text-sm rounded-lg outline-none"
                  style={{ height: 44, padding: "0 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: form.seats ? "#0F172A" : "#94A3B8" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <option value="">Select range</option>
                  {["1–10", "11–50", "51–100", "101–250", "250+"].map(o => <option key={o} value={o}>{o} seats</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>Budget Range</label>
                <select
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className="w-full text-sm rounded-lg outline-none"
                  style={{ height: 44, padding: "0 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: form.budget ? "#0F172A" : "#94A3B8" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <option value="">Select range</option>
                  {["Under ₹1L", "₹1L – ₹5L", "₹5L – ₹20L", "₹20L – ₹50L", "₹50L+"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>Timeline</label>
                <select
                  value={form.timeline}
                  onChange={e => setForm({ ...form, timeline: e.target.value })}
                  className="w-full text-sm rounded-lg outline-none"
                  style={{ height: 44, padding: "0 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: form.timeline ? "#0F172A" : "#94A3B8" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                  <option value="">Select timeline</option>
                  {["Immediately", "1–3 months", "3–6 months", "6+ months"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>Project Details</label>
              <textarea
                placeholder="Tell us about your workspace — location, type of chairs needed, any specific features (lumbar support, headrest, mesh back), installation requirements..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full text-sm rounded-lg outline-none resize-none"
                style={{ padding: "12px 14px", background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A", lineHeight: "24px" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#00A7C4")}
                onBlur={e => (e.currentTarget.style.borderColor = "#E2E8F0")}
              />
            </div>

            <button
              type="submit"
              className="w-full text-sm font-bold text-white rounded-lg transition-colors"
              style={{ height: 52, background: "#00A7C4", border: "none", cursor: "pointer", fontSize: 15 }}
              onMouseEnter={e => (e.currentTarget.style.background = "#008CA6")}
              onMouseLeave={e => (e.currentTarget.style.background = "#00A7C4")}
            >
              Submit Quote Request
            </button>
          </form>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: "⚡", label: "Response within 24 hrs" },
            { icon: "🔒", label: "100% confidential" },
            { icon: "📞", label: "Free consultation call" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span>{t.icon}</span>
              <span className="text-xs font-medium" style={{ color: "#64748B" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
