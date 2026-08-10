export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/80">
      <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Workspace Solutions.</p>
        <p className="mt-2">Premium workspace design and operational support for growing teams.</p>
      </div>
    </footer>
  );
}
