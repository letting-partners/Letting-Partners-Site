import type { Metadata } from "next";
import Image from "next/image";
import { PAGE_BANNER_IMAGES } from "@/lib/images";
import HomeContactForm from "@/components/HomeContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Letting Partners",
  description:
    "Get in touch with Letting Partners — call 07782 273674 or email info@lettingpartners.co.uk. Property letting and management enquiries welcome.",
  keywords: ["contact Letting Partners", "letting agents London phone", "property enquiry London"],
};

const CONTACT_DETAILS = [
  { icon: "fa-phone", label: "Phone", value: "07782 273674", href: "tel:07782273674" },
  { icon: "fa-envelope", label: "Email", value: "info@lettingpartners.co.uk", href: "mailto:info@lettingpartners.co.uk" },
  { icon: "fa-location-dot", label: "Coverage", value: "London & Birmingham, UK", href: null },
  { icon: "fa-clock", label: "Hours", value: "Mon–Fri 9am–6pm, Sat 10am–4pm", href: null },
];

export default function ContactPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.contact} alt="Contact Letting Partners" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">Get In Touch</span>
          <h1 className="lp-page-hero-title">We&apos;re here to help.</h1>
          <p className="lp-page-hero-text">Contact our team for any property letting, management, or tenant enquiry.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-contact-page-grid" data-lp-animate>
            {/* Contact Details */}
            <div className="lp-contact-details-col">
              <h2 className="lp-h2">Contact Details</h2>
              <p className="lp-text-lg">Reach us by phone, email, or complete the form and we will respond within one business day.</p>

              <div className="lp-contact-detail-cards">
                {CONTACT_DETAILS.map((d) => (
                  <div key={d.label} className="lp-contact-detail-card">
                    <div className="lp-contact-detail-icon">
                      <i className={`fa-solid ${d.icon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="lp-contact-detail-label">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="lp-contact-detail-value lp-contact-detail-value--link">{d.value}</a>
                      ) : (
                        <p className="lp-contact-detail-value">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lp-contact-areas-note">
                <h3 className="lp-contact-areas-title">Our Coverage Areas</h3>
                <div className="lp-contact-areas-list">
                  {["Ilford", "Redbridge", "Stratford", "Barking", "Walthamstow", "Croydon", "Hounslow", "Birmingham"].map((a) => (
                    <span key={a} className="lp-contact-area-tag">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lp-contact-form-col">
              <h2 className="lp-h2">Send an Enquiry</h2>
              <p>Fill in the form below and a member of our team will be in touch shortly.</p>
              <div style={{ marginTop: "1.5rem" }}>
                <HomeContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
