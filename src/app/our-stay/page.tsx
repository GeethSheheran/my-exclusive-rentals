import type { Metadata } from "next";
import { OurStayPageClient } from "./OurStayPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Stays: Beachfront and Hill-Country Rentals in Sri Lanka",
  description:
    "Explore all My Exclusive Rentals properties, including luxury beachfront apartments in Nilaveli and premium escapes near Trincomalee.",
  path: "/our-stay/",
  keywords: [
    "Our stays My Exclusive Rentals",
    "Nilaveli beachfront apartments",
    "Luxury rentals Trincomalee",
    "Sri Lanka holiday apartments",
  ],
});

export default function OurStayPage() {
  return <OurStayPageClient />;
}

