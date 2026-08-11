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
        <div key={s.label} className="rounded-2xl bg-[var(--color-base)]/6 p-6 text-center">
          <div className="text-4xl font-extrabold text-[var(--color-primary)]">{s.value}</div>
          <div className="mt-2 text-sm text-[var(--color-neutral)]">{s.label}</div>
        </div>
      ))}
    </section>
  );
}
