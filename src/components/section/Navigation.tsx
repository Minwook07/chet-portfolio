import { useState, useEffect, useRef, ReactNode } from 'react';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { TbAppWindowFilled, TbCannabisFilled, TbHomeFilled, TbMessageFilled } from 'react-icons/tb';
import { useDarkMode } from '../../contexts/DarkModeContext';
import DarkModeToggle from '../DarkModeToggle';

type SectionId = 'home' | 'skills' | 'projects' | 'contact';
type LanguageKey = 'en' | 'km';

interface LanguageOption {
    name: string;
    flag: string;
}

const sections: SectionId[] = ['home', 'skills', 'projects', 'contact'];

const languages: Record<LanguageKey, LanguageOption> = {
    en: { name: 'English', flag: '/images/flags/uk.webp' },
    km: { name: 'ភាសាខ្មែរ', flag: '/images/flags/km.svg' },
};

i18next
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ko', 'km'],
        fallbackLng: 'en',
        lng: localStorage.getItem('language') || 'en',
        backend: { loadPath: '/locales/{{lng}}/translation.json' },
        interpolation: { escapeValue: false }
    });

const sectionIcons: Record<SectionId, ReactNode> = {
    home: <TbHomeFilled />,
    skills: <TbCannabisFilled />,
    projects: <TbAppWindowFilled />,
    contact: <TbMessageFilled />,
};

export default function Navigation() {
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<SectionId>('home');
    const [language, setLanguage] = useState<LanguageKey>(
        (localStorage.getItem('language') as LanguageKey) || 'en'
    );
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Active section detection
    useEffect(() => {
        const handler = () => {
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const { top } = el.getBoundingClientRect();
                if (top <= window.innerHeight * 0.3 && top >= -el.offsetHeight * 0.3) setActive(id);
            });
        };
        window.addEventListener('scroll', handler);
        handler();
        return () => window.removeEventListener('scroll', handler);
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
        setLanguage(langKey);
        i18next.changeLanguage(langKey);
        localStorage.setItem('language', langKey);
        setDropdownOpen(false);
    };

    return (
        <nav className="nav-root">
            <div className="nav-bar">
                <div className="nav-inner container mx-auto px-6">
                    <a href="#home" className="nav-logo">
                        <img
                            src="/images/logo/chet_nobg.svg"
                            alt="Logo"
                            style={{ filter: isDarkMode ? 'none' : 'invert(1)' }}
                        />
                    </a>

                    <ul className="nav-links-desktop">
                        {sections.map(item => (
                            <li key={item}>
                                <a
                                    href={`#${item}`}
                                    className={`nav-link ${active === item ? 'active' : ''}`}
                                >
                                    {t(`menu.${item}`)}
                                    <span className="link-dot" />
                                </a>
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

                                                ${language === lang
                                                    ? "bg-linear-to-r from-yellow-500 via-yellow-600 to-orange-500 dark:from-purple-500 dark:via-purple-600 dark:to-pink-500 bg-clip-text text-transparent font-bold"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-linear-to-r hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-500 dark:hover:from-purple-500 dark:hover:via-purple-600 dark:hover:to-pink-500 hover:bg-clip-text hover:text-transparent"
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
            {/* Mobile drawer */}
            <div className={`drawer ${open ? 'open' : ''}`}>
                <div className="drawer-handle" />

                <ul className="drawer-nav">
                    {sections.map(item => (
                        <li key={item}>
                            <a
                                href={`#${item}`}
                                className={`drawer-link ${active === item ? 'active' : ''}`}
                                onClick={() => setOpen(false)}
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
                                                ? "bg-linear-to-r from-yellow-500 via-yellow-600 to-orange-500 dark:from-purple-500 dark:via-purple-600 dark:to-pink-500 bg-clip-text text-transparent font-bold"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-linear-to-r hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-500 dark:hover:from-purple-500 dark:hover:via-purple-600 dark:hover:to-pink-500 hover:bg-clip-text hover:text-transparent"
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
