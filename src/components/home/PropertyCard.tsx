'use client';


import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PropertyProps {
    title: string;
    image: string;
    location: string;
    price?: string;
    className?: string; // Allow custom classes for sizing
}

export function PropertyCard({ title, image, location, className }: PropertyProps) {
    return (
        <motion.div
            className={`group cursor-pointer flex flex-col ${className}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
        >
            <div className="relative w-full h-full min-h-[300px] overflow-hidden mb-4">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Modern "View" Button Overlay - appears on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 text-white text-xs uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform duration-500">
                        View
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end border-t border-dark/5 pt-4">
                <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-dark group-hover:text-gold transition-colors duration-300 logo-font">
                        {title}
                    </h3>
                    <p className="text-xs font-sans text-dark/50 uppercase tracking-widest mt-1">
                        {location}
                    </p>
                </div>
                <ArrowRight className="w-6 h-6 text-dark/20 group-hover:text-gold transition-colors -rotate-45 group-hover:rotate-0 duration-300" />
            </div>
        </motion.div>
    );
}
