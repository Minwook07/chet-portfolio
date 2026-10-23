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
    home: <TbHomeFilled />,
    skills: <TbCannabisFilled />,
    projects: <TbAppWindowFilled />,
    contact: <TbMessageFilled />,
};

export default function Navigation() {
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<SectionId>('home');
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
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
        <nav className="nav-root">
            <div className="nav-bar">
                <div className="nav-inner container mx-auto px-6">
                    <Link href="/" className="nav-logo">
                        <img
                            src="/images/logo/chet_nobg.svg"
                            alt="Logo"
                            style={{ filter: isDarkMode ? 'none' : 'invert(1)' }}
                        />
                    </Link>

                    <ul className="nav-links-desktop">
                        {sections.map(item => (
                            <li key={item}>
                                <Link
                                    href={`#${item}`}
                                    onClick={e => scrollToSection(e, item)}
                                    className={`nav-link ${active === item ? 'active' : ''}`}
                                >
                                    {t(`menu.${item}`)}
                                    <span className="link-dot" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-controls flex items-center gap-4">
                        <div className="hidden md:flex items-center">
                            {Object.keys(languages).map((key, index) => {
                                const lang = key as LanguageKey;
                                const isKhmer = lang === 'km';
                                return (
                                    <div key={lang} className="flex items-center">
                                        <button
                                            onClick={() => handleLanguageChange(lang)}
                                            className={`
                                                flex items-center gap-2
                                                px-3 py-1.5
                                                rounded-full
                                                transition-all duration-300
                                                cursor-pointer

                                                ${language === lang
                                                    ? "accent-gradient-text bg-clip-text text-transparent font-bold"
                                                    : "text-gray-700 dark:text-gray-300 hover-gradient-text hover:bg-clip-text hover:text-transparent"
                                                }
                                            `}
                                        >
                                            <img
                                                src={languages[lang].flag}
                                                className="w-6 h-6 rounded-full object-cover"
                                                alt=""
                                            />

                                            <span className={`whitespace-nowrap text-sm ${isKhmer ? 'font-km' : 'font-en'}`}>
                                                {languages[lang].name}
                                            </span>
                                        </button>

                                        {index !== Object.keys(languages).length - 1 && (
                                            <span className="text-gray-500 text-xl">
                                                |
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <DarkModeToggle />

                        <style>{`@media(min-width:768px){#desktop-lang{display:block!important}}`}</style>

                        <button
                            className={`hamburger ${open ? 'open' : ''}`}
                            onClick={() => setOpen(!open)}
                            aria-label="Menu"
                        >
                            <span className="ham-line" />
                            <span className="ham-line" />
                            <span className="ham-line" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile overlay */}
            <div
                className={`drawer-overlay ${open ? 'visible' : ''}`}
                onClick={() => setOpen(false)}
            />

            {/* Mobile drawer */}
            <div className={`drawer ${open ? 'open' : ''}`}>
                <div className="drawer-handle" />

                <ul className="drawer-nav">
                    {sections.map(item => (
                        <li key={item}>
                            <a
                                href={`#${item}`}
                                onClick={e => {
                                    scrollToSection(e, item);
                                    setOpen(false);
                                }}
                                className={`drawer-link ${active === item ? 'active' : ''}`}
                            >
                                <span className="dl-icon">{sectionIcons[item]}</span>
                                {t(`menu.${item}`)}
                                <span className="dl-dot" />
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="drawer-divider" />
                <div className="drawer-controls pt-2 pb-6 px-4 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2">
                        {(Object.keys(languages) as LanguageKey[]).map((langKey, index) => {
                            const isKhmer = langKey === 'km';
                            return (
                                <div key={langKey} className="flex items-center">
                                    <button
                                        onClick={() => handleLanguageChange(langKey)}
                                        className={`
                                    flex items-center gap-2
                                    px-4 py-2
                                    rounded-full
                                    transition-all duration-300

                                    ${language === langKey
                                                ? "accent-gradient-text bg-clip-text text-transparent font-bold"
                                                : "text-gray-700 dark:text-gray-300 hover-gradient-text hover:bg-clip-text hover:text-transparent"
                                            }
                                `}
                                    >
                                        <img
                                            src={languages[langKey].flag}
                                            alt=""
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span className={`text-base whitespace-nowrap ${isKhmer ? 'font-km' : 'font-en'}`}>
                                            {languages[langKey].name}
                                        </span>
                                    </button>

                                    {/* Divider separator between English and Khmer */}
                                    {index !== Object.keys(languages).length - 1 && (
                                        <span className="text-gray-400 dark:text-gray-600 text-lg mx-1">
                                            |
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
