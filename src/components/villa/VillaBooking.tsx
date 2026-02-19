'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface VillaBookingProps {
    villaName: string;
    bookingLink: string;
}

export function VillaBooking({ villaName }: VillaBookingProps) {
    return (
        <section className="bg-floral-white py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header */}
                    <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                        Book Your Stay
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-dark mb-8 leading-none">
                        Ready to Experience<br />{villaName}?
                    </h2>
                    <p className="font-sans text-dark/50 tracking-tight font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12">
                        Contact us to check availability and book your perfect getaway.
                        We&apos;re here to help you plan an unforgettable stay.
                    </p>

                    {/* CTA Button */}
                    <Link href="/contact">
                        <Button variant="solid">
                            Reserve Now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

