import { expect, test } from "@playwright/test";
import { PRODUCTS } from "../../app/products/catalogue";
import { MARKETING_ROUTES, brokenImages, isProject, trackErrors } from "./helpers";

for (const route of MARKETING_ROUTES) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page).toHaveTitle(/NWS|Node Workspace Solutions/);
    await expect(page.getByRole("link", { name: "Node Workspace Solutions home" }).first()).toBeVisible();
    expect(await page.locator("header img, footer img").count(), "logo artwork must stay removed").toBe(0);
    expect(await brokenImages(page)).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "horizontal page overflow (px)").toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("every product page renders with its model, enquiry and call links", async ({ page }, testInfo) => {
  test.skip(!isProject(testInfo, "chromium"), "Full product sweep runs once, in Chromium");
  test.setTimeout(120_000);
  for (const product of PRODUCTS) {
    const response = await page.goto(`/products/${product.slug}`);
    expect(response?.status(), product.slug).toBe(200);
    await expect(page.locator("h1")).toHaveText(product.name);
    await expect(page.getByRole("link", { name: /Enquire about this/ })).toHaveAttribute(
      "href",
      `/quote?models=${product.slug}`,
    );
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  }
});

test("unknown products return 404", async ({ page }) => {
  const response = await page.goto("/products/not-a-chair");
  expect(response?.status()).toBe(404);
});
