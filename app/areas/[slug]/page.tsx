import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AREAS, getAreaBySlug, getAreaHref, getAreaPropertiesHref } from "@/lib/areas";
import { AREA_BANNER_IMAGES } from "@/lib/images";
import AreaFaqAccordion from "@/components/AreaFaqAccordion";
import PropertiesGrid from "@/components/PropertiesGrid";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: area.seoTitle,
    description: area.seoDescription,
    keywords: [
      `property letting ${area.title}`,
      `rental properties ${area.title}`,
      `landlord services ${area.title}`,
      `letting agents ${area.title}`,
    ],
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const bannerImage = AREA_BANNER_IMAGES[slug] ?? area.image;

  return (
    <>
      {/* Hero */}
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={bannerImage} alt={area.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">{area.coverageLabel}</span>
          <h1 className="lp-page-hero-title">Letting Partners in {area.title}</h1>
          <p className="lp-page-hero-text">{area.description}</p>
          <div className="lp-page-hero-actions">
            <Link href={getAreaPropertiesHref(area.slug)} className="lp-btn lp-btn--gold lp-btn--lg">
              View Properties in {area.title}
            </Link>
            <Link href="/contact" className="lp-btn lp-btn--outline-light lp-btn--lg">
              Speak to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lp-stats-bar" aria-label="Area statistics">
        <div className="lp-container">
          <div className="lp-stats-grid">
            {area.stats.map((s) => (
              <div key={s.label} className="lp-stat-item">
                <span className="lp-stat-value">{s.value}</span>
                <span className="lp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">{area.coverageLabel}</span>
              <h2 className="lp-h2">Property Letting in {area.title}</h2>
              <p className="lp-text-lg">{area.overview}</p>
              <p>{area.marketSummary}</p>
              <div className="lp-about-highlights" style={{ marginTop: "1.5rem" }}>
                {area.focusPoints.map((fp) => (
                  <div key={fp} className="lp-about-highlight-item">
                    <i className="fa-solid fa-check-circle" aria-hidden="true" />
                    <span>{fp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-story-image">
              <Image src={area.image} alt={area.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Neighbourhoods */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Where We Work</span>
            <h2 className="lp-h2">Neighbourhoods in {area.title}</h2>
          </div>
          <div className="lp-neighbourhood-tags" data-lp-animate>
            {area.neighbourhoods.map((n) => (
              <span key={n} className="lp-neighbourhood-tag">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights — Tenant & Landlord */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-highlights-split" data-lp-animate>
            <div className="lp-highlights-col">
              <div className="lp-highlights-col-icon">
                <i className="fa-solid fa-key" aria-hidden="true" />
              </div>
              <h3 className="lp-highlights-col-title">For Tenants</h3>
              <ul className="lp-highlights-list">
                {area.tenantHighlights.map((h) => (
                  <li key={h}><i className="fa-solid fa-check" aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--outline lp-btn--sm">
                Register as a Tenant
              </Link>
            </div>
            <div className="lp-highlights-col">
              <div className="lp-highlights-col-icon">
                <i className="fa-solid fa-building-user" aria-hidden="true" />
              </div>
              <h3 className="lp-highlights-col-title">For Landlords</h3>
              <ul className="lp-highlights-list">
                {area.landlordHighlights.map((h) => (
                  <li key={h}><i className="fa-solid fa-check" aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <Link href="/landlord-services" className="lp-btn lp-btn--outline lp-btn--sm">
                Landlord Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Available Now</span>
            <h2 className="lp-h2">Properties in {area.title}</h2>
          </div>
          <PropertiesGrid area={area.slug} limit={6} />
          <div className="lp-section-footer" style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href={getAreaPropertiesHref(area.slug)} className="lp-btn lp-btn--outline">
              View All {area.title} Properties <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-faq-layout">
            <div className="lp-faq-sidebar" data-lp-animate="slide-right">
              <span className="lp-eyebrow">Questions Answered</span>
              <h2 className="lp-h2">FAQs — {area.title}</h2>
              <p>Have more questions? Our team is happy to help.</p>
              <Link href="/contact" className="lp-btn lp-btn--navy" style={{ marginTop: "1.5rem" }}>
                Ask Us Directly
              </Link>
            </div>
            <div data-lp-animate="slide-left">
              <AreaFaqAccordion faqs={area.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready to get started in {area.title}?</h2>
            <p className="lp-cta-centered-text">Whether you are a landlord or tenant, our team is here to guide you.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Get In Touch</Link>
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
