"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogImage } from "@/components/blog/BlogImage";
import {
  ArticleLoading,
  ArticleMeta,
  ArticleUnavailable,
} from "@/components/blog/BlogArticleStates";
import {
  getBlogErrorMessage,
  getPublishedPostBySlug,
  type BlogPost,
} from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

function getRequestedSlug(): string {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const pathSlug = pathSegments[0] === "blog" ? pathSegments[1] : "";

  if (pathSlug && pathSlug !== "__article") {
    try {
      return decodeURIComponent(pathSlug).trim();
    } catch {
      return "";
    }
  }

  return new URLSearchParams(window.location.search).get("slug")?.trim() ?? "";
}

function getCanonicalUrl(post: BlogPost): string {
  return post.canonicalUrl || absoluteUrl(`/blog/${post.slug}/`);
}

function setMetaContent(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

function syncDocumentMetadata(post: BlogPost) {
  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = getCanonicalUrl(post);

  document.title = `${title} | ${SITE_NAME}`;
  setMetaContent('meta[name="description"]', "content", description);
  setMetaContent('meta[property="og:title"]', "content", title);
  setMetaContent('meta[property="og:description"]', "content", description);
  setMetaContent('meta[property="og:url"]', "content", canonical);
  setMetaContent('meta[name="twitter:title"]', "content", title);
  setMetaContent('meta[name="twitter:description"]', "content", description);

  if (post.imageUrl) {
    setMetaContent('meta[property="og:image"]', "content", post.imageUrl);
    setMetaContent('meta[name="twitter:image"]', "content", post.imageUrl);
  }

  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonical);
}

export function BlogArticleClient() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const slug = getRequestedSlug();

    const postRequest = slug ? getPublishedPostBySlug(slug) : Promise.resolve(null);

    postRequest
      .then((publishedPost) => {
        if (!isActive) return;
        if (!publishedPost) {
          setErrorMessage(
            slug
              ? "This story is unavailable or has not been published yet."
              : "The story URL is incomplete. Return to the Blog and choose a published story.",
          );
          return;
        }

        setPost(publishedPost);
        syncDocumentMetadata(publishedPost);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(getBlogErrorMessage(error));
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) return <ArticleLoading />;
  if (!post) return <ArticleUnavailable message={errorMessage} />;

  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.imageUrl || undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    mainEntityOfPage: getCanonicalUrl(post),
  };

  return (
    <article className="px-4 pb-24 pt-40 md:pb-32 md:pt-52">
      <div className="container mx-auto max-w-7xl">
        <Link
          href="/blog/"
          className="mb-12 inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dark/50 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Blog
        </Link>

        <header className="mx-auto max-w-6xl text-left">
          <h1 className="break-words font-serif text-4xl leading-[1.02] text-dark md:text-6xl lg:text-7xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-8 max-w-3xl font-sans text-lg font-light leading-relaxed text-dark/55 md:text-xl">
              {post.excerpt}
            </p>
          )}
          <div className="mt-9"><ArticleMeta post={post} /></div>
        </header>

        <div className="relative mx-auto mt-14 aspect-[16/9] max-w-6xl overflow-hidden bg-soft-gray md:mt-20">
          <BlogImage
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        </div>

        <div className="mx-auto mt-16 max-w-6xl border-t border-dark/10 pt-12 md:mt-24 md:pt-16">
          {paragraphs.length > 0 ? (
            <div className="space-y-8">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="break-words whitespace-pre-line font-sans text-lg font-light leading-[1.9] text-dark/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="font-sans text-lg font-light leading-relaxed text-dark/55">
              This story does not have any published content yet.
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="mt-16 flex flex-wrap gap-3 border-t border-dark/10 pt-8" aria-label="Article tags">
              {post.tags.map((tag) => (
                <span key={tag} className="border border-gold/30 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-dark/55">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
