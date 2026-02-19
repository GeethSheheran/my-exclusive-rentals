'use client';

import { Bed, Sofa, UtensilsCrossed, Wifi, Mountain, ConciergeBell, KeyRound } from 'lucide-react';

interface VillaDetailsProps {
    stats: {
        sleeps: number;
        floorArea: number;
        bedrooms: number;
        bathrooms: number;
    };
    rooms: {
        bedrooms: string[];
        livingDining: string[];
    };
    amenities: {
        kitchen: string[];
        internet: string[];
        services: string[];
        features: string[];
        entry: string[];
    };
}

const DetailCard = ({
    icon: Icon,
    title,
    items,
    className = ""
}: {
    icon: React.ElementType;
    title: string;
    items: string[];
    className?: string;
}) => (
    <div className={`bg-soft-gray p-10 flex flex-col items-start min-h-[280px] hover:bg-gold-light/30 transition-colors duration-500 group ${className}`}>
        <div className="text-gold mb-6">
            <Icon size={36} strokeWidth={1} />
        </div>
        <h3 className="font-serif text-2xl text-gold mb-6">
            {title}
        </h3>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="font-sans text-dark/60 font-light text-sm leading-relaxed">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export function VillaDetails({ rooms, amenities }: VillaDetailsProps) {
    return (
        <section className="bg-floral-white py-20 md:py-24">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                        The Experience
                    </span>
                    <h2 className="font-serif text-6xl md:text-7xl text-dark mb-8 leading-none">
                        Details & Amenities
                    </h2>
                    <p className="font-sans text-dark/50 tracking-tight font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                        Every detail has been thoughtfully curated for your comfort and convenience.
                    </p>
                </div>

                {/* Architectural Bordered Grid */}
                <div className="border border-gray-200 bg-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">

                    <DetailCard
                        icon={Bed}
                        title="Bedrooms"
                        items={rooms.bedrooms}
                    />

                    <DetailCard
                        icon={Sofa}
                        title="Living & Dining"
                        items={rooms.livingDining}
                    />

                    <DetailCard
                        icon={Wifi}
                        title="Internet"
                        items={amenities.internet}
                    />

                    <DetailCard
                        icon={UtensilsCrossed}
                        title="Kitchen"
                        items={amenities.kitchen}
                        className="lg:col-span-2"
                    />

                    <DetailCard
                        icon={Mountain}
                        title="Balcony"
                        items={amenities.features}
                    />

                    <DetailCard
                        icon={ConciergeBell}
                        title="Other Amenities"
                        items={amenities.services}
                        className="lg:col-span-2"
                    />

                    {amenities.entry.length > 0 && (
                        <DetailCard
                            icon={KeyRound}
                            title="Entry to Apartment"
                            items={amenities.entry}
                        />
                    )}

                </div>
            </div>
        </section>
    );
}
