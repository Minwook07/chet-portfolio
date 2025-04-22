import React from 'react';
export default function Hero() {
    return (
        <section id="home" className="pt-28 pb-20 md:min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-7/12 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Hello, I'm <span className="text-orange-500">Chet MITH.</span>
                        </h1>
                        <p className="text-xl opacity-90 mb-6">I'm a Full-stack web developer</p>
                        <p className="text-lg italic opacity-80 mb-8">"I'm not here just to code — I'm here to grow together."</p>
                        <a href="/pdf/Mith Chet-CV.pdf" className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg">
                            <span className="mr-2">↓</span> Download CV
                        </a>
                    </div>
                    <div className="md:w-5/12 flex justify-center">
                        <div className="w-64 h-64 relative rounded-full border-4 border-orange-500 overflow-hidden shadow-xl animate-float">
                            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg> */}
                                <img src="images/DSC03886.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}