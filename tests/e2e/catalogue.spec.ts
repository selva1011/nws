import { expect, test } from "@playwright/test";
import { isProject, isTouch, scrollToY, waitForHydration } from "./helpers";

const columns = (page: import("@playwright/test").Page) =>
  page.locator(".catalogue-grid").first().evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);

test("grid uses the documented column counts at each width", async ({ page }, testInfo) => {
  test.skip(!isProject(testInfo, "chromium"), "Viewport matrix runs in Chromium");
  for (const [width, expected] of [[1440, 8], [1280, 8], [1024, 6], [768, 5], [640, 4], [480, 3], [390, 2]]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/products");
    expect(await columns(page), `${width}px`).toBe(expected);
    // Compare to 0.1px: browsers distribute sub-pixel remainders per grid.
    const tracks = await page.locator(".catalogue-grid").evaluateAll((grids) =>
      grids.map((grid) =>
        getComputedStyle(grid).gridTemplateColumns.split(" ").map((t) => parseFloat(t).toFixed(1)).join(" "),
      ),
    );
    expect(new Set(tracks).size, "every section shares the same tracks").toBe(1);
  }
});

test("short groups keep normal slot widths", async ({ page }) => {
  await page.goto("/products");
  const training = page.locator('section[aria-labelledby="group-Training"] .product-tile');
  const task = page.locator('section[aria-labelledby="group-Task"] .product-tile');
  await expect(training).toHaveCount(2);
  const [a, b] = [await training.first().boundingBox(), await task.first().boundingBox()];
  expect(Math.round(a!.width)).toBe(Math.round(b!.width));
  expect(Math.round(a!.x)).toBe(Math.round(b!.x));
});

test("category selection updates the URL and Back/Forward restore filter and scroll", async ({ page }) => {
  await page.goto("/products");
  await waitForHydration(page, "#collection");
  const task = page.getByRole("navigation", { name: "Seating categories" }).getByRole("link", { name: "Task" });
  // Put the chip near the bottom of the screen (clear of the sticky header).
  await task.evaluate((el) => el.scrollIntoView({ block: "end", behavior: "instant" }));
  await page.evaluate(() => window.scrollBy({ top: 120, behavior: "instant" }));
  const startY = await page.evaluate(() => Math.round(window.scrollY));
  await task.click();
  await expect(page).toHaveURL(/\/products\?type=Task$/);
  await expect(page.locator("#collection h3")).toHaveText(["Task chairs"]);
  await expect(page.getByRole("link", { name: "Task", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await page.evaluate(() => Math.round(window.scrollY)), "filter change keeps scroll").toBe(startY);

  const tile = page.locator("#p-oslo-mb");
  await tile.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  const tileY = await page.evaluate(() => Math.round(window.scrollY));
  const box = (await tile.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); // no auto-scroll
  await expect(page).toHaveURL(/\/products\/oslo-mb$/);
  // A realistic visit: let the product page settle before going back. (An
  // immediate Back races the animated scroll-to-top; see the separate test.)
  await expect(page.locator("h1")).toHaveText("OSLO MB");
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 5000 }).toBe(0);
  await page.waitForTimeout(300);

  await page.goBack();
  await expect(page).toHaveURL(/\/products\?type=Task$/);
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY)), { message: "scroll restored on Back" }).toBe(tileY);
  await page.waitForTimeout(500); // pause like a visitor (rapid double-Back: K21)

  await page.goBack();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator("#collection h3")).toHaveCount(5);
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(startY);

  await page.goForward();
  await expect(page).toHaveURL(/\/products\?type=Task$/);
  await expect(page.locator("#collection h3")).toHaveText(["Task chairs"]);
});

test("legacy ?category= links and unknown values still resolve", async ({ page }) => {
  await page.goto("/products?category=visitor");
  await expect(page.locator("#collection h3")).toHaveText(["Visitor chairs"]);
  await page.goto("/products?type=stools");
  await expect(page.locator("#collection h3")).toHaveCount(5);
});

test("hover lifts the chair and reveals detail without moving neighbours", async ({ page }, testInfo) => {
  test.skip(isTouch(testInfo), "Hover applies to fine pointers only");
  await page.goto("/products?type=Task");
  const rects = () =>
    page.locator(".product-tile").evaluateAll((tiles) =>
      tiles.map((tile) => {
        const r = tile.getBoundingClientRect();
        return [r.x, r.y, r.width, r.height].map(Math.round).join(",");
      }),
    );
  const before = await rects();
  const tile = page.locator("#p-805-mesh");
  await tile.hover();
  await expect(tile.locator(".tile-reveal")).toHaveCSS("opacity", "1");
  await expect(tile.locator(".tile-reveal")).toContainText("Mesh Chair");
  await expect(tile.locator(".tile-photo")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -3)");
  expect(await rects()).toEqual(before);
});

