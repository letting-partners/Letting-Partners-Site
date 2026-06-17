import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";
import PropertiesGrid from "@/components/PropertiesGrid";

export const metadata: Metadata = {
  title: "Rental Properties in London & Birmingham | Letting Partners",
  description:
    "Browse rental properties across Ilford, Redbridge, Stratford, Barking, Walthamstow, Croydon, Hounslow, and Birmingham. Letting Partners — professional tenant matching.",
  keywords: [
    "rental properties London",
    "properties to let Ilford",
    "flats to rent East London",
    "houses to rent Birmingham",
    "letting agents London rentals",
  ],
};

export default function PropertiesPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.properties} alt="Rental properties" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Available to Rent</span>
          <h1 className="lp-page-hero-title">Rental Properties</h1>
          <p className="lp-page-hero-text">Browse our current listings across London and Birmingham.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <PropertiesGrid showSearch />
        </div>
      </section>

      {/* Register CTA */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-cta-panel" data-lp-animate>
            <div className="lp-cta-panel-content">
              <h2 className="lp-cta-panel-title">Can&apos;t find what you&apos;re looking for?</h2>
              <p className="lp-cta-panel-text">Register your requirements and we will alert you when a matching property becomes available.</p>
              <div className="lp-cta-panel-actions">
                <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--gold lp-btn--lg">
                  Register as a Tenant
                </Link>
                <Link href="/contact" className="lp-btn lp-btn--outline lp-btn--lg">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
