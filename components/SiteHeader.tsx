"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import LPIcon, { type LPIconName } from "@/components/LPIcon";
import { AREAS, getAreaHref } from "@/lib/areas";
import { AREA_MENU_IMAGES, LOGO } from "@/lib/images";
import { SERVICE_GROUPS, isServicesCurrent } from "@/lib/services";

const topLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceIcons: Record<string, LPIconName> = {
  "/tenant-services": "key",
  "/landlord-services": "building",
  "/specialist-legal-support": "scale",
  "/other-services": "wrench",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "areas" | null>(null);
  /* Which area the pointer is over, previewed beside the list. */
  const [previewSlug, setPreviewSlug] = useState(AREAS[0].slug);
  const previewArea = AREAS.find((area) => area.slug === previewSlug) ?? AREAS[0];
  const [mobileGroup, setMobileGroup] = useState<"services" | "areas" | null>("services");

  /*
   * A property listing has no cover image behind the header, so the
   * transparent treatment - white logo, light nav - would sit on white and
   * disappear. These pages get a solid header from the top instead.
   */
  const solid = /^\/properties\/.+/.test(pathname);

  /*
   * The panel opens at the header's bottom edge, which leaves a band of header
   * between the button and the menu. Closing the moment the pointer left the
   * button meant the menu vanished while you were on your way to it - it was
   * unusable with a mouse. Closing is delayed instead, and cancelled the
   * moment the pointer arrives anywhere in the menu.
   */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(
    (menu: "services" | "areas") => {
      cancelClose();
      setOpenMenu(menu);
    },
    [cancelClose],
  );

  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 260);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const areaActive = pathname.startsWith("/areas");
  const servicesActive = isServicesCurrent(pathname);

  return (
    <>
      <header
        className={`lp-header${scrolled ? " lp-header--scrolled" : ""}${
          solid ? " lp-header--solid" : ""
        }`}
        /*
         * The panel is a descendant of the header even though it hangs below
         * it, so this does not fire while the pointer is inside the menu. It
         * fires when the pointer genuinely leaves the whole header region,
         * which is the moment the menu should go.
         */
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="lp-container lp-header-inner">
          <Link href="/" className="lp-header-logo" aria-label="Letting Partners home">
            <Image src={LOGO.main} alt="Letting Partners" width={190} height={54} priority />
          </Link>

          <nav className="lp-desktop-nav" aria-label="Primary navigation">
            <Link className={pathname === "/" ? "is-active" : ""} href="/">
              Home
            </Link>

            <div
              className="lp-nav-dropdown"
              onMouseEnter={() => openNow("services")}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                className={servicesActive ? "is-active" : ""}
                aria-expanded={openMenu === "services"}
                aria-controls="lp-services-menu"
                onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
              >
                Services
                <LPIcon name="chevron-down" size={16} />
              </button>
              {openMenu === "services" && (
                <div
                  id="lp-services-menu"
                  className="lp-mega lp-mega--services"
                  // Stated on the panel as well as the dropdown around it:
                  // arriving anywhere in the menu keeps it open, without
                  // relying on the enter event reaching the ancestor.
                  onMouseEnter={() => openNow("services")}
                  onMouseLeave={closeSoon}
                >
                  {/* A promotional rail, then the groups. Four equal boxes in a
                      row read as a sitemap; this reads as a menu. */}
                  <aside className="lp-mega-rail">
                    <span className="lp-mega-rail-eyebrow">Our Services</span>
                    <h2>Everything a let needs, under one roof.</h2>
                    <p>
                      Letting, management, tenant support and legal help - handled by one team, so
                      nothing falls between two of them.
                    </p>

                    <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--sm">
                      Speak to Us
                      <LPIcon name="arrow-right" size={15} />
                    </Link>

                    <a href="tel:07782273674" className="lp-mega-rail-phone">
                      <LPIcon name="phone" size={15} />
                      07782 273674
                    </a>
                  </aside>

                  <div className="lp-mega-service-grid">
                    {SERVICE_GROUPS.map((group) => (
                      <section key={group.href} className="lp-mega-card">
                        <Link href={group.href} className="lp-mega-card-head">
                          <span className="lp-mega-card-icon">
                            <LPIcon name={serviceIcons[group.href] ?? "sparkles"} size={19} />
                          </span>
                          <span className="lp-mega-card-heading">
                            <small>{group.eyebrow}</small>
                            <strong>{group.label}</strong>
                          </span>
                          <LPIcon name="arrow-right" size={15} />
                        </Link>

                        <ul>
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href}>
                                <span className="lp-mega-dot" aria-hidden="true" />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="lp-nav-dropdown"
              onMouseEnter={() => openNow("areas")}
              onMouseLeave={closeSoon}
            >
              <button
                type="button"
                className={areaActive ? "is-active" : ""}
                aria-expanded={openMenu === "areas"}
                aria-controls="lp-areas-menu"
                onClick={() => setOpenMenu(openMenu === "areas" ? null : "areas")}
              >
                Areas
                <LPIcon name="chevron-down" size={16} />
              </button>
              {openMenu === "areas" && (
                <div
                  id="lp-areas-menu"
                  className="lp-mega lp-mega--areas"
                  onMouseEnter={() => openNow("areas")}
                  onMouseLeave={closeSoon}
                >
                  <div className="lp-mega-area-col">
                    <div className="lp-mega-area-head">
                      <span className="lp-mega-rail-eyebrow">Where We Work</span>
                      <Link href="/areas" className="lp-text-link">
                        All areas
                        <LPIcon name="arrow-right" size={14} />
                      </Link>
                    </div>

                    <div className="lp-mega-area-list">
                    {AREAS.map((area) => (
                      <Link
                        key={area.slug}
                        href={getAreaHref(area.slug)}
                        className={area.slug === previewArea.slug ? "is-previewing" : ""}
                        // Hover and keyboard focus both drive the preview, so
                        // tabbing through the list shows the same thing.
                        onMouseEnter={() => setPreviewSlug(area.slug)}
                        onFocus={() => setPreviewSlug(area.slug)}
                      >
                        <span>
                          <strong>{area.title}</strong>
                          <small>{area.coverageLabel}</small>
                        </span>
                        <LPIcon name="arrow-right" size={15} />
                      </Link>
                    ))}
                    </div>
                  </div>

                  <Link
                    href={getAreaHref(previewArea.slug)}
                    className="lp-mega-area-preview"
                    aria-label={`Letting services in ${previewArea.title}`}
                  >
                    <Image
                      key={previewArea.slug}
                      src={AREA_MENU_IMAGES[previewArea.slug] ?? AREA_MENU_IMAGES.ilford}
                      alt=""
                      fill
                      sizes="340px"
                      className="lp-cover-img"
                    />
                    <span className="lp-mega-area-preview-body">
                      <small>{previewArea.coverageLabel}</small>
                      <strong>{previewArea.title}</strong>
                      <em>{previewArea.description}</em>
                      <span className="lp-text-link">
                        Letting services in {previewArea.title}
                        <LPIcon name="arrow-right" size={15} />
                      </span>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {topLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "is-active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="lp-header-actions">
            <a href="tel:07782273674" className="lp-phone-link">
              <LPIcon name="phone" size={17} />
              07782 273674
            </a>
            <Link href="/contact" className="lp-btn lp-btn--gold lp-btn--sm">
              Speak to Us
            </Link>
          </div>

          <button
            type="button"
            className="lp-menu-button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <LPIcon name={mobileOpen ? "x" : "menu"} size={24} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="lp-mobile-shell" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="lp-mobile-panel">
            <div className="lp-mobile-panel-head">
              <Image src={LOGO.main} alt="Letting Partners" width={154} height={44} />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <LPIcon name="x" size={24} />
              </button>
            </div>

            <nav className="lp-mobile-nav" aria-label="Mobile primary navigation">
              {topLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                aria-expanded={mobileGroup === "services"}
                onClick={() => setMobileGroup(mobileGroup === "services" ? null : "services")}
              >
                Services
                <LPIcon name="chevron-down" size={17} />
              </button>
              {mobileGroup === "services" && (
                <div className="lp-mobile-subnav">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.href}>
                      <Link href={group.href} className="lp-mobile-subnav-heading">
                        {group.label}
                      </Link>
                      {group.items.map((item) => (
                        <Link key={item.href} href={item.href}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                aria-expanded={mobileGroup === "areas"}
                onClick={() => setMobileGroup(mobileGroup === "areas" ? null : "areas")}
              >
                Areas
                <LPIcon name="chevron-down" size={17} />
              </button>
              {mobileGroup === "areas" && (
                <div className="lp-mobile-subnav lp-mobile-subnav--areas">
                  {AREAS.map((area) => (
                    <Link key={area.slug} href={getAreaHref(area.slug)}>
                      {area.title}
                    </Link>
                  ))}
                  <Link href="/areas" className="lp-mobile-subnav-heading">
                    All Areas
                  </Link>
                </div>
              )}
            </nav>

            <div className="lp-mobile-contact">
              <a href="tel:07782273674">
                <LPIcon name="phone" size={17} />
                07782 273674
              </a>
              <a href="mailto:info@lettingpartners.co.uk">
                <LPIcon name="mail" size={17} />
                info@lettingpartners.co.uk
              </a>
              <Link href="/contact" className="lp-btn lp-btn--gold">
                Speak to Letting Partners
              </Link>
            </div>
          </div>
          <button className="lp-mobile-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
