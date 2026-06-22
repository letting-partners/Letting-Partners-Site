import { NextRequest, NextResponse } from "next/server";
import { buildWebsiteApiUrl, websiteApiHeaders } from "@/lib/website-api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const upstreamUrl = buildWebsiteApiUrl(`/properties/${encodeURIComponent(id)}`, {
    serverPortal: true,
  });

  try {
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
