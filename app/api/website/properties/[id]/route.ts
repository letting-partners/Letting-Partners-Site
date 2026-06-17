import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Stub: return 404 until a CMS/property feed is connected
  return NextResponse.json({ error: `Property ${id} not found.` }, { status: 404 });
}
