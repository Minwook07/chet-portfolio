'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import About from '../components/section/About';
import Skills from '../components/section/Skills';
import Projects from '../components/section/Projects';
import Contact from '../components/section/Contact';
export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            <main className={isLoading ? 'h-screen overflow-hidden' : ''}>
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </>
    );
}