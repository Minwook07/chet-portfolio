'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TbArrowDown, TbMessage } from 'react-icons/tb';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { images } from '../../assets';
import { socialLinks } from '../../config/socialLinks';

export default function About() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by ensuring i18n text renders after client mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Mouse Tracking for interactive looking feature
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Subtle translation & rotation for cursor interaction
    const imageX = useTransform(smoothX, [-500, 500], [-12, 12]);
    const imageY = useTransform(smoothY, [-500, 500], [-12, 12]);
    const imageRotate = useTransform(smoothX, [-500, 500], [-2, 2]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX - innerWidth / 2);
            mouseY.set(e.clientY - innerHeight / 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center bg-[#FFF8F5] dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden py-16 lg:py-0"
        >
            {/* Soft decorative background shapes */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/40 dark:bg-orange-950/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-100/50 dark:bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Text & Content */}
                    <motion.div
                        className="lg:col-span-7 space-y-8 text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        {/* Greeting Callout */}
                        <motion.div
                            className="inline-flex items-center gap-2 text-2xl font-serif italic font-handwriting"
                            style={{
                                fontFamily: "'Caveat', cursive, sans-serif",
                                color: 'var(--bg-color-primary)'
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span>{mounted ? (t('hero.greeting') || "Hi there, I'm") : "Hi there, I'm"}</span>
                            <motion.span
                                animate={{ rotate: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                                className="inline-block"
                            >
                                👋
                            </motion.span>
                        </motion.div>

                        {/* Title / Name */}
                        <div className="relative">
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#1A1A1A] dark:text-white leading-none">
                                {mounted ? (t('hero.name') || 'Lohitha') : 'Lohitha'}
                            </h1>
                            {/* Decorative underline with dynamic theme color */}
                            <svg
                                className="w-48 sm:w-64 h-4 mt-2"
                                style={{ color: 'var(--bg-color-primary)' }}
                                viewBox="0 0 200 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 10.5C50 3.5 150 14 197.5 5"
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Subtitle / Description */}
                        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed font-normal">
                            <span className="font-bold text-gray-900 dark:text-white">
                                {mounted ? (t('hero.sub_title') || 'Full-stack developer') : 'Full-stack developer'}
                            </span>{' '}
                            ✦ {mounted ? t('hero.description') : ''}
                        </p>

                        {/* Optional Stats Counter Section */}
                        <motion.div
                            className="grid grid-cols-3 gap-6 pt-2 border-t border-gray-200/60 dark:border-gray-800 max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div>
                                <h4
                                    className="text-2xl sm:text-3xl font-extrabold"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    1+
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Years Experience</p>
                            </div>
                            <div>
                                <h4
                                    className="text-2xl sm:text-3xl font-extrabold"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    10+
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Projects Built</p>
                            </div>
                            <div>
                                <h4
                                    className="text-2xl sm:text-3xl font-extrabold"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    100%
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Client Satisfaction</p>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4 pt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href="#projects"
                                style={{ backgroundColor: 'var(--bg-color-primary)' }}
                                className="inline-flex items-center gap-2 text-white py-3.5 px-8 rounded-full font-bold transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <span>{mounted ? (t('hero.project') || 'See my work') : 'See my work'}</span>
                                <TbArrowDown size={18} />
                            </a>
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 py-3.5 px-8 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                            >
                                <TbMessage size={18} />
                                <span>Message me</span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Interactive Profile Sticker */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                        {/* Playful Handwritten Arrow & Note */}
                        <motion.div
                            className="absolute -top-12 left-10 lg:-left-12 z-20 hidden sm:flex flex-col items-center pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <span
                                className="text-lg -rotate-6 font-semibold"
                                style={{
                                    fontFamily: "'Caveat', cursive, sans-serif",
                                    color: 'var(--bg-color-primary)'
                                }}
                            >
                                move your cursor, I'll look at it!
                            </span>
                            <svg
                                className="w-10 h-10 rotate-45 -mt-1"
                                style={{ color: 'var(--bg-color-primary)' }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.div>

                        {/* Profile Wrapper with Motion */}
                        <motion.div
                            className="relative"
                            style={{ x: imageX, y: imageY, rotate: imageRotate }}
                        >
                            {/* Background Arch Shape */}
                            <div className="absolute inset-0 bg-[#FFDCD3] dark:bg-orange-950/40 rounded-t-[10rem] rounded-b-[3rem] transform translate-y-4 scale-105" />

                            {/* Cutout Image with White Sticker Border */}
                            <div className="relative z-10 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                                <div className="p-2 bg-white dark:bg-gray-900 rounded-t-[10rem] rounded-b-[3rem]">
                                    <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-t-[9.5rem] rounded-b-[2.5rem] overflow-hidden">
                                        <Image
                                            src={images.profile}
                                            alt={mounted ? (t('hero.imageAlt') || 'Profile photo') : 'Profile photo'}
                                            fill
                                            priority
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}