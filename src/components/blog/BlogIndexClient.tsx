"use client";

import { BlogListing } from "@/components/blog/BlogListing";
import { BlogRetry } from "@/components/blog/BlogRetry";
import { useLiveBlog } from "@/components/blog/useLiveBlog";
import { getPublishedPosts, type BlogPost } from "@/lib/blog";

export function BlogIndexClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { data, error, retry } = useLiveBlog(getPublishedPosts, initialPosts);
  return (
    <>
      {error && <BlogRetry onRetry={retry} />}
      <BlogListing posts={data ?? initialPosts} />
    </>
  );
}
