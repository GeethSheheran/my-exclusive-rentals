'use client';

import { Bed, Scaling, BedDouble, Armchair, Wifi, UtensilsCrossed, Check } from 'lucide-react';
import { motion } from 'framer-motion';

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

const StatItem = ({ icon: Icon, title, detail, items }: { icon: any; title: string; detail?: string; items?: string[] }) => (
    <div className="flex gap-6 items-start">
        <div className="p-3 bg-floral-white rounded-xl border border-gold/10 text-gold shrink-0">
            <Icon size={28} strokeWidth={1.5} />
        </div>
        <div>
            <h4 className="font-serif text-xl text-dark mb-2 tracking-tight">{title}</h4>
            {detail && <p className="font-sans text-dark/40 text-sm font-light uppercase tracking-wider">{detail}</p>}
            {items && (
                <ul className="space-y-1 mt-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="font-sans text-dark/60 text-sm font-light leading-relaxed flex items-start gap-2">
                            <span className="text-gold/60 mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const AmenityItem = ({ title, icon: Icon, detail, items }: { title: string; icon: any; detail?: string; items?: string[] }) => (
    <div className="flex gap-8 items-start mb-12 last:mb-0">
        <div className="text-gold shrink-0 mt-1">
            <Icon size={48} strokeWidth={1} />
        </div>
        <div>
            <h4 className="font-serif text-2xl text-dark mb-3 tracking-tight">{title}</h4>
            {detail && <p className="font-sans text-dark/40 text-base font-light leading-relaxed">{detail}</p>}
            {items && (
                <ul className="space-y-2.5 mt-4">
                    {items.map((item, idx) => (
                        <li key={idx} className="font-sans text-dark/60 text-[15px] font-light leading-relaxed flex items-start gap-3">
                            <span className="text-gold/40 mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

export function VillaDetails({ stats, rooms, amenities }: VillaDetailsProps) {
    return (
        <section className="bg-white py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <StatItem
                            icon={Bed}
                            title="Sleeps"
                            detail={`Maximum ${stats.sleeps} persons`}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <StatItem
                            icon={Scaling}
                            title="Floor Area"
                            detail={`${stats.floorArea} SQ Meters`}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <StatItem
                            icon={BedDouble}
                            title="Bedrooms"
                            items={rooms.bedrooms}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <StatItem
                            icon={Armchair}
                            title="Living & Dining"
                            items={rooms.livingDining}
                        />
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-dark/5 mb-24" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
                    {/* Main Amenities */}
                    <div>
                        <h3 className="font-serif text-5xl text-dark mb-16 tracking-tight">Amenities</h3>

                        <AmenityItem
                            icon={Wifi}
                            title="Internet"
                            detail={amenities.internet[0]}
                        />

                        <AmenityItem
                            icon={UtensilsCrossed}
                            title="Kitchen"
                            items={amenities.kitchen}
                        />
                    </div>

                    {/* Other Amenities */}
                    <div>
                        <h3 className="font-serif text-5xl text-dark mb-16 tracking-tight">Other Amenities</h3>

                        <ul className="space-y-4">
                            {amenities.services.map((service, idx) => (
                                <li key={idx} className="font-sans text-dark/60 text-base font-light flex items-start gap-4 leading-relaxed group">
                                    <span className="text-gold/40 mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
