"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches || !("IntersectionObserver" in window)) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate(
        [{ opacity: 0.72, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      observer.disconnect();
    }, { threshold: 0.08 });
    const stopMotion = () => { if (reducedMotion.matches) { animation?.cancel(); observer.disconnect(); } };
    observer.observe(element);
    reducedMotion.addEventListener("change", stopMotion);
    return () => { observer.disconnect(); animation?.cancel(); reducedMotion.removeEventListener("change", stopMotion); };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
