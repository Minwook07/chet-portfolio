import { useState, useRef, useEffect } from 'react';
import { TbPlayerSkipForwardFilled, TbPlayerSkipBackFilled, TbBrandSpotify, TbX } from 'react-icons/tb';

const playlist = [
    { title: 'Cross the Way', artist: 'BUMJIN', embedUrl: 'https://open.spotify.com/embed/track/7cvn6zVKjayauPGGby6fjR' },
    { title: 'WANNABE', artist: 'ITZY', embedUrl: 'https://open.spotify.com/embed/track/4pspYVQGFHLPEFgQPD1J7e' },
    { title: 'Not Shy', artist: 'ITZY', embedUrl: 'https://open.spotify.com/embed/track/1ehags7lQMM1qX94VJkoaf' },
    { title: 'FANCY', artist: 'TWICE', embedUrl: 'https://open.spotify.com/embed/track/2qQpFbqqkLOGySgNK8wBXt' },
    { title: 'នារី Dior', artist: 'G-Devith', embedUrl: 'https://open.spotify.com/embed/track/2w6RZhwzGdDuRZ1d0BJ56Y' },
    { title: 'ឱ! សង្សារបងហ្អើយ', artist: 'G-Devith', embedUrl: 'https://open.spotify.com/embed/track/4dHzsYVsQBlTYDxy1IwAYB' },
    { title: 'កន្ទ្រឹមស្នេហា', artist: 'G-Devith', embedUrl: 'https://open.spotify.com/embed/track/1XKnzxouLDbcdl4b0szzLg' },
];

const IFRAME_HEIGHT = 352;

export default function MusicPlayer() {
    const timerRef = useRef(null);
    const cardRef = useRef(null);
    const btnRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    const [userInteracted, setUserInteracted] = useState(false);

    const song = playlist[currentIndex];

    // Watch dark mode
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Click outside → close card (music keeps playing)
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target) &&
                btnRef.current && !btnRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Clear timer on manual skip or unmount
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, [currentIndex]);

    // Start 30s timer only AFTER iframe has loaded
    const handleIframeLoad = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setCurrentIndex(i => (i + 1) % playlist.length);
        }, 30_000);
    };

    const skipTo = (index) => {
        clearTimeout(timerRef.current);
        setCurrentIndex((index + playlist.length) % playlist.length);
    };

    return (
        <>
            {/* Floating Spotify button */}
            <button
                ref={btnRef}
                onClick={() => {
                    setUserInteracted(true); // enable autoplay
                    setOpen(o => !o);
                }}
                aria-label="Toggle music player"
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-[#1DB954] text-white shadow-lg shadow-[#1DB954]/30 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
                <span className={`absolute inset-0 rounded-full bg-[#1DB954]/30 ${open ? 'animate-ping' : 'hidden'}`} />
                <TbBrandSpotify size={22} className="relative z-10" />
            </button>

            {/* Player card */}
            <div
                ref={cardRef}
                className={`fixed bottom-22 right-6 z-50 transition-all duration-300 origin-bottom-right ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ width: '320px' }}
            >
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 dark:shadow-black/60 border border-black/8 dark:border-white/8 bg-white dark:bg-[#121212]">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-black/6 dark:border-white/6">
                        <div className="flex items-center gap-2">
                            <TbBrandSpotify size={15} className="text-[#1DB954]" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Now Playing
                            </span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <TbX size={13} />
                        </button>
                    </div>

                    {/* Spotify iframe - only render after user click */}
                    {userInteracted && (
                        <iframe
                            key={`${currentIndex}-${isDark}`}
                            src={`${song.embedUrl}?utm_source=generator&theme=${isDark ? '0' : '1'}&autoplay=1`}
                            width="320"
                            height={IFRAME_HEIGHT}
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={song.title}
                            onLoad={handleIframeLoad}
                            style={{ display: 'block' }}
                        />
                    )}

                    {/* Controls */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-black/6 dark:border-white/6">
                        <button
                            onClick={() => skipTo(currentIndex - 1)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-[#1DB954] transition-colors cursor-pointer"
                        >
                            <TbPlayerSkipBackFilled size={14} /> Prev
                        </button>

                        {/* Track dots */}
                        <div className="flex items-center gap-1.5">
                            {playlist.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => skipTo(i)}
                                    className={`rounded-full transition-all duration-200 cursor-pointer ${i === currentIndex
                                            ? 'w-4 h-1.5 bg-[#1DB954]'
                                            : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-[#1DB954]/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => skipTo(currentIndex + 1)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-[#1DB954] transition-colors cursor-pointer"
                        >
                            Next <TbPlayerSkipForwardFilled size={14} />
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}