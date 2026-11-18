'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    TbBrandGithub,
    TbBrandLinkedin,
    TbBrandTelegram,
    TbBrandInstagram,
    TbArrowUpRight,
    TbHeartHandshake
} from 'react-icons/tb';
import { motion } from 'framer-motion';
import { socialLinks } from '../config/socialLinks';
import Link from 'next/link';
import { useCulture } from '../contexts/CultureContext';
import { cultureArt } from './culture/registry';
import CultureStrip from './culture/CultureStrip';

interface SocialItem {
    icon: ReactNode;
    href: string;
    label: string;
}

interface NavLink {
    labelKey: string;
    fallbackLabel: string;
    href: string;
}

export default function Footer() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const { culture } = useCulture();
    const BrandIcon = cultureArt[culture.id].icon;

    // Prevent hydration mismatch by rendering translated text only after client mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    const socials: SocialItem[] = [
        {
            icon: <TbBrandGithub size={20} />,
            href: socialLinks.github,
            label: 'GitHub',
        },
        {
            icon: <TbBrandLinkedin size={20} />,
            href: socialLinks.linkedin,
            label: 'LinkedIn',
        },
        {
            icon: <TbBrandTelegram size={20} />,
            href: socialLinks.telegram,
            label: 'Telegram',
        },
        {
            icon: <TbBrandInstagram size={20} />,
            href: socialLinks.instagram,
            label: 'Instagram',
        },
    ];

    const navLinks: NavLink[] = [
        { labelKey: 'menu.home', fallbackLabel: 'Home', href: '/#home' },
        { labelKey: 'menu.skills', fallbackLabel: 'Skills', href: '/#skills' },
        { labelKey: 'menu.projects', fallbackLabel: 'Projects', href: '/#projects' },
        { labelKey: 'menu.contact', fallbackLabel: 'Contact', href: '/#contact' },
    ];

    return (
        <footer className="relative overflow-hidden bg-paper pb-12 pt-0 text-ink">
            <CultureStrip className="mb-16" />
            <div className="accent-blob-b pointer-events-none absolute bottom-0 left-1/2 h-48 w-[34rem] -translate-x-1/2" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Main Content Grid */}
                <div className="tray flex flex-col justify-between gap-10 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center">

                    {/* Left Column: Brand & Status Sticker */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center gap-3">
                            {/* Sticker Brand Badge */}
                            <div className="sticker flex h-12 w-12 items-center justify-center rounded-2xl bg-card p-1">
                                <BrandIcon className="h-full w-full" />
                            </div>
                            <span className="font-display text-xl font-semibold text-ink">
                                Okawasakii
                            </span>

                            {/* Live Availability Badge */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {mounted ? (t('footer.isAvailable') || 'Available for hire') : 'Available for hire'}
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed text-ink-soft">
                            {mounted ? (t('footer.short_desc') || 'Building web applications with React, Next.js, and modern tools.') : 'Building web applications with React, Next.js, and modern tools.'}
                        </p>

                        {/* Playful Handwritten Tagline */}
                        <p
                            className="font-hand text-2xl"
                            style={{ color: 'var(--bg-color-primary)' }}
                        >
                            <span lang={culture.lang}>{culture.greeting}</span> · thanks for stopping by!
                        </p>
                    </div>

                    {/* Right Column: Navigation Links & Social Stickers */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12">

                        {/* Nav Links */}
                        <ul className="flex flex-col gap-3">
                            {navLinks.map(l => (
                                <li key={l.labelKey}>
                                    <Link
                                        href={l.href}
                                        className="group inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80"
                                        style={{ color: 'var(--bg-color-primary)' }}
                                    >
                                        <span className="text-ink group-hover:underline">
                                            {mounted ? (t(l.labelKey) || l.fallbackLabel) : l.fallbackLabel}
                                        </span>
                                        <TbArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Stickers Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                            {socials.map(s => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 rounded-2xl border-2 border-line bg-paper px-4 py-2.5 text-xs font-bold text-ink transition-all"
                                >
                                    <span style={{ color: 'var(--bg-color-primary)' }}>{s.icon}</span>
                                    <span>{s.label}</span>
                                </motion.a>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Bottom Bar: Copyright & Location */}
                <div className="mt-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-ink-soft">
                    <p>
                        © 2025–{new Date().getFullYear()}{' '}
                        <span className="font-bold text-ink">Okawasakii</span>.
                        {' '}{mounted ? (t('footer.copyright') || 'All rights reserved.') : 'All rights reserved.'}
                    </p>

                    <p className="flex items-center gap-1.5">
                        <span>{mounted ? (t('footer.credit.text') || 'Crafted with') : 'Crafted with'}</span>
                        <TbHeartHandshake size={16} style={{ color: 'var(--bg-color-primary)' }} />
                        <span>{mounted ? (t('footer.credit.location') || 'in Phnom Penh') : 'in Phnom Penh'}</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}