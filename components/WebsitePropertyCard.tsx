import Image from "next/image";
import Link from "next/link";
import { PROPERTY_FALLBACK_IMAGES } from "@/lib/images";

export type WebsiteProperty = {
  id: string | number;
  title: string;
  address?: string;
  area?: string;
  price?: number | string;
  priceLabel?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  available?: boolean;
  image?: string;
};

function getFallbackImage(id: string | number): string {
  const index = Math.abs(String(id).split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % PROPERTY_FALLBACK_IMAGES.length;
  return PROPERTY_FALLBACK_IMAGES[index];
}

export default function WebsitePropertyCard({ property }: { property: WebsiteProperty }) {
  const image = property.image || getFallbackImage(property.id);
  const href = `/properties/${property.id}`;
  const price = typeof property.price === "number" ? `£${property.price.toLocaleString("en-GB")}` : (property.price ?? "POA");
  const priceLabel = property.priceLabel ?? "pcm";

  return (
    <article className="lp-property-card">
      <Link href={href} className="lp-property-card-img-wrap" tabIndex={-1} aria-hidden="true">
        <Image
          src={image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="lp-property-card-img"
        />
        {property.available === false && (
          <span className="lp-property-badge lp-property-badge--let">Let Agreed</span>
        )}
        {property.type && (
          <span className="lp-property-badge lp-property-badge--type">{property.type}</span>
        )}
      </Link>

      <div className="lp-property-card-body">
        <div className="lp-property-price">
          <span className="lp-property-amount">{price}</span>
          <span className="lp-property-period"> /{priceLabel}</span>
        </div>

        <h3 className="lp-property-title">
          <Link href={href}>{property.title}</Link>
        </h3>

        {property.address && (
          <p className="lp-property-address">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            {property.address}
          </p>
        )}

        <div className="lp-property-meta">
          {property.bedrooms != null && (
            <span className="lp-property-meta-item">
              <i className="fa-solid fa-bed" aria-hidden="true" />
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="lp-property-meta-item">
              <i className="fa-solid fa-bath" aria-hidden="true" />
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          )}
          {property.area && (
            <span className="lp-property-meta-item">
              <i className="fa-solid fa-map-pin" aria-hidden="true" />
              {property.area}
            </span>
          )}
        </div>

        <Link href={href} className="lp-btn lp-btn--outline lp-btn--sm lp-property-cta">
          View Property
        </Link>
      </div>
    </article>
  );
}
