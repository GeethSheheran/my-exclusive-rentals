'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VILLAS } from '@/data/villas';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function OurStayPage() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Collection</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-dark mb-8 tracking-tight">
                        Our <span className="italic font-light">Stay</span>
                    </h1>
                    <p className="font-sans text-dark/60 text-lg leading-relaxed">
                        Our collection features four luxurious spaces, each thoughtfully designed to blend modern elegance with coastal charm. Whether you&apos;re seeking a serene retreat or a stylish getaway, our apartments offer spacious interiors, stunning views, and premium amenities to ensure a relaxing and memorable stay. Perfectly situated near the beach, they provide the ideal setting for both comfort and adventure.
                    </p>
                </motion.div>
            </div>

            {/* Property Cards */}
            <section className="bg-floral-white py-20 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col gap-32">
                        {VILLAS.map((villa, idx) => (
                            <motion.div
                                key={villa.slug}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="group"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
                                    {/* Image Section */}
                                    <div className={`lg:col-span-7 relative ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <Link href={`/stays/${villa.slug}`} className="block relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden ">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <Image
                                                src={villa.heroImage}
                                                alt={villa.name}
                                                fill
                                                className="object-cover transition-all duration-1000 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                                priority={idx === 0}
                                            />
                                        </Link>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`lg:col-span-5 flex flex-col ${idx % 2 === 1 ? 'lg:order-1 lg:items-end lg:text-right' : 'lg:order-2 lg:items-start text-left'}`}>
                                        <div className="mb-6">
                                            <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase font-bold inline-block border border-gold/30 px-4 py-2 ">
                                                {villa.location}
                                            </span>
                                        </div>

                                        <Link href={`/stays/${villa.slug}`} className="group-hover:text-gold transition-colors duration-300">
                                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6 leading-tight">
                                                {villa.name}
                                            </h2>
                                        </Link>

                                        <p className="font-sans text-dark/60 text-lg leading-relaxed mb-10 max-w-lg">
                                            {villa.tagline}. {villa.description[0].substring(0, 120)}...
                                        </p>

                                        {/* Luxury Stats Grid */}
                                        <div className={`grid grid-cols-3 gap-8 py-8 border-y border-dark/5 mb-10 w-full ${idx % 2 === 1 ? 'lg:ml-auto' : ''}`}>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-serif text-3xl text-dark">{villa.stats.sleeps}</span>
                                                <span className="text-[10px] tracking-widest text-dark/40 uppercase font-sans">Guests</span>
                                            </div>
                                            <div className="flex flex-col gap-1 border-l border-dark/5 pl-8">
                                                <span className="font-serif text-3xl text-dark">{villa.stats.bedrooms}</span>
                                                <span className="text-[10px] tracking-widest text-dark/40 uppercase font-sans">Bedrooms</span>
                                            </div>
                                            <div className="flex flex-col gap-1 border-l border-dark/5 pl-8">
                                                <span className="font-serif text-3xl text-dark">{villa.stats.floorArea}</span>
                                                <span className="text-[10px] tracking-widest text-dark/40 uppercase font-sans">Sqm</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/stays/${villa.slug}`}
                                            className="inline-flex items-center gap-3 text-gold font-bold uppercase tracking-widest text-sm hover:text-dark transition-colors duration-300 group/link"
                                        >
                                            Explore Residence
                                            <span className="bg-gold text-white rounded-full p-2 group-hover/link:bg-dark transition-colors duration-300">
                                                <ArrowRight size={14} className="-rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-floral-white py-20 pb-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 className="font-serif text-3xl md:text-5xl text-dark mb-6">
                            Can&apos;t Decide?
                        </h2>
                        <p className="font-sans text-dark/60 mb-8">
                            Let us help you choose the perfect property for your stay.
                            Contact us and we&apos;ll guide you to your ideal getaway.
                        </p>
                        <Button
                            variant="solid"
                            onClick={() => router.push('/contact')}
                            className="inline-flex items-center gap-2"
                        >
                            Get in Touch
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
