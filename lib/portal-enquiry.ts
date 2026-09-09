import { buildWebsiteApiUrl, websiteApiHeaders, websiteApiKeyConfigured } from "@/lib/website-api";

/**
 * Forwards a website form submission to the portal, where it becomes a
 * customer conversation the team can answer and assign.
 *
 * Deliberately never throws and never blocks the response. The visitor has
 * filled in a form and the confirmation emails have already gone; failing
 * their submission because the portal is unreachable would lose the lead
 * outright, which is worse than a record arriving late.
 */
export async function sendEnquiryToPortal(input: {
  form: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  /** Any additional fields the form collected. */
  details?: Record<string, string | null | undefined>;
}): Promise<void> {
  if (!websiteApiKeyConfigured()) {
    console.error(
      `WEBSITE_API_KEY is not set, so the ${input.form} form is not reaching the portal.`,
    );
    return;
  }

  const details = Object.fromEntries(
    Object.entries(input.details ?? {})
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([key, value]) => [key, String(value).trim()]),
  );

  try {
    const response = await fetch(buildWebsiteApiUrl("/enquiry", { serverPortal: true }), {
      method: "POST",
      cache: "no-store",
      headers: { ...websiteApiHeaders(), "content-type": "application/json" },
      body: JSON.stringify({
        form: input.form,
        name: input.name ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        message: input.message ?? null,
        details,
      }),
    });

    if (!response.ok) {
      console.error(
        `Portal rejected a ${input.form} enquiry:`,
        response.status,
        await response.text(),
      );
    }
  } catch (error) {
    console.error(`Could not send the ${input.form} enquiry to the portal:`, error);
  }
}
