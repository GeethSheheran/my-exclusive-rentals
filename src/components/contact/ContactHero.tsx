'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function ContactHero() {
    return (
        <section className="relative min-h-[70vh] w-full overflow-hidden bg-dark">

            {/* Full Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/contacthero.webp"
                    alt="Contact Hero"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay - Dark from bottom */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/40 to-transparent" />
                {/* Additional subtle overlay */}
                <div className="absolute inset-0 bg-dark/20" />
            </div>

            {/* Content - Positioned at Bottom */}
            <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-6 pb-20 md:pb-28 relative z-10">

                    <div className="max-w-3xl">
                        {/* Gold Accent Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-px bg-gold mb-8"
                        />

                        {/* Label */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-6 block"
                        >
                            Get in Touch
                        </motion.span>

                        {/* Main Heading - Large & Impactful */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.9]"
                        >
                            Contact
                            <span className="text-gold"> Us</span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="font-sans text-white/70 text-lg md:text-xl leading-relaxed max-w-lg"
                        >
                            Plan your perfect escape with Exclusive Rentals.
                        </motion.p>
                    </div>

                </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-8 right-8 hidden lg:block z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="w-24 h-24 border border-white/10"
                />
            </div>

            {/* Bottom Gold Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gold z-10" />
        </section>
    );
}
