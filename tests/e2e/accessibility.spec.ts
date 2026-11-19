import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { MARKETING_ROUTES, isProject } from "./helpers";

// WCAG 2.2 AA automated rules. Automated scans find a subset of issues; they
// do not replace a manual screen-reader and keyboard review.
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scan(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return violations.map(
    (v) => `${v.id} [${v.impact}] ${v.help} — ${v.nodes.length} node(s): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`,
  );
}

test.beforeEach(async ({}, testInfo) => {
  test.skip(!isProject(testInfo, "chromium", "mobile-chrome"), "Axe runs on one desktop and one mobile layout");
});

for (const route of [...MARKETING_ROUTES, "/products?type=Sofa", "/products/visitor-3-seater-sky-sofa"]) {
  test(`no WCAG 2.2 AA violations on ${route}`, async ({ page }) => {
    // Gallery zoom button: visible "+ Zoom image" is not in its accessible name.
    test.fail(route.startsWith("/products/"), "Known issue K23: label-content-name-mismatch (WCAG 2.5.3)");
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    expect(await scan(page)).toEqual([]);
  });
}

test("no violations with the enquiry draft open", async ({ page }) => {
  await page.goto("/quote?models=oslo-mb");
  await page.getByLabel(/Your name/).fill("Test Visitor");
  await page.getByLabel(/Email address/).fill("visitor@example.test");
  await page.getByLabel(/Tell us about your space/).fill("Ten chairs.");
  await page.getByRole("button", { name: /Review your enquiry/ }).click();
  await expect(page.getByText("Your enquiry is ready to send.")).toBeVisible();
  expect(await scan(page)).toEqual([]);
});

test("no violations with the mobile menu open", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, "Menu button is shown below the lg breakpoint");
  await page.goto("/products");
  await page.getByRole("button", { name: "Open menu" }).tap();
  expect(await scan(page)).toEqual([]);
});
