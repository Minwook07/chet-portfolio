'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/motion';
import { images } from '../../assets'; // Make sure images.profile or your avatar exists here
import { TbGridScan, TbExternalLink } from 'react-icons/tb';

interface Project {
    title: string;
    key: string;
    year?: string;
    tech: string[];
    img: string;
    demo_link: string;
    caption?: string;
}

const projects: Project[] = [
    { 
        title: 'Kassar', 
        key: 'ecommerce', 
        year: '2026',
        tech: ['Vue.js', 'Laravel', 'MySQL', 'Bootstrap'], 
        img: '/images/projects/image2.webp', 
        demo_link: 'null',
        caption: 'E-Commerce Platform'
    },
    { 
        title: 'Study Home', 
        key: 'study_home', 
        year: '2025',
        tech: ['Tailwind', 'HTML', 'JS'], 
        img: '/images/projects/image6.webp', 
        demo_link: 'https://reanwithus.netlify.app/',
        caption: 'Learning Hub'
    },
    { 
        title: 'Yummy', 
        key: 'yummy', 
        year: '2025',
        tech: ['JS', 'Bootstrap', 'API', 'MySQL'], 
        img: '/images/projects/image7.webp', 
        demo_link: 'null',
        caption: 'Food Ordering'
    },
    { 
        title: 'សូត្រ', 
        key: 'online_shop', 
        year: '2024',
        tech: ['JS', 'Bootstrap', 'API'], 
        img: '/images/projects/image1.webp', 
        demo_link: 'null',
        caption: 'Online Shop'
    },
    { 
        title: 'CSC Express', 
        key: 'express_bus', 
        year: '2024',
        tech: ['Bootstrap', 'HTML', 'CSS'], 
        img: '/images/projects/image3.webp', 
        demo_link: 'http://antstudents.com/WebScholarshipS2/Group-13/ProjectCSS_CSC_Express/index.html',
        caption: 'Bus Ticketing'
    },
    { 
        title: '3KAMi', 
        key: 'movies', 
        year: '2023',
        tech: ['Vue.js', 'Bootstrap', 'JS'], 
        img: '/images/projects/image5.webp', 
        demo_link: 'https://merl3kam.netlify.app/',
        caption: 'Movie Stream'
    },
    { 
        title: 'Portfolio', 
        key: 'portfolio', 
        year: '2023',
        tech: ['React.js', 'Tailwind'], 
        img: '/images/projects/image8.webp', 
        demo_link: 'https://chet-portfolio.vercel.app/',
        caption: 'Personal Site'
    },
];

