import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orb - desktop right side */}
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl animate-pulse"></div>

                {/* Secondary orb - bottom left */}
                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl"></div>

                <div className="absolute top-20 right-10 md:top-40 md:right-20 opacity-20 dark:opacity-10">
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-yellow-500 dark:bg-purple-500 rounded-full"></div>
                        ))}
                    </div>
                </div>

                {/* Floating geometric shape */}
                <div className="absolute bottom-32 right-20 hidden lg:block opacity-10 dark:opacity-5">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="10" y="10" width="100" height="100" stroke="currentColor" strokeWidth="2" className="text-yellow-600 dark:text-purple-600" transform="rotate(45 60 60)" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-20 xl:px-32 mt-30 lg:mt-0 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="lg:w-7/12 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="relative w-3 h-3">
                                <span className="absolute inset-0 w-3 h-3 bg-yellow-400 dark:bg-purple-500 rounded-full animate-ping"></span>
                                <span className="absolute inset-0 w-3 h-3 bg-yellow-500 dark:bg-purple-600 rounded-full"></span>
                            </div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                {t('hero.sub_title')}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl  font-black leading-[1.05] tracking-tight">
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
                                    Projects<FaArrowDown />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-purple-700 dark:to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </a>

                            <a
                                href="https://linkedin.com"
                                target='_blank'
                                className="group bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white text-gray-900 dark:text-white py-4 px-10 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    LinkedIn
                                    {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg> */}
                                    <FaExternalLinkAlt />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:w-5/12 flex justify-center lg:justify-end">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>

                            <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden">

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-gray-400 dark:text-gray-500 text-lg font-medium"><img
                                        src="images/DSC03885.JPG"
                                        alt={t('hero.imageAlt')}
                                        className="w-full h-full object-cover"
                                    /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}