'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryCategory } from '@/data/villas';

interface VillaGalleryProps {
    images: string[];
    villaName: string;
    categories?: GalleryCategory[];
}

export function VillaGallery({ images, villaName, categories }: VillaGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Flatten all images for lightbox navigation
    const allImages = categories
        ? categories.flatMap(cat => cat.images)
        : images;

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    // Handle body scroll locking
    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [lightboxOpen]);

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    // Get flat index for lightbox
    const getFlatIndex = (categoryIndex: number, imageIndex: number): number => {
        if (!categories) return imageIndex;
        let flatIndex = 0;
        for (let i = 0; i < categoryIndex; i++) {
            flatIndex += categories[i].images.length;
        }
        return flatIndex + imageIndex;
    };

    return (
        <>
            <section className="bg-floral-white py-20 md:py-24">
                <div className="container mx-auto px-4">

                    {/* Section Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                        <span className="text-gold font-sans text-xs tracking-[0.4em] uppercase font-bold mb-6 block">
                            Visual Tour
                        </span>
                        <h2 className="font-serif text-6xl md:text-7xl text-dark mb-8 leading-none">
                            Gallery
                        </h2>
                        <p className="font-sans text-dark/50 tracking-tight font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                            A glimpse into the beauty and comfort that awaits you.
                        </p>
                    </div>

                    {/* Categorized Gallery */}
                    {categories && categories.length > 0 ? (
                        <div className="max-w-7xl mx-auto space-y-16">
                            {categories.map((category, catIdx) => (
                                <div key={category.name} className="space-y-8">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-6">
                                        <h3 className="font-serif text-3xl md:text-4xl text-dark">
                                            {category.name}
                                        </h3>
                                        <div className="flex-1 h-px bg-dark/10" />
                                        <span className="text-dark/40 font-sans text-sm tracking-widest">
                                            {category.images.length} {category.images.length === 1 ? 'photo' : 'photos'}
                                        </span>
                                    </div>

                                    {/* Category Images Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {category.images.map((image, imgIdx) => (
                                            <div
                                                key={imgIdx}
                                                className="aspect-[4/3] relative overflow-hidden cursor-pointer group"
                                                onClick={() => openLightbox(getFlatIndex(catIdx, imgIdx))}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`${villaName} - ${category.name} ${imgIdx + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Fallback: Original Grid Layout for non-categorized images */
                        <div className="max-w-7xl mx-auto space-y-4">
                            {/* Hero Image - Full Width */}
                            {images[0] && (
                                <div
                                    className="w-full aspect-[21/9] relative overflow-hidden cursor-pointer group"
                                    onClick={() => openLightbox(0)}
                                >
                                    <Image
                                        src={images[0]}
                                        alt={`${villaName} - Image 1`}
                                        fill
                                        sizes="100vw"
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />
                                </div>
                            )}

                            {/* Four Equal Images Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.slice(1, 5).map((image, idx) => (
                                    <div
                                        key={idx}
                                        className="aspect-square relative overflow-hidden cursor-pointer group"
                                        onClick={() => openLightbox(idx + 1)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${villaName} - Image ${idx + 2}`}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />

                                        {/* Show remaining count on last image */}
                                        {idx === 3 && images.length > 5 && (
                                            <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                                                <div className="text-center">
                                                    <span className="text-white font-serif text-4xl md:text-5xl">+{images.length - 5}</span>
                                                    <p className="text-white/70 font-sans text-xs tracking-widest uppercase mt-2">More</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* View All Button */}
                            {images.length > 5 && (
                                <div className="text-center mt-16">
                                    <button
                                        onClick={() => openLightbox(0)}
                                        className="inline-flex items-center gap-4 group"
                                    >
                                        <span className="font-sans text-sm font-medium tracking-[0.2em] uppercase text-gold group-hover:text-dark transition-colors duration-300">
                                            View All {images.length} Photos
                                        </span>
                                        <div className="w-12 h-px bg-gold group-hover:bg-dark group-hover:w-20 transition-all duration-500" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-dark/98 flex items-center justify-center animate-fadeIn"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-8 right-8 z-50 w-14 h-14 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <X size={28} strokeWidth={1} />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-8 z-50 w-16 h-16 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={40} strokeWidth={1} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-8 z-50 w-16 h-16 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        >
                            <ChevronRight size={40} strokeWidth={1} />
                        </button>

                        {/* Main Image */}
                        <div
                            className="relative max-w-6xl max-h-[85vh] w-full h-full m-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={allImages[lightboxIndex]}
                                alt={`${villaName} - Image ${lightboxIndex + 1}`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                            <span className="text-white/50 font-sans text-sm tracking-widest">
                                {lightboxIndex + 1} <span className="text-white/30">—</span> {allImages.length}
                            </span>
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto">
                            {allImages.slice(
                                Math.max(0, lightboxIndex - 10),
                                Math.min(allImages.length, lightboxIndex + 11)
                            ).map((_, idx) => {
                                const actualIdx = Math.max(0, lightboxIndex - 10) + idx;
                                return (
                                    <button
                                        key={actualIdx}
                                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(actualIdx); }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${actualIdx === lightboxIndex
                                            ? 'bg-gold w-8'
                                            : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
