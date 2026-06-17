import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES, ABOUT_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Property Letting Services | Letting Partners",
  description:
    "Professional property letting across London and Birmingham — tenant placement, marketing, referencing, and AST preparation. Letting Partners handles it all.",
  keywords: ["property letting London", "letting agent Ilford", "let my property London", "find tenant London"],
};

const PROCESS = [
  { n: "01", title: "Valuation & Preparation", text: "We assess your property, provide a rental valuation based on current market data, and advise on any presentation improvements that will maximise appeal." },
  { n: "02", title: "Professional Marketing", text: "Your property is listed on major portals including Rightmove and Zoopla with professional photography and an accurate, compelling description." },
  { n: "03", title: "Tenant Matching", text: "We draw on our pre-registered tenant database to identify suitable applicants quickly, reducing time to let and protecting your rental income." },
  { n: "04", title: "Referencing & Compliance", text: "All tenants undergo thorough referencing — credit checks, employment verification, and previous landlord references — before an offer is accepted." },
  { n: "05", title: "AST & Move-In", text: "We prepare the Assured Shorthold Tenancy agreement, register the deposit with an approved scheme, and manage the move-in process from start to finish." },
];

export default function PropertyLettingPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.propertyLetting} alt="Property letting" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Landlords</span>
          <h1 className="lp-page-hero-title">Property Letting — done properly.</h1>
          <p className="lp-page-hero-text">Structured, professional letting that protects your income and minimises void periods.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Property Letting</span>
              <h2 className="lp-h2">The right tenant, at the right rent, without the stress.</h2>
              <p className="lp-text-lg">Our letting service covers every stage of the process — from accurate rental valuation and professional marketing to thorough referencing and tenancy completion. We handle the detail so you can focus on your portfolio.</p>
              <ul className="lp-feature-list">
                {["Rental valuation based on current market data", "Listings on Rightmove, Zoopla, and other major portals", "Pre-registered tenant database for faster matching", "Full referencing including credit, employment, and previous landlord checks", "AST preparation and deposit registration handled for you"].map((h) => (
                  <li key={h} className="lp-feature-item"><i className="fa-solid fa-check lp-feature-check" aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "1.5rem" }}>Start Letting Your Property</Link>
            </div>
            <div className="lp-story-image">
              <Image src={ABOUT_IMAGES.landlordStory} alt="Property letting" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">How It Works</span>
            <h2 className="lp-h2">The Letting Process</h2>
          </div>
          <div className="lp-steps" data-lp-animate>
            {PROCESS.map((step) => (
              <div key={step.n} className="lp-step">
                <div className="lp-step-number">{step.n}</div>
                <div className="lp-step-content">
                  <h3 className="lp-step-title">{step.title}</h3>
                  <p className="lp-step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready to let your property?</h2>
            <p className="lp-cta-centered-text">Contact our team for a free rental valuation and to discuss your letting requirements.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Request a Valuation</Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg"><i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
