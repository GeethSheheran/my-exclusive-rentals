'use client';

import { Section } from '@/components/ui/Section';

import Link from 'next/link';

// Exact content from the screenshot
// Exact content from the screenshot
const STAYS = [
    {
        title: "Beach Bliss",
        desc: "A peaceful retreat with stunning ocean views, perfect for unwinding by the sea.",
        image: "/Beach-Bliss-Home.jpg",
        href: "/stays/beach-bliss"
    },
    {
        title: "Sandy Shores",
        desc: "A cozy, beachside escape offering comfort and charm just steps from the sand.",
        image: "/sandy-shores-main.jpg",
        href: "/stays/sandy-shores"
    },
    {
        title: "Luxury Penthouse",
        desc: "An elegant and spacious haven with breathtaking views and exclusive luxury.",
        image: "/Luxury-Penthouse-Home.jpg",
        href: "/stays/luxury-penthouse"
    },
    {
        title: "Hill Haven",
        desc: "A colonial bungalow, embraced by the lush tea plantations where the hills whisper serenity.",
        image: "/hill-main.jpg",
        href: "/stays/hill-haven"
    }
];

export function PropertyGrid() {
    return (
        <Section id="stays" className="bg-floral-white py-20 md:py-24">
            <div className="container mx-auto px-4">

                {/* 1. Centered Header */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                        Curated Collection
                    </span>
                    <h2 className="font-serif text-6xl md:text-7xl text-dark mb-8 leading-none">
                        Our Stays
                    </h2>
                    <p className="font-sans text-dark/50 tracking-tight font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                        We offer four luxurious service apartments, each designed to provide comfort, style, and a perfect coastal retreat.
                    </p>
                </div>

                {/* 2. Modern Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
                    {STAYS.map((stay, idx) => (
                        <Link
                            key={idx}
                            href={stay.href}
                            className="flex flex-col items-center text-center group cursor-pointer transition-all duration-500 hover:-translate-y-2"
                        >

                            {/* Image Container - Aspect 3:4 for elegance */}
                            <div className="w-full aspect-[3/4] overflow-hidden mb-8 relative bg-soft-gray shadow-sm">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url('${stay.image}')` }}
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="px-2">
                                <h3 className="font-serif text-3xl text-dark mb-3 decoration-gold group-hover:underline underline-offset-8 decoration-1 transition-all">
                                    {stay.title}
                                </h3>

                                <p className="font-sans text-dark/70 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                                    {stay.desc}
                                </p>

                                {/* Action Button - Minimalist */}
                                <div className="inline-block relative overflow-hidden">
                                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Check Details</span>
                                    <div className="w-full h-[1px] bg-gold absolute bottom-0 left-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300" />
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    );
}