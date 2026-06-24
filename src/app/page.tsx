import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { PropertyGrid } from "@/components/home/PropertyGrid";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Luxury Beachfront Vacation Rentals in Nilaveli & Trincomalee",
  description:
    "Book direct with My Exclusive Rentals for luxury beachfront stays in Nilaveli and Trincomalee, plus a premium hill-country retreat in Sri Lanka.",
  path: "/",
  keywords: [
    "Luxury vacation rentals Nilaveli",
    "Trincomalee beachfront apartments",
    "My Exclusive Rentals Sri Lanka",
    "Holiday stays Nilaveli",
  ],
});

export default function Home() {
  const lodgingBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    image: [absoluteUrl("/Hero-Image-9-1-1920x720.jpg")],
    telephone: "+94 77 765 4560",
    email: "info@myexclusiverentals.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nilaveli",
      addressRegion: "Trincomalee",
      addressCountry: "LK",
    },
    areaServed: ["Nilaveli", "Trincomalee", "Nuwara Eliya"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sujee" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "The cleanliness was top-notch, and the house was well-equipped with everything we needed.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Thanuja" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "A perfect getaway! The location was serene, and the property itself was stunning.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Alexandra" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Truly a luxury experience. Every detail was thoughtfully curated, and we will definitely be back.",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/our-stay/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <main className="min-h-screen relative">
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lodgingBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
