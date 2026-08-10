import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          MyBusiness
        </Link>

        <nav className="flex gap-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/services" className="hover:text-blue-600">
            Services
          </Link>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}