"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["Seating", "/products"],
  ["Workspace services", "/services"],
  ["Our story", "/company"],
  ["Contact", "/contact"],
];

// Current page: semibold + deeper-gold underline. Hover: near-black underline.
const current =
  "font-semibold underline decoration-[var(--color-gold)] hover:decoration-[var(--color-gold)]";

export default function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setMenuPath(null);
          trigger.current?.focus();
        }
      }}
    >
      <div className="site-container flex h-[var(--header-height)] items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="Node Workspace Solutions home"
          onClick={() => setMenuPath(null)}
          className="shrink-0 py-2 text-[15px] font-bold tracking-[-0.02em] decoration-2 underline-offset-8 hover:underline sm:text-base"
        >
          Node Workspace Solutions
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={`py-2 text-[13px] decoration-2 underline-offset-8 hover:underline ${pathname.startsWith(href) ? current : "font-medium"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/quote"
          className="button-primary hidden !min-h-10 !py-2 sm:ml-auto sm:inline-flex lg:ml-0"
        >
          Plan your seating <span aria-hidden="true">→</span>
        </Link>
        <button
          ref={trigger}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setMenuPath(open ? null : pathname)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--color-control)] transition-colors hover:border-[var(--color-text)] aria-expanded:border-[var(--color-selected)] aria-expanded:bg-[var(--color-selected)] aria-expanded:text-[var(--color-on-selected)] lg:hidden"
        >
          <span aria-hidden="true" className="text-xl">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="site-container border-t border-[var(--color-border)] py-4 lg:hidden"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuPath(null)}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={`flex items-center justify-between border-b border-[var(--color-border)] py-4 text-lg decoration-2 underline-offset-8 hover:underline ${pathname.startsWith(href) ? current : ""}`}
            >
              {label}
              <span aria-hidden="true" className="text-[var(--color-gold)]">
                →
              </span>
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setMenuPath(null)}
            className="button-primary mt-5 w-full"
          >
            Plan your seating
          </Link>
        </nav>
      )}
    </header>
  );
}
