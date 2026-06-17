import type { Metadata } from "next";
import Image from "next/image";
import { PAGE_BANNER_IMAGES } from "@/lib/images";
import TenantRegistrationForm from "@/components/TenantRegistrationForm";

export const metadata: Metadata = {
  title: "Register as a Tenant | Letting Partners",
  description:
    "Register your property requirements with Letting Partners and we will match you to available rentals across London and Birmingham.",
  keywords: ["register as tenant London", "find rental property London", "tenant registration East London"],
};

export default function RegisterAsTenantPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.registerTenant} alt="Register as a tenant" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Renters</span>
          <h1 className="lp-page-hero-title">Register as a Tenant</h1>
          <p className="lp-page-hero-text">Share your requirements and we will match you to suitable rental properties as they become available.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container lp-contact-page-grid" data-lp-animate>
          <div className="lp-contact-details-col">
            <h2 className="lp-h2">How tenant registration works</h2>
            <p className="lp-text-lg">Registration is free and takes just a few minutes. Once submitted, our team will proactively match your requirements against available properties and contact you directly.</p>
            <ul className="lp-feature-list" style={{ marginTop: "1.5rem" }}>
              {[
                "Free registration with no obligation",
                "Matched against our current and upcoming listings",
                "Early access to properties before public listing",
                "Guided support from application through to move-in",
                "Clear guidance on ASTs, referencing, and deposit protection",
              ].map((h) => (
                <li key={h} className="lp-feature-item">
                  <i className="fa-solid fa-check lp-feature-check" aria-hidden="true" /> {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="lp-contact-form-col">
            <h2 className="lp-h2">Tenant Registration Form</h2>
            <div style={{ marginTop: "1.5rem" }}>
              <TenantRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
