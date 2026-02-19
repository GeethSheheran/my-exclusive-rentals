'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';

interface SectionProps extends HTMLMotionProps<'section'> {
    children: React.ReactNode;
    container?: boolean;
    className?: string;
}

export function Section({ children, container = true, className, ...props }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("py-16 md:py-24", className)}
            {...props}
        >
            {container ? <div className="container">{children}</div> : children}
        </motion.section>
    );
}
