import { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
    children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        () => localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

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
