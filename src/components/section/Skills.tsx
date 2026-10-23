'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TbArrowsShuffle } from 'react-icons/tb';
import { techstack } from '../../assets';

interface Skill {
    id: number;
    name: string;
    progress: string;
    img: string;
    variant: 'dark' | 'coral' | 'peach' | 'white';
}

const initialSkills: Skill[] = [
    { id: 1, name: 'Laravel', progress: '90%', img: techstack.Laravel, variant: 'white' },
    { id: 2, name: 'Vue.js', progress: '90%', img: techstack.Vue, variant: 'white' },
    { id: 3, name: 'React.js', progress: '50%', img: techstack.React, variant: 'peach' },
    { id: 4, name: 'Tailwind CSS', progress: '75%', img: techstack.Tailwind, variant: 'dark' },
    { id: 5, name: 'TypeScript', progress: '80%', img: techstack.React, variant: 'peach' },
    { id: 6, name: 'JavaScript', progress: '95%', img: techstack.JavaScript, variant: 'dark' },
    { id: 7, name: 'Next.js', progress: '50%', img: techstack.NextJS, variant: 'white' },
    { id: 8, name: 'MySQL', progress: '70%', img: techstack.MySQL, variant: 'white' },
];

export default function Skills() {
    const { t } = useTranslation();
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [skillsList, setSkillsList] = useState<Skill[]>(initialSkills);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by rendering translated text only after client mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Function to shuffle array and trigger layout animation
    const handleShuffle = () => {
        setSkillsList((prev) => [...prev].sort(() => Math.random() - 0.5));
    };

    // Styling helper for the pill variants matching the soft sticker aesthetic
    const getVariantStyles = (variant: Skill['variant']) => {
        switch (variant) {
            case 'coral':
                return {
                    style: { backgroundColor: 'var(--bg-color-primary)' },
                    className: 'text-white shadow-lg'
                };
            case 'peach':
                return {
                    style: {},
                    className: 'bg-[#FFE2D9] text-[#2D2D2D] dark:bg-orange-900/40 dark:text-orange-200 shadow-orange-500/10'
                };
            case 'dark':
                return {
                    style: {},
                    className: 'bg-[#221F20] text-white shadow-black/20'
                };
            case 'white':
            default:
                return {
                    style: {},
                    className: 'bg-white dark:bg-gray-800 text-[#2D2D2D] dark:text-gray-100 shadow-gray-200/50 dark:shadow-none'
                };
        }
    };

    return (
        <section id="skills" className="py-20 bg-[#FFF8F5] dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white flex flex-wrap items-center gap-x-3">
                            <span>{mounted ? (t('skills.title') || "Things I'm") : "Things I'm"}</span>
                            <span
                                className="relative inline-block"
                                style={{ color: 'var(--bg-color-primary)' }}
                            >
                                {mounted ? (t('skills.sub_title') || 'good at') : 'good at'}
                                {/* Squiggly SVG Underline using dynamic theme color */}
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                    viewBox="0 0 100 20"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0,10 Q25,20 50,10 T100,10"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Playful Annotation */}
                        <span
                            className="hidden md:inline-block text-lg italic"
                            style={{
                                fontFamily: "'Caveat', cursive, sans-serif",
                                color: 'var(--bg-color-primary)'
                            }}
                        >
                            psst, these stickers are draggable
                        </span>

                        {/* Shuffle Button */}
                        <motion.button
                            onClick={handleShuffle}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <span>Shuffle</span>
                            <TbArrowsShuffle size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Sticker Canvas Box with Dotted Grid */}
                <div
                    ref={constraintsRef}
                    className="relative w-full min-h-[420px] p-8 sm:p-12 rounded-3xl border-2 border-dashed border-orange-200 dark:border-gray-800 bg-[#FFF3EE]/50 dark:bg-gray-900/40 flex flex-wrap items-center justify-center gap-4 sm:gap-6 overflow-hidden select-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #fca5a5 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                >
                    {skillsList.map((skill) => {
                        const variantConfig = getVariantStyles(skill.variant);
                        return (
                            <motion.div
                                key={skill.id}
                                layout
                                drag
                                dragConstraints={constraintsRef}
                                dragElastic={0.2}
                                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                                whileHover={{ scale: 1.05, cursor: 'grab' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                style={variantConfig.style}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-shadow ${variantConfig.className}`}
                            >
                                {skill.img && (
                                    <img
                                        src={skill.img}
                                        alt={skill.name}
                                        className="w-6 h-6 object-contain pointer-events-none"
                                    />
                                )}
                                <span className="pointer-events-none">{skill.name}</span>

                                {/* Optional Progress Badge */}
                                <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 opacity-80 pointer-events-none">
                                    {skill.progress}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}