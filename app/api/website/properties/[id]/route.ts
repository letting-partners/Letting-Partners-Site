import { NextRequest, NextResponse } from "next/server";
import {
  buildWebsiteApiUrl,
  websiteApiHeaders,
  websiteApiKeyConfigured,
} from "@/lib/website-api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const upstreamUrl = buildWebsiteApiUrl(`/properties/${encodeURIComponent(id)}`, {
    serverPortal: true,
  });

  try {
    if (!websiteApiKeyConfigured()) {
      console.error(
        "WEBSITE_API_KEY is not set on the website deployment, so the portal " +
          "rejects every request and no listings can be shown.",
      );
      return NextResponse.json(
        { ok: false, error: "The property service is not configured." },
        { status: 503 },
      );
    }

    const response = await fetch(upstreamUrl, {
      cache: "no-store",
      headers: websiteApiHeaders(),
    });
    const payload = await response.json().catch(() => ({
      ok: false,
      error: "Unable to load property.",
    }));

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("Website property detail proxy error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load property." },
      { status: 502 },
    );
  }
}
