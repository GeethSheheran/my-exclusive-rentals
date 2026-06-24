import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact My Exclusive Rentals in Nilaveli, Sri Lanka",
  description:
    "Contact My Exclusive Rentals for direct booking inquiries, availability, and personalized support for your stay in Nilaveli and Trincomalee.",
  path: "/contact/",
  keywords: [
    "Contact My Exclusive Rentals",
    "Book Nilaveli vacation rental",
    "Trincomalee stay inquiry",
    "Sri Lanka rental contact",
  ],
});

export default function ContactPage() {
  return <ContactPageClient />;
}

