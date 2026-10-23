'use client';

import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
    children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => setTheme(isDarkMode ? 'light' : 'dark');

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode(): DarkModeContextType {
    const ctx = useContext(DarkModeContext);
    if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
    return ctx;
}
