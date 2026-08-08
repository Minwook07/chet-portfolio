import { useEffect, useRef, useState } from 'react';
import { TbPalette, TbCheck } from 'react-icons/tb';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function ColorThemePicker() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const { colorPresetId, setColorPresetId, presets } = useColorTheme();
    const { isDarkMode } = useDarkMode();

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

            {/* Toggle button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Choose accent color"
                aria-expanded={open}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{
                    background: 'var(--bg-color-primary)',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                }}
            >
                <TbPalette size={22} />
            </button>
        </div>
    );
}
