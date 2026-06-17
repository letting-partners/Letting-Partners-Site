import Image from "next/image";
import Link from "next/link";
import type { ServiceGroup } from "@/lib/services";

export default function ServiceLandingPage({ group }: { group: ServiceGroup }) {
  return (
    <>
      {/* Page Hero */}
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image
            src={group.image}
            alt={group.label}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">{group.eyebrow}</span>
          <h1 className="lp-page-hero-title">{group.label}</h1>
          <p className="lp-page-hero-text">{group.description}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-service-overview" data-lp-animate>
            <div className="lp-service-overview-text">
              <h2 className="lp-h2">{group.label}</h2>
              <p className="lp-text-lg">{group.overview}</p>
              <ul className="lp-feature-list">
                {group.highlights.map((h, i) => (
                  <li key={i} className="lp-feature-item">
                    <i className="fa-solid fa-check lp-feature-check" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Links Grid */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What&apos;s included</span>
            <h2 className="lp-h2">Explore {group.label}</h2>
          </div>

          <div className="lp-service-cards-grid" data-lp-animate>
            {group.items.map((item) => (
              <Link key={item.href} href={item.href} className="lp-service-nav-card">
                <div className="lp-service-nav-icon">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </div>
                <div className="lp-service-nav-body">
                  <h3 className="lp-service-nav-title">{item.label}</h3>
                  <p className="lp-service-nav-text">{item.description}</p>
                </div>
                <i className="fa-solid fa-arrow-right lp-service-nav-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-cta-panel" data-lp-animate>
            <div className="lp-cta-panel-content">
              <h2 className="lp-cta-panel-title">Ready to get started?</h2>
              <p className="lp-cta-panel-text">Speak with our team to discuss how we can support you.</p>
              <div className="lp-cta-panel-actions">
                <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">
                  Get In Touch
                </Link>
                <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg">
                  <i className="fa-solid fa-phone" aria-hidden="true" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
