import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "@/components/ProductCard";
import CatalogueView from "@/app/products/CatalogueView";
import CatalogueBrowser from "@/app/products/CatalogueBrowser";
import { CATALOGUE_RETURN_KEY, PRODUCTS } from "@/app/products/catalogue";

const search = vi.hoisted(() => ({ value: "" }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(search.value),
}));

const product = (slug: string) => PRODUCTS.find((item) => item.slug === slug)!;

describe("ProductCard", () => {
  it("is a single link to the detail page with a reserved reveal line", () => {
    render(<ProductCard product={product("butterfly-hb")} />);
    const link = screen.getByRole("link", { name: /BUTTERFLY HB/ });
    expect(link).toHaveAttribute("href", "/products/butterfly-hb");
    expect(link).toHaveAttribute("id", "p-butterfly-hb");
    expect(link).toHaveTextContent("High Back");
    // Product photo is decorative inside the link (the name labels it).
    const image = link.querySelector("img")!;
    expect(image).toHaveAttribute("alt", "");
    expect(decodeURIComponent(image.getAttribute("src")!)).toContain("/product-display/BUTTERFLY-HB.jpeg");
  });

  it("falls back to 'View details' when no distinguishing attribute is verified", () => {
    render(<ProductCard product={product("metro-sofa")} />);
    expect(screen.getByRole("link")).toHaveTextContent("View details");
  });

  it("hides the decorative arrow from assistive technology", () => {
    render(<ProductCard product={product("805-mesh")} />);
    expect(screen.getByText("→")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("CatalogueView", () => {
  it("groups All under category headings on shared grids", () => {
    render(<CatalogueView active="All" />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Executive chairs",
      "Task chairs",
      "Visitor chairs",
      "Lounge & sofas",
      "Training chairs",
    ]);
    const grids = document.querySelectorAll("ul.catalogue-grid");
    expect([...grids].map((grid) => grid.children.length)).toEqual([6, 15, 6, 3, 2]);
    expect(screen.getByRole("status")).toHaveTextContent("32 models in 5 categories");
  });

  it("marks the current category and links every category to a URL", () => {
    render(<CatalogueView active="Task" />);
    const nav = screen.getByRole("navigation", { name: "Seating categories" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/products",
      "/products?type=Executive",
      "/products?type=Task",
      "/products?type=Visitor",
      "/products?type=Sofa",
      "/products?type=Training",
    ]);
    expect(within(nav).getByRole("link", { name: "Task" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "All" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(screen.getByRole("status")).toHaveTextContent("15 models in task chairs");
  });
});

describe("CatalogueBrowser", () => {
  beforeEach(() => {
    search.value = "";
  });

  it("reads ?type and the legacy ?category alias, with type taking precedence", () => {
    search.value = "category=visitor";
    const { unmount } = render(<CatalogueBrowser />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Visitor chairs");
    unmount();
    search.value = "type=training&category=visitor";
    render(<CatalogueBrowser />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Training chairs");
  });

  it("falls back to All for unknown categories", () => {
    search.value = "type=stools";
    render(<CatalogueBrowser />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("remembers the catalogue position when a product is opened", () => {
    search.value = "type=Task";
    window.history.replaceState(null, "", "/products?type=Task");
    render(<CatalogueBrowser />);
    const tile = screen.getByRole("link", { name: /OSLO MB/ });
    tile.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(tile);
    expect(JSON.parse(sessionStorage.getItem(CATALOGUE_RETURN_KEY)!)).toEqual({
      href: "/products?type=Task",
    });
  });

  it("keeps working when session storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<CatalogueBrowser />);
    const tile = screen.getAllByRole("link", { name: /HB/ })[0];
    tile.addEventListener("click", (event) => event.preventDefault());
    expect(() => fireEvent.click(tile)).not.toThrow();
  });
});
