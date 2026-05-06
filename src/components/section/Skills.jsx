import { useTranslation } from 'react-i18next';
import { techstack, images } from '../../assets';

const skills = [
    { name: 'Laravel',     progress: '90%', img: techstack.Laravel,    color: 'bg-red-500' },
    { name: 'Vue.js',      progress: '90%', img: techstack.Vue,        color: 'bg-[#42b883]' },
    { name: 'React.js',    progress: '50%', img: techstack.React,      color: 'bg-[#61dafb]' },
    { name: 'Tailwind CSS',progress: '75%', img: techstack.Tailwind,   color: 'bg-cyan-400' },
    { name: 'Bootstrap',   progress: '85%', img: techstack.Bootstrap,  color: 'bg-purple-600' },
    { name: 'JavaScript',  progress: '70%', img: techstack.JavaScript, color: 'bg-yellow-400' },
    { name: 'PHP',         progress: '80%', img: techstack.PHP,        color: 'bg-indigo-400' },
    { name: 'MySQL',       progress: '75%', img: techstack.MySQL,      color: 'bg-blue-500' },
    { name: 'Figma',       progress: '65%', img: techstack.Figma,      color: 'bg-pink-500' },
    { name: 'Git',         progress: '70%', img: techstack.Git,        color: 'bg-orange-500' },
];

export default function Skills() {
    const { t } = useTranslation();

    return (
        <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Image */}
                    <div className="lg:w-5/12 relative group">
                        <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-yellow-500 dark:border-purple-500 rounded-tl-2xl transition-all group-hover:-top-6 group-hover:-left-6" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-4 border-r-4 border-orange-500 dark:border-pink-500 rounded-br-2xl transition-all group-hover:-bottom-6 group-hover:-right-6" />
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 p-2">
                            <img
                                src={images.skillBanner}
                                alt="Skills banner"
                                className="w-full h-[450px] object-cover rounded-xl grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Skill bars */}
                    <div className="lg:w-7/12 w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                {t('skills.title')}{' '}
                                <span className="text-orange-500 dark:text-purple-500">{t('skills.sub_title')}</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-green-500 mt-2 rounded-full" />
                        </div>

                        <div className="h-[400px] overflow-y-auto space-y-3 custom-scroll">
                            {skills.map((skill, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 flex-shrink-0">
                                        <img src={skill.img} alt={skill.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                                            <span className="text-xs font-medium text-gray-500">{skill.progress}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${skill.color} transition-all duration-1000`}
                                                style={{ width: skill.progress }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 4px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .dark .custom-scroll::-webkit-scrollbar-thumb { background: #475569; }
            `}</style>
        </section>
    );
}
