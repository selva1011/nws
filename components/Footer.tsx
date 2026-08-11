"use client";

import { useEffect, useState } from "react";

const footerLinks = [
  { label: "Studio", href: "/" },
  { label: "Solutions", href: "/services" },
  { label: "Docs", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "X/Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function Footer() {
  const [localTime, setLocalTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLocalTime(formatTime(new Date()));
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(7,137,209,0.18),_transparent_35%)]" />
      <div className="pointer-events-none absolute right-0 top-28 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.12),_transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl ring-1 ring-white/5">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
            <div className="space-y-6">
              <div className="max-w-xl space-y-4">
                <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Interactive footer</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Ready to elevate your workflow?
                </h2>
                <p className="text-sm leading-7 text-zinc-400">
                  Join our waitlist and receive product drops, workspace insights, and early access updates.
                </p>
              </div>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="grid gap-3 sm:grid-cols-[1fr_auto]"
                aria-label="Newsletter sign up"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your work email"
                  className="min-h-[56px] rounded-3xl border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(7,137,209,0.18)]"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[56px] items-center justify-center rounded-3xl bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[rgb(var(--color-primary-rgb)/0.9)] focus:outline-none focus:ring-2 focus:ring-[rgba(7,137,209,0.35)]"
                >
                  Join waitlist
                </button>
              </form>

              <div className="flex flex-wrap gap-3">
                {[
                  "Workspace sync",
                  "Fluid ops",
                  "Launch-ready",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-[var(--color-primary)] hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">System status</p>
                    <p className="mt-2 text-base font-semibold text-white">All Systems Operational</p>
                  </div>
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Sync status is stable with zero incidents in the last 24 hours.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Local time</p>
                <p className="mt-4 text-3xl font-semibold text-white">{localTime}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Live local time updated every minute.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5">
                <span className="text-lg font-semibold">N</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">NODE WORKSPACE SOLUTIONS</p>
                <p className="text-sm text-zinc-500">Crafting premium workspace experiences.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav aria-label="Footer navigation" className="flex flex-wrap gap-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-[var(--color-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[rgba(7,137,209,0.25)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition duration-200 hover:-translate-y-1 hover:bg-[rgba(7,137,209,0.15)] focus:outline-none focus:ring-2 focus:ring-[rgba(7,137,209,0.25)]"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="pointer-events-none absolute -top-9 hidden rounded-full border border-white/10 bg-slate-950/90 px-2 py-1 text-xs text-zinc-300 shadow-lg group-hover:block">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.46 6c-.77.34-1.6.57-2.46.68a4.29 4.29 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.73a4.28 4.28 0 001.33 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.19 4.3 4.3 0 01-1.93.07 4.28 4.28 0 003.99 2.97A8.59 8.59 0 012 19.55a12.11 12.11 0 006.56 1.92c7.88 0 12.19-6.53 12.19-12.19 0-.19 0-.39-.01-.58A8.72 8.72 0 0024 5.5a8.54 8.54 0 01-2.54.7z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48a2.5 2.5 0 005 0c0-1.64-1.34-2.98-2.52-2.98zM3 8.5h3.98v12H3v-12zm5.5 0H12v1.64c.53-.99 1.7-1.64 3.25-1.64 3.47 0 4.12 2.28 4.12 5.24V20.5h-4v-5.43c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.42-2.09 2.88V20.5h-4v-12z" />
    </svg>
  );
}
