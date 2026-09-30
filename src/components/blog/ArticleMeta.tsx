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
