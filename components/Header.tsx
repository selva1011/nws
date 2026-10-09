"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Company", href: "/company" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 transition-all duration-300 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between px-5 lg:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90" aria-label="NWS home">
          <Image
            src="/logo.png"
            alt="Node Workspace Solutions"
            width={1390}
            height={420}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-100/90 text-[#00A7C4] shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (Call + Get a Quote) */}
        <div className="hidden items-center gap-3.5 lg:flex">
          <a
            href="tel:+919876543210"
            aria-label="Call +91 98765 43210"
            className="group flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-[#00A7C4]/40 hover:bg-[#F0FDFE] hover:text-[#00A7C4]"
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#00A7C4]/10 text-[#00A7C4] transition-colors group-hover:bg-[#00A7C4] group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3 animate-phone-ring"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.251.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>+91 98765 43210</span>
          </a>

          <Link
            href="/quote"
            className="rounded-full bg-[#00A7C4] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#00A7C4]/25 transition-all hover:-translate-y-0.5 hover:bg-[#008CA6] hover:shadow-lg hover:shadow-[#00A7C4]/35 active:translate-y-0"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2.5 lg:hidden">
          {/* Animated Phone Call Icon */}
          <a
            href="tel:+919876543210"
            aria-label="Call +91 98765 43210"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-[#00A7C4] text-white shadow-md shadow-[#00A7C4]/30 transition hover:bg-[#008ca6] active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[#00A7C4] animate-pulse-ring" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="relative z-10 h-5 w-5 animate-phone-ring"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.251.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Smooth Morphing Hamburger Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200/90 bg-slate-50/80 text-slate-800 transition-colors hover:bg-slate-100 active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="flex h-4 w-4 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-slate-700 transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-slate-700 transition-all duration-300 ${
                  open ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-slate-700 transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Modern Mobile Dropdown Drawer */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-slate-100 bg-white/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-slate-100 text-[#00A7C4]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-slate-400">→</span>
                </Link>
              );
            })}

            {/* Direct Phone Call Card */}
            <a
              href="tel:+919876543210"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-between rounded-xl border border-[#00A7C4]/30 bg-[#F0FDFE] p-3.5 transition-colors hover:bg-cyan-100/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#00A7C4] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.251.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Call Directly</div>
                  <div className="text-sm font-bold text-slate-900">+91 98765 43210</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00A7C4]">Call Now</span>
            </a>

            {/* Primary Action Button */}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-[#00A7C4] py-3.5 text-center text-sm font-bold text-white shadow-md shadow-[#00A7C4]/20 transition-colors hover:bg-[#008ca6]"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
