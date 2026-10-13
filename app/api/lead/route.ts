import { NextResponse } from "next/server";
import { handleLead } from "@/lib/lead";

/** POST /api/lead — receives the lead form and notifies the firm by email, SMS and/or CRM webhook. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const result = await handleLead(body as Record<string, never>, { ip });
  return NextResponse.json(result.body, { status: result.status });
}
