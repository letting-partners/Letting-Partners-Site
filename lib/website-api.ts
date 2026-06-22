const SITE_API_BASE = "/api/website";
const PORTAL_API_BASE = "https://portal.lettingpartners.co.uk/api/website";

type WebsiteApiOptions = {
  serverPortal?: boolean;
};

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/$/, "");
}

export function buildWebsiteApiUrl(path: string, options: WebsiteApiOptions = {}) {
  const configuredBase =
    typeof window === "undefined"
      ? process.env.WEBSITE_API_BASE_URL || process.env.NEXT_PUBLIC_WEBSITE_API_BASE_URL
      : process.env.NEXT_PUBLIC_WEBSITE_API_BASE_URL;

  const fallbackBase =
    typeof window === "undefined" && options.serverPortal ? PORTAL_API_BASE : SITE_API_BASE;
  const baseUrl = normalizeBaseUrl(configuredBase || fallbackBase);

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function websiteApiHeaders() {
  const headers: Record<string, string> = { accept: "application/json" };
  const apiKey =
    typeof window === "undefined"
      ? process.env.WEBSITE_API_KEY || process.env.NEXT_PUBLIC_WEBSITE_API_KEY
      : process.env.NEXT_PUBLIC_WEBSITE_API_KEY;

  if (apiKey) {
    headers["x-website-api-key"] = apiKey;
  }

  return headers;
}

export type WebsiteApiEnvelope = {
  error?: string;
  ok?: boolean;
};

export async function getWebsiteApiJson<T>(
  path: string,
  signal?: AbortSignal,
  options: WebsiteApiOptions = {},
) {
  const response = await fetch(buildWebsiteApiUrl(path, options), {
    cache: "no-store",
    headers: websiteApiHeaders(),
    signal,
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    if (payload && typeof payload === "object") return payload as T;
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return payload as T;
}
