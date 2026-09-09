import { getWebsiteApiJson, WebsiteApiEnvelope } from "@/lib/website-api";

/**
 * Articles come from the portal, where they are written. The website never
 * stores them, so publishing an article is a single action in one place.
 */

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  bannerImage: string | null;
  bannerImageAlt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  author: string | null;
  focusKeyword: string | null;
};

export type BlogPost = BlogListItem & {
  body: string;
  metaTitle: string | null;
  metaDescription: string | null;
  schema: unknown;
};

/** Matches the `revalidate` the blog pages declare. */
export const BLOG_REVALIDATE_SECONDS = 300;

type ListResponse = WebsiteApiEnvelope & { posts?: BlogListItem[] };
type PostResponse = WebsiteApiEnvelope & { post?: BlogPost };

/** Never throws: a blog outage must not take the page with it. */
export async function fetchBlogPosts(limit = 24): Promise<BlogListItem[]> {
  try {
    const data = await getWebsiteApiJson<ListResponse>(`/blog?limit=${limit}`, undefined, {
      serverPortal: true,
      revalidate: BLOG_REVALIDATE_SECONDS,
    });
    return data?.posts ?? [];
  } catch (error) {
    console.error("Could not load blog articles:", error);
    return [];
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await getWebsiteApiJson<PostResponse>(
      `/blog/${encodeURIComponent(slug)}`,
      undefined,
      { serverPortal: true, revalidate: BLOG_REVALIDATE_SECONDS },
    );
    return data?.post ?? null;
  } catch {
    // A missing article is a 404 from the portal, which is not worth logging.
    return null;
  }
}

export function formatArticleDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
