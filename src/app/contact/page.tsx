'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactSection } from '@/components/contact/ContactSection';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ContactHero />
            <ContactSection />
            <Footer />
        </main>
    );
}
