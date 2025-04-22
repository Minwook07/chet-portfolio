import React from 'react';
export default function Footer() {
    return (
        <footer className="bg-[#1e1e1e] py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start mb-3">
                            <div className="bg-orange-500 text-gray-900 w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl mr-2">C</div>
                            <span className="font-bold text-xl">MITH Chet</span>
                        </div>
                        <p className="text-gray-400 text-center md:text-left">Full Stack Web Developer</p>
                    </div>
                    <div>
                        <div className="flex justify-center mb-4">
                            <a href="#about" className="mx-3 hover:text-orange-500">About</a>
                            <a href="#skills" className="mx-3 hover:text-orange-500">Skills</a>
                            <a href="#projects" className="mx-3 hover:text-orange-500">Projects</a>
                            <a href="#contacts" className="mx-3 hover:text-orange-500">Contact</a>
                        </div>
                        <p className="text-gray-400 text-sm text-center">© 2025 MITH Chet. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}