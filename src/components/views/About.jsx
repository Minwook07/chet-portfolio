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

    const timelineData = baseTimeline.map(item => ({
        ...item,
        title: t(`about.items.${item.key}.title`),
        institution: t(`about.items.${item.key}.institution`),
        location: t(`about.items.${item.key}.location`),
        startDate: t(`about.items.${item.key}.startDate`),
        endDate: t(`about.items.${item.key}.endDate`),
        statusKey: item.keyStatusKey,
        statusText: t(`about.items.${item.key}.status`),
        description: t(`about.items.${item.key}.description`),
        skills: t(`about.items.${item.key}.skills`, { returnObjects: true }),
        grade: t(`about.items.${item.key}.grade`),
        achievements: t(`about.items.${item.key}.achievements`, { returnObjects: true }),
    }));

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

    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;

        if (years > 0) {
            return months > 0 ? `${years}y ${months}m` : `${years}y`;
        }
        return `${months}m`;
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7e22ce] bg-gradient-to-r from-[#7e22ce] to-[#db2777] rounded-2xl mb-6">
                        <span className="text-3xl">📚</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('about.title')}
                    </h1>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className={`${isMobile
                        ? 'absolute left-8 top-0 bottom-0 w-0.5 bg-[#7e22ce] bg-gradient-to-b from-[#7e22ce] via-[#db2777] to-[#7e22ce]'
                        : 'absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#7e22ce] bg-gradient-to-b from-[#7e22ce] via-[#db2777] to-[#7e22ce]'}`}>
                    </div>

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {timelineData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative ${isMobile
                                    ? 'ml-16'
                                    : index % 2 === 0
                                        ? 'flex'
                                        : 'flex flex-row-reverse text-right'
                                    } group`}
                            >
                                {/* Timeline node */}
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

                                {/* Content card */}
                                <div className={`${isMobile ? 'w-full' : 'w-5/12'} relative`}>
                                    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300
                                        ${hoveredId === item.id || activeId === item.id
                                            ? 'bg-slate-800/80 border-[#7e22ce]/30 shadow-xl shadow-[#7e22ce]/10 transform scale-[1.02]'
                                            : 'hover:bg-slate-800/70 hover:border-slate-600/50'}`}>

                                        {/* Status badge */}
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-4 ${getStatusColor(item.statusKey)}`}>
                                            {getStatusIcon(item.statusKey)}
                                            <span className="capitalize">{item.statusText}</span>
                                        </div>

                                        {/* Header */}
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <div className="text-slate-400 mb-1">{item.institution}</div>
                                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <HiLocationMarker className="text-red-500" fontSize={18} />
                                                    <span>{item.location}</span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <HiCalendar className="text-blue-500" fontSize={18} />
                                                    <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <HiClock className="text-[#db2777]" fontSize={18} />
                                                    <span>{getDuration(item.startDate, item.endDate)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-300 mb-4 leading-relaxed">{item.description}</p>

                                        {/* Grade/Result */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-[#db2777]">🏅</span>
                                            <span className="text-[#db2777] font-medium">{item.grade}</span>
                                        </div>

                                        {/* Expandable content */}
                                        <div className={`transition-all duration-300 overflow-hidden ${activeId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {/* Achievements */}
                                            <div className="mb-4">
                                                <h4 className="text-white font-semibold mb-2">Key Achievements</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.achievements.map((achievement, i) => (
                                                        <span key={i} className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm">
                                                            {achievement}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <div>
                                                <h4 className="text-white font-semibold mb-2">Skills Acquired</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.skills.map((skill, i) => (
                                                        <span key={i} className="bg-slate-700/80 text-slate-300 hover:bg-[#7e22ce]/20 hover:text-[#db2777] px-3 py-1.5 rounded-lg text-sm transition-colors duration-200">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expand indicator */}
                                        <div className="flex justify-center mt-4 pt-4 border-t border-slate-700/50">
                                            <button
                                                className="text-slate-400 hover:text-[#db2777] transition-colors text-sm cursor-pointer"
                                                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                                            >
                                                {activeId === item.id
                                                    ? t('about.button.btn_show_less')
                                                    : t('about.button.btn_show_more')}
                                            </button>
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
    );
}
