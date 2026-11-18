'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from '../../lib/motion';
import { images } from '../../assets';
import { TbArrowBearRight2, TbGridScan } from 'react-icons/tb';
import { useCulture } from '../../contexts/CultureContext';
import { cultureArt } from '../culture/registry';
import CultureStrip from '../culture/CultureStrip';
import SectionHeading from '../SectionHeading';

interface Project {
    title: string;
    key: string;
    year?: string;
    tech: string[];
    img: string;
    demo_link: string;
    caption?: string;
    defaultDesc: string;
}

const rawProjects: Project[] = [
    { title: 'Study Home', key: 'study_home', year: '2025', tech: ['Tailwind', 'HTML', 'JS'], img: '/images/projects/image6.webp', demo_link: 'https://reanwithus.netlify.app/', caption: 'Learning Hub', defaultDesc: 'An online learning hub and educational resource platform.' },
    { title: 'Portfolio', key: 'portfolio', year: '2025', tech: ['React.js', 'Tailwind'], img: '/images/projects/image8.webp', demo_link: 'https://chet-portfolio.vercel.app/', caption: 'Personal Site', defaultDesc: 'Personal portfolio website showcasing early web development projects.' },
    { title: 'Kassar', key: 'ecommerce', year: '2025', tech: ['Vue.js', 'Laravel', 'MySQL', 'Bootstrap'], img: '/images/projects/image2.webp', demo_link: 'null', caption: 'E-Commerce Platform', defaultDesc: 'A full-featured e-commerce platform built with Vue.js and Laravel.' },
    { title: 'Yummy', key: 'yummy', year: '2024', tech: ['JS', 'Bootstrap', 'API', 'MySQL'], img: '/images/projects/image7.webp', demo_link: 'null', caption: 'Food Ordering', defaultDesc: 'A food ordering web application with dynamic menu filtering and database management.' },
    { title: 'សូត្រ', key: 'online_shop', year: '2024', tech: ['JS', 'Bootstrap', 'API'], img: '/images/projects/image1.webp', demo_link: 'null', caption: 'Online Shop', defaultDesc: 'An online shopping catalog with clean UI and API integration.' },
    { title: 'CSC Express', key: 'express_bus', year: '2024', tech: ['Bootstrap', 'HTML', 'CSS'], img: '/images/projects/image3.webp', demo_link: 'http://antstudents.com/WebScholarshipS2/Group-13/ProjectCSS_CSC_Express/index.html', caption: 'Bus Ticketing', defaultDesc: 'Bus ticketing system website for convenient passenger booking.' },
    { title: '3KAMi', key: 'movies', year: '2024', tech: ['Vue.js', 'Bootstrap', 'JS'], img: '/images/projects/image5.webp', demo_link: 'https://merl3kam.netlify.app/', caption: 'Movie Stream', defaultDesc: 'A movie streaming web application to browse films and trailers.' },
    { title: 'CSC Express', key: 'logistics', year: '2024', tech: ['HTML', 'CSS'], img: '/images/projects/image4.webp', demo_link: 'http://antstudents.com/WebScholarship/Group-2/ProjectHTML/index.html', caption: 'Logistics Web App', defaultDesc: 'Logistics and delivery tracking information website.' },
];

