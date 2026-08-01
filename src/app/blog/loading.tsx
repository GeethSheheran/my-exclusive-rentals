import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-floral-white">
      <Header />
      <section className="px-4 pb-20 pt-40 md:pb-28 md:pt-52" aria-busy="true" aria-label="Loading blog stories">
        <div className="container mx-auto max-w-7xl animate-pulse">
          <div className="max-w-5xl pb-16 md:pb-24">
            <div className="mb-8 h-3 w-28 bg-gold/20" />
            <div className="h-16 w-full max-w-4xl bg-dark/5 md:h-24" />
            <div className="mt-4 h-16 w-3/5 bg-dark/5 md:h-24" />
          </div>
          <div className="grid grid-cols-1 gap-10 border-y border-dark/10 py-8 md:py-12 lg:grid-cols-12 lg:gap-16">
            <div className="aspect-[16/10] bg-dark/5 lg:col-span-7" />
            <div className="space-y-6 lg:col-span-5 lg:py-10">
              <div className="h-3 w-32 bg-gold/20" />
              <div className="h-12 w-full bg-dark/5" />
              <div className="h-12 w-4/5 bg-dark/5" />
              <div className="h-4 w-full bg-dark/5" />
              <div className="h-4 w-3/4 bg-dark/5" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
