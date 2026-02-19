'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

export function ContactInfo() {
    return (
        <section className="bg-floral-white py-24 md:py-32 relative overflow-hidden">
            {/* Elegant Gold Line Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header - Centered, Luxurious */}
                {/* <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark">
                        Get in Touch
                    </h2>
                </div> */}

                {/* Contact Cards - Elevated with Borders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-soft-gray p-10 md:p-12 border border-dark/5 group hover:border-gold/30 transition-colors duration-500"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                <Mail size={22} strokeWidth={1.5} />
                            </div>
                            <div className="h-px flex-1 bg-dark/5" />
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl text-dark leading-tight mb-6">
                            Feel free to write on <br />
                            <a
                                href="mailto:info@myexclusiverentals.com"
                                className="text-gold hover:underline decoration-1 underline-offset-4 transition-all inline-flex items-center gap-2"
                            >
                                info@myexclusiverentals.com
                                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </h3>

                        <p className="font-sans text-dark/60 text-base leading-relaxed">
                            To reserve your stay, simply reach out to us via email. Let us help you create your perfect getaway at Exclusive Rentals. Whether you&apos;re seeking a peaceful retreat or an adventure-filled escape, we are here to ensure your stay is as memorable and comfortable as possible. Get in touch today, and let us turn your dream stay into a reality!
                        </p>
                    </motion.div>

                    {/* Phone Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-soft-gray p-10 md:p-12 border border-dark/5 group hover:border-gold/30 transition-colors duration-500"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                <Phone size={22} strokeWidth={1.5} />
                            </div>
                            <div className="h-px flex-1 bg-dark/5" />
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl text-dark leading-tight mb-6">
                            Call us <br />
                            <a
                                href="tel:+94777654560"
                                className="text-gold hover:underline decoration-1 underline-offset-4 transition-all inline-flex items-center gap-2"
                            >
                                +94 77 765 4560
                                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </h3>

                        <p className="font-sans text-dark/60 text-base leading-relaxed">
                            For reservations and inquiries, feel free to contact us via mobile or WhatsApp. We&apos;re here to assist you in planning your perfect stay at Exclusive Rentals. Whether you need more information or help with booking, don&apos;t hesitate to reach out. Let us make your dream getaway a reality with just a message!
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
