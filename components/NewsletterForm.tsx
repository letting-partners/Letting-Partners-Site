"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Subscription failed.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lp-newsletter-success">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <span>You&apos;re subscribed. We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form className="lp-newsletter-form" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        className="lp-newsletter-input"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address for newsletter"
        disabled={status === "loading"}
      />
      <button type="submit" className="lp-btn lp-btn--gold" disabled={status === "loading"}>
        {status === "loading" ? (
          <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
        ) : (
          "Subscribe"
        )}
      </button>
      {status === "error" && (
        <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px", width: "100%" }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
