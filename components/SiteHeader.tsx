"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AREAS, getAreaHref } from "@/lib/areas";
import { AREA_MENU_IMAGES, LOGO } from "@/lib/images";
import { SERVICE_GROUPS, isServicesCurrent } from "@/lib/services";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<"areas" | "services" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function openMega(key: "areas" | "services") {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setActiveMega(key);
  }

  function closeMegaDelayed() {
    megaTimerRef.current = setTimeout(() => setActiveMega(null), 180);
  }

  function cancelClose() {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
  }

  const isAreaCurrent = pathname.startsWith("/areas");

  return (
    <>
      <header
        ref={headerRef}
        className={`lp-header${scrolled ? " lp-header--scrolled" : ""}`}
        role="banner"
      >
        <div className="lp-header-inner">
          {/* Logo */}
          <Link href="/" className="lp-header-logo" aria-label="Letting Partners Home">
            <Image src={LOGO.main} alt="Letting Partners" width={160} height={44} priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="lp-header-nav" aria-label="Primary navigation">
            <Link
              href="/"
              className={`lp-header-link${pathname === "/" ? " active" : ""}`}
            >
              Home
            </Link>

            {/* Areas Mega Trigger */}
            <button
              className={`lp-header-link lp-header-link--btn${isAreaCurrent ? " active" : ""}${activeMega === "areas" ? " lp-header-link--open" : ""}`}
              onMouseEnter={() => openMega("areas")}
              onMouseLeave={closeMegaDelayed}
              onClick={() => setActiveMega(activeMega === "areas" ? null : "areas")}
              aria-haspopup="true"
              aria-expanded={activeMega === "areas"}
            >
              Areas <i className="fa-solid fa-chevron-down lp-header-chevron" aria-hidden="true" />
            </button>

            {/* Services Mega Trigger */}
            <button
              className={`lp-header-link lp-header-link--btn${isServicesCurrent(pathname) ? " active" : ""}${activeMega === "services" ? " lp-header-link--open" : ""}`}
              onMouseEnter={() => openMega("services")}
              onMouseLeave={closeMegaDelayed}
              onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
              aria-haspopup="true"
              aria-expanded={activeMega === "services"}
            >
              Services <i className="fa-solid fa-chevron-down lp-header-chevron" aria-hidden="true" />
            </button>

            <Link
              href="/properties"
              className={`lp-header-link${pathname.startsWith("/properties") ? " active" : ""}`}
            >
              Properties
            </Link>

            <Link
              href="/about"
              className={`lp-header-link${pathname === "/about" ? " active" : ""}`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`lp-header-link${pathname === "/contact" ? " active" : ""}`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="lp-header-cta">
            <a href="tel:07782273674" className="lp-header-phone" aria-label="Call Letting Partners">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <span>07782 273674</span>
            </a>
            <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--sm">
              Get In Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lp-hamburger${mobileOpen ? " lp-hamburger--open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Areas Mega Menu */}
        {activeMega === "areas" && (
          <div
            className="lp-mega-menu lp-mega-menu--areas"
            onMouseEnter={cancelClose}
            onMouseLeave={closeMegaDelayed}
            role="navigation"
            aria-label="Areas menu"
          >
            <div className="lp-mega-inner">
              <div className="lp-mega-header">
                <span className="lp-mega-eyebrow">Where we operate</span>
                <h3 className="lp-mega-title">Our Coverage Areas</h3>
                <p className="lp-mega-subtitle">Expert letting support across London and Birmingham.</p>
              </div>
              <div className="lp-mega-areas-grid">
                {AREAS.map((area) => (
                  <Link
                    key={area.slug}
                    href={getAreaHref(area.slug)}
                    className="lp-mega-area-card"
                  >
                    <div className="lp-mega-area-img">
                      <Image
                        src={AREA_MENU_IMAGES[area.slug] ?? area.image}
                        alt={area.title}
                        fill
                        sizes="180px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="lp-mega-area-info">
                      <span className="lp-mega-area-label">{area.coverageLabel}</span>
                      <strong className="lp-mega-area-name">{area.title}</strong>
                      <p className="lp-mega-area-desc">{area.menuDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="lp-mega-footer">
                <Link href="/areas" className="lp-mega-all-link">
                  View all areas <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Services Mega Menu */}
        {activeMega === "services" && (
          <div
            className="lp-mega-menu lp-mega-menu--services"
            onMouseEnter={cancelClose}
            onMouseLeave={closeMegaDelayed}
            role="navigation"
            aria-label="Services menu"
          >
            <div className="lp-mega-inner">
              <div className="lp-mega-header">
                <span className="lp-mega-eyebrow">What we offer</span>
                <h3 className="lp-mega-title">Our Services</h3>
                <p className="lp-mega-subtitle">End-to-end property support for landlords, tenants, and investors.</p>
              </div>
              <div className="lp-mega-services-grid">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.href} className="lp-mega-service-group">
                    <div className="lp-mega-service-group-header">
                      <i className={`fa-solid ${group.icon} lp-mega-service-icon`} aria-hidden="true" />
                      <div>
                        <span className="lp-mega-service-eyebrow">{group.eyebrow}</span>
                        <Link href={group.href} className="lp-mega-service-title">
                          {group.label}
                        </Link>
                      </div>
                    </div>
                    <ul className="lp-mega-service-items">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="lp-mega-service-item">
                            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lp-mobile-nav" aria-label="Mobile navigation" role="dialog" aria-modal="true">
          <div className="lp-mobile-nav-inner">
            <div className="lp-mobile-nav-logo">
              <Image src={LOGO.main} alt="Letting Partners" width={140} height={38} />
            </div>

            <nav>
              <Link href="/" className="lp-mobile-link">Home</Link>

              {/* Mobile Areas */}
              <button
                className="lp-mobile-link lp-mobile-link--toggle"
                onClick={() => setMobileExpanded(mobileExpanded === "areas" ? null : "areas")}
                aria-expanded={mobileExpanded === "areas"}
              >
                Areas
                <i className={`fa-solid fa-chevron-down lp-mobile-chevron${mobileExpanded === "areas" ? " open" : ""}`} aria-hidden="true" />
              </button>
              {mobileExpanded === "areas" && (
                <div className="lp-mobile-submenu">
                  {AREAS.map((area) => (
                    <Link key={area.slug} href={getAreaHref(area.slug)} className="lp-mobile-sub-link">
                      <i className="fa-solid fa-location-dot" aria-hidden="true" />
                      {area.title}
                    </Link>
                  ))}
                  <Link href="/areas" className="lp-mobile-sub-link lp-mobile-sub-link--all">
                    All Areas <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </Link>
                </div>
              )}

              {/* Mobile Services */}
              <button
                className="lp-mobile-link lp-mobile-link--toggle"
                onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                aria-expanded={mobileExpanded === "services"}
              >
                Services
                <i className={`fa-solid fa-chevron-down lp-mobile-chevron${mobileExpanded === "services" ? " open" : ""}`} aria-hidden="true" />
              </button>
              {mobileExpanded === "services" && (
                <div className="lp-mobile-submenu">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.href} className="lp-mobile-sub-group">
                      <span className="lp-mobile-sub-group-label">{group.eyebrow}</span>
                      {group.items.map((item) => (
                        <Link key={item.href} href={item.href} className="lp-mobile-sub-link">
                          <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <Link href="/properties" className="lp-mobile-link">Properties</Link>
              <Link href="/about" className="lp-mobile-link">About</Link>
              <Link href="/contact" className="lp-mobile-link">Contact</Link>
            </nav>

            <div className="lp-mobile-nav-footer">
              <a href="tel:07782273674" className="lp-mobile-phone">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                07782 273674
              </a>
              <a href="mailto:info@lettingpartners.co.uk" className="lp-mobile-email">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                info@lettingpartners.co.uk
              </a>
              <Link href="/contact" className="lp-btn lp-btn--gold" style={{ width: "100%", textAlign: "center" }}>
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lp-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
