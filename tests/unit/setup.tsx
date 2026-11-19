import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// The app imports ViewTransition from "react"; Next.js supplies it through its
// bundled React, but the plain react package used by Vitest does not export
// it. Render children unchanged so components can be tested in isolation.
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    ViewTransition: ({ children }: { children?: React.ReactNode }) => children,
  };
});

afterEach(() => {
  cleanup();
  globalThis.sessionStorage?.clear(); // absent in node-environment tests
});
