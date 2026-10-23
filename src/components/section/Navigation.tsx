'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { TbAppWindowFilled, TbCannabisFilled, TbHomeFilled, TbMessageFilled } from 'react-icons/tb';
import { useDarkMode } from '../../contexts/DarkModeContext';
import DarkModeToggle from '../DarkModeToggle';
import { LANGUAGE_STORAGE_KEY, type LanguageKey } from '../../lib/i18n';
import { scrollToSection } from '../../lib/scrollToSection';
import Link from 'next/link';

type SectionId = 'home' | 'skills' | 'projects' | 'contact';

interface LanguageOption {
    name: string;
    flag: string;
}

const sections: SectionId[] = ['home', 'skills', 'projects', 'contact'];

const languages: Record<LanguageKey, LanguageOption> = {
    en: { name: 'English', flag: '/images/flags/uk.webp' },
    km: { name: 'ភាសាខ្មែរ', flag: '/images/flags/km.svg' },
};

const sectionIcons: Record<SectionId, ReactNode> = {
    home: <TbHomeFilled size={18} />,
    skills: <TbCannabisFilled size={18} />,
    projects: <TbAppWindowFilled size={18} />,
    contact: <TbMessageFilled size={18} />,
};

export default function Navigation() {
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<SectionId>('home');
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { t, i18n } = useTranslation();
    const language = i18n.language as LanguageKey;
    const { isDarkMode } = useDarkMode();

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Active section detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    setActive(entry.target.id as SectionId);
                });
            },
            { rootMargin: '-30% 0px -60% 0px' },
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Click-outside for language dropdown
    useEffect(() => {
        const cb = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) document.addEventListener('mousedown', cb);
        return () => document.removeEventListener('mousedown', cb);
    }, [dropdownOpen]);

    const handleLanguageChange = (langKey: LanguageKey) => {
        i18n.changeLanguage(langKey);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, langKey);
        setDropdownOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300">
            <nav className="container mx-auto px-6 max-w-6xl">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/80 rounded-full px-6 py-3 shadow-lg shadow-black/5 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/images/logo/chet_nobg.svg"
                            alt="Logo"
                            className="h-8 w-auto transition-transform group-hover:scale-105"
                            style={{ filter: isDarkMode ? 'none' : 'invert(1)' }}
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8">
                        {sections.map(item => {
                            const isActive = active === item;
                            return (
                                <li key={item} className="relative">
                                    <Link
                                        href={`/#${item}`}
                                        onClick={e => {
                                            scrollToSection(e, item);
                                            setOpen(false);
                                        }}
                                        style={{
                                            color: isActive ? 'var(--bg-color-primary)' : undefined
                                        }}
                                        className={`group relative py-2 text-sm font-bold tracking-wide transition-colors flex flex-col items-center gap-1 ${
                                            isActive
                                                ? ''
                                                : 'text-gray-700 dark:text-gray-300 hover:opacity-80'
                                        }`}
                                    >
                                        <span>{t(`menu.${item}`)}</span>

                                        {/* Dot Indicator (Shows on Active & Hover) */}
                                        <span
                                            style={{
                                                backgroundColor: 'var(--bg-color-primary)'
                                            }}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                isActive
                                                    ? 'opacity-100 scale-100'
                                                    : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Controls (Language + DarkMode + Mobile Toggle) */}
                    <div className="flex items-center gap-4">
                        
                        {/* Language Switcher Badges */}
                        <div className="hidden md:flex items-center bg-[#FFF8F5] dark:bg-gray-800/80 p-1 rounded-full border border-orange-100 dark:border-gray-700">
                            {(Object.keys(languages) as LanguageKey[]).map((lang) => {
                                const isSelected = language === lang;
                                return (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang)}
                                        style={{
                                            backgroundColor: isSelected ? 'var(--bg-color-primary)' : undefined
                                        }}
                                        className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                            isSelected
                                                ? 'text-white shadow-xs'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <img
                                            src={languages[lang].flag}
                                            className="w-4 h-4 rounded-full object-cover"
                                            alt={languages[lang].name}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Dark Mode Toggle */}
                        <DarkModeToggle />

                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden p-2 text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ color: open ? 'var(--bg-color-primary)' : undefined }}
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle Menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between relative">
                                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`fixed top-20 left-6 right-6 z-50 md:hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 transition-all duration-300 transform ${
                    open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
                }`}
            >
                <ul className="flex flex-col gap-3">
                    {sections.map(item => {
                        const isActive = active === item;
                        return (
                            <li key={item}>
                                <Link
                                    href={`/#${item}`}
                                    onClick={e => {
                                        scrollToSection(e, item);
                                        setOpen(false);
                                    }}
                                    style={{
                                        color: isActive ? 'var(--bg-color-primary)' : undefined,
                                        backgroundColor: isActive ? 'rgba(255, 107, 86, 0.08)' : undefined
                                    }}
                                    className={`group flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all ${
                                        isActive
                                            ? 'dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: 'var(--bg-color-primary)' }}>{sectionIcons[item]}</span>
                                        <span>{t(`menu.${item}`)}</span>
                                    </div>

                                    {/* Mobile Dot Indicator */}
                                    <span
                                        style={{ backgroundColor: 'var(--bg-color-primary)' }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                                        }`}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

                {/* Mobile Language Controls */}
                <div className="flex items-center justify-center gap-2 bg-[#FFF8F5] dark:bg-gray-800/80 p-1.5 rounded-2xl border border-orange-100 dark:border-gray-700">
                    {(Object.keys(languages) as LanguageKey[]).map((langKey) => {
                        const isKhmer = langKey === 'km';
                        const isSelected = language === langKey;
                        return (
                            <button
                                key={langKey}
                                onClick={() => {
                                    handleLanguageChange(langKey);
                                    setOpen(false);
                                }}
                                style={{
                                    backgroundColor: isSelected ? 'var(--bg-color-primary)' : undefined
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                                    isSelected
                                        ? 'text-white shadow-xs'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                <img
                                    src={languages[langKey].flag}
                                    alt={languages[langKey].name}
                                    className="w-4 h-4 rounded-full object-cover"
                                />
                                <span className={isKhmer ? 'font-km' : 'font-en'}>
                                    {languages[langKey].name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}