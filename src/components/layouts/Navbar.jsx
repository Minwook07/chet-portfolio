import React, { useState, useEffect, useRef } from 'react';
import i18next from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { TbAppWindowFilled, TbBrightnessUp, TbCannabisFilled, TbHomeFilled, TbMessageFilled, TbMoonStars } from 'react-icons/tb';

const sections = ['home', 'skills', 'projects', 'contact'];

const languages = {
    en: { name: 'English', flag: '/images/flags/uk.png' },
    km: { name: 'ភាសាខ្មែរ', flag: '/images/flags/km.png' },
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

const sectionIcons = {
    home:     <TbHomeFilled />,
    skills:   <TbCannabisFilled />,
    projects: <TbAppWindowFilled />,
    contact:  <TbMessageFilled />,
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { t } = useTranslation();

    // Theme
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Lock body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // Active section
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

    // Click-outside dropdown
    useEffect(() => {
        const cb = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
        };
        if (dropdownOpen) document.addEventListener('mousedown', cb);
        return () => document.removeEventListener('mousedown', cb);
    }, [dropdownOpen]);

    const handleLanguageChange = (langKey) => {
        setLanguage(langKey);
        i18next.changeLanguage(langKey);
        localStorage.setItem('language', langKey);
        setDropdownOpen(false);
        setOpen(false);
    };

    return (
        <nav className="nav-root">
            <div className="nav-bar">
                <div className="nav-inner container mx-auto px-6">
                    <a href="#home" className="nav-logo">
                        <img
                            src="/images/logo/chet_nobg.svg"
                            alt="Logo"
                            style={{ filter: theme === 'light' ? 'invert(1)' : 'none' }}
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

                    <div className="nav-controls">
                        <div className="lang-wrap" ref={dropdownRef} style={{ display: 'none' }} id="desktop-lang">
                            <button className="lang-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img src={languages[language].flag} alt="flag" />
                                <span>{languages[language].name}</span>
                                <svg className={`arrow ${dropdownOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <ul className="lang-dropdown" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {Object.keys(languages).map(langKey => (
                                        <li key={langKey}>
                                            <button className="lang-item" onClick={() => handleLanguageChange(langKey)}>
                                                <img src={languages[langKey].flag} alt={languages[langKey].name} />
                                                {languages[langKey].name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button className="theme-btn hidden md:flex items-center justify-center" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label="Toggle Theme">
                            {theme === 'light' ? <TbMoonStars size={25} /> : <TbBrightnessUp size={25} />}
                        </button>

                        <style>{`@media(min-width:768px){#desktop-lang{display:block!important}}`}</style>

                        <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
                            <span className="ham-line" />
                            <span className="ham-line" />
                            <span className="ham-line" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`drawer-overlay ${open ? 'visible' : ''}`}
                onClick={() => setOpen(false)}
            />

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

                <div className="drawer-controls">
                    <div className="drawer-lang-grid">
                        {Object.keys(languages).map(langKey => (
                            <button
                                key={langKey}
                                className={`drawer-lang-pill ${language === langKey ? 'active-lang' : ''}`}
                                onClick={() => handleLanguageChange(langKey)}
                            >
                                <img src={languages[langKey].flag} alt={languages[langKey].name} />
                                {languages[langKey].name}
                            </button>
                        ))}
                    </div>

                    <button
                        className="theme-btn flex items-center justify-center"
                        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                        aria-label="Toggle Theme"
                        style={{ width: 44, height: 44, borderRadius: 14, border: '1.5px solid rgba(0,0,0,0.1)' }}
                    >
                        {theme === 'light' ? <TbMoonStars size={25} /> : <TbBrightnessUp size={25} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}