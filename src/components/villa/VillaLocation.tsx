'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';

interface Attraction {
    name: string;
    distance: string;
}

interface VillaLocationProps {
    locationTitle: string;
    locationDescription: string;
    heroImage: string;
    mapEmbedUrl: string;
    attractions: Attraction[];
}

export function VillaLocation({
    locationTitle,
    locationDescription,
    heroImage,
    mapEmbedUrl,
    attractions
}: VillaLocationProps) {
    return (
        <section className="bg-floral-white">
            {/* Main Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left Side - Image & Content */}
                <div className="relative">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt="Location"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-floral-white via-floral-white/60 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-10 md:p-16 lg:p-20 min-h-[70vh] lg:min-h-screen">
                        <div className="max-w-lg">
                            <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                                Explore The Area
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-dark mb-8 leading-[0.9]">
                                Location &<br />Attractions
                            </h2>
                            <div className="w-20 h-px bg-gold mb-8" />
                            <h3 className="font-serif text-2xl md:text-3xl text-dark/90 mb-6">
                                {locationTitle}
                            </h3>
                            <p className="font-sans text-dark/60 font-light leading-relaxed text-lg">
                                {locationDescription}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Map & Attractions */}
                <div className="flex flex-col">
                    {/* Google Map */}
                    <div className="relative h-[50vh] lg:h-[60%]">
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Attractions List */}
                    <div className="bg-floral-white flex-1 p-10 md:p-16">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center">
                                <MapPin size={18} className="text-gold" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif text-2xl text-dark">
                                Nearby Attractions
                            </h3>
                        </div>

                        <div className="space-y-0">
                            {attractions.map((attraction, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between py-5 border-b border-dark/10 group hover:border-gold/50 transition-colors duration-300"
                                >
                                    <span className="font-sans text-dark/70 font-light text-lg group-hover:text-dark transition-colors duration-300">
                                        {attraction.name}
                                    </span>
                                    <span className="font-sans text-gold font-medium tracking-wider text-sm">
                                        {attraction.distance}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

