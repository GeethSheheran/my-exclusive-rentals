import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getPublishedPostBySlug } from "@/lib/blog";
import { buildBlogMetadata } from "@/lib/blog-seo";

type BlogArticlePageProps = { params: Promise<{ slug: string }> };

// Slugs are resolved at request time, including posts published after deployment.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return buildBlogMetadata(post);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden bg-floral-white">
      <Header />
      <BlogArticle post={post} />
      <Footer />
    </main>
  );
}
