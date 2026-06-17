import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES, ABOUT_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Property Management | Letting Partners",
  description:
    "Full property management services from Letting Partners — day-to-day management, maintenance co-ordination, tenancy renewals, and regular reporting.",
  keywords: ["property management London", "property management Ilford", "full management letting agent", "managed letting London"],
};

const SERVICES = [
  { icon: "fa-headset", title: "Tenant Point of Contact", text: "We handle all tenant communication — maintenance reports, queries, and day-to-day issues — so you are not disturbed." },
  { icon: "fa-hammer", title: "Maintenance Co-ordination", text: "Repairs are assessed, vetted contractors are dispatched promptly, and both parties receive progress updates throughout." },
  { icon: "fa-file-invoice-dollar", title: "Rent Collection & Reporting", text: "Monthly rent is collected and transferred to you with a clear statement. Arrears are flagged and managed promptly." },
  { icon: "fa-calendar-check", title: "Tenancy Renewals", text: "We proactively manage lease renewals to avoid unnecessary voids, renegotiating terms at market rates where appropriate." },
  { icon: "fa-clipboard-list", title: "Property Inspections", text: "Periodic inspections are carried out with written reports, giving you a clear picture of your property's condition." },
  { icon: "fa-scale-balanced", title: "Compliance Management", text: "Gas safety, EICR, EPC, and other statutory requirements are tracked and co-ordinated on your behalf." },
];

export default function PropertyManagementPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.propertyManagement} alt="Property management" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Landlords</span>
          <h1 className="lp-page-hero-title">Full property management — from letting to renewal.</h1>
          <p className="lp-page-hero-text">Day-to-day management so your property runs smoothly without your constant involvement.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Full Management</span>
              <h2 className="lp-h2">Your property, professionally managed.</h2>
              <p className="lp-text-lg">Our full management service covers everything from tenant communication and rent collection to maintenance co-ordination and compliance tracking. You remain fully informed at all times without needing to get involved in the day-to-day.</p>
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "1.5rem" }}>Discuss Management Options</Link>
            </div>
            <div className="lp-story-image">
              <Image src={ABOUT_IMAGES.propertyManagementStory} alt="Property management" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate><span className="lp-eyebrow">What&apos;s Included</span><h2 className="lp-h2">Management Services</h2></div>
          <div className="lp-feature-cards" data-lp-animate>
            {SERVICES.map((s) => (
              <div key={s.title} className="lp-feature-card">
                <div className="lp-feature-card-icon"><i className={`fa-solid ${s.icon}`} aria-hidden="true" /></div>
                <h3 className="lp-feature-card-title">{s.title}</h3>
                <p className="lp-feature-card-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready for hands-off management?</h2>
            <p className="lp-cta-centered-text">Contact our team to discuss your property and our management fee structure.</p>
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
