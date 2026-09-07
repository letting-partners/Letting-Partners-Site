import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import LPIcon from "@/components/LPIcon";
import ScrollAnimator from "@/components/ScrollAnimator";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SiteChat from "@/components/SiteChat";
import SiteHeader from "@/components/SiteHeader";
import { LOGO } from "@/lib/images";

const inter = Inter({
  subsets: ["latin"],
  variable: "--lp-font",
  display: "swap",
});

const SITE_URL = "https://www.lettingpartners.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Letting Partners | UK Property Letting & Management",
  description:
    "Premium property letting, management, tenant support, legal coordination, maintenance, mortgage consultancy, and development support across London and Birmingham.",
  keywords: [
    "letting agents London",
    "property management London",
    "landlord services Birmingham",
    "tenant services London",
    "UK property letting",
  ],
  applicationName: "Letting Partners",
  authors: [{ name: "Letting Partners" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Letting Partners",
    title: "Letting Partners | UK Property Letting & Management",
    description:
      "Professional letting, management, tenant, legal, maintenance, mortgage, and development support across London and Birmingham.",
    images: [{ url: "/lp-logo.webp", width: 190, height: 54, alt: "Letting Partners" }],
  },
  twitter: {
    card: "summary",
    title: "Letting Partners | UK Property Letting & Management",
    description:
      "Professional letting, management, tenant, legal, maintenance, mortgage, and development support across London and Birmingham.",
    images: ["/lp-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Letting Partners",
  alternateName: "Letting Partners LTD",
  url: SITE_URL,
  logo: `${SITE_URL}/lp-logo.webp`,
  image: `${SITE_URL}/lp-logo.webp`,
  telephone: "+447782273674",
  email: "info@lettingpartners.co.uk",
  areaServed: [
    "Ilford", "Redbridge", "Stratford", "Barking", "Walthamstow", "Croydon", "Hounslow", "Birmingham",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressRegion: "London & Birmingham",
  },
  sameAs: [],
};

const footerAreas = [
  ["Ilford", "/areas/ilford"],
  ["Redbridge", "/areas/redbridge"],
  ["Stratford", "/areas/stratford"],
  ["Barking", "/areas/barking"],
  ["Walthamstow", "/areas/walthamstow"],
  ["Croydon", "/areas/croydon"],
  ["Hounslow", "/areas/hounslow"],
  ["Birmingham", "/areas/birmingham"],
];

const footerServices = [
  ["Property Letting", "/landlord-services/property-letting"],
  ["Property Management", "/landlord-services/property-management"],
  ["Find a Tenant", "/landlord-services/find-a-tenant"],
  ["Rent to Rent", "/landlord-services/rent-to-rent"],
  ["Tenant Services", "/tenant-services"],
  ["Specialist Legal Support", "/specialist-legal-support"],
  ["Repair & Maintenance", "/other-services/repair-maintenance"],
  ["Mortgage Consultancy", "/other-services/mortgage-consultancy"],
];

const footerCompany = [
  ["About", "/about"],
  ["Properties", "/properties"],
  ["Areas", "/areas"],
  ["Contact", "/contact"],
  ["Landlord Guide", "/landlord-services/landlord-guide"],
  ["Tenant Guide", "/tenant-services/tenant-guide"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-conditions"],
];

function FooterLinkList({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="lp-footer-col">
      <h2>{title}</h2>
      <ul>
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>
              <LPIcon name="arrow-right" size={15} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-JKM4WL3BWX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JKM4WL3BWX');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <ScrollAnimator />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <footer className="lp-footer">
          <div className="lp-container lp-footer-grid">
            <div className="lp-footer-brand">
              <Link href="/" aria-label="Letting Partners home" className="lp-footer-logo">
                <Image src={LOGO.footer} alt="Letting Partners" width={190} height={54} />
              </Link>
              <p>
                Premium property letting, management, tenant support, legal coordination, maintenance, mortgage, and development services across London and Birmingham.
              </p>
              <p className="lp-footer-legal">
                Letting Partners LTD. Registered in England and Wales. Registration No. 17436005.
              </p>
              <div className="lp-footer-contact">
                <a href="tel:07782273674">
                  <LPIcon name="phone" size={17} />
                  07782 273674
                </a>
                <a href="mailto:info@lettingpartners.co.uk">
                  <LPIcon name="mail" size={17} />
                  info@lettingpartners.co.uk
                </a>
                <span>
                  <LPIcon name="map-pin" size={17} />
                  London & Birmingham, UK
                </span>
              </div>
            </div>

            <FooterLinkList title="Services" items={footerServices} />
            <FooterLinkList title="Areas" items={footerAreas} />
            <FooterLinkList title="Company" items={footerCompany} />
          </div>

          <div className="lp-footer-bottom">
            <div className="lp-container lp-footer-bottom-inner">
              <p>&copy; {new Date().getFullYear()} Letting Partners LTD. All rights reserved.</p>
              <div>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTopButton />
        <SiteChat />
      </body>
    </html>
  );
}
