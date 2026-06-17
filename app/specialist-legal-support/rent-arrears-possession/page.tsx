import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Rent Arrears & Possession | Specialist Legal Support | Letting Partners",
  description:
    "Rent arrears recovery and possession proceedings for London landlords — SRA-regulated specialists with Letting Partners co-ordinating your case.",
  keywords: ["rent arrears recovery London", "possession proceedings landlord London", "eviction solicitor London"],
};

const STEPS = [
  { n: "01", title: "Initial Assessment", text: "We review the tenancy history, arrears timeline, and any prior notices served to establish the most appropriate course of action." },
  { n: "02", title: "Pre-Court Recovery", text: "Where appropriate, structured arrears recovery is attempted before legal proceedings — formal payment plans, notices, and mediated resolution." },
  { n: "03", title: "Possession Notice", text: "If pre-court recovery is unsuccessful, we assist with the correct Section 8 or Section 21 notice based on your circumstances." },
  { n: "04", title: "Court Proceedings", text: "SRA-regulated solicitors manage the court application, hearing, and any enforcement steps required to regain possession." },
];

export default function RentArrearsPossessionPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.rentArrears} alt="Rent arrears and possession" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Legal Support</span>
          <h1 className="lp-page-hero-title">Rent Arrears &amp; Possession</h1>
          <p className="lp-page-hero-text">Structured recovery strategies and possession proceedings — handled promptly and correctly.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">How We Help</span>
            <h2 className="lp-h2">Arrears Recovery &amp; Possession Process</h2>
          </div>
          <div className="lp-steps" data-lp-animate>
            {STEPS.map((s) => (
              <div key={s.n} className="lp-step">
                <div className="lp-step-number">{s.n}</div>
                <div className="lp-step-content"><h3 className="lp-step-title">{s.title}</h3><p className="lp-step-text">{s.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Dealing with rent arrears?</h2>
            <p className="lp-cta-centered-text">Contact our team promptly — the earlier we act, the more options are available.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/specialist-legal-support/request-support" className="lp-btn lp-btn--gold lp-btn--lg">Request Support</Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg"><i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
