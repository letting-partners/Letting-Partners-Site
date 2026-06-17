"use client";

import { useEffect, useState } from "react";
import WebsitePropertyCard, { WebsiteProperty } from "@/components/WebsitePropertyCard";
import { getWebsiteApiJson, WebsiteApiEnvelope } from "@/lib/website-api";

type ApiResponse = WebsiteApiEnvelope & {
  properties?: WebsiteProperty[];
};

type Props = {
  limit?: number;
  area?: string;
  showSearch?: boolean;
};

export default function PropertiesGrid({ limit, area, showSearch }: Props) {
  const [properties, setProperties] = useState<WebsiteProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    const params = new URLSearchParams();
    if (limit) params.set("limit", String(limit));
    if (area) params.set("area", area);

    getWebsiteApiJson<ApiResponse>(`/properties?${params}`, controller.signal)
      .then((data) => {
        setProperties(data?.properties ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") {
          setError("Unable to load properties at this time.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [limit, area]);

  const filtered = search
    ? properties.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.address?.toLowerCase().includes(search.toLowerCase()) ||
          p.area?.toLowerCase().includes(search.toLowerCase())
      )
    : properties;

  if (loading) {
    return (
      <div className="lp-properties-grid">
        {Array.from({ length: limit ?? 6 }).map((_, i) => (
          <div key={i} className="lp-skeleton lp-skeleton--card" aria-hidden="true" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="lp-empty-state">
        <i className="fa-solid fa-triangle-exclamation lp-empty-icon" aria-hidden="true" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {showSearch && (
        <div className="lp-properties-search-bar">
          <div className="lp-properties-search-input-wrap">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              type="search"
              className="lp-form-input"
              placeholder="Search by title, address, or area…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search properties"
            />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="lp-empty-state">
          <i className="fa-solid fa-house-circle-xmark lp-empty-icon" aria-hidden="true" />
          <h3>No properties found</h3>
          <p>Check back soon — we are regularly adding new listings.</p>
        </div>
      ) : (
        <div className="lp-properties-grid">
          {filtered.map((p) => (
            <WebsitePropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </>
  );
}
