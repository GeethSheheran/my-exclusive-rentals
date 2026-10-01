import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogArticleClient } from "@/components/blog/BlogArticleClient";

// One exported shell serves every article via Apache. No canonical or noindex
// here: public article URLs receive their own metadata after Firebase loads.
export const metadata: Metadata = {
  title: "Travel story",
  description: "Travel stories and local guides from My Exclusive Rentals.",
};

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
