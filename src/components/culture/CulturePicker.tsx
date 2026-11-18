'use client';

import { useCulture } from '../../contexts/CultureContext';
import { cultureArt } from './registry';

export default function CulturePicker() {
    const { culture, setCultureId, options } = useCulture();

    return (
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Culture style">
            {options.map(option => {
                const active = option.id === culture.id;
                const Icon = cultureArt[option.id].icon;
                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => setCultureId(option.id)}
                        aria-pressed={active}
                        title={option.motifs}
                        className="flex cursor-pointer items-center gap-2 rounded-2xl border-2 bg-paper px-2 py-1.5 text-left transition-transform duration-150 hover:scale-[1.03]"
                        style={{ borderColor: active ? 'var(--bg-color-primary)' : 'var(--line)' }}
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card">
                            <Icon className="h-7 w-7" />
                        </span>
                        <span className="min-w-0 leading-tight">
                            <span className="block truncate text-xs font-bold text-ink">{option.name}</span>
                            <span lang={option.lang} className="block truncate text-[11px] text-ink-soft">
                                {option.native}
                            </span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
