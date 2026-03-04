import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { PropertyGrid } from '@/components/home/PropertyGrid';
import { Features } from '@/components/home/Features';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Sticky Hero Container */}
      <div className="sticky top-0 h-screen z-0">
        <Hero />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 bg-white">
        <PropertyGrid />
        <Features />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
