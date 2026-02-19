'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <ContactHero />
            <ContactInfo />
            <ContactForm />
            <Footer />
        </main>
    );
}
