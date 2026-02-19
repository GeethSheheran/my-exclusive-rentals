'use client';

import { Section } from '@/components/ui/Section';
import Image from 'next/image';

export function MissionSection() {
    return (
        <Section className="py-24 md:py-32 bg-floral-white">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Visual Grid */}
                <div className="order-2 lg:order-1 space-y-8">
                    {/* <div className="w-24 h-[1px] bg-gold mb-8" /> */}
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold block">
                        Our Promise
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl text-dark leading-none">
                        Convenience <span className="text-gold">&</span> <br />Relaxation
                    </h2>
                    <p className="font-sans text-dark/60 text-lg leading-relaxed font-light max-w-xl">
                        Whether you&apos;re seeking a seaside retreat or a tranquil escape in the hills, each of our properties is thoughtfully designed with modern amenities, spacious living areas, and fully equipped kitchens, ensuring the perfect blend of convenience and relaxation. With prime locations near stunning landscapes and local attractions, Exclusive Rentals is dedicated to creating exceptional stays that feel like a true escape.
                    </p>
                </div>

                {/* Premium Image Grid */}
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-6">
                    {[
                        { title: "Beach Bliss", image: "/Beach-Bliss-Home.jpg" },
                        { title: "Luxury Penthouse", image: "/Luxury-Penthouse-Home.jpg" },
                        { title: "Sandy Shores", image: "/sandy-shores-main.jpg" },
                        { title: "Hill Haven", image: "/hill-main.jpg" }
                    ].map((item, idx) => (
                        <div key={idx} className="group relative aspect-[4/3] overflow-hidden bg-white shadow-xl shadow-dark/5">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="font-serif text-white text-xl md:text-2xl mb-2">{item.title}</h3>
                                <div className="w-0 group-hover:w-full h-[1px] bg-gold transition-all duration-700 delay-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
