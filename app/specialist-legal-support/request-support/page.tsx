import type { Metadata } from "next";
import Image from "next/image";
import { PAGE_BANNER_IMAGES } from "@/lib/images";
import LegalSupportForm from "@/components/LegalSupportForm";

export const metadata: Metadata = {
  title: "Request Legal Support | Letting Partners",
  description:
    "Request specialist legal support from Letting Partners — complete a short form and we will connect you with the right SRA-regulated specialist for your situation.",
  keywords: ["request legal support landlord London", "tenancy legal advice London", "specialist legal support property"],
};

export default function RequestLegalSupportPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.requestSupport} alt="Request legal support" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Legal Support</span>
          <h1 className="lp-page-hero-title">Request Legal Support</h1>
          <p className="lp-page-hero-text">Tell us about your situation and we will connect you with the right specialist promptly.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container lp-contact-page-grid" data-lp-animate>
          <div className="lp-contact-details-col">
            <h2 className="lp-h2">How it works</h2>
            <p className="lp-text-lg">Complete the form with a brief description of your situation. Our team will review your case and connect you with an SRA-regulated legal specialist who can advise on the appropriate next steps.</p>
            <ul className="lp-feature-list" style={{ marginTop: "1.5rem" }}>
              {[
                "Quick, confidential initial review of your situation",
                "Matched to an appropriate SRA-regulated specialist",
                "Letting Partners remains your co-ordinating point of contact",
                "Prompt response — typically within one business day",
              ].map((h) => (
                <li key={h} className="lp-feature-item"><i className="fa-solid fa-check lp-feature-check" aria-hidden="true" /> {h}</li>
              ))}
            </ul>
          </div>
          <div className="lp-contact-form-col">
            <h2 className="lp-h2">Legal Support Request</h2>
            <div style={{ marginTop: "1.5rem" }}>
              <LegalSupportForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
