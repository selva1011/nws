import { expect, type Page, type TestInfo } from "@playwright/test";

export const MARKETING_ROUTES = ["/", "/products", "/company", "/services", "/contact", "/about", "/quote"];

/** Collects console errors and uncaught page errors for the lifetime of the page. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

/** Scrolls through the page so lazy images load, then returns any broken ones. */
export async function brokenImages(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForLoadState("networkidle");
  return page.evaluate(() =>
    [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
  );
}

export const isTouch = (testInfo: TestInfo) => !!testInfo.project.use.hasTouch;
export const isProject = (testInfo: TestInfo, ...names: string[]) => names.includes(testInfo.project.name);

/** Waits until React has hydrated the element (client navigation is active). */
export async function waitForHydration(page: Page, selector: string) {
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      return !!el && Object.keys(el).some((key) => key.startsWith("__react"));
    },
    selector,
  );
}

/** Instant scroll (the site uses smooth scrolling). */
export async function scrollToY(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(y);
}
