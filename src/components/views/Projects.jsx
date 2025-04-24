import React from 'react';
import { GoFileDirectory } from 'react-icons/go';

export default function Projects() {
    const animations = [
        'fade-up',
        'fade-down',
        'fade-left',
        'fade-right',
        'zoom-in',
        'zoom-out',
        'flip-left',
        'flip-right'
    ];

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center">
                    <span className="mr-2 text-2xl"><GoFileDirectory color='orange' fontSize={35}/></span> Projects
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "E-commerce Platform",
                            desc: "A fully functional e-commerce website with product listings, cart functionality, and payment integration.",
                            tech: ["Vue.js", "Laravel", "Bootstrap", "MySQL"],
                            img: "/images/projects/image2.png",
                            demo_link: "https://usr.kassar.publicvm.com/",
                            code_link: "#"
                        },
                        {
                            title: "Study Home",
                            desc: "A mini project that build use html and css to completed.",
                            tech: ["Tailwind", "HTML", "CSS", "JavaScript"],
                            img: "/images/projects/image6.png",
                            demo_link: "https://reanwithus.netlify.app/",
                            code_link: "https://github.com/Minwook07/assignment_web.git"
                        },
                        {
                            title: "Yummy",
                            desc: "An e-commerce website that use with restful api with real-time updates and team functionality.",
                            tech: ["JavaScript", "Bootstrap", "API", "MySQL"],
                            img: "/images/projects/image7.png",
                            demo_link: "http://antstudents.com/WenScholarshipBatch1/js/g4/index.html",
                            code_link: "https://github.com/Minwook07/yummy_assignment_web.git"
                        },
                        {
                            title: "Online Shop",
                            desc: "An e-commerce website that use with restful api with real-time updates and team functionality.",
                            tech: ["JavaScript", "Bootstrap", "API", "MySQL"],
                            img: "/images/projects/image1.png",
                            demo_link: "http://antstudents.com/WenScholarshipBatch1/js/g4/index.html",
                            code_link: "#"
                        },
                        {
                            title: "Express Bus and Logistics",
                            desc: "A responsive logistics website showcasing transportation and rent bus for a trip or buy an product.",
                            tech: ["Bootstrap", "HTML", "CSS"],
                            img: "/images/projects/image3.png",
                            demo_link: "http://antstudents.com/WebScholarshipS2/Group-13/ProjectCSS_CSC_Express/index.html",
                            code_link: "https://github.com/Minwook07/Assignment-Group2-Bootstrap.git"
                        },
                        {
                            title: "Movies",
                            desc: "A mini project that build use html and css to completed.",
                            tech: ["Vue.js", "Bootstrap", "JavaScript"],
                            img: "/images/projects/image5.png",
                            demo_link: "https://merl3kam.netlify.app/",
                            code_link: "https://github.com/Minwook07/vue.js-movies_website.git"
                        },
                        {
                            title: "Logistics",
                            desc: "A mini project that build use html and css to completed.",
                            tech: ["HTML", "CSS"],
                            img: "/images/projects/image4.png",
                            demo_link: "http://antstudents.com/WebScholarship/Group-2/ProjectHTML/index.html",
                            code_link: "https://github.com/Minwook07/Mini-Project-CSC-Express-Raw.git"
                        },
                    ].map((project, index) => {
                        const animation = animations[index % animations.length];
                        const delay = 100 * index;

                        return (
                            <div
                                key={index}
                                data-aos={animation}
                                data-aos-offset="200"
                                data-aos-delay={delay}
                                data-aos-duration="500"
                                data-aos-easing="ease-in-out"
                                className="bg-[#1e1e1e] border border-[#1e1e1e] rounded-xl overflow-hidden transition-all hover:shadow-xl"
                            >
                                <div className="relative h-48 bg-[#171717]">
                                    <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                                        <a href={project.demo_link} target='_blank' className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors cursor-pointer">Demo</a>
                                        <a href={project.code_link} target='_blank' className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors cursor-pointer">Code</a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-orange-500 mb-2">{project.title}</h3>
                                    <p className="text-gray-300 mb-4">{project.desc}</p>
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
                    <button className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                        See More Projects
                    </button>
                </div>
            </div>
        </section>
    );
}
