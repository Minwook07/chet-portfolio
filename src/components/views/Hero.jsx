import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section id="home" className="relative overflow-hidden min-h-screen flex items-center bg-white dark:bg-black">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
                <svg
                    viewBox="0 0 1000 1000"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 right-0 h-full w-full lg:w-[55%] object-cover"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M300 0C500 200 100 450 400 1000H1000V0H300Z"
                        fill="#fdc435"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="flex flex-col md:flex-row items-center">

                    <div className="md:w-7/12 text-center md:text-left mb-10 md:mb-0">
                        <h2 className="text-primary flex items-center font-bold uppercase tracking-[0.2em] text-sm mb-4">
                            <div className="relative w-4 h-4 mr-3 text-primary transform">
                                <svg
                                    className="absolute inset-0 w-full h-full slow-pulse"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                >
                                    <circle cx="6" cy="6" r="5" />
                                </svg>

                                <svg
                                    className="absolute inset-0 w-full h-full slow-pulse"
                                    viewBox="0 0 12 12"
                                    fill="currentColor"
                                    style={{ animationDelay: '0.3s' }}
                                >
                                    <circle cx="6" cy="6" r="3" />
                                </svg>
                            </div>
                            {t('hero.sub_title')}
                        </h2>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#25282b] dark:text-[#fff] leading-[1.1]">
                            {t('hero.greeting')} <br />
                            <span>{t('hero.name')}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-md leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="#projects" className="bg-[#fdc435] hover:bg-[#eab308] text-[#25282b] dark:bg-[#7e22ce] dark:text-[#fff] dark:hover:bg-[#7e02ce] py-3 px-10 rounded-lg font-bold transition-all">
                                Projects
                            </a>
                            <a href="https://linkedin.com" target='_blank' className="bg-white border-2 border-[#25282b] hover:bg-[#25282b] hover:text-white text-[#25282b] dark:border-[#fff] dark:bg-black dark:text-[#fff] dark:hover:bg-white dark:hover:text-black py-3 px-10 rounded-lg font-bold transition-all">
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="md:w-5/12 flex justify-center lg:justify-end">
                        <div className="relative z-20">
                            {/* <img
                                src="images/DSC03885.JPG"
                                alt={t('hero.imageAlt')}
                                className="w-full max-w-[400px] object-contain"
                            /> */}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}