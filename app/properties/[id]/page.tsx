import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROPERTY_FALLBACK_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Property Details | Letting Partners",
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Placeholder — replace with real data fetch once CMS is connected
  const fallbackImage = PROPERTY_FALLBACK_IMAGES[Number(id.charCodeAt(0)) % PROPERTY_FALLBACK_IMAGES.length];

  return (
    <section className="lp-section" style={{ paddingTop: "140px" }}>
      <div className="lp-container">
        <div className="lp-empty-state" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div style={{ width: "100%", maxWidth: 480, margin: "0 auto 2rem", position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden" }}>
            <Image src={fallbackImage} alt="Property" fill style={{ objectFit: "cover" }} />
          </div>
          <h1 style={{ marginBottom: "0.5rem" }}>Property #{id}</h1>
          <p>Full property details are coming soon. Please contact us for more information.</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="lp-btn lp-btn--gold">Contact Us</Link>
            <Link href="/properties" className="lp-btn lp-btn--outline">Browse All Properties</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
