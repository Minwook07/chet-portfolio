'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TbArrowDown, TbMessage } from 'react-icons/tb';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { images } from '../../assets';
import { socialLinks } from '../../config/socialLinks';
import { useCulture } from '../../contexts/CultureContext';
import CultureScene from '../culture/CultureScene';
import CultureStrip from '../culture/CultureStrip';
import { cultureArt } from '../culture/registry';
import { scriptClass } from '../culture/scriptFont';

export default function About() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const { culture } = useCulture();
    const SipIcon = cultureArt[culture.id].icon;

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
            className="relative flex min-h-screen items-center overflow-hidden bg-paper px-0 pb-20 pt-28 text-ink lg:py-28"
        >
            {/* Soft decorative background shapes */}
            <div className="accent-blob-a pointer-events-none absolute -left-20 top-10 h-96 w-96" />
            <div className="accent-blob-b pointer-events-none absolute -right-10 bottom-10 h-[28rem] w-[28rem]" />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Text & Content */}
                    <motion.div
                        className="lg:col-span-7 space-y-8 text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        {/* Greeting: the local hello, then the translated line */}
                        <motion.div
                            className="flex flex-wrap items-center gap-x-3 gap-y-1"
                            style={{ color: 'var(--bg-color-primary)' }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span lang={culture.lang} className={`${scriptClass(culture.lang)} leading-none`}>
                                {culture.greeting}
                            </span>
                            <span className="font-hand text-2xl">
                                {mounted ? (t('hero.greeting') || "Hi there, I'm") : "Hi there, I'm"}
                            </span>
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
                            <h1 className="font-display text-6xl font-semibold leading-[1.05] text-ink sm:text-7xl lg:text-8xl">
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

                        {/* Role sticker + description */}
                        <div className="space-y-4">
                            <span
                                className="on-accent sticker inline-block -rotate-2 rounded-full px-5 py-1.5 text-base font-bold"
                                style={{ backgroundColor: 'var(--bg-color-primary)' }}
                            >
                                {mounted ? (t('hero.sub_title') || 'Full-stack developer') : 'Full-stack developer'}
                            </span>
                            <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                                {mounted ? t('hero.description') : ''}
                            </p>
                        </div>

                        {/* Optional Stats Counter Section */}
                        <motion.div
                            className="grid max-w-lg grid-cols-3 gap-6 border-t-2 border-dashed pt-4"
                            style={{ borderColor: 'var(--stitch)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div>
                                <h4
                                    className="font-display text-3xl font-semibold sm:text-4xl"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    1+
                                </h4>
                                <p className="text-xs text-ink-soft sm:text-sm">Years Experience</p>
                            </div>
                            <div>
                                <h4
                                    className="font-display text-3xl font-semibold sm:text-4xl"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    10+
                                </h4>
                                <p className="text-xs text-ink-soft sm:text-sm">Projects Built</p>
                            </div>
                            <div>
                                <h4
                                    className="font-display text-3xl font-semibold sm:text-4xl"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    100%
                                </h4>
                                <p className="text-xs text-ink-soft sm:text-sm">Client Satisfaction</p>
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
                                className="on-accent inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
                            >
                                <span>{mounted ? (t('hero.project') || 'See my work') : 'See my work'}</span>
                                <TbArrowDown size={18} />
                            </a>
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-ink bg-card px-8 py-3.5 font-bold text-ink transition-all hover:scale-105 active:scale-95"
                            >
                                <TbMessage size={18} />
                                <span>Message me</span>
                            </a>
                        </motion.div>

                        {/* What's in the cup today */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="tray flex h-12 w-12 items-center justify-center rounded-2xl">
                                <SipIcon className="h-9 w-9" />
                            </span>
                            <p className="font-hand text-xl leading-tight text-ink-soft">
                                {mounted ? t('hero.sip', 'Currently sipping') : 'Currently sipping'}
                                <br />
                                <span lang={culture.lang} className="text-2xl text-ink">{culture.sip}</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Profile Sticker */}
                    <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
                        {/* Playful Handwritten Arrow & Note */}
                        <motion.div
                            className="absolute -top-12 left-10 lg:-left-12 z-20 hidden sm:flex flex-col items-center pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <span
                                className="font-hand -rotate-6 text-lg font-semibold"
                                style={{ color: 'var(--bg-color-primary)' }}
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

                        {/* Profile wrapper: scene sits behind and around the arch */}
                        <div className="relative">
                            <CultureScene />
                            <motion.div
                                className="relative z-10"
                                style={{ x: imageX, y: imageY, rotate: imageRotate }}
                            >
                                {/* Background Arch Shape */}
                                <div className="absolute inset-0 translate-y-4 scale-105 rounded-b-[3rem] rounded-t-[10rem]" style={{ background: 'color-mix(in srgb, var(--bg-color-primary) 26%, var(--paper-2))' }} />

                                {/* Cutout Image with White Sticker Border */}
                                <div className="relative z-10 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                                    <div className="rounded-b-[3rem] rounded-t-[10rem] bg-card p-2">
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
            </div>
            <CultureStrip className="absolute bottom-0 left-0" />
        </section>
    );
}