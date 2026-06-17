import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Rent to Rent | Letting Partners",
  description:
    "Structured rent-to-rent arrangements with Letting Partners — guaranteed rental income for landlords with professional sublet management across London and Birmingham.",
  keywords: ["rent to rent London", "guaranteed rent London", "rent to rent Ilford", "guaranteed income landlord London"],
};

const HOW_IT_WORKS = [
  { n: "01", title: "Property Assessment", text: "We assess your property, agree a guaranteed rental figure, and set out the arrangement terms clearly in a formal management agreement." },
  { n: "02", title: "Agreement & Set-Up", text: "A formal rent-to-rent agreement is signed and any agreed preparation works are completed before the arrangement commences." },
  { n: "03", title: "We Manage Everything", text: "Letting Partners manages tenant sourcing, occupancy, maintenance, and compliance — you receive your guaranteed income on an agreed date each month." },
  { n: "04", title: "Ongoing Reporting", text: "You receive regular updates on property condition and occupancy. The arrangement can be reviewed at agreed intervals." },
];

export default function RentToRentPage() {
  return (
    <>
      <section className="lp-page-hero">
        <div className="lp-page-hero-img-wrap">
          <Image src={PAGE_BANNER_IMAGES.rentToRent} alt="Rent to rent" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <div className="lp-page-hero-overlay" />
        </div>
        <div className="lp-container lp-page-hero-content">
          <span className="lp-eyebrow lp-eyebrow--light">For Landlords</span>
          <h1 className="lp-page-hero-title">Guaranteed rental income — without the hassle.</h1>
          <p className="lp-page-hero-text">Structured rent-to-rent arrangements offering predictable monthly income with full management.</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-story-grid" data-lp-animate>
            <div className="lp-story-content">
              <span className="lp-eyebrow">Rent to Rent</span>
              <h2 className="lp-h2">Consistent income, professionally managed.</h2>
              <p className="lp-text-lg">Our rent-to-rent model gives landlords a predictable, guaranteed income with zero management involvement. We take responsibility for the property — occupancy, maintenance, tenant relationships — and pay you a fixed amount each month.</p>
              <ul className="lp-feature-list">
                {[
                  "Guaranteed monthly income regardless of occupancy",
                  "No void period risk — income continues while we manage the property",
                  "Full maintenance and tenant management handled by our team",
                  "Formal agreement protecting both parties' interests",
                  "Regular property condition reporting",
                ].map((h) => (
                  <li key={h} className="lp-feature-item"><i className="fa-solid fa-check lp-feature-check" aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--lg" style={{ marginTop: "1.5rem" }}>Discuss Rent to Rent</Link>
            </div>
            <div className="lp-story-image">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="Rent to rent" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-section--light">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate><span className="lp-eyebrow">The Process</span><h2 className="lp-h2">How Rent to Rent Works</h2></div>
          <div className="lp-steps" data-lp-animate>
            {HOW_IT_WORKS.map((s) => (
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
            <h2 className="lp-cta-centered-title">Interested in guaranteed income?</h2>
            <p className="lp-cta-centered-text">Contact our team to discuss your property and whether rent-to-rent is the right arrangement for you.</p>
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
