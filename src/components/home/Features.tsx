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
        <Section className="bg-white py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-start gap-6"
                        >
                            {/* Icon - Top Left */}
                            <div className="text-gold">
                                <feature.icon size={36} strokeWidth={1} />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-serif text-3xl text-dark mb-4">
                                    {feature.title}
                                </h3>

                                <p className="font-sans text-dark/60 font-light text-base leading-relaxed max-w-sm">
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
