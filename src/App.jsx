import React from 'react';
import Navbar from './components/layouts/Navbar';
import Hero from './components/views/Hero';
import Skills from './components/views/Skills';
import Projects from './components/views/Projects';
import Contact from './components/views/Contact';
import EducationalTimeline from './components/views/About';
import Footer from './components/layouts/Footer';
import GlobalStyles from './components/views/GlobalStyles'
export default function App() {
  return (
    <div className="text-gray-100 min-h-screen overflow-x-hidden" style={{ backgroundColor: '#121212', fontFamily: 'Kantumruy Pro' }}>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <EducationalTimeline />
      <Contact />
      <Footer />
      <GlobalStyles />
    </div>
  );
}