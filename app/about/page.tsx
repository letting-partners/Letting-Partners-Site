import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_IMAGES, PAGE_BANNER_IMAGES, TEAM_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us | Letting Partners",
  description:
    "Learn about Letting Partners — a London-based property letting and management agency serving East London and Birmingham with transparent, professional service.",
  keywords: ["about Letting Partners", "London letting agency", "property management East London"],
};

const TEAM = [
  {
    name: "Mohammed Khan",
    role: "Director & Senior Letting Agent",
    image: TEAM_IMAGES.member1,
    bio: "Over 12 years of London property experience, specialising in East London residential lettings and portfolio management. Mohammed leads client relationships and ensures every landlord receives a hands-on, results-driven service.",
  },
  {
    name: "Priya Sharma",
    role: "Tenant Services Manager",
    image: TEAM_IMAGES.member2,
    bio: "Priya manages tenant registration, referencing, and the move-in process — dedicated to making the tenant journey straightforward from first enquiry to key handover.",
  },
  {
    name: "James Okafor",
    role: "Landlord Relations Manager",
    image: TEAM_IMAGES.member3,
    bio: "James specialises in property management and regulatory compliance, helping landlords build sustainable portfolios across East London and Birmingham.",
  },
];

const VALUES = [
  { icon: "fa-eye", title: "Transparency", text: "We explain fees, processes, and timescales clearly. No hidden charges, no confusing terminology." },
  { icon: "fa-shield-halved", title: "Compliance", text: "We keep up to date with UK lettings legislation so landlords remain protected and tenants are treated fairly." },
  { icon: "fa-bolt", title: "Responsiveness", text: "Enquiries and maintenance requests are handled promptly. We do not leave clients waiting or chasing." },
  { icon: "fa-users", title: "Local Knowledge", text: "Our team works across East London and Birmingham daily — we know the areas, the market, and the communities." },
];

export default function AboutPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.about} alt="About Letting Partners" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">About Us</span>
          <h1 className="lp-page-hero-title">London letting expertise,<br />delivered honestly.</h1>
          <p className="lp-page-hero-text">A specialist residential letting and property management agency serving East London and Birmingham.</p>
        </div>
      </section>

      {/* Story */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Our Story</span>
              <h2 className="lp-h2">Built around better letting.</h2>
              <p className="lp-text-lg">
                Letting Partners was established to address a simple gap in the London lettings market: landlords and tenants deserved a specialist agency that communicated clearly, acted promptly, and delivered what it promised.
              </p>
              <p>
                We began in East London — one of the most active and diverse rental markets in the country — and expanded to Birmingham as demand from landlords and tenants grew. Today, we support clients across Ilford, Redbridge, Stratford, Barking, Walthamstow, Croydon, Hounslow, and Birmingham.
              </p>
              <p>
                Our focus has remained consistent: specialist letting and management, delivered by a team that knows the local market and treats every client as an individual.
              </p>
            </div>
            <div className="lp-story-image">
              <Image src={ABOUT_IMAGES.homeAbout} alt="Letting Partners office" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What Drives Us</span>
            <h2 className="lp-h2">Our Values</h2>
          </div>
          <div className="lp-feature-cards" data-lp-animate>
            {VALUES.map((v) => (
              <div key={v.title} className="lp-feature-card">
                <div className="lp-feature-card-icon">
                  <i className={`fa-solid ${v.icon}`} aria-hidden="true" />
                </div>
                <h3 className="lp-feature-card-title">{v.title}</h3>
                <p className="lp-feature-card-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="lp-section lp-team">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">The People</span>
            <h2 className="lp-h2">Meet the Team</h2>
          </div>
          <div className="lp-team-grid" data-lp-animate>
            {TEAM.map((m) => (
              <div key={m.name} className="lp-team-card">
                <div className="lp-team-card-img">
                  <Image src={m.image} alt={m.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="lp-team-card-body">
                  <h3 className="lp-team-card-name">{m.name}</h3>
                  <p className="lp-team-card-role">{m.role}</p>
                  <p className="lp-team-card-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section lp-section--navy">
        <div className="lp-container">
          <div className="lp-cta-centered" data-lp-animate>
            <h2 className="lp-cta-centered-title">Ready to work with us?</h2>
            <p className="lp-cta-centered-text">Speak with our team about your letting or tenant requirements.</p>
            <div className="lp-cta-centered-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg">Get In Touch</Link>
              <a href="tel:07782273674" className="lp-btn lp-btn--outline-light lp-btn--lg">
                <i className="fa-solid fa-phone" aria-hidden="true" /> 07782 273674
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
