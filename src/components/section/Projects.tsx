import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TbArrowBearRight2, TbChevronLeft, TbChevronRight, TbGridScan } from 'react-icons/tb';

interface Project {
    title: string;
    key: string;
    tech: string[];
    img: string;
    demo_link: string;
}

const projects: Project[] = [
    { title: 'Kassar', key: 'ecommerce', tech: ['Vue.js', 'Laravel', 'MySQL', 'Bootstrap'], img: '/images/projects/image2.webp', demo_link: 'https://usr.kassar.publicvm.com/' },
    { title: 'Study Home', key: 'study_home', tech: ['Tailwind', 'HTML', 'JS'], img: '/images/projects/image6.webp', demo_link: 'https://reanwithus.netlify.app/' },
    { title: 'Yummy', key: 'yummy', tech: ['JS', 'Bootstrap', 'API', 'MySQL'], img: '/images/projects/image7.webp', demo_link: 'http://antstudents.com/' },
    { title: 'សូត្រ', key: 'online_shop', tech: ['JS', 'Bootstrap', 'API'], img: '/images/projects/image1.webp', demo_link: 'http://antstudents.com/' },
    { title: 'CSC Express', key: 'express_bus', tech: ['Bootstrap', 'HTML', 'CSS'], img: '/images/projects/image3.webp', demo_link: 'http://antstudents.com/' },
    { title: '3KAMi', key: 'movies', tech: ['Vue.js', 'Bootstrap', 'JS'], img: '/images/projects/image5.webp', demo_link: 'https://merl3kam.netlify.app/' },
    { title: 'CSC Express', key: 'logistics', tech: ['HTML', 'CSS'], img: '/images/projects/image4.webp', demo_link: 'http://antstudents.com/' },
    { title: 'Portfolio', key: 'portfolio', tech: ['React.js', 'Tailwind'], img: '/images/projects/image8.webp', demo_link: 'https://chet-portfolio.vercel.app/' },
];

const CARD_WIDTH = 320;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;
const TRANSLATE = STEP * projects.length;
const loopProjects = [...projects, ...projects];

export default function Projects() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [paused, setPaused] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const getMax = (): number => {
        if (!trackRef.current) return 0;
        const visible = Math.floor((trackRef.current.parentElement?.offsetWidth ?? 0) / STEP);
        return (projects.length - visible) * STEP;
    };

    const handlePrev = () => {
        setPaused(true);
        setOffset(prev => Math.max(prev - STEP, 0));
    };

    const handleNext = () => {
        setPaused(true);
        setOffset(prev => Math.min(prev + STEP, getMax()));
    };

    const handleAuto = () => {
        setOffset(0);
        setPaused(false);
    };

    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
        setPaused(!!selectedProject);
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedProject(null); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedProject]);

    return (
        <section id="projects" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden"
            style={{
                backgroundImage: "url('/images/bg/dark-tech.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Heading */}
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                            {t('projects.title')}{' '}
                            <span className="text-orange-500 dark:text-purple-500">{t('projects.sub_title')}</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-green-500 my-4 rounded-full" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                            {t('projects.desc')}
                        </p>

                        <div className="flex items-center gap-3 mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={offset === 0}
                                className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-orange-500 dark:hover:border-purple-500 hover:text-orange-500 dark:hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                aria-label="Previous project"
                            >
                                <TbChevronLeft size={22} />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={paused && offset >= getMax()}
                                className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-orange-500 dark:hover:border-purple-500 hover:text-orange-500 dark:hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                                aria-label="Next project"
                            >
                                <TbChevronRight size={22} />
                            </button>

                            {paused && !selectedProject && (
                                <button
                                    onClick={handleAuto}
                                    className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-purple-400 transition-colors underline underline-offset-2 ml-1"
                                >
                                    Auto
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Marquee */}
                    <div className="lg:w-2/3 w-full overflow-hidden">
                        <div
                            ref={trackRef}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => { if (!selectedProject && offset === 0) setPaused(false); }}
                            className="pb-6"
                            style={{
                                display: 'flex',
                                gap: `${GAP}px`,
                                width: 'max-content',
                                transform: paused ? `translateX(-${offset}px)` : undefined,
                                animation: paused ? 'none' : `projects-marquee 30s linear infinite`,
                                transition: paused ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none',
                                willChange: 'transform',
                            }}
                        >
                            {(paused ? projects : loopProjects).map((project, idx) => (
                                <div key={idx} style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}>
                                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg h-[460px] flex flex-col border border-gray-100 dark:border-gray-800 transition-all duration-300">
                                        <div className="p-4 h-72">
                                            <div className="overflow-hidden rounded-2xl h-full shadow-inner">
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                    width="1100"
                                                    height="512"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-6 pt-2 flex flex-col justify-between flex-grow">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{project.title}</h3>
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-2">
                                                        {t(`projects.items.${project.key}.desc`)}
                                                    </p>
                                                    <button
                                                        onClick={() => setSelectedProject(project)}
                                                        className="text-orange-500 dark:text-purple-400 text-[10px] font-black mt-3 uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
                                                        aria-label="see more"
                                                    >
                                                        [ TRY IT OUT ]
                                                    </button>
                                                </div>
                                                <a
                                                    href={project.demo_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-3.5 rounded-xl hover:bg-orange-500 transition-all shadow-md"
                                                    aria-label={`${t('common.view_demo')} ${t(`projects.items.${project.key}.title`)}`}
                                                >
                                                    <TbArrowBearRight2 size={20} />
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

            {/* Project detail slide-in panel */}
            <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
                <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}>
                    {selectedProject && (
                        <div className="p-8 flex flex-col h-full overflow-y-auto">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="self-end p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-orange-500 transition-all cursor-pointer"
                                aria-label="close"
                            >
                                <TbGridScan size={28} />
                            </button>
                            <div className="mt-6">
                                <img src={selectedProject.img} className="w-full h-64 object-cover rounded-3xl shadow-xl mb-8" alt={selectedProject.title} />
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 my-6">
                                    {selectedProject.tech.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-black border-2 border-orange-500/20 text-orange-500 dark:text-purple-500 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-l-4 border-orange-500 dark:border-purple-500">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
                                        {t(`projects.items.${selectedProject.key}.desc`)}
                                    </p>
                                </div>
                            </div>
                            <a href={selectedProject.demo_link} target="_blank" rel="noreferrer" className="mt-auto pt-8 w-full block">
                                <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-orange-500 transition-all shadow-xl cursor-pointer" aria-label="see demo">
                                    {t('projects.button.btn_demo')}
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes projects-marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-${TRANSLATE}px); }
                }
            `}</style>
        </section>
    );
}