export default function Projects() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [mounted, setMounted] = useState(false);
    const { culture } = useCulture();
    const stopIcons = cultureArt[culture.id].motifs;

    useEffect(() => {
        setMounted(true);
    }, []);

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

    // Prevent background scrolling when slide-in modal is active
    useEffect(() => {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedProject(null); };
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedProject]);

    // Build curve connecting all `.jr-dot` node elements
    useEffect(() => {
        const build = () => {
            const L = list.current;
            if (!L) return;
            const r = L.getBoundingClientRect();

            const dots = [...L.querySelectorAll('.jr-dot')];
            if (!dots.length) return;

            const pts = dots.map((el) => {
                const b = el.getBoundingClientRect();
                return [b.left - r.left + b.width / 2, b.top - r.top + b.height / 2];
            });

            const mobile = window.innerWidth < 768;
            const amp = mobile ? 14 : Math.min(260, r.width * 0.2);

            const start = [mobile ? r.width * 0.5 : pts[0][0], 0];
            let path = `M ${start[0]} ${start[1]} `;
            let prev = start;

            const endPt = [mobile ? r.width * 0.5 : pts[pts.length - 1][0], r.height];

            pts.concat([endPt]).forEach((p, i) => {
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

        const timer = setTimeout(build, 150);
        window.addEventListener('load', build);
        window.addEventListener('resize', build);

        return () => {
            ro.disconnect();
            clearTimeout(timer);
            window.removeEventListener('load', build);
            window.removeEventListener('resize', build);
        };
    }, []);

    // Animate road trail drawing and update avatar position on scroll
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

    return (
        <section id="projects" className="journey section relative overflow-hidden bg-paper py-24 text-ink" ref={root}>
            <div className="container mx-auto px-6 max-w-6xl relative">

                {/* Section Header */}
                <div className="jr-title mb-20">
                    <SectionHeading
                        title={
                            <>
                                {mounted ? (t('projects.title') || 'Projects') : 'Projects'}{' '}
                                {mounted ? (t('projects.sub_title') || 'Journey') : 'Journey'}
                            </>
                        }
                        note="follow the road ↓"
                    />
                </div>

                {/* Road Container */}
                <div className="relative">
                    <ol className="jr-list relative space-y-24 md:space-y-32" ref={list}>

                        {/* Dynamic Road SVG */}
                        <svg className="jr-map absolute top-0 left-0 w-full h-full pointer-events-none z-0" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
                            <path ref={road} d={d} className="jr-road" style={{ stroke: 'var(--stitch)' }} fill="none" strokeWidth="3" strokeDasharray="8 8" />
                            <path
                                ref={trail}
                                d={d}
                                className="jr-trail"
                                fill="none"
                                strokeWidth="4"
                                style={{ stroke: 'var(--bg-color-primary)' }}
                            />
                        </svg>

                        {/* Animated Avatar Walker */}
                        <span
                            ref={walker}
                            className="jr-walker absolute top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border-2 border-white shadow-lg z-30 pointer-events-none overflow-hidden transition-transform ease-out"
                            style={{ backgroundColor: 'var(--bg-color-primary)' }}
                        >
                            <img src={images?.profile || '/images/hero/profile.jpg'} alt="Avatar" className="w-full h-full object-cover" />
                        </span>

                        {/* Project Entries */}
                        {rawProjects.map((project, idx) => {
                            const isEven = idx % 2 === 0;
                            const hasDemo = isLinkValid(project.demo_link);
                            const translatedDesc = mounted ? t(`projects.items.${project.key}.desc`) : '';
                            const descriptionText = (translatedDesc && !translatedDesc.startsWith('projects.items')) 
                                ? translatedDesc 
                                : project.defaultDesc;

                            return (
                                <li
                                    key={`${project.key}-${idx}`}
                                    className={`jr-item relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-16 w-full`}
                                >
                                    {/* Photo Frame / Polaroid */}
                                    <div className="w-full md:w-1/2 flex justify-center relative group shrink-0">
                                        <div className="tape absolute -top-3 z-20 h-6 w-24 -rotate-3" />

                                        <figure className="polaroid tray w-full max-w-sm rounded-md p-4 pb-6 transition-transform duration-300 odd:-rotate-1 even:rotate-1">
                                            <div className="relative h-60 sm:h-64 w-full rounded-sm bg-paper-2 overflow-hidden">
                                                <img
                                                    src={project.img}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                            {project.caption && (
                                                <figcaption
                                                    className="font-hand mt-3 text-center text-xl text-ink-soft"
                                                >
                                                    {project.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    </div>

                                    {/* Road Node Dot */}
                                    {(() => {
                                        const StopIcon = stopIcons[idx % stopIcons.length];
                                        return (
                                            <span
                                                className="jr-dot z-20 my-[-1rem] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 bg-card p-1.5 shadow-md md:my-0"
                                                style={{ borderColor: 'var(--bg-color-primary)' }}
                                            >
                                                <StopIcon className="h-full w-full" />
                                            </span>
                                        );
                                    })()}

                                    {/* Full Content Card */}
                                    <div className="w-full md:w-1/2 flex justify-center shrink-0">
                                        <div className="jr-card tray flex w-full max-w-md flex-col justify-between rounded-[1.75rem] p-6 sm:p-8">

                                            <div>
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="flex-1">
                                                        {project.year && (
                                                            <span
                                                                className="font-hand mb-1 block text-2xl font-bold"
                                                                style={{ color: 'var(--bg-color-primary)' }}
                                                            >
                                                                {project.year}
                                                            </span>
                                                        )}
                                                        <h3 className="font-display truncate text-2xl font-semibold text-ink">
                                                            {project.title}
                                                        </h3>
                                                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                                                            {descriptionText}
                                                        </p>
                                                        <button
                                                            onClick={() => setSelectedProject(project)}
                                                            className="font-hand mt-3 block cursor-pointer text-xl font-bold transition-opacity hover:opacity-70"
                                                            style={{ color: 'var(--bg-color-primary)' }}
                                                            aria-label="see more"
                                                        >
                                                            Try it out ✦
                                                        </button>
                                                    </div>

                                                    {/* Demo Action Button */}
                                                    {hasDemo ? (
                                                        <a
                                                            href={project.demo_link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="shrink-0 rounded-xl bg-ink p-3.5 text-paper shadow-md transition-all hover:opacity-90"
                                                            aria-label={`View demo for ${project.title}`}
                                                        >
                                                            <TbArrowBearRight2 size={20} />
                                                        </a>
                                                    ) : (
                                                        <button
                                                            disabled
                                                            className="flex shrink-0 cursor-not-allowed items-center justify-center rounded-xl border border-line bg-paper-2 p-3.5 text-ink-soft opacity-60"
                                                            aria-label="Demo unavailable"
                                                        >
                                                            <TbArrowBearRight2 size={20} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tech Badges Footer */}
                                            <div className="mt-6 flex flex-wrap gap-2 border-t-2 border-dashed pt-4"
                                                style={{ borderColor: 'var(--stitch)' }}>
                                                {project.tech.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold text-ink-soft"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>

            </div>
            <CultureStrip className="absolute bottom-0 left-0" />

            {/* Slide-in Detail Drawer Modal */}
            <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
                <div className={`absolute top-0 right-0 h-full w-full max-w-lg bg-paper shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedProject ? 'translate-x-0' : 'translate-x-full'}`}>
                    {selectedProject && (
                        <div className="p-8 flex flex-col h-full overflow-y-auto">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="self-end p-2 bg-paper-2 rounded-full text-ink-soft hover:opacity-80 transition-all cursor-pointer"
                                aria-label="close"
                            >
                                <TbGridScan size={24} />
                            </button>
                            <div className="mt-4">
                                <img src={selectedProject.img} className="w-full h-64 object-cover object-top rounded-3xl shadow-xl mb-6" alt={selectedProject.title} />
                                <h2 className="font-display text-3xl font-semibold text-ink">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 my-4">
                                    {selectedProject.tech.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-bold rounded-full"
                                            style={{
                                                backgroundColor: 'color-mix(in srgb, var(--bg-color-primary) 16%, transparent)',
                                                color: 'var(--bg-color-primary)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    className="tray mt-4 rounded-2xl border-l-4 p-6"
                                    style={{ borderColor: 'var(--bg-color-primary)' }}
                                >
                                    <p className="text-base leading-relaxed text-ink">
                                        {(() => {
                                            const desc = mounted ? t(`projects.items.${selectedProject.key}.desc`) : '';
                                            return (desc && !desc.startsWith('projects.items')) ? desc : selectedProject.defaultDesc;
                                        })()}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-auto pt-8 w-full">
                                {isLinkValid(selectedProject.demo_link) ? (
                                    <a href={selectedProject.demo_link} target="_blank" rel="noreferrer" className="w-full block">
                                        <button
                                            className="on-accent w-full cursor-pointer rounded-full py-4 text-sm font-bold shadow-lg transition-all hover:opacity-90"
                                            style={{ backgroundColor: 'var(--bg-color-primary)' }}
                                        >
                                            {mounted ? (t('projects.button.btn_demo') || 'Visit Demo') : 'Visit Demo'}
                                        </button>
                                    </a>
                                ) : (
                                    <button disabled className="w-full cursor-not-allowed rounded-full bg-paper-2 py-4 text-sm font-bold text-ink-soft">
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