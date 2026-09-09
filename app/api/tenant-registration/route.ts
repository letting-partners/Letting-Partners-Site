import { NextRequest, NextResponse } from "next/server";
import { buildAutoReply, buildTenantAdminEmail } from "@/lib/email-template";
import { getTenantRegistrationRecipient, sendAutoReply, sendMail } from "@/lib/mailer";
import { buildWebsiteApiUrl, websiteApiHeaders, websiteApiKeyConfigured } from "@/lib/website-api";

/** The website's free-text property type mapped to what the portal stores. */
function portalPropertyType(value?: string | null): "HOUSE" | "FLAT" | "STUDIO_FLAT" | null {
  const normalized = value?.toLowerCase() ?? "";
  if (normalized.includes("studio")) return "STUDIO_FLAT";
  if (normalized.includes("flat") || normalized.includes("apartment")) return "FLAT";
  if (normalized.includes("house") || normalized.includes("hmo")) return "HOUSE";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
    }

    const recipient = getTenantRegistrationRecipient();
    const subject = `Tenant Registration — ${body.name}`;

    const text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone}`,
      body.preferredArea ? `Preferred Area: ${body.preferredArea}` : null,
      body.propertyType ? `Property Type: ${body.propertyType}` : null,
      body.maxBudget ? `Max Budget: £${body.maxBudget} pcm` : null,
      body.moveDate ? `Preferred Move Date: ${body.moveDate}` : null,
      body.message ? `\nAdditional Requirements:\n${body.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    /*
     * Put the lead in the portal as well as the inbox, so it can be assigned
     * and matched rather than read once and forgotten.
     *
     * Deliberately not fatal: if the portal is unreachable the registration
     * still succeeds and the emails still go, because losing a tenant lead to
     * an outage is worse than a record arriving late.
     */
    const toPortal = (async () => {
      if (!websiteApiKeyConfigured()) {
        console.error("WEBSITE_API_KEY is not set, so tenant registrations are not reaching the portal.");
        return;
      }

      try {
        const response = await fetch(
          buildWebsiteApiUrl("/tenant-registration", { serverPortal: true }),
          {
            method: "POST",
            cache: "no-store",
            headers: { ...websiteApiHeaders(), "content-type": "application/json" },
            body: JSON.stringify({
              name: body.name,
              email: body.email,
              phone: body.phone,
              area: body.preferredArea ?? null,
              requirements: body.message ?? null,
              maxBudget: body.maxBudget ?? null,
              moveInDate: body.moveDate ?? null,
              propertyType: portalPropertyType(body.propertyType),
            }),
          },
        );

        if (!response.ok) {
          console.error("Portal rejected a tenant registration:", response.status, await response.text());
        }
      } catch (error) {
        console.error("Could not send the tenant registration to the portal:", error);
      }
    })();

    await Promise.all([
      toPortal,
      // Admin notification
      sendMail({
        to: recipient,
        subject,
        text,
        html: buildTenantAdminEmail(body),
        replyTo: body.email,
      }),
      // Customer auto-reply
      sendAutoReply({
        to: body.email,
        subject: "Your tenant registration is confirmed — Letting Partners",
        html: buildAutoReply(body.name, "tenant"),
        text: `Hi ${body.name},\n\nThank you for registering with Letting Partners. We'll match your requirements to suitable properties and get back to you within 24 hours.\n\nCall us: 07782 273674\nEmail: info@lettingpartners.co.uk\n\nWarm regards,\nThe Letting Partners Team`,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[tenant-registration route]", err);
    return NextResponse.json({ error: "Failed to submit registration. Please try again later." }, { status: 500 });
  }
}
