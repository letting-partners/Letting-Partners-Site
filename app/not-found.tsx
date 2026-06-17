import Link from "next/link";

export default function NotFound() {
  return (
    <section className="lp-section" style={{ paddingTop: "140px", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="lp-container">
        <div className="lp-empty-state">
          <div className="lp-empty-icon" style={{ fontSize: "4rem", color: "var(--lp-gold)" }}>
            <i className="fa-solid fa-house-circle-exclamation" aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem" }}>404</h1>
          <h2>Page not found</h2>
          <p>The page you are looking for does not exist or has been moved.</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="lp-btn lp-btn--gold lp-btn--lg">Go Home</Link>
            <Link href="/contact" className="lp-btn lp-btn--outline lp-btn--lg">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
