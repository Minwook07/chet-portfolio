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

interface SocialItem {
    icon: ReactNode;
    href: string;
    label: string;
    colorClass: string;
}

interface NavLink {
    labelKey: string;
    fallbackLabel: string;
    href: string;
}

export default function Footer() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by rendering translated text only after client mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    const socials: SocialItem[] = [
        {
            icon: <TbBrandGithub size={20} />,
            href: socialLinks.github,
            label: 'GitHub',
            colorClass: 'bg-gray-900 text-white dark:bg-gray-800'
        },
        {
            icon: <TbBrandLinkedin size={20} />,
            href: socialLinks.linkedin,
            label: 'LinkedIn',
            colorClass: 'bg-[#0A66C2] text-white'
        },
        {
            icon: <TbBrandTelegram size={20} />,
            href: socialLinks.telegram,
            label: 'Telegram',
            colorClass: 'bg-[#0088cc] text-white'
        },
        {
            icon: <TbBrandInstagram size={20} />,
            href: socialLinks.instagram,
            label: 'Instagram',
            colorClass: 'bg-[#E1306C] text-white'
        },
    ];

    const navLinks: NavLink[] = [
        { labelKey: 'menu.home', fallbackLabel: 'Home', href: '/#home' },
        { labelKey: 'menu.skills', fallbackLabel: 'Skills', href: '/#skills' },
        { labelKey: 'menu.projects', fallbackLabel: 'Projects', href: '/#projects' },
        { labelKey: 'menu.contact', fallbackLabel: 'Contact', href: '/#contact' },
    ];

    return (
        <footer className="relative bg-[#FFF8F5] dark:bg-gray-950 text-gray-900 dark:text-gray-100 pt-16 pb-12 overflow-hidden border-t border-orange-100 dark:border-gray-800">
            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30rem] h-32 bg-orange-200/30 dark:bg-orange-950/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Main Content Grid */}
                <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-10">

                    {/* Left Column: Brand & Status Sticker */}
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center gap-3">
                            {/* Sticker Brand Badge */}
                            <div
                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm shadow-md"
                                style={{ backgroundColor: 'var(--bg-color-primary)' }}
                            >
                                osi
                            </div>
                            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                                Okawasakii
                            </span>

                            {/* Live Availability Badge */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {mounted ? (t('footer.isAvailable') || 'Available for hire') : 'Available for hire'}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            {mounted ? (t('footer.short_desc') || 'Building web applications with React, Next.js, and modern tools.') : 'Building web applications with React, Next.js, and modern tools.'}
                        </p>

                        {/* Playful Handwritten Tagline */}
                        <p
                            className="text-base italic font-semibold"
                            style={{
                                fontFamily: "'Caveat', cursive, sans-serif",
                                color: 'var(--bg-color-primary)'
                            }}
                        >
                            thanks for stopping by! ✨
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
                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:opacity-80 transition-opacity group"
                                        style={{ color: 'var(--bg-color-primary)' }}
                                    >
                                        <span className="text-gray-900 dark:text-white group-hover:underline">
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
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition-all ${s.colorClass}`}
                                >
                                    {s.icon}
                                    <span>{s.label}</span>
                                </motion.a>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Bottom Bar: Copyright & Location */}
                <div className="mt-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <p>
                        © 2025–{new Date().getFullYear()}{' '}
                        <span className="font-bold text-gray-800 dark:text-gray-200 uppercase">Okawasakii</span>.
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