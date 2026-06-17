import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);
  const area = searchParams.get("area") ?? "";

  // Stub: return empty list until a CMS/property feed is connected
  return NextResponse.json({ ok: true, properties: [], total: 0, limit, area });
}
