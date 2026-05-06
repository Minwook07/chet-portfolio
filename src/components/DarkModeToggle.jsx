import { TbBrightnessUp, TbMoonStars } from 'react-icons/tb';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function DarkModeToggle({ style = {} }) {
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
