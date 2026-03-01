'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';

interface Attraction {
    name: string;
    distance: string;
    image: string;
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
        <section className="bg-floral-white overflow-hidden">
            {/* Main Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left Side - Image & Content */}
                <div className="relative overflow-hidden">
                    {/* Background Image with Zoom Animation */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.1 }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroImage}
                            alt="Location"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Dark Overlay for White Text */}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-10 md:p-16 lg:p-20 min-h-[70vh] lg:min-h-screen">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-lg"
                        >
                            <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                                Explore The Area
                            </span>
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1]">
                                Location &<br />Attractions
                            </h2>
                            <div className="w-20 h-px bg-gold mb-8" />
                            <h3 className="font-serif text-2xl md:text-3xl text-white/95 mb-6">
                                {locationTitle}
                            </h3>
                            <p className="font-sans text-white/70 font-light leading-relaxed text-lg mb-12">
                                {locationDescription}
                            </p>

                            <Button
                                className="bg-gold hover:bg-white text-white hover:text-gold rounded-full px-10 py-6 text-sm uppercase tracking-widest border-2 border-gold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Reserve Now
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Map & Attractions */}
                <div className="flex flex-col relative">
                    {/* Google Map */}
                    <div className="relative h-[45vh] lg:h-[55%]">
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

                        <div className="space-y-0 relative">
                            {attractions.map((attraction, idx) => (
                                <AttractionItem key={idx} attraction={attraction} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AttractionItem({ attraction }: { attraction: Attraction }) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="flex items-center justify-between py-6 border-b border-dark/10 group hover:border-gold/50 transition-colors duration-300 relative cursor-pointer"
        >
            <span className="font-sans text-dark/70 font-light text-xl group-hover:text-dark transition-colors duration-300">
                {attraction.name}
            </span>
            <span className="font-sans text-gold font-medium tracking-widest text-sm">
                {attraction.distance}
            </span>

            {/* Hover Image Popup */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        style={{
                            x,
                            y,
                            translateX: '10%',
                            translateY: '-50%',
                        }}
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none absolute left-0 top-0 z-[100] w-64 aspect-[3/2] overflow-hidden shadow-2xl rounded-lg border-2 border-white"
                    >
                        <Image
                            src={attraction.image}
                            alt={attraction.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

