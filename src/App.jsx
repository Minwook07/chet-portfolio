import { lazy, Suspense, useEffect, useState } from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Navigation from './components/section/Navigation';
import About from './components/section/About';
import './App.css';
import i18next from 'i18next';

// Lazy load below-the-fold sections for better initial load
const Skills = lazy(() => import('./components/section/Skills'));
const Projects = lazy(() => import('./components/section/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const MusicPlayer = lazy(() => import('./components/MusicPlayer'));

function HomePage() {
    return (
        <>
            <About />
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                <Skills />
            </Suspense>
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
                <Projects />
            </Suspense>
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
                <Contact />
            </Suspense>
        </>
    );
}

function AppContent() {
    return (
        <>
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
        </>
    );
}

export default function App() {
    const [lang, setLang] = useState(i18next.language);

    useEffect(() => {
        const handleLangChange = (lng) => setLang(lng);
        i18next.on('languageChanged', handleLangChange);
        return () => i18next.off('languageChanged', handleLangChange);
    }, []);
    return (
        <>
            <div className={`font-${lang}`}>
                <DarkModeProvider>
                    <AppContent />
                </DarkModeProvider>
            </div>
        </>
    );
}