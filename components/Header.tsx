"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  ["Seating", "/products"],
  ["Workspace services", "/services"],
  ["Our story", "/company"],
  ["Contact", "/contact"],
];

export default function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#FCFBFC]/95 backdrop-blur-lg"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setMenuPath(null);
          trigger.current?.focus();
        }
      }}
    >
      <div className="site-container flex h-20 items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="NWS home"
          onClick={() => setMenuPath(null)}
          className="shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Node Workspace Solutions"
            width={1390}
            height={420}
            preload
            className="h-auto w-[132px] sm:w-[150px]"
          />
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
              className={`py-3 text-[13px] font-medium underline-offset-8 hover:underline ${pathname.startsWith(href) ? "underline" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/quote" className="button-primary hidden sm:inline-flex">
          Plan your seating <span aria-hidden="true">↗</span>
        </Link>
        <button
          ref={trigger}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setMenuPath(open ? null : pathname)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--color-border)] lg:hidden"
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
          className="site-container border-t border-[var(--color-border)] py-5 lg:hidden"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuPath(null)}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className="flex items-center justify-between border-b border-[var(--color-border)] py-4 text-lg"
            >
              {label}
              <span aria-hidden="true">↗</span>
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
