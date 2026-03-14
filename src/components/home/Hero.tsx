'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import Link from 'next/link';

// --- DATA ---
const SLIDES = [
    {
        id: 1,
        title: "Exclusive Rentals",
        subtitle: "Where Luxury Meets Serenity",
        desc: "Experience the perfect blend of comfort, elegance, and coastal charm with our premium apartments in Nilaveli Beach or the cool climes of the hill country amidst tea plantations.",
        image: "/Hero-Image-6-1.jpg",
        location: "Sri Lanka",
        tag: "Premium Collection"
    },
    {
        id: 2,
        title: "Coastal Escape",
        subtitle: "Your Seaside Paradise",
        desc: "Experience the perfect blend of modern comfort and coastal charm at our luxurious apartments in Nilaveli, Sri Lanka.",
        image: "/Hero-Image-7.jpg",
        location: "Nilaveli Beach",
        tag: "Beachfront"
    },
    {
        id: 3,
        title: "Luxury Living",
        subtitle: "By The Pristine Coast",
        desc: "Discover our luxurious apartments in Nilaveli, where modern comfort meets the serene beauty of the beach.",
        image: "/Hero-Image-9-1-1920x720.jpg",
        location: "Trincomalee",
        tag: "Ocean View"
    },
    {
        id: 4,
        title: "Tea Plantations",
        subtitle: "Embrace The Highlands",
        desc: "A colonial bungalow, embraced by lush tea plantations where the hills whisper serenity.",
        image: "/Hero-Image-1.jpg",
        location: "Hill Country",
        tag: "Mountain Retreat"
    }
];

const AUTOPLAY_DURATION = 8000;

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    // Progress bar and auto-play
    // Progress bar and auto-play
    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    return 100; // Let it stay at 100 briefly
                }
                return prev + (100 / (AUTOPLAY_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, []);

    // Separate effect for slide transition
    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setCurrent(c => (c === SLIDES.length - 1 ? 0 : c + 1));
                setProgress(0);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [progress]);
    const goToSlide = (index: number) => {
        setCurrent(index);
        setProgress(0);
    };

    const nextSlide = () => {
        setCurrent(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        setProgress(0);
    };

    const prevSlide = () => {
        setCurrent(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
        setProgress(0);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-floral-white">

            {/* FULL-BLEED BACKGROUND WITH KEN BURNS EFFECT */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={SLIDES[current].id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${SLIDES[current].image}')`,
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.15 }}
                        transition={{ duration: 10, ease: "linear" }}
                    />

                    {/* Black overlay with increased opacity */}
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
            </AnimatePresence>



            {/* MAIN CONTENT */}
            <div className="relative z-20 h-full flex flex-col lg:flex-row">

                {/* LEFT: TEXT CONTENT */}
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center lg:justify-end pb-32 lg:pb-20 items-center lg:items-start text-center lg:text-left">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            className="max-w-2xl"
                        >
                            {/* Tag */}
                            {/* <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                                    <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse" />
                                    <span className="text-xs font-sans tracking-widest uppercase text-white/80">
                                        {SLIDES[current].tag}
                                    </span>
                                </span>
                            </motion.div> */}

                            {/* Title */}
                            <div className="overflow-hidden mb-2">
                                <motion.h1
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-110%", opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeIn",
                                        opacity: { duration: 0.5 }
                                    }}
                                    className="font-serif text-5xl md:text-6xl lg:text-7xl text-gold font-thin leading-[1.2] tracking-tight"
                                >
                                    {SLIDES[current].title}
                                </motion.h1>
                            </div>

                            {/* Subtitle with gold accent */}
                            <div className="overflow-hidden mb-8">
                                <motion.p
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    exit={{ y: "-110%", opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeIn",
                                        delay: 0,
                                        opacity: { duration: 0.5, delay: 0 }
                                    }}
                                    className="font-serif text-2xl md:text-3xl lg:text-5xl text-white/90 leading-[1.2]"
                                >
                                    {SLIDES[current].subtitle}
                                </motion.p>
                            </div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeIn",
                                    delay: 0
                                }}
                                className="font-sans text-white/80 tracking-wider text-base md:text-lg leading-relaxed font-light max-w-md mb-10"
                            >
                                {SLIDES[current].desc}
                            </motion.p>

                            {/* Location */}
                            {/* <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.3
                                }}
                                className="flex items-center gap-2 mb-10"
                            >
                                <MapPin className="w-4 h-4 text-gold" />
                                <span className="text-sm font-sans text-white/60 tracking-wider uppercase">
                                    {SLIDES[current].location}
                                </span>
                            </motion.div> */}

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                            >
                                <Link href="/our-stay">
                                    <Button className="!px-8 !py-5 text-xs font-bold tracking-wider group flex items-center gap-2 rounded-full w-full sm:w-auto">
                                        Explore our stay
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <Button variant="outline" className="!px-8 !py-5 text-xs font-bold tracking-wider border-white/30 text-white hover:bg-white hover:text-dark transition-all rounded-full w-full">
                                        Book Now
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            {/* BOTTOM RIGHT: Modern Chevron Navigation */}
            <div className="absolute bottom-8 md:pb-16 pb-24 right-8 md:right-16 lg:right-24 flex items-center gap-6 z-30">

                {/* Slide counter */}
                <div className="hidden sm:flex items-center gap-3 text-white/60">
                    <span className="text-2xl font-serif text-white">
                        {String(current + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-[1px] bg-white/30" />
                    <span className="text-sm font-sans tracking-widest">
                        {String(SLIDES.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Progress dots */}
                <div className="hidden md:flex items-center gap-2">
                    {SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`
                                transition-all duration-300 rounded-full
                                ${current === index
                                    ? 'w-8 h-2 bg-gold'
                                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'}
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Controls - Desktop: Bottom Right, Mobile: Bottom Center below buttons */}
            <div className="absolute lg:bottom-20 bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

        </section>
    );
}