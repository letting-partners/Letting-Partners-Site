import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Disputes & Legal Notices | Specialist Legal Support | Letting Partners",
  description:
    "Section 8 and Section 21 notices, breach of tenancy, and deposit disputes — handled by SRA-regulated legal specialists with Letting Partners co-ordinating the process.",
  keywords: ["Section 8 notice landlord London", "Section 21 notice London", "tenancy dispute solicitor", "deposit dispute London"],
};

const SERVICES = [
  { icon: "fa-file-contract", title: "Section 8 Notices", text: "Served on specific statutory grounds — rent arrears, breach of tenancy terms, or other qualifying reasons. Must be in the prescribed form and served correctly to be valid." },
  { icon: "fa-file-circle-xmark", title: "Section 21 Notices", text: "No-fault possession notices allowing landlords to reclaim a property at the end of an AST. Subject to strict procedural requirements and ongoing legislative change." },
  { icon: "fa-triangle-exclamation", title: "Breach of Tenancy", text: "Where a tenant is in material breach of tenancy terms, we can advise on the appropriate notice and next steps, including formal warnings and remediation." },
  { icon: "fa-coins", title: "Deposit Disputes", text: "Where a deposit deduction is disputed at the end of a tenancy, we can guide landlords and tenants through the scheme's formal adjudication process." },
];

export default function DisputesNoticesPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.disputesNotices} alt="Disputes and legal notices" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Legal Support</span>
          <h1 className="lp-page-hero-title">Disputes &amp; Legal Notices</h1>
          <p className="lp-page-hero-text">Section 8 and 21 notices, breach of tenancy, and deposit disputes — handled correctly and promptly.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What We Cover</span>
            <h2 className="lp-h2">Tenancy Disputes &amp; Notices</h2>
            <p className="lp-section-subtitle">We connect you with SRA-regulated solicitors and remain your co-ordinating point of contact throughout.</p>
          </div>
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
            <h2 className="lp-cta-centered-title">Need legal support?</h2>
            <p className="lp-cta-centered-text">Complete a short form and we will connect you with the right specialist promptly.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/specialist-legal-support/request-support" className="lp-btn lp-btn--gold lp-btn--lg">Request Legal Support</Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg"><i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
