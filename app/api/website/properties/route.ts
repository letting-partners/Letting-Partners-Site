import { NextRequest, NextResponse } from "next/server";
import { buildWebsiteApiUrl, websiteApiHeaders } from "@/lib/website-api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.toString();
  const upstreamUrl = buildWebsiteApiUrl(`/properties${query ? `?${query}` : ""}`, {
    serverPortal: true,
  });

  try {
    const response = await fetch(upstreamUrl, {
      cache: "no-store",
      headers: websiteApiHeaders(),
    });
    const payload = await response.json().catch(() => ({
      ok: false,
      error: "Unable to load properties.",
    }));

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("Website property proxy error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load properties." },
      { status: 502 },
    );
  }
}
