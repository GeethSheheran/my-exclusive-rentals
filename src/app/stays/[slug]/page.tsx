import { notFound } from 'next/navigation';
import { getVillaBySlug, VILLAS } from '@/data/villas';
import { VillaPageClient } from './VillaPageClient';

// Generate static params for all villas
export function generateStaticParams() {
    return VILLAS.map((villa) => ({
        slug: villa.slug,
    }));
}

// Generate metadata for each villa
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const villa = getVillaBySlug(slug);

    if (!villa) {
        return {
            title: 'Villa Not Found',
        };
    }

    return {
        title: `${villa.name} | Exclusive Rentals`,
        description: villa.tagline,
    };
}

export default async function VillaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const villa = getVillaBySlug(slug);

    if (!villa) {
        notFound();
    }

    return <VillaPageClient villa={villa} />;
}
