import { expect, test } from "@playwright/test";
import { isTouch } from "./helpers";

test("detail layout: gallery beside the name on desktop, first on phones", async ({ page }, testInfo) => {
  await page.goto("/products/oslo-mb");
  const gallery = (await page.getByRole("button", { name: /Zoom in on OSLO MB/ }).boundingBox())!;
  const title = (await page.locator("h1").boundingBox())!;
  const enquire = (await page.getByRole("link", { name: /Enquire about this chair/ }).boundingBox())!;
  if (isTouch(testInfo)) {
    expect(title.y).toBeGreaterThan(gallery.y + gallery.height - 1);
    expect(enquire.y - (gallery.y + gallery.height)).toBeLessThan(260);
  } else {
    expect(title.x).toBeGreaterThan(gallery.x + gallery.width - 1);
    expect(title.y).toBeLessThan(gallery.y + gallery.height / 2);
  }
});

test("detail page offers verified specs, zoom and call", async ({ page }) => {
  await page.goto("/products/butterfly-hb");
  const rows = page.locator("#specifications tbody th");
  await expect(rows).toHaveText(["Model", "Category", "Catalogue style"]);
  await expect(page.locator("#specifications")).toContainText("not yet listed");
  const stage = page.getByRole("button", { name: /Zoom in on BUTTERFLY HB/ });
  await stage.click();
  await expect(page.getByRole("button", { name: /Zoom out of BUTTERFLY HB/ })).toHaveAttribute("aria-pressed", "true");
  const call = page.getByRole("link", { name: /^Call \+91 98765 43210/ });
  await expect(call).toHaveAttribute("href", "tel:+919876543210");
});

test("enquiry handoff carries the model; invalid slugs are ignored", async ({ page }) => {
  test.fail(true, "Known issue K25: invalid slugs use up the three-model limit");
  await page.goto("/products/805-mesh");
  await page.getByRole("link", { name: /Enquire about this chair/ }).click();
  await expect(page).toHaveURL(/\/quote\?models=805-mesh$/);
  await expect(page.locator("form")).toContainText("805 MESH (Mesh Chair)");
  await page.goto("/quote?models=805-mesh,bogus,oslo-mb,zoom-hb,vento-hb");
  const items = page.locator("form ul li");
  await expect(items).toHaveCount(3);
  await expect(page.locator("form")).not.toContainText("bogus");
});

test("form validation blocks invalid input and shows the error state", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel(/Your name/).fill("Test Visitor");
  await page.getByLabel(/Email address/).fill("not-an-email");
  await page.getByRole("button", { name: /Review your enquiry/ }).click();
  await expect(page.getByText("Your enquiry is ready to send.")).toHaveCount(0);
  const email = page.getByLabel(/Email address/);
  expect(await email.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
  await expect(email).toHaveCSS("border-top-color", "rgb(180, 35, 24)");
  await expect(email).toBeFocused();
});

test("a valid enquiry prepares a draft that is invalidated by edits", async ({ page }) => {
  await page.goto("/quote?models=oslo-mb");
  await page.getByLabel(/Your name/).fill("Test Visitor");
  await page.getByLabel(/Email address/).fill("visitor@example.test");
  await page.getByLabel(/Tell us about your space/).fill("Ten chairs for a new office.");
  await page.getByRole("button", { name: /Review your enquiry/ }).click();
  await expect(page.getByText("Your enquiry is ready to send.")).toBeVisible();
  const draft = page.getByLabel("Review or select your enquiry text");
  await expect(draft).toHaveValue(/Models: OSLO MB \(Medium Back\)/);
  await expect(page.getByRole("link", { name: "Open email draft" })).toHaveAttribute("href", /^mailto:sales@nwsworkspace\.com\?/);
  // Focus moves to the result panel so screen readers announce the next step.
  await expect(page.locator('div[tabindex="-1"]', { hasText: "Your enquiry is ready to send." })).toBeFocused();
  await page.getByLabel("Phone number").fill("1");
  await expect(page.getByText("Your enquiry is ready to send.")).toHaveCount(0);
});

test("mobile menu opens, marks the current page and closes with Escape", async ({ page }, testInfo) => {
  test.skip(!isTouch(testInfo), "Menu button is shown below the lg breakpoint");
  // WebKit does not focus a tapped/clicked button, so the header's keydown
  // handler never receives Escape.
  test.fail(testInfo.project.name === "mobile-safari", "Known issue K24: Escape does not close the menu in Safari");
  await page.goto("/products/oslo-mb");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.tap();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link", { name: /Seating/ })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
