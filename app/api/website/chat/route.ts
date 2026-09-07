import { NextRequest, NextResponse } from "next/server";
import { buildWebsiteApiUrl, websiteApiHeaders } from "@/lib/website-api";

/**
 * Proxies the property chat widget through to the portal.
 *
 * Going through the server keeps the portal origin and API key out of the
 * browser, and means the widget only ever talks to its own origin.
 */

function chatUrl(query = "") {
  // The chat endpoint sits under /api/public on the portal, not /api/website,
  // so the configured website base is rewritten for this one call.
  const base = buildWebsiteApiUrl("/chat", { serverPortal: true }).replace(
    "/api/website/chat",
    "/api/public/chat",
  );
  return query ? `${base}?${query}` : base;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(chatUrl(), {
      method: "POST",
      cache: "no-store",
      headers: { ...websiteApiHeaders(), "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => ({
      ok: false,
      error: "Unable to send the message.",
    }));

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("Chat proxy error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send the message right now." },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest) {
  const visitorToken = request.nextUrl.searchParams.get("visitorToken");
  if (!visitorToken) {
    return NextResponse.json({ ok: false, error: "Missing token." }, { status: 400 });
  }

  try {
    const response = await fetch(
      chatUrl(`visitorToken=${encodeURIComponent(visitorToken)}`),
      { cache: "no-store", headers: websiteApiHeaders() },
    );

    const payload = await response.json().catch(() => ({
      ok: false,
      error: "Unable to load the conversation.",
    }));

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    console.error("Chat proxy read error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load the conversation." },
      { status: 502 },
    );
  }
}
