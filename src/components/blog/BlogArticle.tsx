import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogImage } from "@/components/blog/BlogImage";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import type { BlogPost } from "@/lib/blog";
import { buildBlogJsonLd } from "@/lib/blog-seo";

export function BlogArticle({ post }: { post: BlogPost }) {
  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const jsonLd = buildBlogJsonLd(post);

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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
