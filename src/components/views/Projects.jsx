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
        <>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradientShift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .project-card {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }

                .project-card:nth-child(1) { animation-delay: 0.1s; }
                .project-card:nth-child(2) { animation-delay: 0.2s; }
                .project-card:nth-child(3) { animation-delay: 0.3s; }
                .project-card:nth-child(4) { animation-delay: 0.4s; }
                .project-card:nth-child(5) { animation-delay: 0.5s; }
                .project-card:nth-child(6) { animation-delay: 0.6s; }
                .project-card:nth-child(7) { animation-delay: 0.7s; }
                .project-card:nth-child(8) { animation-delay: 0.8s; }

                .gradient-border {
                    position: relative;
                    background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
                }

                .gradient-border::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 1rem;
                    padding: 2px;
                    background: linear-gradient(145deg, #7e22ce, #a855f7, #7e22ce);
                    background-size: 200% 200%;
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .gradient-border:hover::before {
                    opacity: 1;
                    animation: gradientShift 3s ease infinite;
                }

                .image-container {
                    position: relative;
                    overflow: hidden;
                }

                .image-container img {
                    transition: transform 0.5s ease;
                }

                .image-container:hover img {
                    transform: scale(1.08);
                }

                .tech-badge {
                    backdrop-filter: blur(10px);
                    background: rgba(126, 34, 206, 0.1);
                    border: 1px solid rgba(126, 34, 206, 0.2);
                }

                .action-button {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .action-button:hover {
                    background: rgba(126, 34, 206, 0.9);
                    border-color: #7e22ce;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(126, 34, 206, 0.3);
                }

                .section-title {
                    background: linear-gradient(135deg, #7e22ce, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .carousel-container {
                    position: relative;
                    overflow: hidden;
                    touch-action: pan-y;
                }

                .carousel-track {
                    display: flex;
                    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .carousel-card {
                    min-width: 100%;
                    flex-shrink: 0;
                }

                .carousel-nav-button {
                    position: absolute;
                    top: 40%;
                    transform: translateY(-50%);
                    background: rgba(126, 34, 206, 0.95);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(168, 85, 247, 0.5);
                    color: white;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 20;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(126, 34, 206, 0.5);
                }

                .carousel-nav-button:hover {
                    background: rgba(168, 85, 247, 1);
                    transform: translateY(-50%) scale(1.15);
                    box-shadow: 0 6px 20px rgba(126, 34, 206, 0.7);
                }

                .carousel-nav-button:active {
                    transform: translateY(-50%) scale(0.95);
                }

                .carousel-nav-button.left {
                    left: -5px;
                }

                .carousel-nav-button.right {
                    right: -5px;
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 24px;
                }

                .carousel-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(126, 34, 206, 0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    border: none;
                    padding: 0;
                }

                .carousel-dot:hover {
                    background: rgba(126, 34, 206, 0.6);
                }

                .carousel-dot.active {
                    width: 32px;
                    border-radius: 5px;
                    background: linear-gradient(90deg, #7e22ce, #a855f7);
                    box-shadow: 0 2px 8px rgba(126, 34, 206, 0.5);
                }

                @media (max-width: 768px) {
                    .gradient-border:hover::before {
                        opacity: 0;
                    }
                }
            `}</style>

            <section id="projects" className="py-20">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl">
                                <GoFileDirectory className="text-white" size={32} />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold section-title mb-4">
                            {t('projects.title')}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Projects Grid/Carousel */}
                    {!isMobile ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayedProjects.map((project, index) => {
                                const desc = t(`projects.items.${project.key}.desc`);

                                return (
                                    <div
                                        key={index}
                                        className="project-card gradient-border rounded-2xl overflow-hidden group"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{
                                            transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        {/* Image Container */}
                                        <div className="image-container relative h-52 bg-gradient-to-br from-gray-800 to-gray-900">
                                            <img
                                                src={project.img}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />

                                            {/* Overlay with Actions */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
                                                <a
                                                    href={project.demo_link}
                                                    target='_blank'
                                                    rel="noreferrer"
                                                    className="action-button px-5 py-2.5 text-white rounded-lg font-medium flex items-center gap-2 text-sm"
                                                >
                                                    <RiShareCircleLine size={18} />
                                                    {t('projects.button.btn_demo')}
                                                </a>
                                                <a
                                                    href={project.code_link}
                                                    target='_blank'
                                                    rel="noreferrer"
                                                    className="action-button px-5 py-2.5 text-white rounded-lg font-medium flex items-center gap-2 text-sm"
                                                >
                                                    <FaGithub size={18} />
                                                    {t('projects.button.btn_code')}
                                                </a>
                                            </div>

                                            {/* Gradient Overlay at Bottom */}
                                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e1e1e] to-transparent"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                                                {desc}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="tech-badge px-3 py-1.5 text-xs font-medium text-purple-300 rounded-lg transition-all hover:scale-105"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Mobile Carousel */
                        <div className="relative px-2">
                            <div
                                className="carousel-container"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                <div
                                    className="carousel-track"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`
                                    }}
                                >
                                    {displayedProjects.map((project, index) => {
                                        const desc = t(`projects.items.${project.key}.desc`);

                                        return (
                                            <div
                                                key={index}
                                                className="carousel-card px-2"
                                            >
                                                <div className="gradient-border rounded-2xl overflow-hidden">
                                                    {/* Image Container */}
                                                    <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900">
                                                        <img
                                                            src={project.img}
                                                            alt={project.title}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e1e1e] to-transparent"></div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5 bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]">
                                                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                                            {desc}
                                                        </p>

                                                        {/* Tech Stack */}
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {project.tech.map((tech, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="tech-badge px-2.5 py-1 text-xs font-medium text-purple-300 rounded-lg"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex gap-2">
                                                            <a
                                                                href={project.demo_link}
                                                                target='_blank'
                                                                rel="noreferrer"
                                                                className="flex-1 action-button px-3 py-2.5 text-white rounded-lg font-medium flex items-center justify-center gap-2 text-xs"
                                                            >
                                                                <RiShareCircleLine size={16} />
                                                                {t('projects.button.btn_demo')}
                                                            </a>
                                                            <a
                                                                href={project.code_link}
                                                                target='_blank'
                                                                rel="noreferrer"
                                                                className="flex-1 action-button px-3 py-2.5 text-white rounded-lg font-medium flex items-center justify-center gap-2 text-xs"
                                                            >
                                                                <FaGithub size={16} />
                                                                {t('projects.button.btn_code')}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={handlePrev}
                                className="carousel-nav-button left"
                                aria-label="Previous project"
                            >
                                <FaChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="carousel-nav-button right"
                                aria-label="Next project"
                            >
                                <FaChevronRight size={20} />
                            </button>

                            {/* Dots Indicator */}
                            <div className="carousel-dots">
                                {displayedProjects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                        aria-label={`Go to project ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Load More/Less Button */}
                    {!isMobile && (
                        <div className="text-center mt-16">
                            <button
                                onClick={() => setVisibleCount(visibleCount === 6 ? 8 : 6)}
                                className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {visibleCount === 6
                                        ? t('projects.button.btn_see_more')
                                        : t('projects.button.btn_show_less')}
                                    <svg
                                        className={`w-5 h-5 transition-transform ${visibleCount === 6 ? 'rotate-0' : 'rotate-180'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}