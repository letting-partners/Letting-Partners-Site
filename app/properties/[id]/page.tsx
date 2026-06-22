import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LPIcon from "@/components/LPIcon";
import { WebsiteProperty } from "@/components/WebsitePropertyCard";
import { PROPERTY_FALLBACK_IMAGES } from "@/lib/images";
import { getWebsiteApiJson, WebsiteApiEnvelope } from "@/lib/website-api";

export const metadata: Metadata = {
  title: "Property Details | Letting Partners",
};

type WebsitePropertyDetails = WebsiteProperty & {
  description?: string;
  deposit?: number;
  furnished?: boolean | null;
  availableFrom?: string | null;
  features?: string[];
  rooms?: Array<{
    id: string;
    name: string;
    status: string;
    rent?: number | null;
  }>;
};

type PropertyApiResponse = WebsiteApiEnvelope & {
  property?: WebsitePropertyDetails;
};

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

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getWebsiteApiJson<PropertyApiResponse>(
    `/properties/${encodeURIComponent(id)}`,
    undefined,
    { serverPortal: true },
  ).catch(() => null);
  const property = data?.property;

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

  const image = property.image || getFallbackImage(property.id);
  const price =
    typeof property.price === "number"
      ? `£${property.price.toLocaleString("en-GB")}/${property.priceLabel ?? "pcm"}`
      : property.price ?? "POA";
  const availableFrom = formatDate(property.availableFrom);

  return (
    <section className="lp-section" style={{ paddingTop: "140px" }}>
      <div className="lp-container">
        <div className="lp-property-detail">
          <div className="lp-property-detail-media">
            <Image src={image} alt={property.title} fill sizes="(max-width: 900px) 100vw, 58vw" className="lp-cover-img" priority />
          </div>

          <div className="lp-property-detail-panel">
            <span className="lp-kicker">Property Details</span>
            <h1>{property.title}</h1>
            <div className="lp-property-price lp-property-detail-price">
              <span>{price}</span>
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
            </div>

            {property.description && <p>{property.description}</p>}

            <div className="lp-property-detail-facts">
              {property.deposit != null && (
                <p>
                  <strong>Deposit:</strong> £{property.deposit.toLocaleString("en-GB")}
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
                <h2>Available rooms</h2>
                <div className="lp-property-detail-rooms">
                  {property.rooms.map((room) => (
                    <div key={room.id} className="lp-property-detail-room">
                      <span>{room.name}</span>
                      <strong>{room.rent ? `£${room.rent.toLocaleString("en-GB")}` : room.status}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="lp-property-detail-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold">
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
  );
}
