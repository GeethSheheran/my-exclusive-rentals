"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BlogRetry } from "@/components/blog/BlogRetry";
import { useLiveBlog } from "@/components/blog/useLiveBlog";
import { getPublishedPostBySlug } from "@/lib/blog";
import { syncBlogMetadata, markArticleMissing } from "@/lib/blog-document";

async function loadRequestedArticle() {
  const slug = window.location.pathname.split("/").filter(Boolean)[1] || "";
  return getPublishedPostBySlug(decodeURIComponent(slug));
}

export function BlogArticleClient() {
  const { data: post, loading, error, retry } = useLiveBlog(loadRequestedArticle);

  useEffect(() => {
    if (post) return syncBlogMetadata(post);
    if (post === null) return markArticleMissing();
  }, [post]);

  if (post) return <>{error && <div className="px-4 pt-40"><BlogRetry onRetry={retry} /></div>}<BlogArticle post={post} /></>;

  return (
    <section className="container mx-auto min-h-[70vh] max-w-4xl px-4 pb-24 pt-40 md:pt-52">
      {loading ? (
        <p role="status" className="font-sans text-dark/60">Loading story…</p>
      ) : error ? (
        <BlogRetry onRetry={retry} />
      ) : (
        <>
          <h1 className="font-serif text-4xl text-dark">Story not found</h1>
          <p className="mt-5 font-sans text-dark/60">This story is unavailable or has not been published yet.</p>
          <Link href="/blog/" className="mt-8 inline-block text-gold underline underline-offset-4">Back to Blog</Link>
        </>
      )}
    </section>
  );
}
