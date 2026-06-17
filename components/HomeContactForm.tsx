"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  enquiry: string;
  message: string;
};

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Property Letting",
  "Property Management",
  "Find a Tenant",
  "Rent to Rent",
  "Tenant Registration",
  "Specialist Legal Support",
  "Other Services",
];

export default function HomeContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="lp-form-success">
        <div className="lp-form-success-icon">
          <i className="fa-solid fa-circle-check" aria-hidden="true" />
        </div>
        <h3>Enquiry Received</h3>
        <p>Thank you for reaching out. A member of our team will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form className="lp-contact-form" onSubmit={handleSubmit} noValidate>
      <div className="lp-form-row lp-form-row--two">
        <div className="lp-form-group">
          <label htmlFor="cf-name" className="lp-form-label">Full Name *</label>
          <input
            id="cf-name"
            type="text"
            className="lp-form-input"
            placeholder="John Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="lp-form-group">
          <label htmlFor="cf-email" className="lp-form-label">Email Address *</label>
          <input
            id="cf-email"
            type="email"
            className="lp-form-input"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="lp-form-row lp-form-row--two">
        <div className="lp-form-group">
          <label htmlFor="cf-phone" className="lp-form-label">Phone Number</label>
          <input
            id="cf-phone"
            type="tel"
            className="lp-form-input"
            placeholder="07700 000000"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div className="lp-form-group">
          <label htmlFor="cf-enquiry" className="lp-form-label">Enquiry Type</label>
          <select
            id="cf-enquiry"
            className="lp-form-input lp-form-select"
            value={form.enquiry}
            onChange={(e) => update("enquiry", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select an option</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="lp-form-group">
        <label htmlFor="cf-message" className="lp-form-label">Your Message *</label>
        <textarea
          id="cf-message"
          className="lp-form-input lp-form-textarea"
          placeholder="Tell us how we can help…"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          required
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && (
        <p className="lp-form-error" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" /> {errorMsg}
        </p>
      )}

      <button type="submit" className="lp-btn lp-btn--gold lp-btn--lg" disabled={status === "loading"}>
        {status === "loading" ? (
          <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
        ) : (
          <>Send Enquiry <i className="fa-solid fa-arrow-right" aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
