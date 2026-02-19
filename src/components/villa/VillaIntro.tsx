'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Maximize, Bed, Bath } from 'lucide-react';

interface VillaIntroProps {
    name: string;
    tagline: string;
    location: string;
    description: string[];
    stats: {
        sleeps: number;
        floorArea: number;
        bedrooms: number;
        bathrooms: number;
    };
}

export function VillaIntro({ name, tagline, location, description, stats }: VillaIntroProps) {
    return (
        <section className="bg-floral-white py-20 lg:py-28">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Location Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <MapPin size={16} className="text-gold" />
                        <span className="text-dark/60 font-sans text-sm tracking-wide">{location}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-serif text-5xl md:text-7xl text-dark mb-4"
                    >
                        {name}
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-serif text-xl md:text-2xl text-gold mb-12"
                    >
                        {tagline}
                    </motion.p>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-soft-gray border border-dark/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <Users size={20} className="text-gold" />
                            </div>
                            <div>
                                <p className="font-serif text-2xl text-dark">{stats.sleeps}</p>
                                <p className="text-dark/50 text-xs uppercase tracking-wider">Guests</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <Maximize size={20} className="text-gold" />
                            </div>
                            <div>
                                <p className="font-serif text-2xl text-dark">{stats.floorArea}</p>
                                <p className="text-dark/50 text-xs uppercase tracking-wider">Sq. Meters</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <Bed size={20} className="text-gold" />
                            </div>
                            <div>
                                <p className="font-serif text-2xl text-dark">{stats.bedrooms}</p>
                                <p className="text-dark/50 text-xs uppercase tracking-wider">Bedrooms</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                                <Bath size={20} className="text-gold" />
                            </div>
                            <div>
                                <p className="font-serif text-2xl text-dark">{stats.bathrooms}</p>
                                <p className="text-dark/50 text-xs uppercase tracking-wider">Bathrooms</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <div className="space-y-6">
                        {description.map((paragraph, idx) => (
                            <motion.p
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * idx }}
                                className="font-sans text-dark/70 text-lg leading-relaxed"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
