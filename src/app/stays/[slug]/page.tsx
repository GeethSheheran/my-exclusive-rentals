import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVillaBySlug, type VillaData, VILLAS } from "@/data/villas";
import { VillaPageClient } from "./VillaPageClient";
import { SITE_NAME, absoluteUrl, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return VILLAS.map((villa) => ({
    slug: villa.slug,
  }));
}

function getVillaMetaDescription(villa: VillaData): string {
  const intro = villa.description[0] ?? villa.tagline;
  if (intro.length <= 155) {
    return intro;
  }

  return `${intro.slice(0, 152).trim()}...`;
}

function getVillaAddress(villa: VillaData) {
  const [addressLocality = "Nilaveli", addressRegion = "Trincomalee"] =
    villa.location.split(",").map((part) => part.trim());

  return {
    "@type": "PostalAddress",
    addressLocality,
    addressRegion,
    addressCountry: "LK",
  };
}

function buildVacationRentalSchema(villa: VillaData) {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: `${villa.name} | ${SITE_NAME}`,
    url: absoluteUrl(`/stays/${villa.slug}/`),
    image: [
      absoluteUrl(villa.heroImage),
      ...villa.galleryImages.slice(0, 7).map((image) => absoluteUrl(image)),
    ],
    description: getVillaMetaDescription(villa),
    address: getVillaAddress(villa),
    telephone: "+94 77 765 4560",
    email: "info@myexclusiverentals.com",
    numberOfRooms: villa.stats.bedrooms,
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
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: villa.stats.sleeps,
      unitText: "guests",
    },
  };
}

function buildBreadcrumbSchema(villa: VillaData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Stay",
        item: absoluteUrl("/our-stay/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: villa.name,
        item: absoluteUrl(`/stays/${villa.slug}/`),
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    return {
      title: "Stay Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${villa.name} Vacation Rental in ${villa.location}`,
    description: getVillaMetaDescription(villa),
    path: `/stays/${villa.slug}/`,
    image: villa.heroImage,
    keywords: [
      `${villa.name} rental`,
      `${villa.location} vacation rental`,
      "Sri Lanka luxury vacation rental",
      "My Exclusive Rentals stays",
    ],
  });
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    notFound();
  }

  const vacationRentalSchema = buildVacationRentalSchema(villa);
  const breadcrumbSchema = buildBreadcrumbSchema(villa);

  return (
    <>
      <VillaPageClient villa={villa} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(vacationRentalSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

