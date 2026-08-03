import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { BlogImage } from "@/components/blog/BlogImage";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

function PostMeta({ post }: { post: BlogPost }) {
  const date = formatBlogDate(post.publishedAt);
  const items = [post.category, date].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-dark/45">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-3">
          {index > 0 && <span aria-hidden="true" className="h-px w-5 bg-gold/60" />}
          {item}
        </span>
      ))}
    </div>
  );
}

function FeaturedStory({ post }: { post: BlogPost }) {
  return (
    <article className="border-y border-dark/10 py-8 md:py-12">
      <Link
        href={`/blog/${post.slug}/`}
        className="group grid grid-cols-1 gap-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-8 lg:grid-cols-12 lg:items-center lg:gap-16"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-soft-gray lg:col-span-7 lg:aspect-[16/10]">
          <BlogImage
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            className="transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>

        <div className="lg:col-span-5">
          <span className="mb-6 block font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            Featured story
          </span>
          <PostMeta post={post} />
          <h2 className="mt-6 break-words font-serif text-4xl leading-[1.06] text-dark transition-colors duration-300 group-hover:text-gold md:text-5xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-7 max-w-xl font-sans text-base font-light leading-relaxed text-dark/60 md:text-lg">
              {post.excerpt}
            </p>
          )}
          <span className="mt-9 inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-dark">
            Read the story
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

function StoryCard({ post }: { post: BlogPost }) {
  return (
    <article className="group border-b border-dark/10 pb-10">
      <Link
        href={`/blog/${post.slug}/`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-8"
      >
        <div className="relative mb-7 aspect-[4/3] overflow-hidden bg-soft-gray">
          <BlogImage
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>
        <PostMeta post={post} />
        <h2 className="mt-5 break-words font-serif text-3xl leading-tight text-dark transition-colors duration-300 group-hover:text-gold md:text-4xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-4 line-clamp-3 font-sans text-base font-light leading-relaxed text-dark/55">
            {post.excerpt}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          Continue reading
          <ArrowUpRight aria-hidden="true" size={15} />
        </span>
      </Link>
    </article>
  );
}

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="border-y border-dark/10 py-24 text-center" role="status">
        <BookOpen aria-hidden="true" className="mx-auto text-gold" size={34} strokeWidth={1} />
        <h2 className="mt-6 break-words font-serif text-3xl text-dark md:text-4xl">Stories are on their way</h2>
        <p className="mx-auto mt-4 max-w-md font-sans font-light leading-relaxed text-dark/55">
          There are no published blog posts yet. Please return soon for travel notes,
          local guides, and stories from our stays.
        </p>
      </div>
    );
  }

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = posts.filter((post) => post.id !== featuredPost.id);

  return (
    <>
      <FeaturedStory post={featuredPost} />
      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 pt-16 md:grid-cols-2 md:pt-24 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
          {remainingPosts.map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
