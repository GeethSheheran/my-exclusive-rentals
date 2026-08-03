import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogImage } from "@/components/blog/BlogImage";
import { BlogErrorState } from "@/components/blog/BlogErrorState";
import {
  formatBlogDate,
  getBlogErrorMessage,
  getPublishedPostBySlug,
  type BlogPost,
} from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const getPost = cache(getPublishedPostBySlug);

function getCanonicalUrl(post: BlogPost): string {
  return post.canonicalUrl || absoluteUrl(`/blog/${post.slug}/`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    if (!post) {
      return { title: "Story Not Found", robots: { index: false, follow: false } };
    }

    const title = post.seoTitle || post.title;
    const description = post.metaDescription || post.excerpt;
    const canonical = getCanonicalUrl(post);

    return {
      title,
      description: description || undefined,
      authors: post.author ? [{ name: post.author }] : undefined,
      alternates: { canonical },
      openGraph: {
        title,
        description: description || undefined,
        type: "article",
        url: canonical,
        siteName: SITE_NAME,
        publishedTime: post.publishedAt || undefined,
        modifiedTime: post.updatedAt || undefined,
        authors: post.author ? [post.author] : undefined,
        images: post.imageUrl
          ? [{ url: post.imageUrl, alt: post.imageAlt || post.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: description || undefined,
        images: post.imageUrl ? [post.imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: "Blog Temporarily Unavailable",
      robots: { index: false, follow: false },
    };
  }
}

function ArticleMeta({ post }: { post: BlogPost }) {
  const date = formatBlogDate(post.publishedAt);
  const items = [post.category, date, post.author ? `By ${post.author}` : ""].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-dark/45">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-4">
          {index > 0 && <span aria-hidden="true" className="h-px w-6 bg-gold/60" />}
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  let errorMessage = "";

  try {
    post = await getPost(slug);
  } catch (error) {
    errorMessage = getBlogErrorMessage(error);
  }

  if (!errorMessage && !post) notFound();

  if (!post) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-floral-white">
        <Header />
        <section className="px-4 pb-24 pt-44">
          <div className="container mx-auto max-w-5xl">
            <BlogErrorState message={errorMessage} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const canonical = getCanonicalUrl(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    image: post.imageUrl || undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
      : undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    mainEntityOfPage: canonical,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-floral-white">
      <Header />

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
            <div className="mt-9">
              <ArticleMeta post={post} />
            </div>
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
                  <span
                    key={tag}
                    className="border border-gold/30 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-dark/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
