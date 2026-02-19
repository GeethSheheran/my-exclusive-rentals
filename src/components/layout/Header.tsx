'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Villa/Stays data for dropdown
const STAYS = [
    {
        name: 'Beach Bliss',
        href: '/stays/beach-bliss',
        image: '/Beach-Bliss-Home.jpg',
        desc: 'Stunning ocean views'
    },
    {
        name: 'Sandy Shores',
        href: '/stays/sandy-shores',
        image: '/sandy-shores-main.jpg',
        desc: 'Steps from the sand'
    },
    {
        name: 'Luxury Penthouse',
        href: '/stays/luxury-penthouse',
        image: '/Luxury-Penthouse-Home.jpg',
        desc: 'Breathtaking views'
    },
    {
        name: 'Hill Haven',
        href: '/stays/hill-haven',
        image: '/hill-main.jpg',
        desc: 'Tea plantation retreat'
    }
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStaysDropdownOpen, setIsStaysDropdownOpen] = useState(false);
    const [isMobileStaysOpen, setIsMobileStaysOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const navLinks = [
        { name: 'Home', href: '/', hasDropdown: false },
        { name: 'Our Stays', href: '/our-stays', hasDropdown: true },
        { name: 'About Us', href: '/about-us', hasDropdown: false },
        { name: 'Contact', href: '/contact', hasDropdown: false },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className={cn(
                    "fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300",
                    isScrolled ? "py-0" : "py-2"
                )}
            >
                {/* Floating Glass Pill */}
                <div className={cn(
                    "relative flex items-center justify-between transition-all duration-500",
                    "bg-white/30 backdrop-blur-md border border-white/20 shadow-2xl shadow-dark/5",
                    "rounded-full px-4 py-3 lg:px-6 lg:py-4",
                    isScrolled ? "w-[90%] lg:w-[70%] max-w-5xl" : "w-[95%] lg:w-[85%] max-w-7xl"
                )}>

                    {/* Logo */}
                    <Link href="/" className="relative z-50 group">
                        <div className="relative w-20 h-16 lg:w-32 lg:h-20 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/er-logo.png"
                                alt="Exclusive Rentals"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav - Only show on lg and up */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            link.hasDropdown ? (
                                // Our Stays with Dropdown
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setIsStaysDropdownOpen(true)}
                                    onMouseLeave={() => setIsStaysDropdownOpen(false)}
                                >
                                    <button className="relative px-5 py-2 group flex items-center gap-1">
                                        <span className={cn(
                                            "relative z-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                                            "text-dark/70 group-hover:text-dark"
                                        )}>
                                            {link.name}
                                        </span>
                                        <ChevronDown
                                            size={14}
                                            className={cn(
                                                "text-dark/50 transition-transform duration-300",
                                                isStaysDropdownOpen && "rotate-180"
                                            )}
                                        />
                                        <span className="absolute inset-0 bg-gold/10 rounded-full scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out -z-0" />
                                    </button>

                                    {/* Luxurious Mega Dropdown Menu */}
                                    <AnimatePresence>
                                        {isStaysDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                className="fixed left-1/2 -translate-x-1/2 top-24 w-[90vw] max-w-5xl z-50"
                                            >
                                                {/* Premium Glass Card */}
                                                <div className="relative bg-floral-white/100 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.15)] border border-white/80 overflow-hidden">

                                                    {/* Content */}
                                                    <div className="p-8">
                                                        {/* Header */}
                                                        <div className="flex items-center justify-between mb-8">
                                                            <div>
                                                                <span className="text-gold font-sans text-[10px] tracking-[0.3em] uppercase font-bold">Curated Collection</span>
                                                                <h3 className="font-serif text-3xl text-dark mt-1">Our Exclusive Stays</h3>
                                                            </div>
                                                            <Link
                                                                href="/our-stays"
                                                                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold/80 hover:text-gold/100 transition-colors"
                                                            >
                                                                View All
                                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </div>

                                                        {/* Stays Grid - Staggered Animation */}
                                                        <div className="grid grid-cols-4 gap-5">
                                                            {STAYS.map((stay, idx) => (
                                                                <motion.div
                                                                    key={stay.name}
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                                >
                                                                    <Link
                                                                        href={stay.href}
                                                                        className="group/card block relative rounded-2xl overflow-hidden"
                                                                    >
                                                                        {/* Image Container */}
                                                                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                                                                            <Image
                                                                                src={stay.image}
                                                                                alt={stay.name}
                                                                                fill
                                                                                className="object-cover transition-all duration-700 group-hover/card:scale-110"
                                                                            />
                                                                            {/* Gradient Overlay - Darker for text visibility */}
                                                                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-75 group-hover/card:opacity-90 transition-opacity duration-500" />

                                                                            {/* Shimmer Effect on Hover */}
                                                                            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                                                                            </div>

                                                                            {/* Content Overlay */}
                                                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                                                <div className="transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                                                                                    <span className="text-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100">
                                                                                        Explore
                                                                                    </span>
                                                                                    <h4 className="font-serif text-xl text-white mt-1 group-hover/card:text-gold transition-colors duration-300">
                                                                                        {stay.name}
                                                                                    </h4>
                                                                                    <p className="text-white/70 text-xs mt-1 font-light">
                                                                                        {stay.desc}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            {/* Corner Accent */}
                                                                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                                                        </div>
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                // Regular Nav Links
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative px-5 py-2 group"
                                >
                                    <span className={cn(
                                        "relative z-10 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                                        "text-dark/70 group-hover:text-dark"
                                    )}>
                                        {link.name}
                                    </span>
                                    <span className="absolute inset-0 bg-gold/10 rounded-full scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out -z-0" />
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="solid"
                            className="hidden lg:flex rounded-full !px-6 !py-5 text-xs font-bold tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-0.5"
                        >
                            Book Now
                        </Button>

                        {/* Mobile/Tablet Menu Toggle - Show on anything below lg */}
                        <button
                            className="lg:hidden w-10 h-10 rounded-full bg-soft-gray flex items-center justify-center text-dark transition-colors hover:bg-gold hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile/Tablet Nav Overlay - Show on anything below lg */}
            <motion.div
                initial={{ opacity: 0, pointerEvents: "none" }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 lg:hidden overflow-y-auto py-24"
            >
                {navLinks.map((link, idx) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        className="text-center"
                    >
                        {link.hasDropdown ? (
                            // Mobile Stays with Accordion
                            <div>
                                <button
                                    onClick={() => setIsMobileStaysOpen(!isMobileStaysOpen)}
                                    className="text-3xl font-serif text-dark hover:text-gold transition-colors flex items-center gap-2"
                                >
                                    {link.name}
                                    <ChevronDown
                                        size={24}
                                        className={cn(
                                            "transition-transform duration-300",
                                            isMobileStaysOpen && "rotate-180"
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isMobileStaysOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 space-y-3">
                                                {STAYS.map((stay) => (
                                                    <Link
                                                        key={stay.name}
                                                        href={stay.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block text-lg font-sans text-dark/70 hover:text-gold transition-colors"
                                                    >
                                                        {stay.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href={link.href}
                                className="text-3xl font-serif text-dark hover:text-gold transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )}
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button className="rounded-full px-8 py-4 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                        Book Your Stay
                    </Button>
                </motion.div>
            </motion.div>
        </>
    );
}
