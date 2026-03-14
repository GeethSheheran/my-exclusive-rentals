'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';

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
            </motion.div>

            <div className="container relative z-10">
                <div className="max-w-xl bg-soft-gray p-12 md:p-16 border-l-8 border-gold shadow-2xl">
                    <h2 className="font-serif text-4xl md:text-5xl font-light text-dark mb-6 leading-tight uppercase tracking-wide">
                        Your Dream Stay Awaits!
                    </h2>
                    <p className="text-dark/80 text-lg leading-relaxed font-sans mb-10">
                        Book your stay with Exclusive Rentals today and experience the perfect blend of luxury and tranquility in Nilaveli and Upcot Maskeliya.
                    </p>
                    <Link href="/contact">
                        <Button
                            variant="outline"
                            className="rounded-full border-dark/20 text-dark hover:bg-dark hover:text-white px-10 py-4 text-sm font-bold tracking-widest transition-all duration-500 uppercase"
                        >
                            Enquire Now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
