import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Luxury Stays in Nilaveli and Sri Lanka",
  description:
    "Learn the story behind My Exclusive Rentals and how we curate premium beachfront and hill-country stays across Sri Lanka.",
  path: "/about-us/",
  keywords: [
    "About My Exclusive Rentals",
    "Luxury stays Sri Lanka",
    "Nilaveli vacation rental host",
    "Trincomalee rental company",
  ],
});

export default function AboutPage() {
  return <AboutPageClient />;
}

