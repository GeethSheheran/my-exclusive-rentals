'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactSection } from '@/components/contact/ContactSection';

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Sticky Hero Container */}
            <div className="sticky top-0 h-[70vh] z-0">
                <ContactHero />
            </div>

            {/* Scrolling Content */}
            <div className="relative z-10">
                <ContactSection />
                <Footer />
            </div>
        </main>
    );
}
