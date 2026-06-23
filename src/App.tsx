import { lazy, Suspense, useEffect, useState } from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navigation from './components/section/Navigation';
import About from './components/section/About';
import './App.css';
import i18next from 'i18next';

// Lazy load below-the-fold sections
const Skills = lazy(() => import('./components/section/Skills'));
const Projects = lazy(() => import('./components/section/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const MusicPlayer = lazy(() => import('./components/MusicPlayer'));

function HomePage() {
    return (
        <>
            {/* About is critical/above-the-fold, keep it synchronous */}
            <About />

            {/* Grouping these prevents multiple layout shifts */}
            <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-500">Loading Experience...</div>}>
                <Skills />
                <Projects />
                <Contact />
            </Suspense>
        </>
    );
}

function AppContent() {
    return (
        <DarkModeProvider>
            <Navigation />
            <Suspense fallback={null}>
                <MusicPlayer />
            </Suspense>
            <main id="main-content">
                <HomePage />
            </main>
            <Suspense fallback={<div className="h-32" />}>
                <Footer />
            </Suspense>
        </DarkModeProvider>
    );
}

export default function App() {
    const [lang, setLang] = useState<string>(i18next.language);

    useEffect(() => {
        const handleLangChange = (lng: string) => setLang(lng);
        i18next.on('languageChanged', handleLangChange);
        return () => i18next.off('languageChanged', handleLangChange);
    }, []);

    return (
        <div className={`font-${lang} transition-colors duration-300`}>
            <AppContent />
        </div>
    );
}
