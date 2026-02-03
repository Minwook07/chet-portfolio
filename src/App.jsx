import Navbar from './components/layouts/Navbar';
import Hero from './components/views/Hero';
import Skills from './components/views/Skills';
import Projects from './components/views/Projects';
import Contact from './components/views/Contact';
import Footer from './components/layouts/Footer';
import GlobalStyles from './components/views/GlobalStyles'
import './App.css';
import i18next from 'i18next';
import { useEffect, useState } from 'react';

export default function App() {
    const [lang, setLang] = useState(i18next.language);

    useEffect(() => {
        const handleLangChange = (lng) => setLang(lng);
        i18next.on('languageChanged', handleLangChange);
        return () => i18next.off('languageChanged', handleLangChange);
    }, []);
    return (
        <div className={`text-gray-100 min-h-screen overflow-x-hidden bg-white dark:bg-[#121212] font-${lang}`}>
            <Navbar />
            <Hero />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <GlobalStyles />
        </div>
    );
}