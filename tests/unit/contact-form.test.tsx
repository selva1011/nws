import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ContactForm from "@/components/ContactForm";

async function fillRequired(user: ReturnType<typeof userEvent.setup>, overrides: Partial<Record<string, string>> = {}) {
  const values = { name: "Test Visitor", email: "visitor@example.test", message: "Need ten chairs.", ...overrides };
  await user.type(screen.getByLabelText(/Your name/), values.name);
  await user.type(screen.getByLabelText(/Email address/), values.email);
  await user.type(screen.getByLabelText(/Tell us about your space|Your message/), values.message);
}

const draft = () => (screen.getByLabelText("Review or select your enquiry text") as HTMLTextAreaElement).value;

describe("ContactForm", () => {
  it("does not prepare a draft while required fields are invalid", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Email address/), "not-an-email");
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    expect(screen.queryByText("Your enquiry is ready to send.")).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/)).toBeInvalid();
  });

  it("prepares a quote draft with the selected models and a mailto link", async () => {
    const user = userEvent.setup();
    render(<ContactForm mode="quote" models={["OSLO MB (Medium Back)"]} />);
    expect(screen.getByText("OSLO MB (Medium Back)")).toBeInTheDocument();
    await fillRequired(user);
    await user.selectOptions(screen.getByLabelText("How many seats?"), "2–10 seats");
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));

    expect(screen.getByText("Your enquiry is ready to send.")).toBeInTheDocument();
    expect(draft()).toContain("Name: Test Visitor");
    expect(draft()).toContain("Models: OSLO MB (Medium Back)");
    expect(draft()).toContain("Seating quantity: 2–10 seats");
    expect(draft()).not.toContain("Phone:"); // optional and empty
    const mailto = screen.getByRole("link", { name: "Open email draft" }).getAttribute("href")!;
    expect(mailto.startsWith("mailto:sales@nwsworkspace.com?subject=NWS%20seating%20enquiry&body=")).toBe(true);
    expect(decodeURIComponent(mailto.split("body=")[1])).toBe(draft());
  });

  it("invalidates the draft when the details change", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    expect(screen.getByText("Your enquiry is ready to send.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Phone number"), "1");
    expect(screen.queryByText("Your enquiry is ready to send.")).not.toBeInTheDocument();
  });

  it("reports clipboard success and failure without losing the text", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<ContactForm />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    await user.click(screen.getByRole("button", { name: "Copy enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Enquiry copied");
    await user.click(screen.getByRole("button", { name: "Copy enquiry" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Select and copy the enquiry text below");
    expect(draft()).toContain("Name: Test Visitor");
  });

  // Known issue K27: required fields accept whitespace, and optional fields
  // containing only spaces still add an empty line to the email.
  it.fails("rejects a name made only of spaces", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user, { name: "   " });
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    expect(screen.queryByText("Your enquiry is ready to send.")).not.toBeInTheDocument();
  });

  it.fails("omits optional fields that contain only spaces", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.type(screen.getByLabelText("Phone number"), "   ");
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    expect(draft()).not.toMatch(/^Phone:\s*$/m);
  });

  // Known issue K28: 1,500 non-ASCII characters encode to ~9,300 characters.
  it.fails("keeps the mailto link within the length common email clients accept", async () => {
    const user = userEvent.setup();
    render(<ContactForm mode="quote" models={["A", "B", "C"]} />);
    await fillRequired(user, { message: "é".repeat(1500) });
    await user.click(screen.getByRole("button", { name: /Review your enquiry/ }));
    const mailto = screen.getByRole("link", { name: "Open email draft" }).getAttribute("href")!;
    expect(mailto.length).toBeLessThanOrEqual(2000);
  });
});
