'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VillaHeroProps {
    images: string[];
    villaName: string;
}

export function VillaHero({ images, villaName }: VillaHeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const displayImages = images.slice(0, 5);

    return (
        <section className="relative pt-32 pb-8 lg:pt-40 px-4 md:px-6 max-w-[1920px] mx-auto bg-floral-white">
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-2 h-[75vh] min-h-[600px] rounded-[2rem] overflow-hidden">
                {/* Main Large Image */}
                <div className="col-span-2 row-span-2 relative group cursor-pointer">
                    <Image
                        src={images[0]}
                        alt={`${villaName} - Main View`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Secondary Images */}
                {displayImages.slice(1).map((img, idx) => (
                    <div key={idx} className="relative group cursor-pointer overflow-hidden">
                        <Image
                            src={img}
                            alt={`${villaName} - Detail ${idx + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                ))}
            </div>

            {/* Mobile Carousel Layout */}
            <div className="lg:hidden relative h-[60vh] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${villaName} - Image ${currentIndex + 1}`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/10" />
                    </motion.div>
                </AnimatePresence>

                {/* Mobile Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10 pointer-events-none">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto active:scale-95 transition-transform"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Mobile Image Counter */}
                <div className="absolute bottom-4 right-4 bg-dark/60 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                    <span className="text-white/90 text-xs font-bold tracking-widest">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
            </div>
        </section>
    );
}
