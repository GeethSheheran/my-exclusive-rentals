'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
    return (
        <section className="py-24 md:py-32 bg-floral-white relative">
            {/* Subtle Gold Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold" />

            <div className="container mx-auto px-6">

                {/* Section Header - Centered, Luxurious */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="font-sans text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Inquiries</span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6">How can we help?</h2>
                    <p className="font-sans text-dark/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Whether you have questions about our apartments, need help with bookings, or require more information, we&apos;re here to make your experience effortless and enjoyable. Reach out to us, and let us take care of the rest!
                    </p>
                </motion.div>

                {/* Form Container - Elegant Border */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-soft-gray p-10 md:p-14 border border-dark/5">
                        <form className="space-y-10">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label htmlFor="firstName" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        className="w-full py-3 border-b-2 border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="lastName" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        className="w-full py-3 border-b-2 border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/30"
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label htmlFor="email" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="name@example.com"
                                        className="w-full py-3 border-b-2 border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="phone" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+94 77 123 4567"
                                        className="w-full py-3 border-b-2 border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/30"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="space-y-3">
                                <label htmlFor="message" className="font-sans text-xs uppercase tracking-[0.2em] text-dark/40 block">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full py-3 border-b-2 border-dark/10 focus:border-gold outline-none bg-transparent transition-colors font-sans text-dark placeholder:text-dark/30 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 text-center">
                                <Button className="w-full md:w-auto min-w-[220px]">Send Message</Button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
