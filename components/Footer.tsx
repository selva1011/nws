import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { label: "Company", href: "/company" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Request a Quote", href: "/quote" },
  ];
  
  const solutions = [
    { label: "Ergonomic Chairs", href: "/products" },
    { label: "Executive Chairs", href: "/products" },
    { label: "Workstations", href: "/products" },
    { label: "Office Interiors", href: "/services" },
    { label: "Corporate Projects", href: "/services" },
  ];

  return (
    <footer className="bg-[#111827] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex">
            <Image src="/logo.png" alt="Node Workspace Solutions" width={1390} height={420} className="h-12 w-auto object-contain brightness-0 invert" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            Ergonomic furniture and workspace solutions designed to improve comfort, productivity and modern workplaces.
          </p>
          <div className="mt-6 flex gap-3 text-sm text-slate-300">
            <span>in</span><span>ig</span><span>f</span><span>▶</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#00A7C4] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold">Contact</h3>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Chennai, Tamil Nadu, India<br />
            sales@nwsworkspace.com<br />
            +91 98765 43210
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>© 2026 Node Workspace Solutions.</span>
          <span>Privacy Policy &nbsp; Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}
