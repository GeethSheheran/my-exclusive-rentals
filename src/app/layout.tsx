import type { Metadata } from 'next';
import { Poiret_One, Outfit } from 'next/font/google';
import './globals.css';

import { SplashScreen } from '@/components/layout/SplashScreen';

const poiret = Poiret_One({
  subsets: ['latin'],
  variable: '--font-poiret',
  weight: '400',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Exclusive Rentals | Luxury Stays',
  description: 'Experience the finest luxury rentals and holiday homes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poiret.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-dark bg-white">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
