import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES, LANDLORD_ACTION_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Find a Tenant | Letting Partners",
  description:
    "Let Letting Partners find the right tenant for your property — proactive marketing, pre-registered tenant pool, and thorough referencing across London and Birmingham.",
  keywords: ["find a tenant London", "tenant find service London", "letting agent find tenant East London"],
};

export default function FindATenantPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.findTenant} alt="Find a tenant" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Landlords</span>
          <h1 className="lp-page-hero-title">Find the right tenant, faster.</h1>
          <p className="lp-page-hero-text">Proactive tenant matching with thorough referencing — minimising voids, protecting your income.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Tenant Find Service</span>
              <h2 className="lp-h2">Quality tenants, shorter void periods.</h2>
              <p className="lp-text-lg">Our tenant find service combines targeted property marketing with access to our pre-registered tenant database — giving your property the best chance of being matched to the right applicant quickly.</p>
              <ul className="lp-feature-list">
                {[
                  "Access to hundreds of pre-registered, vetted tenant enquiries",
                  "Multi-portal marketing including Rightmove and Zoopla",
                  "Prompt viewings and follow-up to maintain applicant interest",
                  "Full referencing including credit, income, and previous tenancy checks",
                  "Right to Rent verification carried out as standard",
                ].map((h) => (
                  <li key={h} className="lp-feature-item"><i className="fa-solid fa-check lp-feature-check" aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "1.5rem" }}>Find a Tenant</Link>
            </div>
            <div className="lp-story-image">
              <Image src={LANDLORD_ACTION_IMAGES.findTenant} alt="Find a tenant" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready to find your next tenant?</h2>
            <p className="lp-cta-centered-text">Contact our team to get started — no obligation, no upfront fees.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Get In Touch</Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg"><i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
