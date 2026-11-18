'use client';

import { useState, useRef, useEffect } from 'react';
import { TbPalette, TbCheck } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../contexts/DarkModeContext';
import CulturePicker from './culture/CulturePicker';
import { useColorTheme } from '../contexts/ColorThemeContext';

export default function ColorThemePicker() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const { isDarkMode } = useDarkMode();
    const { colorPresetId, setColorPresetId, presets } = useColorTheme();

    // Handle click outside to close dropdown panel
    useEffect(() => {
        const cb = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', cb);
        return () => document.removeEventListener('mousedown', cb);
    }, [open]);

    return (
        <div ref={wrapRef} className="fixed bottom-6 left-6 z-50">
            {/* Panel */}
            <div
                className={`absolute bottom-16 left-0 origin-bottom-left transition-all duration-300 ${open
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                <div
                    className="tray max-h-[75vh] w-72 overflow-y-auto rounded-3xl p-4"
                    style={{ backdropFilter: 'blur(16px)' }}
                >
                    <p className="font-hand mb-2 text-xl text-ink">{t('theme.accent', 'Accent color')}</p>
                    <div className="grid grid-cols-5 gap-3">
                        {presets.map(preset => {
                            const active = preset.id === colorPresetId;
                            return (
                                <button
                                    key={preset.id}
                                    onClick={() => setColorPresetId(preset.id)}
                                    aria-label={`Use ${preset.name} accent color`}
                                    title={preset.name}
                                    className="relative w-8 h-8 rounded-full cursor-pointer transition-transform duration-150 hover:scale-110 focus:outline-none"
                                    style={{
                                        background: isDarkMode
                                            ? `linear-gradient(135deg, ${preset.dark} 0%, ${preset.dark2} 100%)`
                                            : `linear-gradient(135deg, ${preset.light} 0%, ${preset.light2} 100%)`,
                                        boxShadow: active
                                            ? `0 0 0 2px ${isDarkMode ? '#18181b' : '#ffffff'}, 0 0 0 4px ${preset.dark}`
                                            : '0 1px 3px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {active && (
                                        <TbCheck
                                            className="absolute inset-0 m-auto drop-shadow"
                                            size={16}
                                            color="#fff"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <p className="font-hand mb-2 mt-5 text-xl text-ink">{t('theme.culture', 'Culture style')}</p>
                    <CulturePicker />
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label={t('theme.open', 'Customize the look')}
                aria-expanded={open}
                className="on-accent sticker w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{
                    background: 'var(--bg-color-primary, #FF6B56)',
                }}
            >
                <TbPalette size={22} />
            </button>
        </div>
    );
}