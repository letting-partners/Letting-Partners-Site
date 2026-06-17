import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AREAS, getAreaHref } from "@/lib/areas";
import { AREA_IMAGES, PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Areas We Cover | Letting Partners",
  description:
    "Letting Partners covers Ilford, Redbridge, Stratford, Barking, Walthamstow, Croydon, Hounslow, and Birmingham. Expert property letting and management in each area.",
  keywords: [
    "letting agents Ilford Redbridge Stratford",
    "property management East London",
    "letting agents Birmingham",
    "London rental areas",
  ],
};

export default function AreasPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.areas} alt="Our coverage areas" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Where We Operate</span>
          <h1 className="lp-page-hero-title">Our Coverage Areas</h1>
          <p className="lp-page-hero-text">Expert property letting and management across key London neighbourhoods and Birmingham.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">London & Birmingham</span>
            <h2 className="lp-h2">Explore Our Areas</h2>
            <p className="lp-section-subtitle">Select an area to learn about the local rental market, available properties, and our services.</p>
          </div>

          <div className="lp-areas-grid lp-areas-grid--full" data-lp-animate>
            {AREAS.map((area) => (
              <Link key={area.slug} href={getAreaHref(area.slug)} className="lp-area-card">
                <div className="lp-area-card-img">
                  <Image
                    src={AREA_IMAGES[area.slug] ?? area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="lp-area-card-overlay" />
                </div>
                <div className="lp-area-card-content">
                  <span className="lp-area-card-label">{area.coverageLabel}</span>
                  <h3 className="lp-area-card-title">{area.title}</h3>
                  <p className="lp-area-card-desc">{area.description}</p>
                  <span className="lp-area-card-link">
                    Explore Area <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Don&apos;t see your area?</h2>
            <p className="lp-cta-centered-text">We may still be able to help. Contact our team to discuss your requirements.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
