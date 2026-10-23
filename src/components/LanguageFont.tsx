'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageFont() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const lang = i18n.language.startsWith('km') ? 'km' : 'en';

        document.documentElement.lang = lang;
        document.documentElement.classList.toggle('lang-km', lang === 'km');
        document.documentElement.classList.toggle('lang-en', lang === 'en');
    }, [i18n.language]);

    return null;
}
