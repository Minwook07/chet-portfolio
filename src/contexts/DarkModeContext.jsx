import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext(undefined);

export function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(
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

export function useDarkMode() {
    const ctx = useContext(DarkModeContext);
    if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
    return ctx;
}
