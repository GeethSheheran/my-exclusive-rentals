'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VillaHero } from '@/components/villa/VillaHero';
import { VillaIntro } from '@/components/villa/VillaIntro';
import { VillaDetails } from '@/components/villa/VillaDetails';
import { VillaGallery } from '@/components/villa/VillaGallery';
import { VillaLocation } from '@/components/villa/VillaLocation';
import { VillaBooking } from '@/components/villa/VillaBooking';
import { VillaData } from '@/data/villas';

interface VillaPageClientProps {
    villa: VillaData;
}

export function VillaPageClient({ villa }: VillaPageClientProps) {
    return (
        <main className="min-h-screen bg-floral-white">
            <Header />

            {/* Back Link */}
            <div className="fixed top-44 left-10 z-40">
                <Link
                    href="/our-stays"
                    className="group flex items-center bg-white/80 backdrop-blur-md border border-white/40 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
                >
                    <div className="w-11 h-11 rounded-full bg-gold flex items-center justify-center flex-shrink-0 group-hover:bg-gold/90 transition-colors duration-300">
                        <ArrowLeft size={16} className="text-white" />
                    </div>
                    <div className="max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-500 ease-out">
                        <span className="text-sm font-sans font-medium text-dark/80 whitespace-nowrap pl-3 pr-4">
                            All Stays
                        </span>
                    </div>
                </Link>
            </div>

            {/* Hero Slider */}
            <VillaHero
                images={villa.galleryImages}
                villaName={villa.name}
            />

            {/* Introduction */}
            <VillaIntro
                name={villa.name}
                tagline={villa.tagline}
                location={villa.location}
                description={villa.description}
                stats={villa.stats}
            />

            {/* Room Details */}
            <VillaDetails
                stats={villa.stats}
                rooms={villa.rooms}
                amenities={villa.amenities}
            />

            {/* Gallery */}
            <VillaGallery
                images={villa.galleryImages}
                villaName={villa.name}
                categories={villa.galleryCategories}
            />

            {/* Location & Attractions */}
            <VillaLocation
                locationTitle={villa.locationInfo.title}
                locationDescription={villa.locationInfo.description}
                heroImage={villa.locationInfo.heroImage}
                mapEmbedUrl={villa.locationInfo.mapEmbedUrl}
                attractions={villa.locationInfo.attractions}
            />

            {/* Booking CTA */}
            <VillaBooking
                villaName={villa.name}
                bookingLink={villa.bookingLink}
            />

            <Footer />
        </main>
    );
}

