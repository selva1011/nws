"use client";

import { FormEvent, useRef, useState } from "react";

export default function ContactForm({
  mode = "contact",
  models = [],
}: {
  mode?: "contact" | "quote";
  models?: string[];
}) {
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState("");
  const [copying, setCopying] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  const subject =
    mode === "quote" ? "NWS seating enquiry" : "NWS workspace enquiry";
  const emailHref = `mailto:sales@nwsworkspace.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      "Hello NWS,",
      "",
      mode === "quote"
        ? "I’d like to discuss seating for my workspace."
        : "I have a workspace enquiry.",
      "",
      `Name: ${String(data.get("name")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      data.get("phone") ? `Phone: ${String(data.get("phone")).trim()}` : "",
      data.get("company")
        ? `Company: ${String(data.get("company")).trim()}`
        : "",
      models.length ? `Models: ${models.join(", ")}` : "",
      data.get("seats") ? `Seating quantity: ${data.get("seats")}` : "",
      data.get("timeline") ? `Timing: ${data.get("timeline")}` : "",
      "",
      "Details:",
      String(data.get("message") || "").trim(),
    ]
      .filter((line, index, all) => line !== "" || all[index - 1] !== "")
      .join("\n");
    setDraft(body);
    setFeedback("");
    requestAnimationFrame(() => result.current?.focus());
  }

  async function copyDraft() {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(draft);
      setFeedback(
        "Enquiry copied. Paste it into an email to sales@nwsworkspace.com.",
      );
    } catch {
      setFeedback(
        "Copy isn’t available in this browser. Select and copy the enquiry text below.",
      );
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-9">
      <form
        onSubmit={prepare}
        className="space-y-6"
        onChange={() => {
          if (draft) {
            setDraft("");
            setFeedback("");
          }
        }}
      >
        <div>
          <h2 className="text-2xl font-medium tracking-tight">
            {mode === "quote"
              ? "Tell us what you have in mind."
              : "What can we help with?"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-neutral)]">
            Complete the details to prepare an email. You’ll review and send it
            using your email app.
          </p>
          <p className="mt-3 text-xs text-[var(--color-neutral)]">
            Fields marked * are required.
          </p>
        </div>
        {models.length > 0 && (
          <div className="rounded-lg bg-[var(--color-primary-soft)] p-4">
            <p className="text-xs font-semibold">Your selected seating</p>
            <ul className="mt-2 space-y-1 text-sm">
              {models.map((model) => (
                <li key={model}>{model}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              id: "name",
              label: "Your name",
              type: "text",
              required: true,
              autoComplete: "name",
            },
            {
              id: "email",
              label: "Email address",
              type: "email",
              required: true,
              autoComplete: "email",
            },
            {
              id: "phone",
              label: "Phone number",
              type: "tel",
              required: false,
              autoComplete: "tel",
            },
            {
              id: "company",
              label: "Company / organisation",
              type: "text",
              required: false,
              autoComplete: "organization",
            },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="field-label">
                {field.label}
                {field.required ? " *" : ""}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                required={field.required}
                maxLength={120}
                className="field"
              />
            </div>
          ))}
        </div>
        {mode === "quote" && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="seats" className="field-label">
                How many seats?
              </label>
              <select className="field" id="seats" name="seats" defaultValue="">
                <option value="">Choose a quantity</option>
                {[
                  "1 seat",
                  "2–10 seats",
                  "11–50 seats",
                  "51–100 seats",
                  "100+ seats",
                  "Still planning",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="field-label">
                When are you planning for?
              </label>
              <select
                className="field"
                id="timeline"
                name="timeline"
                defaultValue=""
              >
                <option value="">Choose a timeframe</option>
                {[
                  "As soon as possible",
                  "Within a month",
                  "1–3 months",
                  "Exploring options",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div>
          <label htmlFor="message" className="field-label">
            {mode === "quote" ? "Tell us about your space" : "Your message"} *
          </label>
          <textarea
            className="field min-h-36 resize-y"
            id="message"
            name="message"
            rows={5}
            required
            maxLength={1500}
            placeholder="Your preferred models, workspace needs or questions…"
          />
          <p className="mt-2 text-xs text-[var(--color-neutral)]">
            Up to 1,500 characters. Avoid including sensitive information.
          </p>
        </div>
        <button type="submit" className="button-primary w-full">
          Review your enquiry <span aria-hidden="true">↗</span>
        </button>
        <p className="text-xs leading-6 text-[var(--color-neutral)]">
          This step prepares a draft only. Send the email to complete your
          enquiry.
        </p>
      </form>
      {draft && (
        <div
          ref={result}
          tabIndex={-1}
          className="mt-8 border-t border-[var(--color-border)] pt-7"
        >
          <h3 className="text-xl font-medium">
            Your enquiry is ready to send.
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-neutral)]">
            Open the draft in your email app, then send it to
            sales@nwsworkspace.com. If an email app isn’t configured, copy the
            text instead.
          </p>
          <div className="my-5 flex flex-wrap gap-3">
            <a className="button-primary" href={emailHref}>
              Open email draft
            </a>
            <button
              type="button"
              onClick={copyDraft}
              disabled={copying}
              className="button-secondary"
            >
              {copying ? "Copying…" : "Copy enquiry"}
            </button>
          </div>
          <p role="status" aria-live="polite" className="mb-4 text-sm">
            {feedback}
          </p>
          <label htmlFor="enquiry-draft" className="field-label">
            Review or select your enquiry text
          </label>
          <textarea
            id="enquiry-draft"
            readOnly
            value={draft}
            rows={10}
            className="field text-sm leading-6"
          />
        </div>
      )}
    </div>
  );
}
