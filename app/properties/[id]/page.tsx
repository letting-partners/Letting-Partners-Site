import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LPIcon from "@/components/LPIcon";
import PropertyChat from "@/components/PropertyChat";
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

  const cover = gallery[0];
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="lp-section" style={{ paddingTop: "140px" }}>
        <div className="lp-container">
          <div className="lp-property-detail">
            <div>
              <div className="lp-property-detail-media">
                <Image
                  src={cover.url}
                  alt={cover.alt ?? property.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  className="lp-cover-img"
                  priority
                />
              </div>

              {gallery.length > 1 && (
                <div className="lp-properties-grid" style={{ marginTop: "1rem" }}>
                  {gallery.slice(1, 7).map((image) => (
                    <div
                      key={image.url}
                      style={{
                        position: "relative",
                        aspectRatio: "4 / 3",
                        borderRadius: "var(--lp-radius-sm)",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt ?? property.title}
                        fill
                        sizes="(max-width: 900px) 50vw, 20vw"
                        className="lp-cover-img"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lp-property-detail-panel">
              <span className="lp-kicker">Property Details</span>
              <h1>{property.title}</h1>

              <div className="lp-property-price lp-property-detail-price">
                <span>
                  {property.rooms && property.rooms.length > 0 ? `From ${price}` : price}
                </span>
              </div>

              {property.address && (
                <p className="lp-property-address">
                  <LPIcon name="map-pin" size={16} />
                  {property.address}
                </p>
              )}

              <div className="lp-property-meta">
                {property.bedrooms != null && (
                  <span>
                    <LPIcon name="bed" size={16} />
                    {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
                  </span>
                )}
                {property.bathrooms != null && (
                  <span>
                    <LPIcon name="bath" size={16} />
                    {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}
                  </span>
                )}
                {property.type && <span>{property.type}</span>}
                {property.available === false && <span>Let agreed</span>}
              </div>

              {property.description && <p>{property.description}</p>}

              <div className="lp-property-detail-facts">
                {property.deposit != null && (
                  <p>
                    <strong>Deposit:</strong> {formatMoney(property.deposit)}
                  </p>
                )}
                {property.furnished != null && (
                  <p>
                    <strong>Furnished:</strong> {property.furnished ? "Yes" : "No"}
                  </p>
                )}
                {availableFrom && (
                  <p>
                    <strong>Available from:</strong> {availableFrom}
                  </p>
                )}
              </div>

              {property.features && property.features.length > 0 && (
                <div>
                  <h2>Features</h2>
                  <div className="lp-property-meta">
                    {property.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                </div>
              )}

              {property.rooms && property.rooms.length > 0 && (
                <div>
                  <h2>Rooms</h2>
                  <p style={{ color: "var(--lp-muted)", fontSize: "0.9rem" }}>
                    {availableRooms.length} of {property.rooms.length} rooms available.
                  </p>

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
                                  <div style={{ color: "var(--lp-muted)", fontSize: "0.8rem" }}>
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
              )}

              {property.agent && (
                <div>
                  <h2>Your agent</h2>
                  <div className="lp-agent-card">
                    {property.agent.avatarUrl ? (
                      <Image
                        src={property.agent.avatarUrl}
                        alt={property.agent.name}
                        width={56}
                        height={56}
                        className="lp-agent-avatar"
                      />
                    ) : (
                      <span className="lp-agent-avatar" aria-hidden="true">
                        {initials(property.agent.name)}
                      </span>
                    )}

                    <div>
                      <h3>{property.agent.name}</h3>
                      {property.agent.jobTitle && (
                        <p className="lp-agent-role">{property.agent.jobTitle}</p>
                      )}
                      {property.agent.bio && <p className="lp-agent-bio">{property.agent.bio}</p>}

                      <div className="lp-agent-contact">
                        {property.agent.phone && (
                          <a href={`tel:${property.agent.phone.replace(/\s+/g, "")}`}>
                            <LPIcon name="phone" size={15} />
                            {property.agent.phone}
                          </a>
                        )}
                        {property.agent.email && (
                          <a href={`mailto:${property.agent.email}`}>
                            <LPIcon name="mail" size={15} />
                            {property.agent.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="lp-property-detail-actions">
                <PropertyChat
                  propertyId={String(property.id)}
                  propertyTitle={property.title}
                  agentName={property.agent?.name ?? null}
                />
                <Link href="/contact" className="lp-btn lp-btn--outline">
                  Enquire Now
                </Link>
                <Link href="/properties" className="lp-btn lp-btn--outline">
                  Browse All Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
