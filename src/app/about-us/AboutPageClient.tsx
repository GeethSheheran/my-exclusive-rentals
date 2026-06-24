'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionSection } from '@/components/about/MissionSection';
import { HostsSection } from '@/components/about/HostsSection';

export function AboutPageClient() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <AboutHero />
            <MissionSection />
            <HostsSection />
            <Footer />
        </main>
    );
}
