import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LPIcon from "@/components/LPIcon";
import { fetchBlogPosts, formatArticleDate } from "@/lib/blog";
import { PAGE_BANNER_IMAGES, PROPERTY_FALLBACK_IMAGES } from "@/lib/images";

const SITE_URL = "https://www.lettingpartners.co.uk";

export const metadata: Metadata = {
  title: "Property Advice & Lettings Insights | Letting Partners",
  description:
    "Guides for landlords and tenants on letting, managing, compliance, deposits and renting well, written by the Letting Partners team.",
  alternates: { canonical: "/blog" },
};

/** Articles change when the team publishes, not when the site is deployed. */
export const revalidate = 300;

function fallbackImage(slug: string): string {
  const index =
    Math.abs(slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0)) %
    PROPERTY_FALLBACK_IMAGES.length;
  return PROPERTY_FALLBACK_IMAGES[index];
}

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts(24);
  const [lead, ...rest] = posts;

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Letting Partners Insights",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt ?? undefined,
      dateModified: post.updatedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Same banner treatment as every other top-level page. */}
      <section className="lp-page-hero">
        <Image
          src={PAGE_BANNER_IMAGES.blog}
          alt="A bright living room in a let property"
          fill
          priority
          sizes="100vw"
          className="lp-cover-img"
        />
        <div className="lp-image-overlay" />
        <div className="lp-container lp-page-hero-content">
          <span className="lp-kicker lp-kicker--light">Insights</span>
          <h1>Property advice worth reading.</h1>
          <p>
            Practical guidance for landlords and tenants on letting, managing, compliance and
            getting a tenancy right, from the team who do it every day.
          </p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          {posts.length === 0 ? (
            <div className="lp-empty-state" style={{ paddingBlock: "3rem" }}>
              <h2 style={{ marginBottom: "0.4rem" }}>No articles yet</h2>
              <p>We are writing the first ones now. Check back shortly.</p>
              <Link href="/properties" className="lp-btn lp-btn--outline">
                Browse Properties
              </Link>
            </div>
          ) : (
            <>
              {lead && (
                <Link href={`/blog/${lead.slug}`} className="lp-blog-lead" data-lp-animate>
                  <span className="lp-blog-lead-media">
                    <Image
                      src={lead.bannerImage || fallbackImage(lead.slug)}
                      alt={lead.bannerImageAlt ?? lead.title}
                      fill
                      priority
                      sizes="(max-width: 900px) 100vw, 60vw"
                      className="lp-cover-img"
                    />
                  </span>

                  <span className="lp-blog-lead-body">
                    <span className="lp-kicker">Latest</span>
                    <h2>{lead.title}</h2>
                    {lead.excerpt && <p>{lead.excerpt}</p>}
                    <span className="lp-blog-meta">
                      {formatArticleDate(lead.publishedAt)}
                      <span aria-hidden="true">·</span>
                      {lead.readingMinutes} min read
                    </span>
                    <span className="lp-text-link">
                      Read the article
                      <LPIcon name="arrow-right" size={16} />
                    </span>
                  </span>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="lp-blog-grid" data-lp-animate>
                  {rest.map((post) => (
                    <article key={post.slug} className="lp-blog-card">
                      <Link href={`/blog/${post.slug}`} className="lp-blog-card-media">
                        <Image
                          src={post.bannerImage || fallbackImage(post.slug)}
                          alt={post.bannerImageAlt ?? post.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                          className="lp-cover-img"
                        />
                      </Link>

                      <div className="lp-blog-card-body">
                        <span className="lp-blog-meta">
                          {formatArticleDate(post.publishedAt)}
                          <span aria-hidden="true">·</span>
                          {post.readingMinutes} min read
                        </span>
                        <h3>
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        {post.excerpt && <p>{post.excerpt}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="lp-section lp-section--cta">
        <div className="lp-container">
          <div className="lp-cta-band" data-lp-animate>
            <div>
              <span className="lp-kicker lp-kicker--light">Talk to us</span>
              <h2>Have a property question we have not covered?</h2>
              <p>Ask the team directly. We answer landlord and tenant questions every day.</p>
            </div>
            <div className="lp-cta-actions">
              <Link href="/contact" className="lp-btn lp-btn--gold">
                Contact Us
                <LPIcon name="arrow-right" size={18} />
              </Link>
              <Link href="/properties" className="lp-btn lp-btn--glass">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
