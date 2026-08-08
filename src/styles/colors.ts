interface Colors {
    primary: {
        light: string;
        dark: string;
    };
    accent: {
        orange: string;
        green: string;
        purple: string;
        pink: string;
    };
    bg: {
        light: string;
        dark: string;
    };
}

export const colors: Colors = {
    primary: {
        light: '#fdc435',
        dark: '#7e22ce',
    },
    accent: {
        orange: '#F97316',
        green: '#22C55E',
        purple: '#9333EA',
        pink: '#EC4899',
    },
    bg: {
        light: '#ffffff',
        dark: '#121212',
    },
};
export interface ColorPreset {
    id: string;
    name: string;
    light: string;
    light2: string;
    dark: string;
    dark2: string;
}

export const colorPresets: ColorPreset[] = [
    { id: 'classic', name: 'Classic', light: '#fdc435', light2: '#f97316', dark: '#7e22ce', dark2: '#ec4899' },
    { id: 'ocean', name: 'Ocean Blue', light: '#0284c7', light2: '#06b6d4', dark: '#38bdf8', dark2: '#22d3ee' },
    { id: 'emerald', name: 'Emerald', light: '#059669', light2: '#65a30d', dark: '#34d399', dark2: '#a3e635' },
    { id: 'sunset', name: 'Sunset', light: '#ea580c', light2: '#dc2626', dark: '#fb923c', dark2: '#f87171' },
    { id: 'rose', name: 'Rose', light: '#e11d48', light2: '#db2777', dark: '#fb7185', dark2: '#f472b6' },
    { id: 'indigo', name: 'Indigo', light: '#4f46e5', light2: '#7c3aed', dark: '#818cf8', dark2: '#c4b5fd' },
    { id: 'teal', name: 'Teal', light: '#0d9488', light2: '#0891b2', dark: '#2dd4bf', dark2: '#67e8f9' },
    { id: 'crimson', name: 'Crimson', light: '#dc2626', light2: '#ea580c', dark: '#f87171', dark2: '#fb923c' },
    { id: 'violet', name: 'Violet', light: '#7c3aed', light2: '#a21caf', dark: '#a78bfa', dark2: '#e879f9' },
    { id: 'cyan', name: 'Cyan', light: '#0891b2', light2: '#0284c7', dark: '#22d3ee', dark2: '#38bdf8' },
];

export const DEFAULT_COLOR_PRESET_ID = colorPresets[0].id;
