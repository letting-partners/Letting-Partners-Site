import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AREAS, getAreaHref } from "@/lib/areas";
import {
  ABOUT_IMAGES,
  AREA_IMAGES,
  CTA_IMAGES,
  HERO_IMAGES,
  LEGAL_IMAGES,
  PROCESS_IMAGES,
  WHY_LP_IMAGES,
} from "@/lib/images";
import { COMPREHENSIVE_PROPERTY_SERVICES, SERVICE_GROUPS } from "@/lib/services";
import HomeContactForm from "@/components/HomeContactForm";
import TestimonialsSlider from "@/components/TestimonialsSlider";

export const metadata: Metadata = {
  title: "Letting Partners | London Property Letting, Management & Tenant Services",
  description:
    "Letting Partners — professional property letting, management, and tenant services across London and Birmingham. Transparent, results-driven support for landlords and tenants.",
  keywords: [
    "letting agents London",
    "property letting Ilford",
    "landlord services East London",
    "tenant services London",
    "property management Birmingham",
    "rent to rent London",
    "find a tenant London",
  ],
};

const STATS = [
  { value: "500+", label: "Properties Let" },
  { value: "98%", label: "Landlord Retention" },
  { value: "8", label: "London & Midlands Areas" },
  { value: "24h", label: "Average Tenant Response" },
];

const PARTNER_LOGOS = [
  "OpenRent", "Gumtree", "Spareroom",
];

const PROCESS_STEPS = [
  {
    number: "01",
    icon: "fa-magnifying-glass",
    title: "Discover",
    text: "Browse our current listings, or register your requirements and we will match you to suitable properties across our coverage areas.",
    image: PROCESS_IMAGES.discover,
  },
  {
    number: "02",
    icon: "fa-calendar-check",
    title: "Visit",
    text: "Arrange a viewing at a time that suits you. Our team will accompany you and answer any questions about the property or area.",
    image: PROCESS_IMAGES.visit,
  },
  {
    number: "03",
    icon: "fa-file-signature",
    title: "Apply",
    text: "Complete referencing, sign your AST, and pay your holding deposit. We guide you clearly through every requirement before move-in.",
    image: PROCESS_IMAGES.confirm,
  },
  {
    number: "04",
    icon: "fa-house-circle-check",
    title: "Move In",
    text: "Collect your keys, complete the inventory check-in, and settle into your new home with our team on hand throughout.",
    image: PROCESS_IMAGES.support,
  },
];

const WHY_ITEMS = [
  { icon: "fa-handshake", title: "Transparent by Default", text: "No hidden fees, no vague terms. Every landlord and tenant knows exactly what to expect at each stage." },
  { icon: "fa-shield-halved", title: "Compliant & Up to Date", text: "We stay current with UK legislation — from the Renters Reform Act to deposit protection and EPC requirements." },
  { icon: "fa-bolt", title: "Fast, Reliable Response", text: "Enquiries, maintenance, and tenancy queries are handled promptly. No chasing required." },
  { icon: "fa-users", title: "Local Market Knowledge", text: "Our team works across East London and Birmingham daily, providing genuine insight into each area's rental dynamics." },
  { icon: "fa-chart-line", title: "Results-Driven Letting", text: "Our structured approach to marketing, tenant matching, and management protects your income and reduces void periods." },
  { icon: "fa-headset", title: "Dedicated Support", text: "You have a named point of contact — not a call centre — from first enquiry through to the end of your tenancy." },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Landlord, Ilford",
    text: "Letting Partners let my flat within two weeks and have handled everything since — maintenance, renewals, tenant queries. I barely need to get involved. That is exactly what I wanted.",
    stars: 5,
  },
  {
    name: "David O.",
    role: "Tenant, Stratford",
    text: "The team was upfront about costs and what to expect from the start. No surprises, no endless waiting. My referencing was done quickly and I moved in on the date agreed.",
    stars: 5,
  },
  {
    name: "Aisha P.",
    role: "Landlord, Birmingham",
    text: "I was worried about managing a property from a distance, but their reporting and maintenance co-ordination have been excellent. A professional outfit that delivers what it promises.",
    stars: 5,
  },
  {
    name: "Tom R.",
    role: "Tenant, Croydon",
    text: "Found a great property in Croydon through Letting Partners. The viewings were well organised and the application process was clear from start to finish. Would use again.",
    stars: 5,
  },
];

