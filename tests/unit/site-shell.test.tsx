import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeatFinder from "@/components/SeatFinder";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { PRODUCTS } from "@/app/products/catalogue";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

describe("Header", () => {
  beforeEach(() => {
    route.pathname = "/";
  });

  it("shows the brand as a text link with no logo image", () => {
    render(<Header />);
    const brand = screen.getByRole("link", { name: "Node Workspace Solutions home" });
    expect(brand).toHaveAttribute("href", "/");
    expect(brand).toHaveTextContent("Node Workspace Solutions");
    expect(document.querySelector("header img")).toBeNull();
  });

  it("marks the current section, including nested product routes", () => {
    route.pathname = "/products/oslo-mb";
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(within(nav).getByRole("link", { name: "Seating" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Contact" })).not.toHaveAttribute("aria-current");
  });

  it("opens the mobile menu and closes it with Escape, returning focus", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("navigation", { name: "Mobile navigation" });
    within(menu).getByRole("link", { name: /Contact/ }).focus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});

describe("Footer", () => {
  it("has a text brand link and category links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Node Workspace Solutions home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lounge & sofas" })).toHaveAttribute("href", "/products?type=Sofa");
    expect(document.querySelector("footer img")).toBeNull();
  });
});

describe("SeatFinder", () => {
  it("switches the suggestion and pressed state", async () => {
    const user = userEvent.setup();
    render(<SeatFinder />);
    const welcome = screen.getByRole("button", { name: "A welcome area" });
    await user.click(welcome);
    expect(welcome).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "My desk" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("link", { name: "Explore visitor seating" })).toHaveAttribute("href", "/products?type=Visitor");
  });
});

describe("sitemap and robots", () => {
  it("lists every product detail page", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const product of PRODUCTS) {
      expect(urls).toContain(`https://nwsworkspace.com/products/${product.slug}`);
    }
  });

  // Known issue K26: /about is public and canonical but not in the sitemap.
  it.fails("lists every public, indexable marketing page", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of ["", "/company", "/products", "/services", "/contact", "/quote", "/about"]) {
      expect(urls).toContain(`https://nwsworkspace.com${path}`);
    }
  });

  it("blocks the API and points at the sitemap", () => {
    const rules = robots();
    expect(rules.sitemap).toBe("https://nwsworkspace.com/sitemap.xml");
    expect(JSON.stringify(rules.rules)).toContain("/api/");
  });
});
