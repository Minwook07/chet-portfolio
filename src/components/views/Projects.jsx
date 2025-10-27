import React, { useState } from 'react';
import { GoFileDirectory } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

export default function Projects() {
    const { t } = useTranslation();
    const [visibleCount, setVisibleCount] = useState(6)

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

    const displayedProjects = projects.slice(0, visibleCount);

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center">
                    <span className="mr-2 text-2xl"><GoFileDirectory color='#7e22ce' fontSize={35} /></span> {t('projects.title')}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {displayedProjects.map((project, index) => {
                        const desc = t(`projects.items.${project.key}.desc`);

                        return (
                            <div
                                key={index}
                                className="bg-[#1e1e1e] border border-[#1e1e1e] rounded-xl overflow-hidden transition-all hover:shadow-xl"
                            >
                                <div className="relative h-48 bg-[#171717]">
                                    <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                                        <a href={project.demo_link} target='_blank' rel="noreferrer" className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors cursor-pointer">{t('projects.button.btn_demo')}</a>
                                        <a href={project.code_link} target='_blank' rel="noreferrer" className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors cursor-pointer">{t('projects.button.btn_code')}</a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[#7e22ce] mb-2">{project.title}</h3>
                                    <p className="text-gray-300 mb-4">{desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-700 text-sm rounded-full">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    {visibleCount === 6 ? (
                        <button
                            onClick={() => setVisibleCount(8)} // Show all
                            className="px-6 py-3 border border-[#7e22ce] text-[#7e22ce] rounded-lg hover:bg-[#7e22ce] hover:text-white transition-colors cursor-pointer"
                        >
                            {t('projects.button.btn_see_more')}
                        </button>
                    ) : (
                        <button
                            onClick={() => setVisibleCount(6)} // Show less
                            className="px-6 py-3 border border-[#7e22ce] text-[#7e22ce] rounded-lg hover:bg-[#7e22ce] hover:text-white transition-colors cursor-pointer"
                        >
                            {t('projects.button.btn_show_less')}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
