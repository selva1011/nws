import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <ScrollReveal><div className="flex flex-col justify-between gap-8 border-b border-white/15 py-14 md:flex-row md:items-end md:py-20"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00A7C4]">Your next workspace starts here</p><h2 className="mt-5 text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">A better place<br />to do your best work.</h2></div><a href="tel:+919876543210" className="button-primary self-start md:self-auto">Let’s talk about your space <span aria-hidden="true">↗</span></a></div></ScrollReveal>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div><Link href="/" aria-label="NWS home" className="inline-flex"><Image src="/logo.png" alt="Node Workspace Solutions" width={1390} height={420} className="h-10 w-auto brightness-0 invert" /></Link><p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">Office seating and workspace solutions. Find your fit with NWS, Chennai.</p><span className="mt-6 inline-flex items-center gap-2 text-xs text-slate-300"><span className="h-1.5 w-1.5 rounded-full bg-[#00A7C4]" aria-hidden="true" />Chennai, Tamil Nadu, India</span></div>
          <nav aria-label="Footer collections"><h3 className="text-xs font-bold uppercase tracking-widest">Explore seating</h3><ul className="mt-6 space-y-3 text-sm text-slate-400">{["Executive", "Task", "Visitor", "Sofa", "Training"].map(category => <li key={category}><Link href={`/products?type=${category}`} className="transition-colors duration-150 hover:text-white focus-visible:text-white">{category === "Sofa" ? "Sofas" : `${category} chairs`}</Link></li>)}</ul></nav>
          <nav aria-label="Footer company"><h3 className="text-xs font-bold uppercase tracking-widest">Discover NWS</h3><ul className="mt-6 space-y-3 text-sm text-slate-400">{[["Our company", "/company"], ["Workspace services", "/services"], ["All products", "/products"], ["Contact us", "/contact"]].map(([label, href]) => <li key={href}><Link href={href} className="transition-colors duration-150 hover:text-white focus-visible:text-white">{label}</Link></li>)}</ul></nav>
          <div><h3 className="text-xs font-bold uppercase tracking-widest">Talk to our team</h3><address className="mt-6 space-y-4 not-italic"><a href="tel:+919876543210" className="block text-lg font-medium tracking-tight transition-colors duration-150 hover:text-[#00A7C4] focus-visible:text-[#00A7C4]">+91 98765 43210 ↗</a><a href="mailto:sales@nwsworkspace.com" className="block break-words text-sm text-slate-400 transition-colors duration-150 hover:text-white focus-visible:text-white">sales@nwsworkspace.com</a></address><p className="mt-5 text-xs leading-6 text-slate-400">For product details, seating requirements and workspace enquiries.</p></div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-xs text-slate-400 sm:flex-row"><span>© {new Date().getFullYear()} Node Workspace Solutions.</span><span>Thoughtful spaces. Better work.</span></div>
      </div>
    </footer>
  );
}
