'use client';

import { createContext, useContext, useEffect } from 'react';
import { cultures, DEFAULT_CULTURE_ID, findCulture, type Culture } from '../styles/cultures';
import { useLocalStorage } from '../lib/useLocalStorage';

export const CULTURE_STORAGE_KEY = 'culture';

interface CultureContextType {
    culture: Culture;
    setCultureId: (id: string) => void;
    options: Culture[];
}

const CultureContext = createContext<CultureContextType | undefined>(undefined);

export function CultureProvider({ children }: { children: React.ReactNode }) {
    const [cultureId, setCultureId] = useLocalStorage(CULTURE_STORAGE_KEY, DEFAULT_CULTURE_ID);
    const culture = findCulture(cultureId);

    // CSS tokens (paper, ink, patterns) are keyed off this attribute.
    useEffect(() => {
        document.documentElement.dataset.culture = culture.id;
    }, [culture.id]);

    return (
        <CultureContext.Provider value={{ culture, setCultureId, options: cultures }}>
            {children}
        </CultureContext.Provider>
    );
}

export function useCulture(): CultureContextType {
    const ctx = useContext(CultureContext);
    if (!ctx) throw new Error('useCulture must be used within CultureProvider');
    return ctx;
}
