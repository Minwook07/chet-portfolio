import { useState, useEffect } from 'react';
import { FaUserGraduate } from 'react-icons/fa6';
import { GiTrophy } from 'react-icons/gi';
import { HiAcademicCap } from 'react-icons/hi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { MdOutlineTimeline } from "react-icons/md";
import { useTranslation } from 'react-i18next';

export default function EducationalTimeline() {
    const [activeId, setActiveId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation();

    // Check viewport size on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const timelineData = [
        {
            key: "high_school",
            id: 1,
            icon: <HiAcademicCap fontSize={25} />
        },
        {
            key: "university",
            id: 2,
            icon: <FaUserGraduate fontSize={25} />
        },
        {
            key: "short_course",
            id: 3,
            icon: <HiRocketLaunch fontSize={25} />
        },
        {
            key: "training_center",
            id: 4,
            icon: <GiTrophy fontSize={25} />
        },
    ];

    const handleMouseEnter = (id) => {
        setActiveId(id);
    };

    const handleMouseLeave = () => {
        setActiveId(null);
    };

    const handleClick = (id) => {
        setActiveId(id === activeId ? null : id);
    };

    return (
        <section id='about'>
            {/* <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-3 md:p-6 font-sans"> */}
            <div className="min-h-screen p-3 md:p-6">
                <div className="max-w-4xl mx-auto p-4 md:p-6 relative">
                    {/* <div className="absolute inset-0 bg-blue-500 opacity-5 rounded-xl blur-xl"></div> */}
                    <div className="absolute inset-0 opacity-5 rounded-xl blur-xl z-0"></div>
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-gray-100">
                        <span className="mr-2 text-2xl"><MdOutlineTimeline color='orange' fontSize={35} /></span> {t('about.title')}
                    </h2>

                    <div className="relative">
                        {/* Main timeline line - hidden on small screens, visible on md and up */}
                        <div className={`${isMobile ? 'hidden' : 'absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full z-10'}`}></div>

                        {/* Vertical line for mobile */}
                        <div className={`${isMobile ? 'absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full' : 'hidden'}`}></div>

                        {/* Timeline items */}
                        <div className="flex flex-col">
                            {timelineData.map((item, index) => {
                                const year = t(`about.items.${item.key}.year`);
                                const title = t(`about.items.${item.key}.title`);
                                const description = t(`about.items.${item.key}.description`);
                                const skills = t(`about.items.${item.key}.skills`, { returnObjects: true });
                                return (
                                    <div
                                        key={item.id}
                                        className={`relative mb-8 md:mb-16 ${isMobile
                                            ? 'self-start pl-10 pr-2'
                                            : index % 2 === 0
                                                ? 'self-start pr-12 text-right md:w-1/2'
                                                : 'self-end pl-12 md:w-1/2'
                                            }`}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleClick(item.id)}
                                    >
                                        {/* Year bubble */}
                                        <div
                                            className={`absolute top-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold z-10 
                                        ${activeId === item.id ? 'bg-orange-500 scale-110' : 'bg-gradient-to-br from-amber-400 to-orange-500'} 
                                        shadow-lg shadow-orange-500/20 transition-all duration-300 text-sm md:text-base`}
                                            style={{
                                                left: isMobile ? '-4px' : null,
                                                [isMobile ? 'left' : index % 2 === 0 ? 'right' : 'left']: isMobile ? '-4px' : '-6px',
                                                transform: isMobile ? 'translateX(0)' : 'translateX(50%)'
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        {/* Content box */}
                                        <div
                                            className={`p-4 md:p-6 rounded-xl transition-all duration-300 transform backdrop-blur-sm
                                             ${activeId === item.id
                                                    ? 'bg-gray-900/70 md:scale-105 shadow-xl shadow-orange-500/10'
                                                    : 'bg-gray-800/50'} 
                                            hover:bg-gray-900/70 hover:shadow-xl border border-gray-700 
                                            ${activeId === item.id ? 'border-orange-500' : 'hover:border-amber-400'} 
                                            cursor-pointer w-full`}
                                        >
                                            <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-xs px-2 py-0.5 md:py-1 rounded-full text-black font-bold">
                                                {year}
                                            </div>

                                            <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2 pr-16">{title}</h3>
                                            <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 mt-1 md:mt-2">{description}</p>

                                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                                {skills.map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-gray-700/80 text-gray-200 hover:bg-orange-500 hover:text-white text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full transition-colors duration-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Connecting line to timeline */}
                                        <div
                                            className={`absolute top-4 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500
                                            ${isMobile
                                                    ? 'left-0 w-10'
                                                    : index % 2 === 0
                                                        ? 'right-0 w-6'
                                                        : 'left-0 w-6'}`}
                                        ></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}