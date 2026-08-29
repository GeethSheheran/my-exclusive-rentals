import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export function ArticleMeta({ post }: { post: BlogPost }) {
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

export function ArticleLoading() {
  return (
    <section className="px-4 pb-24 pt-40 md:pb-32 md:pt-52" aria-busy="true" aria-label="Loading story">
      <div className="container mx-auto max-w-6xl animate-pulse">
        <div className="mb-12 h-3 w-32 bg-gold/20" />
        <div className="h-16 w-full bg-dark/5 md:h-24" />
        <div className="mt-4 h-16 w-3/4 bg-dark/5 md:h-24" />
        <div className="mt-14 aspect-[16/9] bg-dark/5 md:mt-20" />
      </div>
    </section>
  );
}

export function ArticleUnavailable({ message }: { message: string }) {
  return (
    <section className="flex min-h-[70vh] items-center px-4 pb-24 pt-40 text-center" role="alert">
      <div className="container mx-auto max-w-2xl">
        <FileQuestion aria-hidden="true" className="mx-auto text-gold" size={38} strokeWidth={1} />
        <h1 className="mt-7 font-serif text-4xl text-dark md:text-5xl">Story not found</h1>
        <p className="mx-auto mt-5 max-w-xl font-sans font-light leading-relaxed text-dark/55">{message}</p>
        <Link
          href="/blog/"
          className="mt-10 inline-flex items-center gap-3 border-2 border-gold bg-gold px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Blog
        </Link>
      </div>
    </section>
  );
}
