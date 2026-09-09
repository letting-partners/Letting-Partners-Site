import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LPIcon from "@/components/LPIcon";
import { fetchBlogPost, fetchBlogPosts, formatArticleDate } from "@/lib/blog";
import { PAGE_BANNER_IMAGES } from "@/lib/images";

const SITE_URL = "https://www.lettingpartners.co.uk";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return { title: "Article not found | Letting Partners", robots: { index: false } };
  }

  const title = post.metaTitle || `${post.title} | Letting Partners`;
  const description = post.metaDescription || post.excerpt || undefined;

  return {
    title,
    description,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: post.bannerImage ? [{ url: post.bannerImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  const others = (await fetchBlogPosts(4)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const published = formatArticleDate(post.publishedAt);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.bannerImage ? [post.bannerImage] : undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    inLanguage: "en-GB",
    author: { "@type": "Organization", name: "Letting Partners", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    ...(post.focusKeyword ? { keywords: post.focusKeyword } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Whatever extra schema the writer added in the portal. */}
      {post.schema != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(post.schema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/*
        The article's own image is the page banner, the same treatment every
        other top-level page gets, rather than a figure below the headline.
      */}
      <section className="lp-page-hero lp-article-hero">
        <Image
          src={post.bannerImage || PAGE_BANNER_IMAGES.blog}
          alt={post.bannerImageAlt ?? post.title}
          fill
          priority
          sizes="100vw"
          className="lp-cover-img"
        />
        <div className="lp-image-overlay" />

        <div className="lp-container lp-page-hero-content">
          <nav className="lp-article-crumbs lp-article-crumbs--light" aria-label="Breadcrumb">
            <Link href="/blog">Insights</Link>
            <span aria-hidden="true">/</span>
            <span>{post.title}</span>
          </nav>

          <h1>{post.title}</h1>
          {post.excerpt && <p className="lp-article-standfirst">{post.excerpt}</p>}

          <div className="lp-blog-meta lp-blog-meta--light">
            {published && <span>{published}</span>}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
            {post.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <article className="lp-article">
        <div className="lp-container lp-article-inner">
          {/*
            The body is sanitised in the portal on save, against an allowed list
            of tags and attributes, so what arrives here cannot execute.
          */}
          <div
            className="lp-article-body prose"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <footer className="lp-article-footer">
            <Link href="/blog" className="lp-text-link">
              <LPIcon name="arrow-right" size={16} />
              All articles
            </Link>
          </footer>
        </div>
      </article>

      {others.length > 0 && (
        <section className="lp-section lp-section--cream">
          <div className="lp-container">
            <div className="lp-section-head" data-lp-animate>
              <span className="lp-kicker">Keep reading</span>
              <h2>More from the team</h2>
            </div>

            <div className="lp-blog-grid" data-lp-animate>
              {others.map((item) => (
                <article key={item.slug} className="lp-blog-card">
                  {item.bannerImage && (
                    <Link href={`/blog/${item.slug}`} className="lp-blog-card-media">
                      <Image
                        src={item.bannerImage}
                        alt={item.bannerImageAlt ?? item.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        className="lp-cover-img"
                      />
                    </Link>
                  )}
                  <div className="lp-blog-card-body">
                    <span className="lp-blog-meta">
                      {formatArticleDate(item.publishedAt)}
                      <span aria-hidden="true">·</span>
                      {item.readingMinutes} min read
                    </span>
                    <h3>
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
