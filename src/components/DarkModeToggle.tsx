import { CSSProperties } from 'react';
import { BsEmojiSunglassesFill, BsEmojiSunglasses } from 'react-icons/bs';
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
            {isDarkMode ? <BsEmojiSunglassesFill size={25} /> : <BsEmojiSunglasses size={25} />}
        </button>
    );
}
