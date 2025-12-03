import React, { useState, useEffect, useRef } from 'react';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend'

// Define sections
const sections = ['home', 'skills', 'projects', 'about', 'contact'];

// Define languages with flags
const languages = {
    en: { name: 'English', flag: '/images/flags/uk.png' },
    km: { name: 'ភាសាខ្មែរ', flag: '/images/flags/km.png' },
    // ko: { name: '한국어', flag: '/images/flags/kr.png' },
};

i18next
    .use(HttpApi) // Load translations from server (public folder)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ko', 'km'],
        fallbackLng: 'en',
        lng: localStorage.getItem('language') || 'en',
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false,
        }
    });

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Default language 'en'
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
    const dropdownRef = useRef(null); // Ref for click-outside detection

    // Get current translations
    const { t } = useTranslation();

    // Scroll handler for active section
    useEffect(() => {
        const handler = () => {
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const { top } = el.getBoundingClientRect();
                if (top <= window.innerHeight * 0.3 && top >= -el.offsetHeight * 0.3) {
                    setActive(id);
                }
            });
        };
        window.addEventListener('scroll', handler);
        handler();
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Click outside handler for dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // Function to handle language change
    const handleLanguageChange = (langKey) => {
        setLanguage(langKey);
        i18next.changeLanguage(langKey);
        localStorage.setItem('language', langKey);
        setDropdownOpen(false); // Close dropdown
        setOpen(false); // Close mobile menu
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-opacity-95 z-50 shadow-md" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <div className="w-50 h-10 flex items-center rounded-lg font-bold text-xl">
                        {/* <img src="/images/logo/chet_nobg.svg" alt="Logo" style={{ filter: 'invert(1)', height: '40px' }} /> */}
                        <img src="/images/logo/chet_nobg.svg" alt="Logo" style={{  height: '40px' }} />
                    </div>
                </a>

                {/* Hamburger Menu Button */}
                <button className="md:hidden cursor-pointer text-white" onClick={() => setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {open ? (
                            <> <line x1="18" y1="6" x2="6" y2="18" /> <line x1="6" y1="6" x2="18" y2="18" /> </>
                        ) : (
                            <> <line x1="3" y1="12" x2="21" y2="12" /> <line x1="3" y1="6" x2="21" y2="6" /> <line x1="3" y1="18" x2="21" y2="18" /> </>
                        )}
                    </svg>
                </button>

                {/* Navigation Links & Language Dropdown */}
                <ul className={`md:flex items-center gap-6 ${open ? 'flex flex-col absolute top-full left-0 w-full bg-gray-900 py-4 md:static md:flex-row md:bg-transparent' : 'hidden'} text-white`}>
                    {sections.map(item => (
                        <li key={item}>
                            <a
                                href={`#${item}`}
                                className={`relative py-2 block md:inline-block font-medium transition-colors ${active === item ? 'text-[#7e22ce] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#7e22ce]' : 'hover:text-[#7e22ce]'}`}
                                onClick={() => setOpen(false)}
                            >
                                {t(`menu.${item}`)}
                            </a>
                        </li>
                    ))}
                    {/* Language Dropdown */}
                    <li className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center cursor-pointer gap-2 py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                        >
                            <span>
                                <img src={languages[language].flag} alt="flag" className="w-5 h-5 rounded-full" />
                            </span>
                            <span className="hidden md:inline">{languages[language].name}</span> {/* Show name on desktop */}
                            {/* Dropdown Arrow */}
                            <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-1 z-20 md:w-48"> {/* Ensure z-index is high */}
                                {Object.keys(languages).map(langKey => (
                                    <li key={langKey}>
                                        <button
                                            onClick={() => handleLanguageChange(langKey)}
                                            className="flex items-center cursor-pointer gap-3 w-full px-4 py-2 text-sm text-white hover:bg-gray-700 text-left" // Added text-left
                                        >
                                            {/* <span>{languages[langKey].flag}</span> */}
                                            <img src={languages[langKey].flag} alt={`${languages[langKey].name} flag`} className="h-5 w-5 rounded-full" />
                                            <span>{languages[langKey].name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}