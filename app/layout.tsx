import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import ScrollAnimator from "@/components/ScrollAnimator";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { LOGO } from "@/lib/images";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Letting Partners | London Property Letting & Management",
    template: "%s | Letting Partners",
  },
  description:
    "Letting Partners — expert property letting, management, and tenant services across London and Birmingham. Professional support for landlords and tenants.",
  keywords: [
    "property letting London",
    "landlord services London",
    "tenant services London",
    "property management Ilford",
    "rental properties East London",
    "letting agents Birmingham",
  ],
  metadataBase: new URL("https://www.lettingpartners.co.uk"),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Letting Partners",
  },
};

const footerAreas = [
  { label: "Ilford", href: "/areas/ilford" },
  { label: "Redbridge", href: "/areas/redbridge" },
  { label: "Stratford", href: "/areas/stratford" },
  { label: "Barking", href: "/areas/barking" },
  { label: "Walthamstow", href: "/areas/walthamstow" },
  { label: "Croydon", href: "/areas/croydon" },
  { label: "Hounslow", href: "/areas/hounslow" },
  { label: "Birmingham", href: "/areas/birmingham" },
];

const footerServices = [
  { label: "Property Letting", href: "/landlord-services/property-letting" },
  { label: "Property Management", href: "/landlord-services/property-management" },
  { label: "Find A Tenant", href: "/landlord-services/find-a-tenant" },
  { label: "Rent To Rent", href: "/landlord-services/rent-to-rent" },
  { label: "Tenant Registration", href: "/tenant-services/register-as-tenant" },
  { label: "Specialist Legal Support", href: "/specialist-legal-support" },
  { label: "Repair & Maintenance", href: "/other-services/repair-maintenance" },
  { label: "Mortgage Consultancy", href: "/other-services/mortgage-consultancy" },
];

const footerCompany = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Properties", href: "/properties" },
  { label: "All Areas", href: "/areas" },
  { label: "Landlord Guide", href: "/landlord-services/landlord-guide" },
  { label: "Tenant Guide", href: "/tenant-services/tenant-guide" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ScrollAnimator />
        <SiteHeader />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <footer className="lp-footer" role="contentinfo">
          <div className="lp-footer-top">
            <div className="lp-container">
              <div className="lp-footer-grid">
                {/* Brand column */}
                <div className="lp-footer-brand">
                  <Link href="/" className="lp-footer-logo-link" aria-label="Letting Partners Home">
                    <Image src={LOGO.footer} alt="Letting Partners" width={160} height={44} />
                  </Link>
                  <p className="lp-footer-tagline">
                    Professional property letting and management services across London and Birmingham — built on transparency, reliability, and results.
                  </p>
                  <div className="lp-footer-contact">
                    <a href="tel:07782273674" className="lp-footer-contact-item">
                      <i className="fa-solid fa-phone" aria-hidden="true" />
                      <span>07782 273674</span>
                    </a>
                    <a href="mailto:info@lettingpartners.co.uk" className="lp-footer-contact-item">
                      <i className="fa-solid fa-envelope" aria-hidden="true" />
                      <span>info@lettingpartners.co.uk</span>
                    </a>
                    <div className="lp-footer-contact-item">
                      <i className="fa-solid fa-location-dot" aria-hidden="true" />
                      <span>London &amp; Birmingham, UK</span>
                    </div>
                  </div>
                  <div className="lp-footer-socials">
                    <a href="#" className="lp-footer-social" aria-label="Facebook">
                      <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                    </a>
                    <a href="#" className="lp-footer-social" aria-label="Instagram">
                      <i className="fa-brands fa-instagram" aria-hidden="true" />
                    </a>
                    <a href="#" className="lp-footer-social" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                    </a>
                    <a href="#" className="lp-footer-social" aria-label="X (Twitter)">
                      <i className="fa-brands fa-x-twitter" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Areas column */}
                <div className="lp-footer-col">
                  <h4 className="lp-footer-col-title">Our Areas</h4>
                  <ul className="lp-footer-links">
                    {footerAreas.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="lp-footer-link">
                          <i className="fa-solid fa-location-dot" aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services column */}
                <div className="lp-footer-col">
                  <h4 className="lp-footer-col-title">Our Services</h4>
                  <ul className="lp-footer-links">
                    {footerServices.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="lp-footer-link">
                          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company column */}
                <div className="lp-footer-col">
                  <h4 className="lp-footer-col-title">Company</h4>
                  <ul className="lp-footer-links">
                    {footerCompany.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="lp-footer-link">
                          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <div className="lp-container">
              <div className="lp-footer-bottom-inner">
                <p className="lp-footer-copy">
                  &copy; {new Date().getFullYear()} Letting Partners. All rights reserved. Registered in England &amp; Wales.
                </p>
                <div className="lp-footer-legal-links">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/terms-conditions">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <ScrollToTopButton />
      </body>
    </html>
  );
}
