export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-base)]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-[var(--color-neutral)]">
        <p>© {new Date().getFullYear()} Workspace Solutions.</p>
        <p className="mt-2">Premium workspace design and operational support for growing teams.</p>
      </div>
    </footer>
  );
}
