"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[var(--color-base)] shadow-sm border-b border-[var(--color-border)] backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Workspace Solutions logo" className="h-10 w-auto object-contain" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-base)] p-2 text-[var(--color-secondary)] shadow-sm transition hover:border-[var(--color-secondary)] hover:bg-[var(--color-light-base)] focus:outline-none focus:ring-2 focus:ring-[rgba(7,137,209,0.25)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <div className={`w-full flex-col gap-4 md:flex md:w-auto md:flex-row md:items-center ${isOpen ? "flex" : "hidden"}`}>
          <nav className="flex w-full flex-col gap-2 rounded-3xl border border-[var(--color-border)] bg-[rgba(244,247,249,0.9)] p-4 shadow-sm md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            <Link href="/" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-light-base)] md:px-3 md:py-2">
              Home
            </Link>
            <Link href="/company" className="rounded-full px-4 py-2 text-sm text-[var(--color-secondary)] transition hover:bg-[var(--color-light-base)] md:px-3 md:py-2">
              Company 
            </Link>
            <Link href="/products" className="rounded-full px-4 py-2 text-sm text-[var(--color-secondary)] transition hover:bg-[var(--color-light-base)] md:px-3 md:py-2">
              Products
            </Link>
            <Link href="/resources" className="rounded-full px-4 py-2 text-sm text-[var(--color-secondary)] transition hover:bg-[var(--color-light-base)] md:px-3 md:py-2">
              Resources
            </Link>
            <Link href="/contact" className="rounded-full px-4 py-2 text-sm text-[var(--color-secondary)] transition hover:bg-[var(--color-light-base)] md:px-3 md:py-2">
              Contact Us
            </Link>
          </nav>

          <div className="flex w-full flex-col gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-base)] p-4 shadow-sm md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none">

            <button className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-base)] shadow-sm transition hover:bg-[rgb(var(--color-primary-rgb)/0.85)] md:ml-3">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
