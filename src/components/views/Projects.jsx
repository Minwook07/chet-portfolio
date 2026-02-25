import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseOutline } from "react-icons/io5";

export default function Projects() {
    const { t } = useTranslation();
    const scrollRef = useRef(null);
    const animationRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        { title: "Kassar", key: "ecommerce", tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap"], img: "/images/projects/image2.png", demo_link: "https://usr.kassar.publicvm.com/" },
        { title: "Study Home", key: "study_home", tech: ["Tailwind", "HTML", "JS"], img: "/images/projects/image6.png", demo_link: "https://reanwithus.netlify.app/" },
        { title: "Yummy", key: "yummy", tech: ["JS", "Bootstrap", "API", "MySQL"], img: "/images/projects/image7.png", demo_link: "http://antstudents.com/..." },
        { title: "សូត្រ", key: "online_shop", tech: ["JS", "Bootstrap", "API"], img: "/images/projects/image1.png", demo_link: "http://antstudents.com/..." },
        { title: "CSC Express", key: "express_bus", tech: ["Bootstrap", "HTML", "CSS"], img: "/images/projects/image3.png", demo_link: "http://antstudents.com/..." },
        { title: "3KAMi", key: "movies", tech: ["Vue.js", "Bootstrap", "JS"], img: "/images/projects/image5.png", demo_link: "https://merl3kam.netlify.app/" },
        { title: "CSC Express", key: 'logistics', tech: ["HTML", "CSS"], img: "/images/projects/image4.png", demo_link: "http://antstudents.com/..." },
        { title: "Portfolio", key: 'portfolio', tech: ["React.js", "Tailwind"], img: "/images/projects/image8.png", demo_link: "https://chet-portfolio.vercel.app/" },
    ];

    const loopProjects = [...projects, ...projects];

    const startAnimation = () => {
        const scroll = () => {
            if (!scrollRef.current) return;
            scrollRef.current.scrollLeft += 0.5;
            if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
                scrollRef.current.scrollLeft = 0;
            }
            animationRef.current = requestAnimationFrame(scroll);
        };
        animationRef.current = requestAnimationFrame(scroll);
    };

    const stopAnimation = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    // Body Lock, and ESC Key
    useEffect(() => {
        if (selectedProject) {
            stopAnimation();
            document.body.style.overflow = 'hidden'; // LOCK SCROLL
        } else {
            startAnimation();
            document.body.style.overflow = 'unset';
        }

        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            stopAnimation();
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedProject]);

    return (
        <section id='projects' className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
            <div className="container mx-auto px-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                            {t('projects.title')} <span className="text-orange-500 dark:text-purple-500">{t('projects.sub_title')}</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-green-500 my-4 rounded-full"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                            {t('projects.desc')}
                        </p>
                    </div>

                    <div className="lg:w-2/3 w-full">
                        <div
                            ref={scrollRef}
                            onMouseEnter={stopAnimation}
                            onMouseLeave={() => !selectedProject && startAnimation()}
                            className="flex gap-6 overflow-x-auto custom-scroll-hidden pb-6"
                        >
                            {loopProjects.map((project, idx) => (
                                <div key={idx} className="min-w-[100%] sm:min-w-[48%]">
                                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg h-[460px] flex flex-col border border-gray-100 dark:border-gray-800 transition-all duration-300">

                                        <div className="p-4 h-72">
                                            <div className="overflow-hidden rounded-2xl h-full shadow-inner">
                                                <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        <div className="p-6 pt-2 flex flex-col justify-between flex-grow">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{project.title}</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-2">
                                                        {t(`projects.items.${project.key}.desc`)}
                                                    </p>
                                                    <button onClick={() => setSelectedProject(project)} className="text-orange-500 dark:text-purple-400 text-[10px] font-black mt-3 uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer">
                                                        [ TRY IT OUT ]
                                                    </button>
                                                </div>
                                                <a href={project.demo_link} target="_blank" rel="noreferrer" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-3.5 rounded-xl hover:bg-orange-500 transition-all shadow-md">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </a>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50 dark:border-gray-800/50">
                                                {project.tech.map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 text-[9px] font-black bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200/50 uppercase">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>
                <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}>
                    {selectedProject && (
                        <div className="p-8 flex flex-col h-full overflow-y-auto">
                            <button onClick={() => setSelectedProject(null)} className="self-end p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-orange-500 transition-all cursor-pointer">
                                <IoCloseOutline size={28} />
                            </button>
                            <div className="mt-6">
                                <img src={selectedProject.img} className="w-full h-64 object-cover rounded-3xl shadow-xl mb-8" />
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 my-6">
                                    {selectedProject.tech.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-black border-2 border-orange-500/20 text-orange-500 dark:text-purple-500 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-l-4 border-orange-500 dark:border-purple-500">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
                                            {t(`projects.items.${selectedProject.key}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a href={selectedProject.demo_link} target="_blank" rel="noreferrer" className="mt-auto pt-8 w-full block">
                                <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-orange-500 transition-all shadow-xl cursor-pointer">
                                    {t('projects.button.btn_demo')}
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <style>{`.custom-scroll-hidden::-webkit-scrollbar { display: none; } .custom-scroll-hidden { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>
    );
}