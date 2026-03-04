'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';

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
        <section className="bg-white py-24 md:py-32">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Title */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif text-5xl md:text-6xl text-dark tracking-tight">
                        Location and Attractions
                    </h2>
                </div>

                {/* Hero with Floating Card */}
                <div className="relative w-full h-[500px] md:h-[600px] mb-24 rounded-sm overflow-hidden group">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={heroImage}
                            alt="Location View"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Floating Content Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute bottom-0 left-0 md:bottom-12 md:left-12 bg-white p-8 md:p-14 max-w-xl shadow-2xl z-10"
                    >
                        <h3 className="font-serif text-3xl md:text-4xl text-dark mb-6 tracking-tight">
                            {locationTitle}
                        </h3>
                        <p className="font-sans text-dark/60 font-light leading-relaxed mb-8 text-base md:text-lg">
                            {locationDescription}
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="font-sans text-xs tracking-[0.3em] uppercase font-bold text-dark hover:text-gold transition-colors flex items-center gap-2 group/btn"
                        >
                            Visit Now <span className="text-lg group-hover/btn:translate-x-1 transition-transform">+</span>
                        </button>
                    </motion.div>
                </div>

                {/* Map and Text Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                    {/* Google Map */}
                    <div className="w-full aspect-video md:aspect-[4/3] rounded-sm overflow-hidden shadow-sm relative grayscale hover:grayscale-0 transition-all duration-700">
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                        />
                    </div>

                    {/* Attractions Narrative */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-4xl text-dark mb-8 tracking-tight">
                            Nearby Attractions
                        </h3>
                        <div className="font-sans text-dark/50 font-light leading-[2] text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
                            Nearby attractions include the serene <HoverAttraction attraction={attractions.find(a => a.name.includes("Velgam")) || attractions[1]} />,
                            and the famous <HoverAttraction attraction={attractions.find(a => a.name.includes("Kanniya")) || attractions[2]} />.
                            <HoverAttraction attraction={attractions.find(a => a.name.includes("China Bay")) || attractions[4]} /> is conveniently situated <strong>29 kms</strong> away,
                            while the bustling town of <HoverAttraction attraction={attractions.find(a => a.name.includes("Trincomalee")) || attractions[3]} /> is a short <strong>14 km</strong> drive.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HoverAttraction({ attraction }: { attraction?: Attraction }) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

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

    if (!attraction) return null;

    return (
        <span
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative inline-block"
        >
            <strong className="text-dark cursor-help border-b border-gold/30 hover:border-gold transition-colors">
                {attraction.name}
            </strong>
            {attraction.name.includes("Velgam") || attraction.name.includes("Kanniya") ? `, just ${attraction.distance} away` : ""}

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        style={{
                            x,
                            y,
                            translateX: '10%',
                            translateY: '-110%',
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
        </span>
    );
}

