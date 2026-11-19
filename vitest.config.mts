import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Unit and component tests (jsdom). Async Server Components and full pages
// are covered by the Playwright suite in tests/e2e instead.
export default defineConfig({
  plugins: [react()],
  // Resolves the "@/…" alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/unit/setup.tsx"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "components/**/*.tsx"],
      reporter: ["text-summary", "html"],
    },
  },
});
