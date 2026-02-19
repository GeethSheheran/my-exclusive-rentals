'use client';

import { motion } from 'framer-motion';
import { UtensilsCrossed, Wifi, ConciergeBell, Sparkles } from 'lucide-react';

interface VillaAmenitiesProps {
    amenities: {
        kitchen: string[];
        internet: string[];
        services: string[];
        features: string[];
    };
}

export function VillaAmenities({ amenities }: VillaAmenitiesProps) {
    const sections = [
        {
            title: 'Kitchen',
            icon: UtensilsCrossed,
            items: amenities.kitchen
        },
        {
            title: 'Internet',
            icon: Wifi,
            items: amenities.internet
        },
        {
            title: 'Services',
            icon: ConciergeBell,
            items: amenities.services
        },
        {
            title: 'Features',
            icon: Sparkles,
            items: amenities.features
        }
    ];

    return (
        <section className="bg-floral-white py-20 lg:py-28">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold font-sans text-xs tracking-[0.3em] uppercase font-bold">
                            What&apos;s Included
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-dark mt-3">
                            Amenities & Features
                        </h2>
                    </motion.div>

                    {/* Amenities Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
                                    <section.icon size={24} className="text-gold" />
                                </div>
                                <h3 className="font-serif text-xl text-dark mb-4">{section.title}</h3>
                                <ul className="space-y-2.5">
                                    {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                                            <span className="font-sans text-dark/60 text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