const FAQS = [
  {
    question: "How long does it take to let a property?",
    answer: "The time varies by property type, area, and asking rent. In active markets like Ilford and Stratford, well-presented properties at the right price can be under offer within one to two weeks. We aim to minimise void periods through proactive marketing and our pre-registered tenant pool.",
  },
  {
    question: "What is a Section 21 notice and when can it be used?",
    answer: "A Section 21 notice is a no-fault possession notice allowing landlords to regain their property at the end of an Assured Shorthold Tenancy (AST) without needing to provide a specific reason. It must be served correctly and with the right amount of notice. Our team can advise on current requirements, as this area of law is subject to ongoing legislative change.",
  },
  {
    question: "What deposit protection scheme do you use?",
    answer: "We protect tenancy deposits with a government-approved scheme in compliance with the Housing Act 2004. Tenants receive confirmation of their deposit registration within 30 days of payment, along with prescribed information about the scheme.",
  },
  {
    question: "Can I let my property if I have a mortgage?",
    answer: "You will typically need consent to let from your mortgage lender before proceeding. Some lenders grant this automatically for buy-to-let products; others require a formal application. We can provide guidance on the process and what to consider before letting.",
  },
  {
    question: "Do you manage HMOs?",
    answer: "Yes. We have experience managing Houses in Multiple Occupation (HMOs) and can advise on licensing requirements, room rental rates, and the additional compliance obligations that apply to HMO landlords in London and Birmingham.",
  },
  {
    question: "How do I register as a tenant with Letting Partners?",
    answer: "Complete our online tenant registration form with your requirements — preferred area, budget, property type, and move-in date. We will match your details to available properties and contact you as soon as a suitable option becomes available.",
  },
];

const LEGAL_PANELS = [
  { icon: "fa-file-contract", title: "Disputes & Legal Notices", text: "Section 8 and Section 21 notices, tenancy breaches, and formal dispute processes handled by SRA-regulated solicitors.", href: "/specialist-legal-support/disputes-notices" },
  { icon: "fa-coins", title: "Rent Arrears & Possession", text: "Structured arrears recovery strategies and possession proceedings, including court representation where required.", href: "/specialist-legal-support/rent-arrears-possession" },
  { icon: "fa-headset", title: "Request Legal Support", text: "Not sure what you need? Complete a short form and we will connect you with the right specialist for your situation.", href: "/specialist-legal-support/request-support" },
];

