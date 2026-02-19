'use client';

import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-soft-gray text-dark">

            {/* Thin Gold Top Border - Luxury Detail */}
            <div className="h-px bg-gold/20" />

            <div className="container mx-auto px-6">

                {/* Main Content */}
                <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative w-48 h-28">
                            <Image
                                src="/er-logo.png"
                                alt="Exclusive Rentals"
                                fill
                                className="object-contain object-left opacity-80"
                            />
                        </div>
                        <p className="font-sans text-dark/60 text-base leading-relaxed max-w-md">
                            Exclusive Rentals, we offer luxurious stays around Sri Lanka designed for comfort and convenience. Whether for a short stay or a longer getaway, our properties provide the perfect blend of modern amenities with locations near the beach and the mountains, ensuring a relaxing and memorable experience.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="text-dark/40 hover:text-gold transition-colors duration-300"
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="font-serif text-gold text-lg mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {['Our Stays', 'Gallery', 'About Us', 'Contact'].map((item) => {
                                const href = item === 'About Us' ? '/about-us' : item === 'Contact' ? '/contact' : '#';
                                return (
                                    <li key={item}>
                                        <a
                                            href={href}
                                            className="font-sans text-dark/60 text-sm hover:text-dark transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-gold text-lg mb-6">Contact</h4>
                        <div className="space-y-5">
                            <div>
                                <span className="font-sans text-dark/40 text-xs uppercase tracking-wider block mb-1">Call Us</span>
                                <a
                                    href="tel:+94777654560"
                                    className="font-sans text-dark text-base hover:text-gold transition-colors"
                                >
                                    +94 77 765 4560
                                </a>
                            </div>
                            <div>
                                <span className="font-sans text-dark/40 text-xs uppercase tracking-wider block mb-1">Email</span>
                                <a
                                    href="mailto:info@myexclusiverentals.com"
                                    className="font-sans text-dark text-base hover:text-gold transition-colors"
                                >
                                    info@myexclusiverentals.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark/10 py-6">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                        <p className="font-sans text-dark/30 text-xs text-center">
                            &copy; 2026 Exclusive Rentals.
                        </p>
                        <span className="hidden sm:block text-dark/20">|</span>
                        <p className="font-sans text-dark/30 text-xs text-center">
                            Developed by <a href="https://tourithm.lk" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">tourithm.lk</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}