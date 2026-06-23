import { CSSProperties } from 'react';
import { TbBrightnessUp, TbMoonStars } from 'react-icons/tb';
import { useDarkMode } from '../contexts/DarkModeContext';

interface DarkModeToggleProps {
    style?: CSSProperties;
}

export default function DarkModeToggle({ style = {} }: DarkModeToggleProps) {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            className="theme-btn flex items-center justify-center"
            onClick={toggleDarkMode}
            aria-label="Toggle Theme"
            style={style}
        >
            {isDarkMode ? <TbBrightnessUp size={25} /> : <TbMoonStars size={25} />}
        </button>
    );
}
