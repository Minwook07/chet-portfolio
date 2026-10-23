'use client';

import { useState, useEffect, useRef } from 'react';
import { TbPalette, TbCheck } from 'react-icons/tb';
import { useDarkMode } from '../contexts/DarkModeContext';

interface Preset {
    id: string;
    name: string;
    light: string;
    light2: string;
    dark: string;
    dark2: string;
}

const presets: Preset[] = [
    { id: 'orange', name: 'Orange', light: '#FF6B56', light2: '#FF8A78', dark: '#FF6B56', dark2: '#FF8A78' },
    { id: 'emerald', name: 'Emerald', light: '#10B981', light2: '#34D399', dark: '#10B981', dark2: '#34D399' },
    { id: 'blue', name: 'Blue', light: '#3B82F6', light2: '#60A5FA', dark: '#3B82F6', dark2: '#60A5FA' },
    { id: 'purple', name: 'Purple', light: '#8B5CF6', light2: '#A78BFA', dark: '#8B5CF6', dark2: '#A78BFA' },
    { id: 'rose', name: 'Rose', light: '#F43F5E', light2: '#FB7185', dark: '#F43F5E', dark2: '#FB7185' },
];

export default function ColorThemePicker() {
    const [open, setOpen] = useState(false);
    const [colorPresetId, setColorPresetId] = useState('orange');
    const wrapRef = useRef<HTMLDivElement>(null);
    const { isDarkMode } = useDarkMode();

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('color_preset');
        if (savedTheme) {
            setColorPresetId(savedTheme);
        }
    }, []);

    // Apply colors to root HTML element whenever theme or dark mode changes
    useEffect(() => {
        const selectedPreset = presets.find(p => p.id === colorPresetId) || presets[0];
        const primaryColor = isDarkMode ? selectedPreset.dark : selectedPreset.light;

        document.documentElement.style.setProperty('--bg-color-primary', primaryColor);
        document.documentElement.style.setProperty('--text-accent', primaryColor);
        
        localStorage.setItem('color_preset', colorPresetId);
    }, [colorPresetId, isDarkMode]);

    // Handle click outside to close dropdown
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
                className={`absolute bottom-16 left-0 origin-bottom-left transition-all duration-300 ${
                    open
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                <div
                    className="rounded-2xl p-4 w-56 shadow-xl border"
                    style={{
                        background: isDarkMode ? 'rgba(24,24,27,0.95)' : 'rgba(255,255,255,0.97)',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
                    <p
                        className="text-xs font-semibold mb-3 tracking-wide uppercase"
                        style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                    >
                        Accent Color
                    </p>
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
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Choose accent color"
                aria-expanded={open}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{
                    background: 'var(--bg-color-primary, #FF6B56)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                }}
            >
                <TbPalette size={22} />
            </button>
        </div>
    );
}