export default function HomePage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="lp-hero">
        <div className="lp-hero-bg">
          <Image
            src={HERO_IMAGES.home}
            alt="London properties"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="lp-hero-overlay" />
        </div>

        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-content" data-lp-animate="fade">
            <span className="lp-hero-eyebrow">London & Birmingham Property Experts</span>
            <h1 className="lp-hero-title">
              Property letting that<br />
              <span className="lp-hero-title--gold">works for you.</span>
            </h1>
            <p className="lp-hero-text">
              Professional letting, management, and tenant support across East London and Birmingham — transparent, reliable, and built around results.
            </p>
            <div className="lp-hero-actions">
              <Link href="/properties" className="lp-btn lp-btn--gold lp-btn--lg">
                Browse Properties
              </Link>
              <Link href="/landlord-services" className="lp-btn lp-btn--outline-light lp-btn--lg">
                Landlord Services
              </Link>
            </div>
          </div>

          <div className="lp-hero-card" data-lp-animate="scale">
            <div className="lp-hero-card-header">
              <i className="fa-solid fa-magnifying-glass lp-hero-card-icon" aria-hidden="true" />
              <h2 className="lp-hero-card-title">Find a Property</h2>
            </div>
            <div className="lp-hero-card-body">
              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="h-area">Area</label>
                <select id="h-area" className="lp-form-input lp-form-select">
                  <option value="">Any area</option>
                  {AREAS.map((a) => (
                    <option key={a.slug} value={a.slug}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="h-type">Property Type</label>
                <select id="h-type" className="lp-form-input lp-form-select">
                  <option value="">Any type</option>
                  <option>Studio</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrooms</option>
                  <option>4+ Bedrooms</option>
                  <option>HMO / Shared</option>
                </select>
              </div>
              <div className="lp-form-group">
                <label className="lp-form-label" htmlFor="h-budget">Max Budget (£/month)</label>
                <select id="h-budget" className="lp-form-input lp-form-select">
                  <option value="">No maximum</option>
                  <option>£800</option>
                  <option>£1,000</option>
                  <option>£1,250</option>
                  <option>£1,500</option>
                  <option>£2,000</option>
                  <option>£2,500+</option>
                </select>
              </div>
              <Link href="/properties" className="lp-btn lp-btn--gold" style={{ width: "100%", textAlign: "center" }}>
                <i className="fa-solid fa-search" aria-hidden="true" /> Search Properties
              </Link>
              <Link href="/tenant-services/register-as-tenant" className="lp-hero-card-register">
                Register as a tenant for new property alerts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── STATS BAR ───────── */}
      <section className="lp-stats-bar" aria-label="Key statistics">
        <div className="lp-container">
          <div className="lp-stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="lp-stat-item">
                <span className="lp-stat-value">{s.value}</span>
                <span className="lp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PARTNER LOGOS MARQUEE ───────── */}
      <section className="lp-partners" aria-label="Property portals we list on">
        <div className="lp-container">
          <p className="lp-partners-label">Listed on leading UK property portals</p>
        </div>
        <div className="lp-marquee-wrap" aria-hidden="true">
          <div className="lp-marquee">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={i} className="lp-marquee-item">
                <i className="fa-solid fa-circle-dot lp-marquee-dot" />
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section className="lp-section lp-about">
        <div className="lp-container">
          <div className="lp-about-grid">
            <div className="lp-about-image-wrap" data-lp-animate="slide-right">
              <div className="lp-about-img">
                <Image
                  src={ABOUT_IMAGES.homeAbout}
                  alt="Letting Partners team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="lp-about-badge" aria-hidden="true">
                <span className="lp-about-badge-num">10+</span>
                <span className="lp-about-badge-label">Years in London Property</span>
              </div>
            </div>

            <div className="lp-about-content" data-lp-animate="slide-left">
              <span className="lp-eyebrow">About Letting Partners</span>
              <h2 className="lp-h2">London letting expertise, delivered with transparency.</h2>
              <p className="lp-text-lg">
                Letting Partners is a London-based residential letting and property management agency serving East London and Birmingham. We combine local market knowledge with a straightforward, client-first approach that removes uncertainty for both landlords and tenants.
              </p>
              <p>
                Whether you are a landlord seeking reliable tenant placement or a tenant looking for a property that fits your life, our team provides clear guidance, prompt communication, and hands-on support at every stage of the process.
              </p>
              <div className="lp-about-highlights">
                {["Covering 8 key areas across London and Birmingham", "Named point of contact for every landlord and tenant", "Compliant with current UK lettings legislation"].map((h) => (
                  <div key={h} className="lp-about-highlight-item">
                    <i className="fa-solid fa-check-circle" aria-hidden="true" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="lp-about-actions">
                <Link href="/about" className="lp-btn lp-btn--navy">About Our Team</Link>
                <Link href="/contact" className="lp-btn lp-btn--outline">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── LATEST PROPERTIES ───────── */}
      <section className="lp-section lp-section--light" id="properties">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">On the Market</span>
            <h2 className="lp-h2">Latest Properties</h2>
            <p className="lp-section-subtitle">Browse our current rental listings across London and Birmingham.</p>
          </div>

          <div className="lp-properties-placeholder" data-lp-animate>
            <div className="lp-empty-state">
              <i className="fa-solid fa-house lp-empty-icon" aria-hidden="true" />
              <h3>Properties Coming Soon</h3>
              <p>Register as a tenant to be first to hear about new listings in your area.</p>
              <Link href="/tenant-services/register-as-tenant" className="lp-btn lp-btn--gold">
                Register Now
              </Link>
            </div>
          </div>

          <div className="lp-section-footer" data-lp-animate>
            <Link href="/properties" className="lp-btn lp-btn--outline">
              View All Properties <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="lp-section lp-how-it-works">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">The Process</span>
            <h2 className="lp-h2">How It Works</h2>
            <p className="lp-section-subtitle">A clear, straightforward process from search to move-in.</p>
          </div>

          <div className="lp-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.number}
                className="lp-process-card"
                data-lp-animate="fade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="lp-process-card-img">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="lp-process-card-overlay" />
                  <span className="lp-process-num">{step.number}</span>
                </div>
                <div className="lp-process-card-body">
                  <div className="lp-process-icon">
                    <i className={`fa-solid ${step.icon}`} aria-hidden="true" />
                  </div>
                  <h3 className="lp-process-title">{step.title}</h3>
                  <p className="lp-process-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── AREAS ───────── */}
      <section className="lp-section lp-section--light lp-areas">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Where We Operate</span>
            <h2 className="lp-h2">Our Coverage Areas</h2>
            <p className="lp-section-subtitle">Expert letting support across key London neighbourhoods and Birmingham.</p>
          </div>

          <div className="lp-areas-grid" data-lp-animate>
            {AREAS.map((area) => (
              <Link key={area.slug} href={getAreaHref(area.slug)} className="lp-area-card">
                <div className="lp-area-card-img">
                  <Image
                    src={AREA_IMAGES[area.slug] ?? area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="lp-area-card-overlay" />
                </div>
                <div className="lp-area-card-content">
                  <span className="lp-area-card-label">{area.coverageLabel}</span>
                  <h3 className="lp-area-card-title">{area.title}</h3>
                  <p className="lp-area-card-desc">{area.description}</p>
                  <span className="lp-area-card-link">
                    Explore Area <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SERVICES NAV ───────── */}
      <section className="lp-section lp-services-nav">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What We Offer</span>
            <h2 className="lp-h2">Our Services</h2>
          </div>

          <div className="lp-services-nav-grid" data-lp-animate>
            {SERVICE_GROUPS.map((group) => (
              <div key={group.href} className="lp-services-nav-panel">
                <div className="lp-services-nav-panel-img">
                  <Image
                    src={group.image}
                    alt={group.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="lp-services-nav-overlay" />
                </div>
                <div className="lp-services-nav-content">
                  <div className="lp-services-nav-icon">
                    <i className={`fa-solid ${group.icon}`} aria-hidden="true" />
                  </div>
                  <span className="lp-services-nav-eyebrow">{group.eyebrow}</span>
                  <h3 className="lp-services-nav-title">{group.label}</h3>
                  <p className="lp-services-nav-text">{group.description}</p>
                  <ul className="lp-services-nav-items">
                    {group.items.slice(0, 3).map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>
                          <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={group.href} className="lp-btn lp-btn--gold lp-btn--sm">
                    {group.ctaLabel}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── COMPREHENSIVE SERVICES ───────── */}
      <section className="lp-section lp-section--light lp-comp-services">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">Everything Under One Roof</span>
            <h2 className="lp-h2">Comprehensive Property Services</h2>
            <p className="lp-section-subtitle">From initial letting to full management, maintenance co-ordination, and beyond.</p>
          </div>

          <div className="lp-comp-services-grid" data-lp-animate>
            {COMPREHENSIVE_PROPERTY_SERVICES.map((card) => (
              <div key={card.href} className="lp-comp-service-card">
                <div className="lp-comp-service-icon">
                  <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                </div>
                <h3 className="lp-comp-service-title">{card.title}</h3>
                <p className="lp-comp-service-text">{card.text}</p>
                <ul className="lp-comp-service-points">
                  {card.points.map((p, i) => (
                    <li key={i}>
                      <i className="fa-solid fa-check" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
                <Link href={card.href} className="lp-btn lp-btn--outline lp-btn--sm">
                  {card.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── LEGAL SUPPORT ───────── */}
      <section className="lp-section lp-legal" style={{ backgroundImage: `url(${LEGAL_IMAGES.sectionPanel})` }}>
        <div className="lp-legal-overlay" aria-hidden="true" />
        <div className="lp-container lp-legal-inner">
          <div className="lp-legal-header" data-lp-animate>
            <span className="lp-eyebrow lp-eyebrow--light">When It Gets Complex</span>
            <h2 className="lp-h2 lp-h2--light">Specialist Legal Support</h2>
            <p className="lp-legal-subtitle">
              Access to SRA-regulated solicitors for tenancy disputes, possession proceedings, and rent arrears — with Letting Partners as your co-ordinating point of contact.
            </p>
          </div>
          <div className="lp-legal-grid" data-lp-animate>
            {LEGAL_PANELS.map((panel) => (
              <Link key={panel.href} href={panel.href} className="lp-legal-card">
                <i className={`fa-solid ${panel.icon} lp-legal-card-icon`} aria-hidden="true" />
                <h3 className="lp-legal-card-title">{panel.title}</h3>
                <p className="lp-legal-card-text">{panel.text}</p>
                <span className="lp-legal-card-link">
                  Learn more <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY LETTING PARTNERS ───────── */}
      <section className="lp-section lp-why">
        <div className="lp-container">
          <div className="lp-why-grid">
            <div className="lp-why-image" data-lp-animate="slide-right">
              <div className="lp-why-img-wrap">
                <Image
                  src={WHY_LP_IMAGES.main}
                  alt="Why choose Letting Partners"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="lp-why-float" aria-hidden="true">
                <i className="fa-solid fa-trophy lp-why-float-icon" />
                <span>Trusted by London Landlords &amp; Tenants</span>
              </div>
            </div>

            <div className="lp-why-content" data-lp-animate="slide-left">
              <span className="lp-eyebrow">Why Choose Us</span>
              <h2 className="lp-h2">The Letting Partners difference.</h2>
              <p className="lp-text-lg">
                We are a specialist letting agency — not a generalist estate agent. Everything we do is focused on residential property letting and management, which means our knowledge, processes, and relationships are all built around that single purpose.
              </p>
              <div className="lp-why-items">
                {WHY_ITEMS.map((item) => (
                  <div key={item.title} className="lp-why-item">
                    <div className="lp-why-item-icon">
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="lp-why-item-title">{item.title}</h3>
                      <p className="lp-why-item-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="lp-section lp-testimonials">
        <div className="lp-container">
          <div className="lp-section-header" data-lp-animate>
            <span className="lp-eyebrow">What Clients Say</span>
            <h2 className="lp-h2">Trusted by Landlords &amp; Tenants</h2>
          </div>

          <div data-lp-animate>
            <TestimonialsSlider items={TESTIMONIALS} />
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="lp-section lp-section--light lp-faq-section">
        <div className="lp-container">
          <div className="lp-faq-layout">
            <div className="lp-faq-sidebar" data-lp-animate="slide-right">
              <span className="lp-eyebrow">Common Questions</span>
              <h2 className="lp-h2">Frequently Asked Questions</h2>
              <p>Can&apos;t find your answer below? Our team is happy to help.</p>
              <Link href="/contact" className="lp-btn lp-btn--navy" style={{ marginTop: "1.5rem" }}>
                Ask Us Directly
              </Link>
            </div>
            <div className="lp-faq-list" data-lp-animate="slide-left">
              {FAQS.map((faq, i) => (
                <details key={i} className="lp-faq-item">
                  <summary className="lp-faq-trigger">
                    {faq.question}
                    <i className="fa-solid fa-plus lp-faq-icon" aria-hidden="true" />
                  </summary>
                  <div className="lp-faq-body">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CTA / CONTACT ───────── */}
      <section
        className="lp-section lp-contact-cta"
        style={{ backgroundImage: `url(${CTA_IMAGES.contactBg})` }}
        id="contact"
      >
        <div className="lp-contact-cta-overlay" aria-hidden="true" />
        <div className="lp-container lp-contact-cta-inner">
          <div className="lp-contact-cta-text" data-lp-animate="slide-right">
            <span className="lp-eyebrow lp-eyebrow--light">Get In Touch</span>
            <h2 className="lp-h2 lp-h2--light">Ready to talk?</h2>
            <p className="lp-contact-cta-subtitle">
              Whether you are a landlord, tenant, or investor, our team is here to help. Fill in the form and we will respond within one business day.
            </p>
            <div className="lp-contact-cta-details">
              <a href="tel:07782273674" className="lp-contact-cta-detail">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <span>07782 273674</span>
              </a>
              <a href="mailto:info@lettingpartners.co.uk" className="lp-contact-cta-detail">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>info@lettingpartners.co.uk</span>
              </a>
            </div>
          </div>
          <div className="lp-contact-cta-form" data-lp-animate="slide-left">
            <HomeContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
