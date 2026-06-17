"use client";

import { FormEvent, useState } from "react";

const AREAS = [
  "Ilford", "Redbridge", "Stratford", "Barking",
  "Walthamstow", "Croydon", "Hounslow", "Birmingham", "Open to any area",
];

const PROPERTY_TYPES = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms", "HMO / Shared House"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  preferredArea: string;
  propertyType: string;
  maxBudget: string;
  moveDate: string;
  message: string;
};

export default function TenantRegistrationForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    preferredArea: "",
    propertyType: "",
    maxBudget: "",
    moveDate: "",
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
      const res = await fetch("/api/tenant-registration", {
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
        <h3>Registration Received</h3>
        <p>Thank you for registering. We will match your requirements to available properties and be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form className="lp-contact-form" onSubmit={handleSubmit} noValidate>
      <div className="lp-form-row lp-form-row--two">
        <div className="lp-form-group">
          <label htmlFor="tr-name" className="lp-form-label">Full Name *</label>
          <input
            id="tr-name"
            type="text"
            className="lp-form-input"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="lp-form-group">
          <label htmlFor="tr-email" className="lp-form-label">Email Address *</label>
          <input
            id="tr-email"
            type="email"
            className="lp-form-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="lp-form-row lp-form-row--two">
        <div className="lp-form-group">
          <label htmlFor="tr-phone" className="lp-form-label">Phone Number *</label>
          <input
            id="tr-phone"
            type="tel"
            className="lp-form-input"
            placeholder="07700 000000"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="lp-form-group">
          <label htmlFor="tr-area" className="lp-form-label">Preferred Area</label>
          <select
            id="tr-area"
            className="lp-form-input lp-form-select"
            value={form.preferredArea}
            onChange={(e) => update("preferredArea", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select area</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="lp-form-row lp-form-row--two">
        <div className="lp-form-group">
          <label htmlFor="tr-type" className="lp-form-label">Property Type</label>
          <select
            id="tr-type"
            className="lp-form-input lp-form-select"
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="lp-form-group">
          <label htmlFor="tr-budget" className="lp-form-label">Maximum Monthly Budget (£)</label>
          <input
            id="tr-budget"
            type="text"
            className="lp-form-input"
            placeholder="e.g. 1500"
            value={form.maxBudget}
            onChange={(e) => update("maxBudget", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="lp-form-group">
        <label htmlFor="tr-date" className="lp-form-label">Preferred Move-In Date</label>
        <input
          id="tr-date"
          type="date"
          className="lp-form-input"
          value={form.moveDate}
          onChange={(e) => update("moveDate", e.target.value)}
          disabled={status === "loading"}
        />
      </div>

      <div className="lp-form-group">
        <label htmlFor="tr-message" className="lp-form-label">Additional Requirements</label>
        <textarea
          id="tr-message"
          className="lp-form-input lp-form-textarea"
          placeholder="Tell us anything else that would help us find the right property for you…"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
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
          <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> Registering…</>
        ) : (
          <>Register as a Tenant <i className="fa-solid fa-arrow-right" aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
