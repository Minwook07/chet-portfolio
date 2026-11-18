import type { ReactNode } from 'react';

interface SectionHeadingProps {
    title: ReactNode;
    /** Handwritten note under the title, in the accent color */
    note?: ReactNode;
    align?: 'left' | 'center';
}

/**
 * One heading style for every section: a soft serif, an accent squiggle,
 * and a handwritten aside. The title stays one color so nothing is singled out.
 */
export default function SectionHeading({ title, note, align = 'center' }: SectionHeadingProps) {
    const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
    return (
        <div className={`flex flex-col ${alignment} gap-2`}>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>
            <svg className="h-3 w-40" viewBox="0 0 160 12" fill="none" aria-hidden="true" style={{ color: 'var(--bg-color-primary)' }}>
                <path d="M3 7C20 1 34 12 52 6S86 1 104 7S138 12 157 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {note && (
                <p className="font-hand text-xl" style={{ color: 'var(--bg-color-primary)' }}>
                    {note}
                </p>
            )}
        </div>
    );
}
