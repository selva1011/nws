"use client";

import Link from "next/link";
import { useState } from "react";

const links = ["Home", "Company", "Products", "Resources", "Projects"];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-50">
      <div className="hidden bg-[#111827] text-slate-300 md:block">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-end gap-6 px-6 text-[11px] font-medium">
          <a href="#warranty">Warranty</a><a href="#faq">FAQs</a><a href="#terms">Terms & Conditions</a><a href="#track">Track Order</a>
        </div>
      </div>
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="NWS home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#00A7C4] text-lg font-black tracking-tighter text-white">N</span>
            <span className="leading-none"><b className="block text-base tracking-[.18em] text-slate-900">NWS</b><small className="mt-1 block text-[9px] font-bold tracking-[.09em] text-slate-500">NODE WORKSPACE SOLUTIONS</small></span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => <a key={link} href={link === "Home" ? "#top" : `#${link.toLowerCase()}`} className="nav-link text-sm font-semibold text-slate-700">{link}{["Products", "Resources"].includes(link) && <span className="ml-1 text-[#00A7C4]">⌄</span>}</a>)}
            <a href="#contact" className="rounded-lg bg-[#00A7C4] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#008ca6]">Get a Quote</a>
          </nav>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-800 lg:hidden" aria-label="Toggle menu"><span className="text-xl">{open ? "×" : "☰"}</span></button>
        </div>
        {open && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">{links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">{link}</a>)}<a href="#contact" className="mt-4 block rounded-lg bg-[#00A7C4] px-4 py-3 text-center text-sm font-bold text-white">Get a Quote</a></nav>}
      </div>
    </header>
  );
}
