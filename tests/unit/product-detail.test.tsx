import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import BackToCatalogue from "@/app/products/[slug]/BackToCatalogue";
import ProductGallery from "@/app/products/[slug]/ProductGallery";
import { CATALOGUE_RETURN_KEY } from "@/app/products/catalogue";

describe("BackToCatalogue", () => {
  const link = () => screen.getByRole("link", { name: /Back to/ });

  it("falls back to the product's category on direct visits", () => {
    render(<BackToCatalogue slug="oslo-mb" category="Task" />);
    expect(link()).toHaveAttribute("href", "/products?type=Task#p-oslo-mb");
    expect(link()).toHaveTextContent("Back to task chairs");
  });

  it("returns to the stored All view anchored on this product", () => {
    sessionStorage.setItem(CATALOGUE_RETURN_KEY, JSON.stringify({ href: "/products" }));
    render(<BackToCatalogue slug="oslo-mb" category="Task" />);
    expect(link()).toHaveAttribute("href", "/products#p-oslo-mb");
    expect(link()).toHaveTextContent("Back to all seating");
  });

  it("ignores a stored filter that does not contain this product", () => {
    sessionStorage.setItem(CATALOGUE_RETURN_KEY, JSON.stringify({ href: "/products?type=Sofa" }));
    render(<BackToCatalogue slug="oslo-mb" category="Task" />);
    expect(link()).toHaveAttribute("href", "/products?type=Task#p-oslo-mb");
  });

  it("ignores malformed or foreign stored values", () => {
    sessionStorage.setItem(CATALOGUE_RETURN_KEY, "{not json");
    const { unmount } = render(<BackToCatalogue slug="oslo-mb" category="Task" />);
    expect(link()).toHaveAttribute("href", "/products?type=Task#p-oslo-mb");
    unmount();
    sessionStorage.setItem(CATALOGUE_RETURN_KEY, JSON.stringify({ href: "https://example.com/" }));
    render(<BackToCatalogue slug="oslo-mb" category="Task" />);
    expect(link()).toHaveAttribute("href", "/products?type=Task#p-oslo-mb");
  });
});

const photo = (n: number) => ({
  src: `/products images/p${n}.jpeg`,
  display: `/product-display/p${n}.jpeg`,
  alt: `Chair, photo ${n}`,
  label: n === 1 ? "main photo" : `photo ${n}`,
});

describe("ProductGallery", () => {
  const status = () => document.getElementById("gallery-status")!.textContent;

  it("shows a single photo without thumbnails or arrows", () => {
    render(<ProductGallery slug="x" name="Chair" images={[photo(1)]} />);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next photo" })).not.toBeInTheDocument();
    expect(status()).toContain("Original catalogue photo");
  });

  it("toggles zoom with an accessible pressed state", async () => {
    render(<ProductGallery slug="x" name="Chair" images={[photo(1)]} />);
    const stage = screen.getByRole("button", { name: /Zoom in on Chair/ });
    await userEvent.click(stage);
    expect(stage).toHaveAttribute("aria-pressed", "true");
    expect(stage).toHaveAccessibleName(/Zoom out of Chair/);
  });

  it("navigates multiple photos with buttons, keys, thumbnails and swipe", async () => {
    const user = userEvent.setup();
    render(<ProductGallery slug="x" name="Chair" images={[photo(1), photo(2), photo(3)]} />);
    await user.click(screen.getByRole("button", { name: "Next photo" }));
    expect(status()).toContain("Photo 2 of 3");
    await user.click(screen.getByRole("button", { name: "Previous photo" }));
    await user.click(screen.getByRole("button", { name: "Previous photo" }));
    expect(status()).toContain("Photo 3 of 3"); // wraps

    const stage = screen.getByRole("button", { name: /Zoom in on Chair/ });
    stage.focus();
    await user.keyboard("{ArrowRight}");
    expect(status()).toContain("Photo 1 of 3");
    await user.keyboard("{End}");
    expect(status()).toContain("Photo 3 of 3");

    const thumbnails = screen.getAllByRole("button", { name: /^Show / });
    expect(thumbnails).toHaveLength(3);
    await user.click(thumbnails[1]);
    expect(thumbnails[1]).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{Home}");
    expect(thumbnails[0]).toHaveFocus();

    fireEvent.pointerDown(stage, { pointerType: "touch", clientX: 300, clientY: 100 });
    fireEvent.pointerUp(stage, { pointerType: "touch", clientX: 100, clientY: 110 });
    expect(status()).toContain("Photo 2 of 3");
    // Mouse drags are not swipes.
    fireEvent.pointerDown(stage, { pointerType: "mouse", clientX: 300, clientY: 100 });
    fireEvent.pointerUp(stage, { pointerType: "mouse", clientX: 100, clientY: 100 });
    expect(status()).toContain("Photo 2 of 3");
  });
});