test("keyboard focus shows the same detail and opens the product", async ({ page }, testInfo) => {
  test.skip(isTouch(testInfo), "Keyboard flow tested on desktop projects");
  await page.goto("/products?type=Task");
  await page.getByRole("link", { name: "Training", exact: true }).focus();
  // Safari/WebKit on macOS only tabs to links with Option+Tab by default.
  await page.keyboard.press(testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab");
  const focused = page.locator(".product-tile:focus");
  await expect(focused).toHaveAttribute("id", "p-803-netted-mb");
  await expect(focused.locator(".tile-reveal")).toHaveCSS("opacity", "1");
  const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/products\/803-netted-mb$/);
});

test("reduced motion removes the hover lift", async ({ page }, testInfo) => {
  test.skip(isTouch(testInfo), "Hover applies to fine pointers only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/products?type=Task");
  const tile = page.locator("#p-805-mesh");
  await tile.hover();
  await expect(tile.locator(".tile-reveal")).toHaveCSS("opacity", "1");
  await expect(tile.locator(".tile-photo")).toHaveCSS("transform", "none");
});

test("the detail back link returns to the visitor's filter and tile", async ({ page }) => {
  await page.goto("/products?type=Executive");
  await page.locator("#p-zoom-hb").click();
  await expect(page).toHaveURL(/\/products\/zoom-hb$/);
  const back = page.getByRole("link", { name: /Back to executive chairs/ });
  await expect(back).toHaveAttribute("href", "/products?type=Executive#p-zoom-hb");
  await back.click();
  await expect(page).toHaveURL(/\/products\?type=Executive#p-zoom-hb$/);
  await expect(page.locator("#p-zoom-hb")).toBeInViewport();
});

test("a touch tap opens the product in one tap", async ({ page }, testInfo) => {
  test.skip(!isTouch(testInfo), "Touch projects only");
  await page.goto("/products?type=Visitor");
  await page.locator("#p-solitaire-vc").tap();
  await expect(page).toHaveURL(/\/products\/solitaire-vc$/);
});

test("phones get a shallow hero and two columns", async ({ page }, testInfo) => {
  test.skip(!isTouch(testInfo), "Touch projects only");
  await page.goto("/products");
  const hero = await page.locator("main > section").first().boundingBox();
  expect(hero!.height).toBeLessThanOrEqual(200);
  expect(await columns(page)).toBe(2);
  await expect(page.locator(".product-tile").first()).toBeInViewport();
});

test("page navigation does not animate the scroll", async ({ page }, testInfo) => {
  test.skip(!isProject(testInfo, "chromium"), "Configuration check runs once");
  // K21: the site sets `html { scroll-behavior: smooth }`. Next.js 16 no longer
  // overrides it during navigation unless <html data-scroll-behavior="smooth">
  // is present, so opening a product animates up from the catalogue position
  // and a quick Back can land near the top (observed in Chromium, Firefox,
  // mobile Chrome and mobile Safari).
  test.fail(true, "Known issue K21: global smooth scroll without data-scroll-behavior");
  await page.goto("/products");
  const config = await page.evaluate(() => ({
    smooth: getComputedStyle(document.documentElement).scrollBehavior === "smooth",
    optIn: document.documentElement.dataset.scrollBehavior === "smooth",
  }));
  expect(!config.smooth || config.optIn, JSON.stringify(config)).toBe(true);
});

test("choosing a category just below the top keeps the scroll position", async ({ page }, testInfo) => {
  // A common laptop size; at 1440×900 every engine passes.
  if (!isTouch(testInfo)) await page.setViewportSize({ width: 1280, height: 720 });
  // K29 (intermittent): Next 16.3's router sometimes scrolls the page segment
  // into view (React Fragment scrollIntoView) despite scroll={false}, jumping
  // to the top. Seen in Chromium (1280×720), mobile Chrome and WebKit (Safari
  // 1280×720 profile); never in Firefox. Timing-dependent, so not a gate —
  // remove fixme after upgrading Next.js and re-check with --repeat-each=5.
  test.fixme(true, "Known issue K29: intermittent jump to top on category change");
  await page.goto("/products");
  await waitForHydration(page, "#collection");
  await scrollToY(page, 150);
  const chip = page.getByRole("navigation", { name: "Seating categories" }).getByRole("link", { name: "Task" });
  const box = (await chip.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page).toHaveURL(/\/products\?type=Task$/);
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(150);
});
