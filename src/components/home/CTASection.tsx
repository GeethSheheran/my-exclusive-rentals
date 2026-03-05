'use client';

import { useRef, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';

const HOVER_IMAGES = [
    // beach-bliss
    "/beach-bliss/pool-main.jpg",
    "/beach-bliss/living-room-main.jpg",
    "/beach-bliss/master-bedroom-main.jpg",
    "/beach-bliss/exterior-architecture.jpg",
    "/beach-bliss/dining-table.jpg",
    "/beach-bliss/pool-deck.jpg",
    // hill-haven
    "/hill-haven/exterior-1.jpg",
    "/hill-haven/living-room-1.jpg",
    "/hill-haven/master-bedroom-1.jpg",
    "/hill-haven/patio-1.jpg",
    "/hill-haven/dining-1.jpg",
    "/hill-haven/exterior-2.jpg",
    // luxury-penthouse
    "/luxury-penthouse/living-room-1.jpg",
    "/luxury-penthouse/pool-1.jpg",
    "/luxury-penthouse/master-bedroom-1.jpg",
    "/luxury-penthouse/jacuzzi-1.jpg",
    "/luxury-penthouse/exterior-1.jpg",
    "/luxury-penthouse/balcony-1.jpg",
    // sandy-shores
    "/sandy-shores/living-room-1.jpg",
    "/sandy-shores/exterior-2.jpg",
    "/sandy-shores/master-bedroom-1.jpg",
    "/sandy-shores/pool-1.jpg",
    "/sandy-shores/kitchen-1.jpg",
    "/sandy-shores/bedroom-1-main.jpg",
    // more variety
    "/beach-bliss/exterior-night.jpg",
    "/hill-haven/patio-3.jpg",
    "/luxury-penthouse/gym-1.jpg",
    "/sandy-shores/gym-1.jpg"
];

function HoverGrid() {
    const columns = 12;
    const rows = 6;
    const totalCells = columns * rows;

    const cells = useMemo(() => {
        return Array.from({ length: totalCells }).map((_, i) => ({
            id: i,
            img: HOVER_IMAGES[i % HOVER_IMAGES.length]
        }));
    }, [totalCells]);

    return (
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 pointer-events-auto">
            {cells.map((cell) => (
                <motion.div
                    key={cell.id}
                    className="relative w-full h-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                        style={{ backgroundImage: `url("${cell.img}")` }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section ref={sectionRef} className="relative h-[600px] flex items-center overflow-hidden">
            {/* Background Image Container with Parallax */}
            <motion.div
                className="absolute inset-x-0 -top-[50%] -bottom-[50%] z-0"
                style={{
                    backgroundImage: 'url("/Hero-Image-6-1.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    y
                }}
            >
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Hover Grid */}
                <HoverGrid />
            </motion.div>

            <div className="container relative z-10 pointer-events-none">
                <div className="max-w-xl bg-floral-white/95 p-12 md:p-16 backdrop-blur-sm pointer-events-auto">
                    <h2 className="font-serif text-4xl md:text-5xl font-light text-dark mb-6 leading-tight">
                        Your Dream Stay Awaits!
                    </h2>
                    <p className="text-dark/80 text-lg leading-relaxed font-sans mb-10">
                        Book your stay with Exclusive Rentals today and experience the perfect blend of luxury and tranquility in Nilaveli and Upcot Maskeliya.
                    </p>
                    <Button
                        variant="outline"
                        className="rounded-full border-dark/20 text-dark hover:bg-dark hover:text-white px-10 py-4 text-sm font-bold tracking-widest transition-all duration-500 uppercase"
                    >
                        Enquire Now
                    </Button>
                </div>
            </div>
        </section>
    );
}
