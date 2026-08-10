"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) {
      return;
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as unknown as {
        startViewTransition: (callback: () => void) => void;
      }).startViewTransition(() => {
        // The new route content is rendered automatically by Next.js.
      });
    }

    previousPath.current = pathname;
  }, [pathname]);

  return (
    <div
      key={pathname}
      className="transition-fade relative overflow-hidden"
      aria-live="polite"
    >
      {children}
    </div>
  );
}
