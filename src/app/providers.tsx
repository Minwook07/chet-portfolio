'use client';

import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import { ColorThemeProvider } from '../contexts/ColorThemeContext';
import i18n, { LANGUAGE_STORAGE_KEY, isLanguageKey } from '../lib/i18n';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const { i18n: activeI18n } = useTranslation();
    const [lang, setLang] = useState<string>('en');

    useEffect(() => {
        Aos.init();

        // 1. Check local storage immediately
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (isLanguageKey(saved)) {
            if (saved !== i18n.language) {
                i18n.changeLanguage(saved);
            }
            setLang(saved);
        } else {
            setLang(activeI18n.language || 'en');
        }

        // 2. Listen to language changes in i18next
        const handleLangChange = (newLang: string) => {
            setLang(newLang);
        };

        i18n.on('languageChanged', handleLangChange);
        return () => {
            i18n.off('languageChanged', handleLangChange);
        };
    }, [activeI18n.language]);

    // Explicit class mapping so Tailwind detects both classes
    const fontClass = lang === 'km' ? 'font-km' : 'font-en';

    return (
        <div className={`${fontClass} transition-colors duration-300`}>
            <DarkModeProvider>
                <ColorThemeProvider>{children}</ColorThemeProvider>
            </DarkModeProvider>
        </div>
    );
}