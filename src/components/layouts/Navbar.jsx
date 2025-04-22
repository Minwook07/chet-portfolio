import React, { useState, useEffect } from 'react';

const sections = ['home', 'skills', 'projects', 'about', 'contact'];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
        const handler = () => {
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const { top } = el.getBoundingClientRect();
                if (top <= window.innerHeight * 0.3 && top >= -el.offsetHeight * 0.3) {
                    setActive(id);
                }
            });
        };
        window.addEventListener('scroll', handler);
        handler();
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-opacity-95 z-50 shadow-md" style={{ backgroundColor: '#121212' }}>
            <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2">
                    <div className="w-50 h-10 flex items-center rounded-lg font-bold text-xl">
                        <img src="/images/logo/chet_nobg.svg" alt="" />
                    </div>
                    {/* <span className="font-bold text-xl">Chet</span> */}
                </a>
                <ul className={`md:flex items-center gap-6 ${open ? 'flex flex-col absolute top-full left-0 w-full bg-gray-900 py-4 md:static md:flex-row md:bg-transparent' : 'hidden'}`}>
                    {sections.map(item => (
                        <li key={item}>
                            <a
                                href={`#${item}`}
                                className={`relative py-2 block md:inline-block font-medium transition-colors
                  ${active === item ? 'text-orange-500 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500' : 'hover:text-orange-500'}`}
                                onClick={() => setOpen(false)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
                <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}