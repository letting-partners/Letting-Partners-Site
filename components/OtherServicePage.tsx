import Image from "next/image";
import Link from "next/link";
import type { OtherServicePage as OtherServicePageType } from "@/lib/services";

export default function OtherServicePage({ page }: { page: OtherServicePageType }) {
  return (
    <>
      {/* Page Hero */}
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image
            src={page.image}
            alt={page.label}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">{page.panelLabel}</span>
          <h1 className="lp-page-hero-title">{page.heroTitle}</h1>
          <p className="lp-page-hero-text">{page.heroText}</p>
        </div>
      </section>

      {/* Overview + Highlights */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">{page.panelLabel}</span>
              <h2 className="lp-h2">{page.label}</h2>
              <p className="lp-text-lg">{page.overview}</p>
              <ul className="lp-feature-list">
                {page.highlights.map((h, i) => (
                  <li key={i} className="lp-feature-item">
                    <i className="fa-solid fa-check lp-feature-check" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "2rem" }}>
                {page.ctaLabel}
              </Link>
            </div>
            <div className="lp-story-image">
              <Image
                src={page.storyImage}
                alt={page.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What we cover</span>
            <h2 className="lp-h2">Our Support</h2>
          </div>
          <div className="lp-feature-cards" data-lp-animate>
            {page.support.map((s, i) => (
              <div key={i} className="lp-feature-card">
                <h3 className="lp-feature-card-title">{s.title}</h3>
                <p className="lp-feature-card-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">How it works</span>
            <h2 className="lp-h2">The Process</h2>
          </div>
          <div className="lp-steps" data-lp-animate>
            {page.process.map((step, i) => (
              <div key={i} className="lp-step">
                <div className="lp-step-number">{String(i + 1).padStart(2, "0")}</div>
                <div className="lp-step-content">
                  <h3 className="lp-step-title">{step.title}</h3>
                  <p className="lp-step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">{page.ctaLabel}?</h2>
            <p className="lp-cta-centered-text">Speak with our team — no obligation, no pressure.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">
                Get In Touch
              </Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg">
                <i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
