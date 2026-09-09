import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LPIcon from "@/components/LPIcon";
import PropertyChat from "@/components/PropertyChat";
import PropertyGallery from "@/components/PropertyGallery";
import { WebsiteProperty } from "@/components/WebsitePropertyCard";
import { PROPERTY_FALLBACK_IMAGES } from "@/lib/images";
import { getWebsiteApiJson, WebsiteApiEnvelope } from "@/lib/website-api";

type PropertyRoom = {
  id: string;
  name: string;
  status: string;
  rent?: number | null;
  rentPerWeek?: number | null;
  availableFrom?: string | null;
};

type PropertyAgent = {
  name: string;
  jobTitle?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
};

type WebsitePropertyDetails = WebsiteProperty & {
  /** Outward code only - the portal never publishes the full postcode. */
  postcode?: string;
  description?: string;
  deposit?: number;
  furnished?: boolean | null;
  availableFrom?: string | null;
  features?: string[];
  images?: { url: string; alt?: string | null }[];
  rooms?: PropertyRoom[];
  agent?: PropertyAgent | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

type PropertyApiResponse = WebsiteApiEnvelope & {
  property?: WebsitePropertyDetails;
};

const SITE_URL = "https://www.lettingpartners.co.uk";

function getFallbackImage(id: string | number): string {
  const index =
    Math.abs(String(id).split("").reduce((total, char) => total + char.charCodeAt(0), 0)) %
    PROPERTY_FALLBACK_IMAGES.length;
  return PROPERTY_FALLBACK_IMAGES[index];
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatMoney(value?: number | null) {
  if (value == null) return null;
  return `£${value.toLocaleString("en-GB")}`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

async function loadProperty(id: string) {
  const data = await getWebsiteApiJson<PropertyApiResponse>(
    `/properties/${encodeURIComponent(id)}`,
    undefined,
    { serverPortal: true },
  ).catch(() => null);

  return data?.property ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await loadProperty(id);

  if (!property) {
    return {
      title: "Property Not Found | Letting Partners",
      robots: { index: false, follow: true },
    };
  }

  const price =
    typeof property.price === "number"
      ? `£${property.price.toLocaleString("en-GB")}/${property.priceLabel ?? "pcm"}`
      : (property.price ?? "POA");
  const bedroomLabel = property.bedrooms != null ? `${property.bedrooms} bed ` : "";

  // The portal supplies SEO fields when an agent has written them; otherwise
  // they are derived from the listing.
  const title = property.metaTitle ?? `${bedroomLabel}${property.title} - ${price} | Letting Partners`;
  const description =
    property.metaDescription ??
    property.description?.slice(0, 155) ??
    `${property.title}${property.address ? ` in ${property.address}` : ""} - rental property from Letting Partners, ${price}.`;

  const image = property.images?.[0]?.url || property.image || getFallbackImage(property.id);

  return {
    title,
    description,
    alternates: { canonical: `/properties/${id}` },
    openGraph: {
      title,
      description,
      url: `/properties/${id}`,
      images: [{ url: image }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await loadProperty(id);

  if (!property) {
    return (
      <section className="lp-section" style={{ paddingTop: "140px" }}>
        <div className="lp-container">
          <div className="lp-empty-state" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
            <h1 style={{ marginBottom: "0.5rem" }}>Property not found</h1>
            <p>This listing may no longer be available.</p>
            <Link href="/properties" className="lp-btn lp-btn--outline">
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const gallery = property.images?.length
    ? property.images
    : [{ url: property.image || getFallbackImage(property.id), alt: property.title }];

  const price =
    typeof property.price === "number"
      ? `£${property.price.toLocaleString("en-GB")}/${property.priceLabel ?? "pcm"}`
      : (property.price ?? "POA");
  const availableFrom = formatDate(property.availableFrom);
  const availableRooms = property.rooms?.filter((room) => room.status === "Available") ?? [];

  // Structured data helps the listing appear correctly in search results.
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/properties/${id}`,
    image: gallery.map((image) => image.url),
    ...(typeof property.price === "number" && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "GBP",
        availability: property.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area ?? undefined,
      postalCode: property.postcode ?? undefined,
      addressCountry: "GB",
    },
  };

  const stats = [
    property.bedrooms != null && {
      icon: "bed" as const,
      value: String(property.bedrooms),
      label: property.bedrooms === 1 ? "Bedroom" : "Bedrooms",
    },
    property.bathrooms != null && {
      icon: "bath" as const,
      value: String(property.bathrooms),
      label: property.bathrooms === 1 ? "Bathroom" : "Bathrooms",
    },
    property.type && { icon: "home" as const, value: property.type, label: "Property type" },
    availableFrom && { icon: "calendar" as const, value: availableFrom, label: "Available from" },
  ].filter(Boolean) as {
    icon: "bed" | "bath" | "home" | "calendar";
    value: string;
    label: string;
  }[];

  const facts = [
    property.deposit != null && { term: "Deposit", value: formatMoney(property.deposit)! },
    property.furnished != null && { term: "Furnished", value: property.furnished ? "Yes" : "No" },
    property.postcode && { term: "Postcode", value: property.postcode },
    property.area && { term: "Area", value: property.area },
    property.rooms &&
      property.rooms.length > 0 && {
        term: "Rooms available",
        value: `${availableRooms.length} of ${property.rooms.length}`,
      },
  ].filter(Boolean) as { term: string; value: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="lp-listing">
        <div className="lp-container">
          <nav className="lp-listing-crumbs" aria-label="Breadcrumb">
            <Link href="/properties">Properties</Link>
            <span aria-hidden="true">/</span>
            <span>{property.area ?? property.title}</span>
          </nav>

          {/* Title, address and price lead, ahead of everything else. */}
          <header className="lp-listing-head">
            <div className="lp-listing-head-main">
              <div className="lp-listing-tags">
                {property.type && <span className="lp-listing-tag">{property.type}</span>}
                <span
                  className={
                    property.available === false
                      ? "lp-listing-tag lp-listing-tag--let"
                      : "lp-listing-tag lp-listing-tag--available"
                  }
                >
                  {property.available === false ? "Let agreed" : "Available now"}
                </span>
              </div>

              <h1>{property.title}</h1>

              {property.address && (
                <p className="lp-listing-address">
                  <LPIcon name="map-pin" size={17} />
                  {property.address}
                </p>
              )}
            </div>

            <div className="lp-listing-head-price">
              <span className="lp-listing-price">
                {property.rooms && property.rooms.length > 0 ? `From ${price}` : price}
              </span>
              {property.deposit != null && (
                <span className="lp-listing-price-note">
                  {formatMoney(property.deposit)} deposit
                </span>
              )}
            </div>
          </header>

          {stats.length > 0 && (
            <ul className="lp-listing-stats">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <LPIcon name={stat.icon} size={19} />
                  <span>
                    <strong>{stat.value}</strong>
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="lp-listing-grid">
            <div className="lp-listing-main">
              <PropertyGallery images={gallery} title={property.title} />

              {property.description && (
                <section className="lp-listing-block">
                  <h2>About this property</h2>
                  <div className="lp-listing-prose">
                    {property.description.split(/\n{2,}/).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {/* The rooms table is wide and tabular, so it stays in the main
                  column where its columns have room to breathe. */}
              {property.rooms && property.rooms.length > 0 && (
                <section className="lp-listing-block">
                  <h2>Rooms</h2>
                  <p className="lp-listing-block-note">
                    {availableRooms.length} of {property.rooms.length} rooms available.
                  </p>

                  <div className="lp-table-scroll">
                    <table className="lp-room-table">
                      <thead>
                        <tr>
                          <th>Room</th>
                          <th>Rent</th>
                          <th>Available from</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {property.rooms.map((room) => (
                          <tr key={room.id}>
                            <td>{room.name}</td>
                            <td>
                              {room.rent != null ? (
                                <>
                                  {formatMoney(room.rent)} pcm
                                  {room.rentPerWeek != null && (
                                    <div className="lp-room-rent-alt">
                                      {formatMoney(room.rentPerWeek)} pw
                                    </div>
                                  )}
                                </>
                              ) : (
                                "POA"
                              )}
                            </td>
                            <td>{formatDate(room.availableFrom) ?? "On request"}</td>
                            <td>
                              <span
                                className={
                                  room.status === "Available"
                                    ? "lp-room-status lp-room-status--available"
                                    : room.status === "Under offer"
                                      ? "lp-room-status lp-room-status--offer"
                                      : "lp-room-status lp-room-status--let"
                                }
                              >
                                {room.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>

            {/* Contact first - it is what the page is for. Everything else
                stacks beneath it. */}
            <aside className="lp-listing-aside">
              <div className="lp-listing-card lp-listing-card--contact">
                <h2>Arrange a viewing</h2>

                {property.agent ? (
                  <div className="lp-listing-agent">
                    {property.agent.avatarUrl ? (
                      <Image
                        src={property.agent.avatarUrl}
                        alt={property.agent.name}
                        width={52}
                        height={52}
                        className="lp-agent-avatar"
                      />
                    ) : (
                      <span className="lp-agent-avatar" aria-hidden="true">
                        {initials(property.agent.name)}
                      </span>
                    )}
                    <div>
                      <strong>{property.agent.name}</strong>
                      {property.agent.jobTitle && <span>{property.agent.jobTitle}</span>}
                    </div>
                  </div>
                ) : (
                  <p className="lp-listing-block-note">
                    Our lettings team will reply the same working day.
                  </p>
                )}

                <div className="lp-listing-actions">
                  <PropertyChat
                    propertyId={String(property.id)}
                    propertyTitle={property.title}
                    agentName={property.agent?.name ?? null}
                  />
                  <Link href="/contact" className="lp-btn lp-btn--outline">
                    Enquire now
                  </Link>
                </div>

                {(property.agent?.phone || property.agent?.email) && (
                  <div className="lp-listing-contact-links">
                    {property.agent?.phone && (
                      <a href={`tel:${property.agent.phone.replace(/\s+/g, "")}`}>
                        <LPIcon name="phone" size={15} />
                        {property.agent.phone}
                      </a>
                    )}
                    {property.agent?.email && (
                      <a href={`mailto:${property.agent.email}`}>
                        <LPIcon name="mail" size={15} />
                        {property.agent.email}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {facts.length > 0 && (
                <div className="lp-listing-card">
                  <h2>Key facts</h2>
                  <dl className="lp-listing-facts">
                    {facts.map((fact) => (
                      <div key={fact.term}>
                        <dt>{fact.term}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {property.features && property.features.length > 0 && (
                <div className="lp-listing-card">
                  <h2>Features</h2>
                  <ul className="lp-listing-features">
                    {property.features.map((feature) => (
                      <li key={feature}>
                        <LPIcon name="check" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.agent?.bio && (
                <div className="lp-listing-card">
                  <h2>About {property.agent.name.split(" ")[0]}</h2>
                  <p className="lp-listing-block-note">{property.agent.bio}</p>
                </div>
              )}

              <Link href="/properties" className="lp-listing-back">
                <LPIcon name="arrow-right" size={15} />
                Browse all properties
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
