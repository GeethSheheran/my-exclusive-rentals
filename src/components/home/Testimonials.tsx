'use client';

import { Section } from '@/components/ui/Section';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Sujee",
        role: "Guest",
        feedback: "The cleanliness was top-notch, and the house was well-equipped with everything we needed. The host was super responsive and made check-in a breeze."
    },
    {
        name: "Thanuja",
        role: "Guest",
        feedback: "A perfect getaway! The location was serene, and the property itself was stunning. Highly recommend for anyone looking to escape the city."
    },
    {
        name: "Alexandra",
        role: "Guest",
        feedback: "Truly a luxury experience. Every detail was thoughtfully curated, from the linens to the welcome basket. We will definitely be back."
    }
];

export function Testimonials() {
    return (
        <Section className="bg-floral-white text-dark overflow-hidden py-20 md:py-24">
            <div className="container mx-auto px-4">

                {/* 1. Centered Header (Standardized Premium Style) */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                        Guest Reviews
                    </span>
                    <h2 className="font-serif text-6xl md:text-7xl text-dark mb-8 leading-none">
                        Words of Praise
                    </h2>
                    <p className="font-sans tracking-tight font-light text-dark/50 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                        Real experiences from our valued guests who found their perfect sanctuary with us.
                    </p>
                </div>

                {/* 2. Editorial Quote Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-soft-gray p-12 relative group cursor-default border border-gray-100 hover:border-gold/30 hover:shadow-sm transition-all duration-500"
                        >
                            {/* Decorative Quote Mark */}
                            {/* <Quote
                                className="text-gold/50 absolute bottom-35 right-4 transition-transform duration-700 group-hover:scale-110"
                                size={100}
                                strokeWidth={0.2}
                            /> */}

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                <p className="font-serif text-2xl text-dark/80 leading-relaxed mb-12">
                                    &quot;{item.feedback}&quot;
                                </p>

                                <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-serif text-xl text-dark mb-1">{item.name}</h4>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">{item.role}</span>
                                    </div>

                                    {/* Star Rating Graphic (Visual only) */}
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <div key={star} className="w-1 h-1 rounded-full bg-gold/40" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
