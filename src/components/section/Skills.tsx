'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TbArrowsShuffle } from 'react-icons/tb';
import { techstack } from '../../assets';
import { useCulture } from '../../contexts/CultureContext';
import { cultureArt } from '../culture/registry';
import CultureStrip from '../culture/CultureStrip';
import SectionHeading from '../SectionHeading';

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
    const { culture } = useCulture();
    const [DecorA, DecorB] = cultureArt[culture.id].motifs;

    // Prevent hydration mismatch by rendering translated text only after client mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Function to shuffle array and trigger layout animation
    const handleShuffle = () => {
        setSkillsList((prev) => [...prev].sort(() => Math.random() - 0.5));
    };

    // Sticker looks: every variant keeps its text readable on the user's accent color
    const getVariantStyles = (variant: Skill['variant']) => {
        switch (variant) {
            case 'coral':
                return { style: { backgroundColor: 'var(--bg-color-primary)' }, className: 'on-accent' };
            case 'peach':
                return { style: { backgroundColor: 'color-mix(in srgb, var(--bg-color-primary) 24%, var(--card))' }, className: 'text-ink' };
            case 'dark':
                return { style: {}, className: 'bg-ink text-paper' };
            case 'white':
            default:
                return { style: {}, className: 'bg-card text-ink' };
        }
    };

    return (
        <section id="skills" className="relative overflow-hidden bg-paper py-24 text-ink">
            <div className="container mx-auto max-w-6xl px-6">
                {/* Header Row */}
                <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <SectionHeading
                        align="left"
                        title={
                            <>
                                {mounted ? (t('skills.title') || "Things I'm") : "Things I'm"}{' '}
                                {mounted ? (t('skills.sub_title') || 'good at') : 'good at'}
                            </>
                        }
                        note="psst, these stickers are draggable"
                    />

                    <motion.button
                        onClick={handleShuffle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex cursor-pointer items-center gap-2 self-start rounded-full border-2 border-ink bg-card px-5 py-2.5 text-sm font-bold text-ink sm:self-auto"
                    >
                        <span>Shuffle</span>
                        <TbArrowsShuffle size={16} />
                    </motion.button>
                </div>

                {/* Felt desk mat with a running stitch and a dotted grid */}
                <div
                    ref={constraintsRef}
                    className="felt relative flex min-h-[420px] w-full select-none flex-wrap items-center justify-center gap-4 overflow-hidden rounded-[2rem] p-10 sm:gap-6 sm:p-14"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--stitch) 1px, transparent 1.5px)',
                        backgroundSize: '24px 24px',
                    }}
                >
                    {/* Corner decor from the chosen culture */}
                    <div key={culture.id} className="grow-in pointer-events-none absolute bottom-2 left-4 hidden h-40 sm:block" aria-hidden="true">
                        <DecorA className="h-full w-auto" />
                    </div>
                    <div key={`${culture.id}-b`} className="grow-in pointer-events-none absolute bottom-2 right-4 hidden h-36 sm:block" aria-hidden="true">
                        <DecorB className="h-full w-auto" />
                    </div>

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
                                style={{ ...variantConfig.style, rotate: ((skill.id % 5) - 2) * 1.6 }}
                                className={`sticker relative z-10 flex items-center gap-3 rounded-2xl px-6 py-3.5 text-base font-bold ${variantConfig.className}`}
                            >
                                {skill.img && (
                                    <img src={skill.img} alt={skill.name} className="pointer-events-none h-6 w-6 object-contain" />
                                )}
                                <span className="pointer-events-none">{skill.name}</span>
                                <span className="pointer-events-none rounded-full bg-black/10 px-2 py-0.5 text-xs opacity-80">
                                    {skill.progress}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <CultureStrip className="absolute bottom-0 left-0" />
        </section>
    );
}
