import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  PRODUCTS,
  categoryName,
  categoryTitle,
  displayPhoto,
  resolveCategory,
} from "@/app/products/catalogue";

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

describe("catalogue data", () => {
  it("has 32 products with unique, URL-safe slugs", () => {
    expect(PRODUCTS).toHaveLength(32);
    const slugs = PRODUCTS.map((product) => product.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("keeps the original training-variant slugs", () => {
    const training = PRODUCTS.filter((product) => product.cat === "Training");
    expect(training.map((product) => product.slug)).toEqual([
      "flip-training-chair-with-pad",
      "flip-training-chair-without-pad",
    ]);
  });

  it("assigns every product to a listed category and every category has products", () => {
    for (const product of PRODUCTS) expect(CATEGORIES).toContain(product.cat);
    for (const category of CATEGORIES.slice(1)) {
      expect(PRODUCTS.some((product) => product.cat === category)).toBe(true);
    }
  });

  it("references original photos and framed display copies that exist on disk", () => {
    for (const product of PRODUCTS) {
      expect(existsSync(publicFile(product.img)), product.img).toBe(true);
      expect(existsSync(publicFile(product.display)), product.display).toBe(true);
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.images.length).toBeLessThanOrEqual(3);
      for (const image of product.images) {
        expect(existsSync(publicFile(image.display)), image.display).toBe(true);
        expect(image.alt).toContain(product.name);
      }
    }
  });

  it("maps originals to the display folder without renaming", () => {
    expect(displayPhoto("/products images/OSLO-MB.jpeg")).toBe("/product-display/OSLO-MB.jpeg");
  });

  it("disambiguates models that share a name using their style", () => {
    const titles = PRODUCTS.map((product) => product.title);
    expect(new Set(titles).size).toBe(titles.length);
    expect(titles).toContain("Flip Training Chair (With Pad)");
    expect(titles).toContain("Flip Training Chair (Without Pad)");
  });

  it("only highlights a catalogue style that adds information", () => {
    const bySlug = Object.fromEntries(PRODUCTS.map((product) => [product.slug, product]));
    expect(bySlug["butterfly-hb"].highlight).toBe("High Back");
    expect(bySlug["805-mesh"].highlight).toBe("Mesh Chair");
    expect(bySlug["804-vc"].highlight).toBeNull(); // "Visitor Chair" repeats the category
    expect(bySlug["metro-sofa"].highlight).toBeNull(); // "Sofa" repeats the category
    expect(bySlug["spencer"].highlight).toBeNull(); // generic "Chair"
    expect(bySlug["flip-training-chair-with-pad"].highlight).toBeNull(); // already in title
  });

  it("does not invent specifications", () => {
    for (const product of PRODUCTS) expect(product.specs).toEqual({});
  });
});

describe("resolveCategory", () => {
  it.each([
    [null, "All"],
    ["", "All"],
    ["task", "Task"],
    ["  Executive  ", "Executive"],
    ["SOFA", "Sofa"],
    ["visitors", "Visitor"],
    ["executive-chairs", "Executive"],
    ["all", "All"],
    ["unknown", "All"],
  ])("resolves %j to %s", (input, expected) => {
    expect(resolveCategory(input)).toBe(expected);
  });
});

describe("category labels", () => {
  it("uses the project's names", () => {
    expect(categoryName("Sofa")).toBe("Lounge & sofas");
    expect(categoryName("Task")).toBe("Task");
    expect(categoryTitle("All")).toBe("All seating");
    expect(categoryTitle("Executive")).toBe("Executive chairs");
    expect(categoryTitle("Sofa")).toBe("Lounge & sofas");
  });
});
