'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete?: () => void;
}

const loadingFacts = [
    "Preparing creative portfolio...",
    "Full-Stack Developer • Vue & Laravel enthusiast",
    "Crafting smooth interactive experiences...",
    "Polishing stickers & roadmaps...",
    "Almost ready for you!"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [factIndex, setFactIndex] = useState(0);

    // Cycle through personal snippets while loading
    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex((prev) => (prev + 1) % loadingFacts.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF8F5] dark:bg-gray-950 text-gray-900 dark:text-gray-100 select-none overflow-hidden p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
            onAnimationComplete={onComplete}
        >
            {/* Soft Ambient Background Glow */}
            <div
                className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"
                style={{ backgroundColor: 'var(--bg-color-primary, #FF6B56)' }}
            />

            {/* Main Interactive Sticker Badge */}
            <motion.div className="relative mb-6">
                <motion.div
                    className="relative flex flex-col items-center justify-center w-24 h-24 rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800 text-white cursor-pointer"
                    style={{ backgroundColor: 'var(--bg-color-primary, #FF6B56)' }}
                    animate={{
                        rotate: [0, 8, -8, 0],
                        scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'easeInOut'
                    }}
                >
                    <span className="font-black text-2xl tracking-tight leading-none">osi</span>
                    <span 
                        className="text-[11px] font-bold opacity-90 italic mt-0.5"
                        style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                        Lohitha
                    </span>
                </motion.div>

                {/* Decorative Mini Sticker Badge */}
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute -bottom-2 -right-3 px-2.5 py-0.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-[10px] font-black uppercase rounded-full shadow-md border border-gray-100 dark:border-gray-800"
                >
                    Dev ✨
                </motion.span>
            </motion.div>

            {/* Personal Welcome Heading */}
            <motion.div
                className="flex flex-col items-center gap-2 text-center max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    Welcome to <span style={{ color: 'var(--bg-color-primary, #FF6B56)' }}>Okawasakii</span>'s space
                </h3>

                {/* Animated Rotating Personal Facts */}
                <div className="h-8 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={factIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-lg italic font-bold tracking-wide"
                            style={{
                                fontFamily: "'Caveat', cursive, sans-serif",
                                color: 'var(--bg-color-primary, #FF6B56)'
                            }}
                        >
                            {loadingFacts[factIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Animated Pulsing Dots Bar */}
                <div className="flex items-center gap-1.5 mt-2">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: 'var(--bg-color-primary, #FF6B56)' }}
                            animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                delay: i * 0.2,
                                ease: 'easeInOut'
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}