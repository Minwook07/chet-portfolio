import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-green-500/10 dark:bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>

                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-yellow-400/20 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-orange-400/10 dark:bg-pink-600/10 rounded-full blur-3xl"></div>

                <div className="absolute top-20 right-10 md:top-40 md:right-20 opacity-20 dark:opacity-10">
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors duration-1000 ${i % 5 === 0 ? 'bg-green-500' : 'bg-yellow-500 dark:bg-purple-500'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-32 right-20 hidden lg:block opacity-10 dark:opacity-5">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="10" y="10" width="100" height="100" stroke="currentColor" strokeWidth="2" className="text-yellow-600 dark:text-purple-600" transform="rotate(45 60 60)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 mt-30 lg:mt-0 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="lg:w-7/12 text-center lg:text-left space-y-8">

                        <div className="flex flex-col items-center lg:items-start gap-4">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-bold uppercase tracking-widest text-green-700 dark:text-green-400">
                                    {t('hero.sub_title')}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight">
                            <span className="block text-gray-900 dark:text-white mb-2">
                                {t('hero.greeting')}
                            </span>
                            <span className="block bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 dark:from-purple-500 dark:via-purple-600 dark:to-pink-500 bg-clip-text text-transparent leading-[1.3]">
                                {t('hero.name')}
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <a
                                href="#projects"
                                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-purple-600 dark:to-purple-700 text-gray-900 dark:text-white py-4 px-10 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {t('hero.project')}<FaArrowDown />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-purple-700 dark:to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </a>

                            <a
                                href="https://linkedin.com"
                                target='_blank'
                                rel="noreferrer"
                                className="group bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white text-gray-900 dark:text-white py-4 px-10 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    LinkedIn
                                    <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-5/12 flex justify-center lg:justify-end">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-[2rem] blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>

                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>

                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 dark:border-gray-800/50">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src="images/DSC03885.png"
                                        alt={t('hero.imageAlt')}
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}