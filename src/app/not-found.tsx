import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-floral-white">
      <Header />
      <section className="flex min-h-[80vh] items-center px-4 pb-20 pt-40 text-center">
        <div className="container mx-auto max-w-3xl">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.4em] text-gold">404</span>
          <h1 className="mt-7 font-serif text-6xl leading-none text-dark md:text-8xl">
            This page has wandered away
          </h1>
          <p className="mx-auto mt-8 max-w-xl font-sans text-lg font-light leading-relaxed text-dark/55">
            The page you requested could not be found. Return to our collection and continue
            exploring.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 border-2 border-gold bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Return home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
