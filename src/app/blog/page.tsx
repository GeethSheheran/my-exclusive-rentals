import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogErrorState } from "@/components/blog/BlogErrorState";
import { getBlogErrorMessage, getPublishedPosts, type BlogPost } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog: Sri Lanka Travel Stories and Stay Guides",
  description:
    "Explore travel notes, local guides, and stories from the coast and hill country by My Exclusive Rentals.",
  path: "/blog/",
  keywords: [
    "Sri Lanka travel blogs",
    "Nilaveli travel guide",
    "Trincomalee travel stories",
    "Nuwara Eliya travel guide",
  ],
});

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let errorMessage = "";

  try {
    posts = await getPublishedPosts();
  } catch (error) {
    errorMessage = getBlogErrorMessage(error);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-floral-white">
      <Header />

      <section className="px-4 pb-20 pt-40 md:pb-28 md:pt-52">
        <div className="container mx-auto min-w-0 max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-16 md:pb-24 lg:grid-cols-12 lg:items-end">
            <div className="min-w-0 lg:col-span-8">
              <span className="mb-7 block font-sans text-xs font-bold uppercase tracking-[0.4em] text-gold">
                Blog
              </span>
              <h1 className="max-w-5xl break-words font-serif text-5xl leading-[1.02] text-dark sm:text-6xl md:text-8xl md:leading-[0.98] lg:text-9xl">
                Stories from the coast <span className="text-gold">&amp;</span> hills
              </h1>
            </div>
            <div className="min-w-0 lg:col-span-4 lg:pb-2">
              <p className="max-w-full break-words font-sans text-base font-light leading-relaxed text-dark/55 md:max-w-lg md:text-lg">
                Thoughtful travel notes, local discoveries, and inspiration for a slower stay
                across Sri Lanka.
              </p>
            </div>
          </div>

          {errorMessage ? <BlogErrorState message={errorMessage} /> : <BlogListing posts={posts} />}
        </div>
      </section>

      <Footer />
    </main>
  );
}
