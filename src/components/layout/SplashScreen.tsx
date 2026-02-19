'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show splash screen for 2.5 seconds total
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-floral-white"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    duration: 1.2,
                                    ease: "easeOut"
                                }
                            }}
                            className="relative w-48 h-32 md:w-64 md:h-40"
                        >
                            <Image
                                src="/er-logo.png"
                                alt="Exclusive Rentals"
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                            />
                        </motion.div>


                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
