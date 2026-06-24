import type { Metadata } from "next";
import { Poiret_One, Outfit } from "next/font/google";
import "./globals.css";

import { SplashScreen } from "@/components/layout/SplashScreen";
import { InquiryProvider } from "@/context/InquiryContext";
import { InquiryModal } from "@/components/ui/InquiryModal";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Luxury Vacation Rentals in Sri Lanka`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover curated beachfront and hill-country stays by My Exclusive Rentals in Nilaveli, Trincomalee, and beyond.",
  applicationName: SITE_NAME,
  keywords: [
    "My Exclusive Rentals",
    "Luxury vacation rentals Sri Lanka",
    "Beachfront stays Nilaveli",
    "Trincomalee stays",
  ],
  openGraph: { siteName: SITE_NAME, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/er-logo.png"),
    telephone: "+94 77 765 4560",
    email: "info@myexclusiverentals.com",
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
      </body>
    </html>
  );
}
