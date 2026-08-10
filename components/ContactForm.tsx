"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setStatus("success");
      setMessage("Thank you! We'll contact you shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to send your request. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-base)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.06)]"
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-neutral)]">
          Request a consultation
        </p>
        <h2 className="text-3xl font-semibold text-[var(--color-secondary)]">
          Start your workspace transformation
        </h2>
        <p className="text-sm leading-6 text-[var(--color-neutral)]">
          Share the details of your requirement and we’ll follow up with a tailored proposal.
        </p>
      </div>

      {message ? (
        <div
          className={`rounded-3xl border px-4 py-4 text-sm ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
          aria-live="polite"
        >
          {message}
        </div>
      ) : null}

      {[
        { id: "name", label: "Full name", type: "text", required: true },
        { id: "email", label: "Email address", type: "email", required: true },
        { id: "phone", label: "Phone number", type: "tel", required: false },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-[var(--color-secondary)]">
            {field.label}
          </label>

          <input
            id={field.id}
            name={field.id}
            type={field.type}
            required={field.required}
            className="w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-light-base)] px-4 py-3 text-[var(--color-secondary)] outline-none transition duration-200 focus:border-[var(--color-primary)] focus:ring-[rgba(7,137,209,0.18)]"
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-secondary)]">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-light-base)] px-4 py-3 text-[var(--color-secondary)] outline-none transition duration-200 focus:border-[var(--color-primary)] focus:ring-[rgba(7,137,209,0.18)]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-secondary)] px-5 py-3 text-sm font-semibold text-[var(--color-base)] transition hover:bg-[var(--color-dark-base)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending request..." : "Send request"}
      </button>
    </form>
  );
}
