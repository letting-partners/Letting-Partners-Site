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

/**
 * Whether the shared key is available on this side of the wire.
 *
 * Only meaningful on the server: the key is deliberately never shipped to the
 * browser, which reaches the portal through this site's own proxy routes.
 */
export function websiteApiKeyConfigured() {
  if (typeof window !== "undefined") return true;
  return Boolean(process.env.WEBSITE_API_KEY || process.env.NEXT_PUBLIC_WEBSITE_API_KEY);
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

export class WebsiteApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "WebsiteApiError";
    this.status = status;
  }
}

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
  const envelope = (payload ?? {}) as WebsiteApiEnvelope;

  /*
   * A failed call must throw rather than hand back the error envelope. It used
   * to return it, so a caller reading `data.properties` got undefined and
   * rendered "no properties found" - a broken connection was indistinguishable
   * from an empty book, which is how a missing API key stayed invisible.
   */
  if (!response.ok || envelope.ok === false) {
    throw new WebsiteApiError(
      envelope.error || `API request failed with status ${response.status}.`,
      response.status,
    );
  }

  return payload as T;
}
