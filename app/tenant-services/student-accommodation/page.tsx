import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES, STUDENT_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Student Accommodation London | Letting Partners",
  description:
    "Student-friendly accommodation across East London — studios, rooms, and shared houses near universities and transport links with Letting Partners.",
  keywords: [
    "student accommodation London",
    "student housing East London",
    "rooms to rent London students",
    "student flats Stratford London",
  ],
};

const FEATURES = [
  { icon: "fa-graduation-cap", title: "Student-Friendly Referencing", text: "We accept guarantors and student-specific referencing, so a lack of credit history or employment record will not automatically exclude you." },
  { icon: "fa-train", title: "Well-Connected Areas", text: "Our student lettings are clustered near key transport hubs — Elizabeth line, Central line, Victoria line — for easy access to universities across London." },
  { icon: "fa-people-group", title: "Shared Houses Available", text: "We list shared houses and HMOs suited to group student lets, with rooms available individually or as a full house booking." },
  { icon: "fa-file-contract", title: "Clear Tenancy Terms", text: "We explain your AST, deposit protection, and house rules clearly before you sign — no unexpected clauses or confusing terminology." },
];

export default function StudentAccommodationPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.studentAccommodation} alt="Student accommodation London" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Students</span>
          <h1 className="lp-page-hero-title">Student Accommodation in London</h1>
          <p className="lp-page-hero-text">Studios, rooms, and shared houses — well connected, fairly priced, and properly managed.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Student Lettings</span>
              <h2 className="lp-h2">Accommodation built for student life.</h2>
              <p className="lp-text-lg">Finding the right place to live as a student in London can be competitive and confusing. Letting Partners works with students who need flexible, fairly priced accommodation in well-connected areas — with a team that understands student-specific requirements.</p>
              <p>Whether you need a studio, a room in a shared house, or a full student let with housemates, we will help you find and secure the right property.</p>
              <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "1.5rem" }}>
                Register Your Requirements
              </Link>
            </div>
            <div className="lp-story-image">
              <Image src={STUDENT_IMAGES.story} alt="Student accommodation" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What We Offer</span>
            <h2 className="lp-h2">Student Letting Features</h2>
          </div>
          <div className="lp-feature-cards" data-lp-animate>
            {FEATURES.map((f) => (
              <div key={f.title} className="lp-feature-card">
                <div className="lp-feature-card-icon">
                  <i className={`fa-solid ${f.icon}`} aria-hidden="true" />
                </div>
                <h3 className="lp-feature-card-title">{f.title}</h3>
                <p className="lp-feature-card-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Looking for student accommodation?</h2>
            <p className="lp-cta-centered-text">Register your requirements and we will match you to suitable properties in your preferred area.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--gold lp-btn--lg">Register Now</Link>
              <Link href="/contact" className="lp-btn lp-btn--outline-light lp-btn--lg">Speak to Our Team</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
