import type { Metadata } from "next";
import { Poiret_One, Outfit } from "next/font/google";
import "./globals.css";

import { SplashScreen } from "@/components/layout/SplashScreen";
import { InquiryProvider } from "@/context/InquiryContext";
import { InquiryModal } from "@/components/ui/InquiryModal";

const poiret = Poiret_One({
  subsets: ["latin"],
  variable: "--font-poiret",
  weight: "400",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Exclusive Rentals | Beachfront Hotel Network in Nilaveli, Sri Lanka",
  description:
    "My Exclusive Rentals offers curated beachfront stays in Nilaveli and Trincomalee, Sri Lanka. Discover luxury apartments and premium coastal living.",
  keywords: [
    "My Exclusive Rentals",
    "Hotels in Nilaveli",
    "Hotels in Nilaweli",
    "Nilaveli Beach Hotels",
    "Hotels in Trincomalee",
    "Luxury stays Nilaveli",
  ],
  alternates: {
    canonical: "https://myexclusiverentals.com",
  },
  openGraph: {
    title: "My Exclusive Rentals | Beachfront Hotel Network in Nilaveli",
    description:
      "Curated beachfront stays in Nilaveli and Trincomalee Sri Lanka.",
    url: "https://myexclusiverentals.com",
    siteName: "My Exclusive Rentals",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Exclusive Rentals | Nilaveli Beachfront Stays",
    description:
      "Discover premium beachfront stays in Nilaveli and Trincomalee, Sri Lanka.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My Exclusive Rentals",
    url: "https://myexclusiverentals.com",
    logo: "https://myexclusiverentals.com/logo.png",
  };

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "My Exclusive Rentals",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nilaveli",
      addressRegion: "Trincomalee",
      addressCountry: "Sri Lanka",
    },
    areaServed: "Nilaveli",
    url: "https://myexclusiverentals.com",
  };

  return (
    <html lang="en" className={`${poiret.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-dark bg-white">
        <InquiryProvider>
          <SplashScreen />
          {children}
          <InquiryModal />
        </InquiryProvider>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Hotel Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hotelSchema),
          }}
        />
      </body>
    </html>
  );
}