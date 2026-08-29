import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogArticleClient } from "@/components/blog/BlogArticleClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Travel Story",
  description: "Travel notes, local guides, and stories from My Exclusive Rentals.",
  path: "/blog/",
});

export function generateStaticParams() {
  return [{ slug: "__article" }];
}

export default function BlogArticlePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-floral-white">
      <Header />
      <BlogArticleClient />
      <Footer />
    </main>
  );
}
