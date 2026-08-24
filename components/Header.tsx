"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = ["Company", "Products", "Services"];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="hidden bg-[#111827] text-slate-300 md:block">
        {/* Top bar (if needed later) */}
      </div>
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-6">
          <Link href="/" className="flex items-center" aria-label="NWS home">
            <Image
              src="/logo.png"
              alt="Node Workspace Solutions"
              width={1390}
              height={420}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="nav-link text-sm font-semibold text-slate-700">
                {link}
              </Link>
            ))}
            <Link
              href="/quote"
              className="rounded-lg bg-[#00A7C4] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#008ca6]"
            >
              Get a Quote
            </Link>
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xl transition-transform duration-300" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>

        {/* Mobile dropdown with smooth height animation */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="border-t border-slate-100 bg-white px-5 pb-6 pt-2">
              {links.map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700"
                >
                  {link}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-lg bg-[#00A7C4] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#008ca6]"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
