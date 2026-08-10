export default function Footer() {
  return (
    <footer className="border-t border-gray-200">

      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} My Business.
        All rights reserved.

      </div>

    </footer>
  );
}