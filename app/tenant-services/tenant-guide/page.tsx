import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tenant Guide | Letting Partners",
  description:
    "The Letting Partners tenant guide — everything you need to know about ASTs, referencing, deposits, and your rights as a tenant in England.",
  keywords: ["tenant guide London", "AST tenancy guide", "renting guide England", "tenant rights UK", "deposit protection UK"],
};

const GUIDE_SECTIONS = [
  {
    icon: "fa-file-signature",
    title: "Assured Shorthold Tenancies (ASTs)",
    content: "Most private tenancies in England are granted as Assured Shorthold Tenancies. An AST gives you the right to occupy the property for the agreed term and protects you from arbitrary eviction during that period. Your landlord must follow a specific process — including serving proper notices — to end the tenancy.",
  },
  {
    icon: "fa-clipboard-check",
    title: "Referencing",
    content: "Before your tenancy is confirmed, your landlord or letting agent will carry out referencing checks. These typically include an employment reference or proof of income, a previous landlord reference, a credit check, and identity verification. We will guide you through exactly what is required.",
  },
  {
    icon: "fa-shield-halved",
    title: "Deposit Protection",
    content: "Your landlord is legally required to protect your deposit in a government-approved tenancy deposit scheme (TDS, DPS, or MyDeposits) within 30 days of receipt. You must receive prescribed information about the scheme. At the end of your tenancy, your deposit must be returned promptly unless there are legitimate deductions.",
  },
  {
    icon: "fa-coins",
    title: "Permitted Payments",
    content: "Under the Tenant Fees Act 2019, landlords and agents can only charge certain permitted payments: the first month's rent, a refundable security deposit (capped at five weeks' rent), a refundable holding deposit (capped at one week's rent), and certain default charges. All other fees are prohibited.",
  },
  {
    icon: "fa-hammer",
    title: "Repairs & Maintenance",
    content: "Your landlord has a legal obligation to keep the property in a good state of repair, including the structure, exterior, heating, hot water, and electrical and gas installations. Report any repairs in writing and keep a record. We co-ordinate maintenance promptly on behalf of landlords.",
  },
  {
    icon: "fa-door-open",
    title: "Ending Your Tenancy",
    content: "To end a periodic tenancy (one that has moved past the fixed term), you must give your landlord proper written notice — usually one rental period. During the fixed term, ending the tenancy early may require agreement with your landlord or could result in a liability for rent until a replacement tenant is found.",
  },
];

export default function TenantGuidePage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.tenantGuide} alt="Tenant guide" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Tenants</span>
          <h1 className="lp-page-hero-title">The Letting Partners Tenant Guide</h1>
          <p className="lp-page-hero-text">Everything you need to know about renting — from ASTs and deposits to your rights and responsibilities.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Key Topics</span>
            <h2 className="lp-h2">Your Complete Renting Guide</h2>
            <p className="lp-section-subtitle">A plain-English guide to renting in England — updated to reflect current legislation.</p>
          </div>

          <div className="lp-feature-cards" data-lp-animate>
            {GUIDE_SECTIONS.map((s) => (
              <div key={s.title} className="lp-feature-card">
                <div className="lp-feature-card-icon">
                  <i className={`fa-solid ${s.icon}`} aria-hidden="true" />
                </div>
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
            <h2 className="lp-cta-centered-title">Ready to find your next home?</h2>
            <p className="lp-cta-centered-text">Register your requirements and our team will do the searching for you.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--gold lp-btn--lg">Register as a Tenant</Link>
              <Link href="/properties" className="lp-btn lp-btn--outline-light lp-btn--lg">Browse Properties</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
