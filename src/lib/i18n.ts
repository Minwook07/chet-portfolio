import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import km from '../locales/km/translation.json';

export type LanguageKey = 'en' | 'km';

export const LANGUAGE_STORAGE_KEY = 'language';

export function isLanguageKey(value: string | null): value is LanguageKey {
    return value === 'en' || value === 'km';
}

if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
        resources: {
            en: { translation: en },
            km: { translation: km },
        },
        supportedLngs: ['en', 'km'],
        fallbackLng: 'en',
        lng: 'en', // always start in English so server and client HTML match
        initAsync: false,
        interpolation: { escapeValue: false },
    });
}

export default i18next;
