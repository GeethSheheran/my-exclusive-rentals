'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
    return (
        <section className="py-24 md:py-32 bg-floral-white relative overflow-hidden">
            {/* Elegant Gold Line Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header - Centered & Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
                >
                    <span className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Get in Touch</span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6">Contact Information</h2>
                    <p className="font-sans text-dark/60 text-base md:text-lg leading-relaxed">
                        We are here to ensure your stay is as memorable and comfortable as possible. Reach out to us through any of these channels.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

                    {/* Left Column: Contact Info Consolidated */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-soft-gray border border-dark/5 p-8 md:p-12 divide-y divide-dark/10"
                        >
                            {/* Email Section */}
                            <div className="pb-12 group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                        <Mail size={18} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-serif text-xl text-dark">Email Us</h4>
                                </div>
                                <a
                                    href="mailto:info@myexclusiverentals.com"
                                    className="text-gold hover:underline decoration-1 underline-offset-4 transition-all inline-flex items-center gap-2 font-serif text-xl md:text-2xl mb-4"
                                >
                                    info@myexclusiverentals.com
                                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <p className="font-sans text-dark/60 text-base leading-relaxed">
                                    To reserve your stay, simply reach out to us via email. Let us help you create your perfect getaway at Exclusive Rentals.
                                </p>
                            </div>

                            {/* Phone Section */}
                            <div className="pt-12 group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                        <Phone size={18} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-serif text-xl text-dark">Call Us</h4>
                                </div>
                                <a
                                    href="tel:+94777654560"
                                    className="text-gold hover:underline decoration-1 underline-offset-4 transition-all inline-flex items-center gap-2 font-serif text-xl md:text-2xl mb-4"
                                >
                                    +94 77 765 4560
                                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <p className="font-sans text-dark/60 text-base leading-relaxed">
                                    For reservations and inquiries, feel free to contact us via mobile or WhatsApp. We&apos;re here to assist you in planning your perfect stay.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form - Sticky */}
                    <div className="lg:col-span-7 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-soft-gray p-8 md:p-12 border border-dark/5"
                        >
                            <div className="mb-10">
                                <span className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Inquiries</span>
                                <h3 className="font-serif text-3xl md:text-4xl text-dark">Send us a Message</h3>
                            </div>

                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            placeholder="John"
                                            className="w-full py-2 border-b border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            placeholder="Doe"
                                            className="w-full py-2 border-b border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/20"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="w-full py-2 border-b border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            placeholder="+94 77..."
                                            className="w-full py-2 border-b border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full py-2 border-b border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/20 resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button className="w-full md:w-auto min-w-[200px] rounded-full">Send Message</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
