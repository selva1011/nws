// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

// Known issue K22: the legacy endpoint has no schema validation, logs
// personal data and reports success without delivering anything. These
// assertions describe the expected behaviour and are marked `it.fails` until
// the endpoint is fixed or retired.
describe("legacy POST /api/contact", () => {
  it("rejects missing required fields", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const response = await post({ name: "A" });
    expect(response.status).toBe(400);
  });

  it.fails("returns 400 (not 500) for a malformed JSON body", async () => {
    const response = await post("{not json");
    expect(response.status).toBe(400);
  });

  it.fails("rejects an invalid email address", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const response = await post({ name: "A", email: "not-an-email", message: "Hi" });
    expect(response.status).toBe(400);
  });

  it.fails("rejects non-string and oversized values", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const typed = await post({ name: { $ne: 1 }, email: ["x"], message: 42 });
    expect(typed.status).toBe(400);
    const huge = await post({ name: "A", email: "a@example.test", message: "x".repeat(100_000) });
    expect(huge.status).toBe(400);
  });

  it.fails("does not write submitted personal data to the server log", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await post({ name: "Test Visitor", email: "visitor@example.test", message: "Hello" });
    expect(JSON.stringify(log.mock.calls)).not.toContain("visitor@example.test");
  });

  it.fails("does not report success when nothing is delivered or stored", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const response = await post({ name: "Test Visitor", email: "visitor@example.test", message: "Hello" });
    const body = await response.json();
    expect(body.success).not.toBe(true);
  });
});
