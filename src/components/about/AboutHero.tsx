'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutHero() {
    return (
        <section className="relative bg-floral-white pt-40 pb-20 md:pt-52 md:pb-32 px-4 overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />

            {/* Watermark Logo */}
            <div className="absolute top-115 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.09] select-none pointer-events-none z-10">
                <Image
                    src="https://myexclusiverentals.com/wp-content/uploads/2024/11/ER-logo_new-2-01.png"
                    alt=""
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div className="container mx-auto text-center max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-8 block">
                        Our Story
                    </span>
                    <h1 className="font-serif text-6xl md:text-6xl text-dark mb-12 leading-none">
                        We are Exclusive Rentals
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-sans text-dark/50 font-extralight tracking-wide text-xl md:text-lg leading-relaxed max-w-5xl mx-auto"
                >
                    At Exclusive Rentals, we offer a diverse range of luxurious stays, from fully furnished apartments in the heart of Nilaveli, where comfort and elegance meet the beauty of the coastline, to a charming three-bedroom colonial-style bungalow nestled in the cool climes of the hill country, surrounded by lush tea plantations and a golf course. Whether you&apos;re seeking a seaside retreat or a tranquil escape in the hills, each of our properties is thoughtfully designed with modern amenities, spacious living areas, and fully equipped kitchens, ensuring the perfect blend of convenience and relaxation. With prime locations near stunning landscapes and local attractions, Exclusive Rentals is dedicated to creating exceptional stays that feel like a true escape.                </motion.p>
            </div>
        </section>
    );
}
