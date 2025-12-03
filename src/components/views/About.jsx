import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserGraduate } from 'react-icons/fa6';
import { GiTrophy } from 'react-icons/gi';
import { HiRocketLaunch } from 'react-icons/hi2';
import { HiAcademicCap, HiCheckCircle, HiClock, HiCalendar, HiLocationMarker } from "react-icons/hi";

export default function EnhancedEducationalTimeline() {
    const { t } = useTranslation();
    const [activeId, setActiveId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const baseTimeline = [
        { id: 1, key: "high_school", icon: <HiAcademicCap fontSize={18} />, keyStatusKey: "completed" },
        { id: 2, key: "university", icon: <FaUserGraduate fontSize={18} />, keyStatusKey: "completed" },
        { id: 3, key: "short_course", icon: <HiRocketLaunch fontSize={18} />, keyStatusKey: "completed" },
        { id: 4, key: "training_center", icon: <GiTrophy fontSize={18} />, keyStatusKey: "completed" }
    ];

    const timelineData = baseTimeline.map(item => {
        const data = t(`about.items.${item.key}`, { returnObjects: true });

        return {
            ...item,
            batch: data.batch,
            title: data.title,
            institution: data.institution,
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            statusKey: item.keyStatusKey,
            statusText: data.status,
            description: data.description,
        };
    });

    const getStatusColor = (statusKey) => {
        switch (statusKey) {
            case 'completed':
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'in-progress':
                return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'planned':
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const getStatusIcon = (statusKey) => {
        switch (statusKey) {
            case "completed":
                return <HiCheckCircle fontSize={18} className="text-green-500" />;
            case "in-progress":
                return <HiClock fontSize={18} className="text-[#db2777]" />;
            case "planned":
                return <HiCalendar fontSize={18} className="text-blue-500" />;
            default:
                return <HiAcademicCap fontSize={18} className="text-gray-400" />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    return (
        <>
            <section id="about" className="scroll-mt-24">
                <div className="min-h-screen p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7e22ce] bg-gradient-to-r from-[#7e22ce] to-[#db2777] rounded-2xl mb-6">
                                <span className="text-3xl">📚</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {t('about.title')}
                            </h1>
                        </div>

                        <div className="relative">
                            <div className={`${isMobile
                                ? 'absolute left-8 top-0 bottom-0 w-0.5 bg-[#7e22ce] bg-gradient-to-b from-[#7e22ce] via-[#db2777] to-[#7e22ce]'
                                : 'absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#7e22ce] bg-gradient-to-b from-[#7e22ce] via-[#db2777] to-[#7e22ce]'}`}>
                            </div>

                            <div className="space-y-12">
                                {timelineData.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`relative ${isMobile
                                            ? 'ml-16'
                                            : index % 2 === 0
                                                ? 'flex text-right'
                                                : 'flex flex-row-reverse text-left'
                                            } group`}
                                    >
                                        <div className={`absolute ${isMobile
                                            ? '-left-20 top-6'
                                            : 'left-1/2 transform -translate-x-1/2 top-6'} 
                                    w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center z-10 transition-all duration-300 
                                    ${hoveredId === item.id || activeId === item.id
                                                ? 'bg-[#7e22ce] bg-gradient-to-r from-[#7e22ce] to-[#db2777] scale-110 shadow-lg shadow-[#7e22ce]/30'
                                                : 'bg-slate-700 hover:bg-slate-600'}`}
                                            onMouseEnter={() => setHoveredId(item.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                                        >
                                            <div className="text-white">
                                                {item.icon}
                                            </div>
                                        </div>

                                        <div className={`${isMobile ? 'w-full' : 'w-5/12'} relative`}>
                                            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300
                                        ${hoveredId === item.id || activeId === item.id
                                                    ? 'bg-slate-800/80 border-[#7e22ce]/30 shadow-xl shadow-[#7e22ce]/10 transform scale-[1.02]'
                                                    : 'hover:bg-slate-800/70 hover:border-slate-600/50'}`}>

                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-4 ${getStatusColor(item.statusKey)}`}>
                                                    {getStatusIcon(item.statusKey)}
                                                    <span className="capitalize">{item.statusText}</span>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="text-purple-400 font-semibold mb-1 text-sm">
                                                        {t('about.batch')} {item.batch}
                                                    </div>
                                                    <h3 className={`text-xl font-bold text-white mb-2 ${!isMobile && index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                        {item.title}
                                                    </h3>
                                                    <div className={`text-slate-400 mb-1 ${!isMobile && index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                        {item.institution}
                                                    </div>
                                                    <div className={`flex flex-col lg:flex-row lg:items-center gap-1 md:gap-4 text-sm text-slate-400
                                                            ${!isMobile && index % 2 === 0 ? 'lg:flex-row-reverse lg:justify-start' : 'lg:justify-start'}`}>
                                                        <div className={`flex items-center gap-1 ${!isMobile && index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                                            <HiLocationMarker className="text-red-500" fontSize={18} />
                                                            <span>{item.location}</span>
                                                        </div>
                                                        <div className={`flex items-center gap-1 ${!isMobile && index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                                            <HiCalendar className="text-blue-500" fontSize={18} />
                                                            <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                                                        </div>
                                                    </div>
                                                    <p className={`text-slate-300 mb-4 leading-relaxed ${!isMobile && index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Connecting line */}
                                            <div className={`absolute top-8 w-8 h-0.5 bg-[#7e22ce] bg-gradient-to-r from-[#7e22ce] to-[#db2777] ${isMobile
                                                ? '-left-8'
                                                : index % 2 === 0
                                                    ? '-right-8'
                                                    : '-left-8'}`}>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
