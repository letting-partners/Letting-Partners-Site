import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Landlord Guide | Letting Partners",
  description:
    "The Letting Partners landlord guide — ASTs, deposit protection, compliance obligations, and what to expect from a letting agent in England.",
  keywords: ["landlord guide UK", "landlord obligations England", "AST guide landlord", "deposit protection landlord UK"],
};

const GUIDE_SECTIONS = [
  { icon: "fa-file-signature", title: "Assured Shorthold Tenancies (ASTs)", content: "The majority of private residential lettings are governed by Assured Shorthold Tenancies. An AST gives your tenant the right to occupy the property for a fixed or periodic term. It must be in writing and should clearly set out rent, term, deposit details, and obligations on both sides." },
  { icon: "fa-shield-halved", title: "Deposit Protection", content: "All deposits taken from assured shorthold tenants must be protected in a government-approved scheme (TDS, DPS, or MyDeposits) within 30 days of receipt. You must provide the tenant with prescribed information about the scheme. Failure to comply carries significant financial penalties." },
  { icon: "fa-screwdriver-wrench", title: "Repair & Maintenance Obligations", content: "Landlords are legally required to maintain the structure, exterior, heating, hot water, and electrical and gas installations in proper working order under the Landlord and Tenant Act 1985. The Homes (Fitness for Human Habitation) Act 2018 adds further obligations around habitability." },
  { icon: "fa-file-certificate", title: "Safety Certificates", content: "You must provide an annual gas safety certificate (CP12), carry out an EICR (Electrical Installation Condition Report) every five years, and ensure the property has working smoke alarms on each floor and carbon monoxide detectors where required. A valid EPC (rated E or above) is required before letting." },
  { icon: "fa-passport", title: "Right to Rent", content: "Before granting a tenancy, landlords and agents must carry out Right to Rent checks to confirm all adult occupants have the legal right to rent residential property in England. Failure to comply carries civil and criminal penalties." },
  { icon: "fa-door-open", title: "Possession & Notices", content: "If you need to regain possession of your property, you must follow the correct legal process. Section 21 (no-fault) and Section 8 (fault-based) notices have specific requirements around timing, service, and form. These rules are subject to ongoing legislative change — our team stays current with all updates." },
];

export default function LandlordGuidePage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.landlordGuide} alt="Landlord guide" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Landlords</span>
          <h1 className="lp-page-hero-title">The Letting Partners Landlord Guide</h1>
          <p className="lp-page-hero-text">Your obligations, your rights, and what to expect — explained clearly and without jargon.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Key Topics</span>
            <h2 className="lp-h2">Landlord Obligations &amp; Best Practice</h2>
            <p className="lp-section-subtitle">A plain-English guide updated to reflect current UK letting legislation.</p>
          </div>
          <div className="lp-feature-cards" data-lp-animate>
            {GUIDE_SECTIONS.map((s) => (
              <div key={s.title} className="lp-feature-card">
                <div className="lp-feature-card-icon"><i className={`fa-solid ${s.icon}`} aria-hidden="true" /></div>
                <h3 className="lp-feature-card-title">{s.title}</h3>
                <p className="lp-feature-card-text">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready to let your property compliantly?</h2>
            <p className="lp-cta-centered-text">Our team manages compliance obligations on your behalf — from safety certificates to deposit protection.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Speak to Our Team</Link>
              <Link href="/landlord-services" className="lp-btn lp-btn--outline-light lp-btn--lg">Landlord Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
