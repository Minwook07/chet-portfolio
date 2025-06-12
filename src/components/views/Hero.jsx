import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();
    return (
        <section id="home" className="pt-28 pb-20 md:min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-7/12 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('hero.greeting')} <span className="text-orange-500">{t('hero.name')}</span>
                        </h1>
                        <p className="text-xl opacity-90 mb-6">{t('hero.title')}</p>
                        <p className="text-lg opacity-80 mb-6">{t('hero.description')}</p>
                        <p className="text-lg italic opacity-80 mb-8">{t('hero.quote')}</p>
                        <a href="/pdf/Mith Chet-CV.pdf" className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                            <span className="mr-2">↓</span> {t('hero.downloadCV')}
                        </a>
                    </div>
                    <div className="md:w-5/12 flex justify-center">
                        <div className="w-64 h-64 relative rounded-full border-4 border-orange-500 overflow-hidden shadow-xl animate-float">
                            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600">
                                <img src="images/DSC03886.jpg" alt={t('hero.imageAlt')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}