'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'solid' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export function Button({ variant = 'solid', className, children, ...props }: ButtonProps) {
    const variants = {
        solid: "bg-gold text-white border-2 border-gold hover:bg-transparent hover:text-gold",
        outline: "bg-transparent text-gold border-2 border-gold hover:bg-transparent hover:text-gold",
        ghost: "bg-transparent text-dark hover:text-gold",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "px-8 py-3 rounded-none font-semibold uppercase tracking-wider transition-colors duration-300 font-sans",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