export default function Projects1() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Refs for GSAP & Dynamic SVG Path calculations
    const root = useRef<HTMLDivElement>(null);
    const list = useRef<HTMLOListElement>(null);
    const road = useRef<SVGPathElement>(null);
    const trail = useRef<SVGPathElement>(null);
    const walker = useRef<HTMLSpanElement>(null);

    const [d, setD] = useState('');
    const [box, setBox] = useState({ w: 0, h: 0 });

    const isLinkValid = (link: string | undefined): boolean => {
        return Boolean(link && link.trim() !== '' && link !== 'null');
    };

    // Lock scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedProject(null); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedProject]);

    // 1. Calculate dynamic bezier path running through each project dot
    useEffect(() => {
        const build = () => {
            const L = list.current;
            if (!L) return;
            const r = L.getBoundingClientRect();
            const pts = [...L.querySelectorAll('.jr-dot')].map((el) => {
                const b = el.getBoundingClientRect();
                return [b.left - r.left + b.width / 2, b.top - r.top + b.height / 2];
            });
            if (!pts.length) return;

            const mobile = window.innerWidth < 760;
            const amp = mobile ? 22 : Math.min(260, r.width * 0.2);
            const start = [pts[0][0], 0];
            let path = `M ${start[0]} ${start[1]} `;
            let prev = start;

            pts.concat([[pts[pts.length - 1][0], r.height]]).forEach((p, i) => {
                const dir = i % 2 ? 1 : -1;
                const dy = (p[1] - prev[1]) / 2;
                path += `C ${prev[0] + amp * dir} ${prev[1] + dy}, ${p[0] + amp * dir} ${p[1] - dy}, ${p[0]} ${p[1]} `;
                prev = p;
            });

            setBox({ w: r.width, h: r.height });
            setD(path);
        };

        build();
        const ro = new ResizeObserver(build);
        if (list.current) ro.observe(list.current);
        window.addEventListener('load', build);
        return () => {
            ro.disconnect();
            window.removeEventListener('load', build);
        };
    }, []);

    // 2. Animate the trail drawing & position the avatar walker along the SVG path as user scrolls
    useEffect(() => {
        if (!d || !trail.current || !walker.current || !list.current) return;

        const path = trail.current;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;

        const st = ScrollTrigger.create({
            trigger: list.current,
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.4,
            onUpdate: (s) => {
                path.style.strokeDashoffset = `${len * (1 - s.progress)}`;
                const pt = path.getPointAtLength(len * s.progress);
                if (walker.current) {
                    walker.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
                }
            },
        });

        path.style.strokeDashoffset = `${len}`;
        const p0 = path.getPointAtLength(0);
        walker.current.style.transform = `translate(${p0.x}px, ${p0.y}px)`;
        ScrollTrigger.refresh();

        return () => st.kill();
    }, [d]);

    // 3. Reveal animations using GSAP & ScrollTrigger
    useGSAP(
        () => {
            gsap.utils.toArray('.jr-item', root.current).forEach((it: any, i) => {
                const tl = gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 78%' } });
                tl.from(it.querySelector('.polaroid'), {
                    y: 60,
                    rotate: i % 2 ? 14 : -14,
                    scale: 0.8,
                    opacity: 0,
                    duration: 1.1,
                    ease: 'back.out(1.6)',
                })
                    .from(it.querySelector('.jr-card'), { x: i % 2 ? -50 : 50, opacity: 0, duration: 1 }, 0.15)
                    .from(it.querySelector('.jr-dot'), { scale: 0, duration: 0.6, ease: 'back.out(3)' }, 0.1);
            });
        },
        { scope: root }
    );

    return (
        <section id="projects" className="journey section py-24 bg-[#FFF8F5] dark:bg-gray-950 relative overflow-hidden text-gray-900 dark:text-gray-100" ref={root}>
            <div className="container mx-auto px-6 max-w-6xl relative">

                {/* Top Section Badge & Title */}
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold shadow-xs mb-4">
                        My journey
                    </span>

                    <h2 className="jr-title text-5xl sm:text-6xl font-black tracking-tight text-[#1A1A1A] dark:text-white">
                        {t('projects.title') || 'The story'}{' '}
                        <span className="relative text-[#FF6B56] inline-block">
                            {t('projects.sub_title') || 'so far'}
                            {/* Wavy Underline */}
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF6B56]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p 
                        className="text-orange-600 dark:text-orange-400 text-xl mt-4 italic font-medium"
                        style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                    >
                        follow the road ↓
                    </p>
                </div>

                {/* Winding Road Path Container */}
                <div className="relative">
                    <ol className="jr-list relative space-y-24 md:space-y-32" ref={list}>
                        
                        {/* Dynamic SVG Road Overlay */}
                        <svg className="jr-map absolute top-0 left-0 w-full h-full pointer-events-none z-0" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
                            <path ref={road} d={d} className="jr-road stroke-orange-200 dark:stroke-gray-800" fill="none" strokeWidth="3" strokeDasharray="8 8" />
                            <path ref={trail} d={d} className="jr-trail stroke-[#FF6B56]" fill="none" strokeWidth="4" />
                        </svg>

                        {/* Walking Avatar */}
                        <span ref={walker} className="jr-walker absolute top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border-2 border-white bg-[#FF6B56] shadow-lg z-30 pointer-events-none overflow-hidden transition-transform ease-out">
                            <img src={images?.profile || '/images/hero/profile.jpg'} alt="Avatar" className="w-full h-full object-cover" />
                        </span>

                        {/* Project Items */}
                        {projects.map((project, idx) => {
                            const isEven = idx % 2 === 0;
                            const hasDemo = isLinkValid(project.demo_link);

                            return (
                                <li
                                    key={project.key}
                                    className={`jr-item relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-8 md:gap-16`}
                                >
                                    {/* Left / Right Photo (Polaroid Style) */}
                                    <div className="w-full md:w-1/2 flex justify-center relative group">
                                        
                                        {/* Tape Top */}
                                        <div className="absolute -top-3 z-20 w-24 h-6 bg-[#FFC5B8]/80 dark:bg-orange-950/60 backdrop-blur-xs rounded-xs transform -rotate-3 shadow-xs" />

                                        {/* Image Frame */}
                                        <figure className="polaroid bg-white dark:bg-gray-900 p-4 pb-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 max-w-sm w-full transition-transform duration-300">
                                            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                            {project.caption && (
                                                <figcaption 
                                                    className="text-center text-gray-600 dark:text-gray-400 text-lg mt-3 font-semibold"
                                                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                                                >
                                                    {project.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    </div>

                                    {/* Road Node Dot */}
                                    <span className="jr-dot hidden md:block w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-4 border-[#FF6B56] z-20 shadow-md shrink-0" />

                                    {/* Left / Right Details Card */}
                                    <div className="w-full md:w-1/2 max-w-md">
                                        <div className="jr-card bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
                                            
                                            {project.year && (
                                                <span 
                                                    className="jr-year text-2xl font-bold text-[#FF6B56] italic"
                                                    style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                                                >
                                                    {project.year}
                                                </span>
                                            )}

                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">
                                                {t(`projects.items.${project.key}.desc`)}
                                            </p>

                                            {/* Tech Stack Tags */}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {project.tech.map((tag, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="px-3 py-1 text-xs font-semibold bg-[#FFF3EE] dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <button
                                                    onClick={() => setSelectedProject(project)}
                                                    className="text-xs font-bold uppercase tracking-wider text-[#FF6B56] hover:opacity-80 transition-opacity cursor-pointer"
                                                >
                                                    [ View Details ]
                                                </button>

                                                {hasDemo ? (
                                                    <a
                                                        href={project.demo_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="ml-auto inline-flex items-center gap-1.5 bg-[#FF6B56] hover:bg-[#ff553d] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        <span>Live Demo</span>
                                                        <TbExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <span className="ml-auto text-xs text-gray-400 font-semibold italic">
                                                        No Demo
                                                    </span>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>

            </div>

            {/* Slide-in Detail Modal */}
            <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
                <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-gray-950 shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}>
                    {selectedProject && (
                        <div className="p-8 flex flex-col h-full overflow-y-auto">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="self-end p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-orange-500 transition-all cursor-pointer"
                                aria-label="close"
                            >
                                <TbGridScan size={24} />
                            </button>
                            <div className="mt-4">
                                <img src={selectedProject.img} className="w-full h-64 object-cover object-top rounded-3xl shadow-xl mb-6" alt={selectedProject.title} />
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 my-4">
                                    {selectedProject.tech.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-bold bg-orange-100 dark:bg-orange-950/50 text-[#FF6B56] rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="p-6 bg-[#FFF8F5] dark:bg-gray-900/50 rounded-2xl border-l-4 border-[#FF6B56] mt-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base font-medium">
                                        {t(`projects.items.${selectedProject.key}.desc`)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto pt-8 w-full">
                                {isLinkValid(selectedProject.demo_link) ? (
                                    <a href={selectedProject.demo_link} target="_blank" rel="noreferrer" className="w-full block">
                                        <button className="w-full bg-[#FF6B56] text-white py-4 rounded-full font-bold text-sm hover:bg-[#ff553d] transition-all shadow-lg cursor-pointer">
                                            {t('projects.button.btn_demo') || 'Visit Demo'}
                                        </button>
                                    </a>
                                ) : (
                                    <button disabled className="w-full bg-gray-200 dark:bg-gray-800 text-gray-400 py-4 rounded-full font-bold text-sm cursor-not-allowed">
                                        UNAVAILABLE
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}