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
      <Hero />
      <PropertyGrid />
      <Features />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
