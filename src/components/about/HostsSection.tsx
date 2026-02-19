'use client';

import { Section } from '@/components/ui/Section';

export function HostsSection() {
    return (
        <Section className="py-24 md:py-32 bg-floral-white">
            <div className="container mx-auto px-4">
                <div className="bg-soft-gray p-8 md:p-20 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                            The Team
                        </span>
                        <h2 className="font-serif text-5xl md:text-6xl text-dark mb-12">
                            Meet Your Hosts: <br /> <span className="text-gold">Rory & Elaine</span>
                        </h2>

                        <div className="space-y-8 font-sans text-dark/70 text-lg leading-relaxed font-light">
                            <p>
                                Rory, a retired airline pilot, alongside Elaine, a retired AVP of a leading international garment manufacturer, provides a warm and welcoming atmosphere at their retreats. With the love for travelling and meeting people and having stayed in many abode during their worldly travels, Rory and Elaine both know what a seasoned traveller is looking for and as a result, they go the extra mile to make every guest’s stay truly special.
                            </p>
                            <p>
                                Their properties offer a perfect blend of comfort, charm, and personal touches, that reflect their passion for hospitality. Whether it’s a sunrise walk on the beach in their beachside apartments or a round of early morning golf in their hillside retreat, they’re dedicated to making your stay unforgettable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
