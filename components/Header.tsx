import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="space-y-1 text-slate-950">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
            Workspace Solutions
          </p>
          <p className="text-lg font-semibold tracking-tight">
            NODE WORKSPACE SOLUTIONS
          </p>
        </Link>

        <nav className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/services", "Services"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="transition-colors duration-200 hover:text-slate-950"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}