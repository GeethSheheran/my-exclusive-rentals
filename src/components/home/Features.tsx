'use client';

import { Section } from '@/components/ui/Section';
import { Trophy, MapPin, Moon, Sparkles, Users, CalendarCheck } from 'lucide-react';

// Content extracted exactly from the screenshot
const features = [
    {
        icon: Trophy,
        title: "High Rating",
        description: "Recognized by guests for outstanding service, comfort, and attention to detail, ensuring every stay exceeds expectations and leaves a lasting impression."
    },
    {
        icon: MapPin,
        title: "Best Locations",
        description: "Located near the pristine Nilaveli Beach and the scenic hills of Upcot, Maskeliya, our apartments and bungalow offer the perfect blend of coastal charm and mountain serenity."
    },
    {
        icon: Moon,
        title: "Quiet Hours",
        description: "A serene environment to relax and recharge without disturbances."
    },
    {
        icon: Sparkles,
        title: "Cleanliness",
        description: "Well maintained apartments with spotless interiors and fresh linens, providing a worry-free, hygienic environment throughout your stay."
    },
    {
        icon: Users,
        title: "Family Friendly",
        description: "Spacious and thoughtfully designed accommodations to cater to families of all sizes, offering comfort, convenience, and a home-like atmosphere."
    },
    {
        icon: CalendarCheck,
        title: "Seamless Check-In",
        // Note: The text in the screenshot for this item is identical to "Family Friendly", so it is replicated here exactly as requested.
        description: "Spacious and thoughtfully designed accommodations to cater to families of all sizes, offering comfort, convenience, and a home-like atmosphere."
    }
];

export function Features() {
    return (
        <Section className="bg-floral-white py-20 md:py-24">
            <div className="container mx-auto px-4">

                {/* 1. Centered Header (Reference from PropertyGrid) */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                        Why Choose Us
                    </span>
                    <h2 className="font-serif text-6xl md:text-7xl text-dark mb-8 leading-none">
                        Unmatched Excellence
                    </h2>
                    <p className="font-sans tracking-tight font-light text-dark/50 font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                        Designed for your absolute comfort and peace of mind, ensuring a memorable stay.
                    </p>
                </div>

                {/* 2. Architectural Bordered Grid */}
                <div className="border border-gray-200 bg-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-soft-gray p-10 flex flex-col items-start min-h-[300px] hover:bg-gold-light/30 transition-colors duration-500 group gap-6"
                        >

                            {/* Icon - Top Left, Minimal */}
                            <div className="text-gold group-hover:text-gold transition-colors duration-300">
                                <feature.icon size={40} strokeWidth={1} />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-serif text-2xl font-semibold text-gold mb-3">
                                    {feature.title}
                                </h3>

                                <p className="font-sans text-dark/60 font-light text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
