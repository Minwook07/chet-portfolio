'use client';

import { createContext, useContext, useEffect } from 'react';
import { colorPresets, DEFAULT_COLOR_PRESET_ID, type ColorPreset } from '../styles/colors';
import { useDarkMode } from './DarkModeContext';
import { useLocalStorage } from '../lib/useLocalStorage';

interface ColorThemeContextType {
    colorPresetId: string;
    colorPreset: ColorPreset;
    setColorPresetId: (id: string) => void;
    presets: ColorPreset[];
}

interface ColorThemeProviderProps {
    children: React.ReactNode;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
    const { isDarkMode } = useDarkMode();
    const [colorPresetId, setColorPresetId] = useLocalStorage('colorTheme', DEFAULT_COLOR_PRESET_ID);

    const colorPreset =
        colorPresets.find(p => p.id === colorPresetId) ?? colorPresets[0];

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--accent-light', colorPreset.light);
        root.style.setProperty('--accent-light-2', colorPreset.light2);
        root.style.setProperty('--accent-dark', colorPreset.dark);
        root.style.setProperty('--accent-dark-2', colorPreset.dark2);
        root.style.setProperty(
            '--bg-color-primary',
            isDarkMode ? colorPreset.dark : colorPreset.light
        );
    }, [colorPreset, isDarkMode]);

    return (
        <ColorThemeContext.Provider
            value={{ colorPresetId, colorPreset, setColorPresetId, presets: colorPresets }}
        >
            {children}
        </ColorThemeContext.Provider>
    );
}

export function useColorTheme(): ColorThemeContextType {
    const ctx = useContext(ColorThemeContext);
    if (!ctx) throw new Error('useColorTheme must be used within ColorThemeProvider');
    return ctx;
}
