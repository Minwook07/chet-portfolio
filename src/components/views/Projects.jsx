import { useState, useEffect } from 'react';
import { GoFileDirectory } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { RiShareCircleLine } from 'react-icons/ri';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Projects() {
    const { t } = useTranslation();
    const [visibleCount, setVisibleCount] = useState(6);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const projects = [
        {
            title: "Kassar",
            key: "ecommerce",
            tech: ["Vue.js", "Laravel", "Bootstrap", "MySQL"],
            img: "/images/projects/image2.png",
            demo_link: "https://usr.kassar.publicvm.com/",
            code_link: "#"
        },
        {
            title: "Study Home",
            key: "study_home",
            tech: ["Tailwind", "HTML", "CSS", "JavaScript"],
            img: "/images/projects/image6.png",
            demo_link: "https://reanwithus.netlify.app/",
            code_link: "https://github.com/Minwook07/assignment_web.git"
        },
        {
            title: "Yummy",
            key: "yummy",
            tech: ["JavaScript", "Bootstrap", "API", "MySQL"],
            img: "/images/projects/image7.png",
            demo_link: "http://antstudents.com/WenScholarshipBatch1/js/g4/index.html",
            code_link: "https://github.com/Minwook07/yummy_assignment_web.git"
        },
        {
            title: "សូត្រ",
            key: "online_shop",
            tech: ["JavaScript", "Bootstrap", "API", "MySQL"],
            img: "/images/projects/image1.png",
            demo_link: "http://antstudents.com/WenScholarshipBatch1/js/g4/index.html",
            code_link: "#"
        },
        {
            title: "CSC Express",
            key: "express_bus",
            tech: ["Bootstrap", "HTML", "CSS"],
            img: "/images/projects/image3.png",
            demo_link: "http://antstudents.com/WebScholarshipS2/Group-13/ProjectCSS_CSC_Express/index.html",
            code_link: "https://github.com/Minwook07/Assignment-Group2-Bootstrap.git"
        },
        {
            title: "3KAMi",
            key: "movies",
            tech: ["Vue.js", "Bootstrap", "JavaScript"],
            img: "/images/projects/image5.png",
            demo_link: "https://merl3kam.netlify.app/",
            code_link: "https://github.com/Minwook07/vue.js-movies_website.git"
        },
        {
            title: "CSC Express",
            key: 'logistics',
            tech: ["HTML", "CSS"],
            img: "/images/projects/image4.png",
            demo_link: "http://antstudents.com/WebScholarship/Group-2/ProjectHTML/index.html",
            code_link: "https://github.com/Minwook07/Mini-Project-CSC-Express-Raw.git"
        },
        {
            title: "Portfolio",
            key: 'portfolio',
            tech: ["React.js", "Tailwind"],
            img: "/images/projects/image8.png",
            demo_link: "https://chet-portfolio.vercel.app/",
            code_link: "https://github.com/Minwook07/chet-portfolio.git"
        },
    ];

    const displayedProjects = isMobile ? projects : projects.slice(0, visibleCount);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-carousel for mobile (10 seconds)
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === projects.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [isMobile, projects.length]);

    // Reset current index when visible count changes
    useEffect(() => {
        if (currentIndex >= displayedProjects.length) {
            setCurrentIndex(0);
        }
    }, [visibleCount, currentIndex, displayedProjects.length]);

    // Navigation handlers
    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? displayedProjects.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === displayedProjects.length - 1 ? 0 : prev + 1
        );
    };

    // Touch handlers for swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrev();
        }
    };

    return (
        <section id="projects" className="relative py-24 overflow-hidden bg-white dark:bg-black">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-300/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-300/10 dark:bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-primary dark:bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl">
                            <GoFileDirectory className="text-white" size={32} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-secondary section-title mb-4 leading-[1.3]">
                        {t('projects.title')}
                    </h2>
                    <div className="w-24 h-1 bg-primary dark:bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full"></div>
                </div>

                {!isMobile ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
                        {displayedProjects.map((project, index) => {
                            const desc = t(`projects.items.${project.key}.desc`);

                            return (
                                <div
                                    key={index}
                                    className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        transform: hoveredIndex === index ? 'translateY(-12px)' : 'translateY(0)',
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <div className="relative z-10">
                                        <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                                            <img
                                                src={project.img}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                                <a
                                                    href={project.demo_link}
                                                    target='_blank'
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-xl font-bold text-sm shadow-2xl transform hover:scale-110 transition-all duration-300"
                                                >
                                                    <RiShareCircleLine size={20} />
                                                    {t('projects.button.btn_demo')}
                                                </a>
                                                <a
                                                    href={project.code_link}
                                                    target='_blank'
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-sm shadow-2xl transform hover:scale-110 transition-all duration-300"
                                                >
                                                    <FaGithub size={20} />
                                                    {t('projects.button.btn_code')}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="p-7">
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed text-sm">
                                                {desc}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1.5 text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-purple-900/50 dark:text-purple-300 rounded-lg border border-yellow-300 dark:border-purple-700/50 transition-all hover:scale-105 hover:shadow-md"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Mobile Carousel */
                    <div className="relative mb-16">
                        <div
                            className="overflow-hidden"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`
                                }}
                            >
                                {displayedProjects.map((project, index) => {
                                    const desc = t(`projects.items.${project.key}.desc`);

                                    return (
                                        <div
                                            key={index}
                                            className="w-full flex-shrink-0"
                                        >
                                            <div className="mx-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                                                {/* Image Container */}
                                                <div className="relative h-72 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                                                    <img
                                                        src={project.img}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                                        {desc}
                                                    </p>

                                                    {/* Tech Stack */}
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {project.tech.map((tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-2 text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-purple-900/50 dark:text-purple-300 rounded-xl border border-yellow-300 dark:border-purple-700/50"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex gap-3">
                                                        <a
                                                            href={project.demo_link}
                                                            target='_blank'
                                                            rel="noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-purple-600 dark:to-purple-700 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
                                                        >
                                                            <RiShareCircleLine size={20} />
                                                            Demo
                                                        </a>
                                                        <a
                                                            href={project.code_link}
                                                            target='_blank'
                                                            rel="noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
                                                        >
                                                            <FaGithub size={20} />
                                                            Code
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/3 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-full shadow-2xl active:scale-90 transition-all"
                            aria-label="Previous project"
                        >
                            <FaChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/3 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-full shadow-2xl active:scale-90 transition-all"
                            aria-label="Next project"
                        >
                            <FaChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-3 mt-10">
                            {displayedProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-12 bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-purple-600 dark:to-purple-400 shadow-lg'
                                        : 'w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                        }`}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {!isMobile && (
                    <div className="text-center">
                        <button
                            onClick={() => setVisibleCount(visibleCount === 6 ? 8 : 6)}
                            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 dark:from-purple-600 dark:via-purple-700 dark:to-pink-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:shadow-yellow-500/50 dark:hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10">
                                {visibleCount === 6
                                    ? t('projects.button.btn_see_more')
                                    : t('projects.button.btn_show_less')}
                            </span>
                            <svg
                                className={`relative z-10 w-6 h-6 transition-transform duration-300 ${visibleCount === 6 ? 'rotate-0' : 'rotate-180'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 dark:from-purple-700 dark:to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}