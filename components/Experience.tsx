"use client";

export default function Experience() {
  const stats = [
    { label: "Years Experience", value: 18 },
    { label: "Projects Delivered", value: 420 },
    { label: "Happy Clients", value: 96 },
  ];

  return (
    <section className="mx-auto mt-10 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
          <div className="text-4xl font-extrabold text-[var(--color-text)]">{s.value}</div>
          <div className="mt-2 text-sm text-[var(--color-text-muted)]">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
