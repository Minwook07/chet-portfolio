export default function Footer() {
    return (
        <footer className="bg-[#eee] dark:bg-[#1e1e1e] py-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start mb-3">
                            <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-lg font-bold text-xl mr-2 text-white">osi</div>
                            <span className="font-bold text-xl text-gray-950 dark:text-gray-300">Okawasaki</span>
                        </div>
                        <p className="text-gray-400 text-center md:text-left">Full Stack Web Developer</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm text-center">© 2025 - {new Date().getFullYear()} MITH Chet. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}