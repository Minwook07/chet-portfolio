'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCulture } from '../contexts/CultureContext';
import { cultureArt } from './culture/registry';
import { scriptClass } from './culture/scriptFont';

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
    const { culture } = useCulture();
    const Icon = cultureArt[culture.id].icon;

    // Cycle through personal snippets while loading
    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex((prev) => (prev + 1) % loadingFacts.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper text-ink select-none overflow-hidden p-6"
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
                    className="sticker relative flex h-28 w-28 items-center justify-center rounded-3xl bg-card p-3 shadow-2xl"
                    animate={{ rotate: [0, 6, -6, 0], scale: [0.97, 1.04, 0.97] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                >
                    <Icon className="h-full w-full" />
                </motion.div>
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    lang={culture.lang}
                    className={`on-accent absolute -bottom-3 -right-8 rounded-full px-3 py-0.5 ${scriptClass(culture.lang)} shadow-md`}
                    style={{ backgroundColor: 'var(--bg-color-primary, #FF6B56)', fontSize: '1.1rem' }}
                >
                    {culture.greeting}
                </motion.span>
            </motion.div>

            {/* Personal Welcome Heading */}
            <motion.div
                className="flex flex-col items-center gap-2 text-center max-w-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="font-display text-2xl font-semibold text-ink">
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
                            className="font-hand text-xl"
                            style={{ color: 'var(--bg-color-primary, #FF6B56)' }}
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