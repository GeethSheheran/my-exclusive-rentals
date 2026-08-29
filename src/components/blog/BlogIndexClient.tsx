"use client";

import { useEffect, useState } from "react";
import { BlogErrorState } from "@/components/blog/BlogErrorState";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogListingSkeleton } from "@/components/blog/BlogListingSkeleton";
import {
  getBlogErrorMessage,
  getPublishedPosts,
  type BlogPost,
} from "@/lib/blog";

export function BlogIndexClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    getPublishedPosts()
      .then((publishedPosts) => {
        if (isActive) setPosts(publishedPosts);
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

  if (isLoading) return <BlogListingSkeleton />;
  if (errorMessage) return <BlogErrorState message={errorMessage} />;

  return <BlogListing posts={posts} />;
}
