/**
 * Hand-drawn SVG motifs, one small component per illustration.
 * - Outlines use var(--ink) so they flip with light/dark paper.
 * - Natural colors (bamboo green, lantern red…) are fixed on purpose.
 * - A few small details use the user's accent (var(--bg-color-primary)) so
 *   every motif still feels tied to the chosen color preset.
 */
import type { ComponentType, ReactNode } from 'react';

export interface MotifProps {
    className?: string;
}
export type Motif = ComponentType<MotifProps>;

const INK = 'var(--ink)';
const ACCENT = 'var(--bg-color-primary)';
const line = { stroke: INK, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Art({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
    return (
        <svg viewBox={viewBox} className={className} aria-hidden="true" focusable="false">
            <g fill="none">{children}</g>
        </svg>
    );
}

/** A leaf pointing along `a` degrees (0 = right, -90 = up). */
function Leaf({ x, y, a, s = 1, fill }: { x: number; y: number; a: number; s?: number; fill: string }) {
    return (
        <path
            d="M0 0C10-7 26-7 38 0C26 7 10 7 0 0Z"
            transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}
            fill={fill}
            stroke={INK}
            strokeWidth={2 / s}
            strokeLinejoin="round"
        />
    );
}

/* ───────────── Cozy desk ───────────── */

export const Bonsai: Motif = ({ className }) => (
    <Art viewBox="0 0 120 140" className={className}>
        <path d="M58 100C52 84 66 76 56 60C52 52 56 46 62 42" stroke="#7a5236" strokeWidth="7" strokeLinecap="round" />
        <path d="M58 100C52 84 66 76 56 60C52 52 56 46 62 42" {...line} strokeWidth={1.4} opacity={0.5} />
        <circle cx="36" cy="46" r="20" fill="#7fa36b" {...line} />
        <circle cx="76" cy="38" r="24" fill="#5f8a55" {...line} />
        <circle cx="58" cy="26" r="18" fill="#9cc08a" {...line} />
        {[[30, 40], [48, 24], [80, 30], [86, 46], [64, 40], [40, 56]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill="#f2b8c6" />
        ))}
        <path d="M30 100H90L84 130Q83 134 79 134H41Q37 134 36 130Z" fill="#c9795a" {...line} />
        <rect x="26" y="94" width="68" height="10" rx="4" fill="#d98c6c" {...line} />
        <rect x="26" y="94" width="68" height="3" rx="1.5" fill={ACCENT} opacity="0.85" />
    </Art>
);

export const Matcha: Motif = ({ className }) => (
    <Art viewBox="0 0 120 110" className={className}>
        <path d="M40 22q-6-8 0-14M58 24q-6-10 0-18M76 22q-6-8 0-14" {...line} opacity="0.6" />
        <ellipse cx="60" cy="96" rx="40" ry="8" fill="#d9cdb4" {...line} />
        <path d="M14 42H106C106 70 90 92 60 92C30 92 14 70 14 42Z" fill="#efe7d6" {...line} />
        <ellipse cx="60" cy="42" rx="46" ry="11" fill="#8db36e" {...line} />
        <ellipse cx="60" cy="42" rx="30" ry="6" fill="#a9ca88" />
        <circle cx="50" cy="40" r="2" fill="#d6e6c0" />
        <circle cx="68" cy="43" r="1.6" fill="#d6e6c0" />
        <path d="M22 58H98" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
    </Art>
);

export const Sprig: Motif = ({ className }) => (
    <Art viewBox="0 0 70 160" className={className}>
        <path d="M34 158C30 120 40 80 36 8" stroke="#6b8a4e" strokeWidth="3.4" strokeLinecap="round" />
        {[[128, 1], [100, -1], [74, 1], [48, -1], [26, 1]].map(([y, d], i) => (
            <Leaf key={y} x={34 + (i % 2 ? -1 : 1)} y={y} a={d > 0 ? -30 : -150} s={0.9 + (i % 3) * 0.08} fill={i % 2 ? '#8fb27a' : '#6f9a5e'} />
        ))}
        <Leaf x={36} y={10} a={-90} s={0.9} fill="#a8c892" />
    </Art>
);

/* ───────────── China ───────────── */

const bambooNodes = (top: number): number[] => {
    const ys: number[] = [];
    for (let y = top + 56; y < 390; y += 62) ys.push(y);
    return ys;
};

function Stalk({ cx, top, w, mid }: { cx: number; top: number; w: number; mid: string }) {
    return (
        <g>
            <rect x={cx - w / 2} y={top} width={w} height={400 - top} rx={w / 2.4} fill={mid} {...line} />
            <path d={`M${cx - w / 4} ${top + 6}V398`} stroke="#b7d3a3" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
            {bambooNodes(top).map(y => (
                <rect key={y} x={cx - w / 2 - 2} y={y} width={w + 4} height="9" rx="4.5" fill="#4f7f47" {...line} />
            ))}
        </g>
    );
}

const bambooStalks = [
    { cx: 140, top: 118, w: 20, mid: '#8db677' },
    { cx: 52, top: 24, w: 22, mid: '#7fa668' },
    { cx: 96, top: 64, w: 24, mid: '#709a5a' },
];

export const Bamboo: Motif = ({ className }) => (
    <Art viewBox="0 0 190 400" className={className}>
        {bambooStalks.map(s => (
            <Stalk key={s.cx} {...s} />
        ))}
        {bambooStalks.flatMap(st =>
            bambooNodes(st.top).flatMap((y, k) => [
                <Leaf key={`${st.cx}-a${k}`} x={st.cx} y={y + 4} a={k % 2 ? -150 : -30} s={1.3} fill={k % 2 ? '#7fb06a' : '#5f9150'} />,
                <Leaf key={`${st.cx}-b${k}`} x={st.cx} y={y + 16} a={k % 2 ? -22 : -158} s={1.1} fill={k % 2 ? '#5f9150' : '#8fc07a'} />,
            ]),
        )}
        {bambooStalks.map(st => (
            <Leaf key={`top${st.cx}`} x={st.cx} y={st.top + 4} a={-92 + (st.cx % 3) * 8} s={1.1} fill="#9ccc86" />
        ))}
    </Art>
);

export const Lantern: Motif = ({ className }) => (
    <Art viewBox="0 0 70 134" className={className}>
        <path d="M35 0V18" {...line} />
        <rect x="22" y="18" width="26" height="8" rx="2" fill="#e6b84a" {...line} />
        <ellipse cx="35" cy="64" rx="30" ry="36" fill="#d9473a" {...line} />
        <path d="M35 28C20 44 20 84 35 100M35 28C50 44 50 84 35 100M35 28V100" stroke="#a83228" strokeWidth="2" fill="none" />
        <circle cx="35" cy="64" r="9" fill="none" stroke="#e6b84a" strokeWidth="2.4" />
        <path d="M35 57V71M28 64H42" stroke="#e6b84a" strokeWidth="2" strokeLinecap="round" />
        <rect x="22" y="98" width="26" height="8" rx="2" fill="#e6b84a" {...line} />
        <path d="M35 106V112" {...line} />
        <path d="M35 110L27 132H43Z" fill={ACCENT} {...line} />
        <path d="M31 118V130M35 118V132M39 118V130" stroke={INK} strokeWidth="1" opacity="0.5" />
    </Art>
);

export const Panda: Motif = ({ className }) => (
    <Art viewBox="0 0 120 120" className={className}>
        <circle cx="31" cy="33" r="11" fill="#2b2b2b" {...line} />
        <circle cx="89" cy="33" r="11" fill="#2b2b2b" {...line} />
        <circle cx="60" cy="62" r="35" fill="#fffdf7" {...line} />
        <ellipse cx="45" cy="60" rx="9" ry="12" transform="rotate(22 45 60)" fill="#2b2b2b" />
        <ellipse cx="75" cy="60" rx="9" ry="12" transform="rotate(-22 75 60)" fill="#2b2b2b" />
        <circle cx="46" cy="59" r="3.4" fill="#fff" />
        <circle cx="74" cy="59" r="3.4" fill="#fff" />
        <circle cx="46.6" cy="59.4" r="1.6" fill="#2b2b2b" />
        <circle cx="73.4" cy="59.4" r="1.6" fill="#2b2b2b" />
        <circle cx="33" cy="74" r="6" fill={ACCENT} opacity="0.4" />
        <circle cx="87" cy="74" r="6" fill={ACCENT} opacity="0.4" />
        <ellipse cx="60" cy="72" rx="6" ry="4.4" fill="#2b2b2b" />
        <path d="M60 76Q56 83 50 80M60 76Q64 83 70 80" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" />
        <rect x="22" y="94" width="76" height="14" rx="7" fill="#7fa668" {...line} />
        <rect x="46" y="93" width="6" height="16" rx="2" fill="#4f7f47" />
        <rect x="72" y="93" width="6" height="16" rx="2" fill="#4f7f47" />
        <ellipse cx="34" cy="101" rx="11" ry="9" fill="#2b2b2b" {...line} />
        <ellipse cx="86" cy="101" rx="11" ry="9" fill="#2b2b2b" {...line} />
    </Art>
);

/* ───────────── Hong Kong ───────────── */

/** Vertical neon sign. Plain HTML so it uses the real Chinese font on the device. */
export const NeonSign: Motif = ({ className }) => (
    <div className={`${className ?? ''} flex items-center justify-center`} aria-hidden="true">
        <div
            className="neon flex h-full max-h-[22rem] items-center justify-center rounded-xl border-[3px] border-[#ff4f9a] px-3 py-4 text-3xl font-black leading-tight sm:text-4xl"
            style={{ writingMode: 'vertical-rl', boxShadow: '0 0 10px #ff4f9a, inset 0 0 10px #ff4f9a55', background: 'rgb(20 10 30 / 0.78)' }}
        >
            茶餐廳
        </div>
    </div>
);

export const Tram: Motif = ({ className }) => (
    <Art viewBox="0 0 180 130" className={className}>
        <path d="M0 6H180" stroke={INK} strokeWidth="1.4" strokeDasharray="4 4" opacity="0.5" />
        <path d="M100 32L128 6" {...line} />
        <path d="M122 6H136" {...line} />
        <path d="M26 42Q90 22 154 42Z" fill="#d8d2bf" {...line} />
        <rect x="24" y="42" width="132" height="24" rx="3" fill="#2f7d5b" {...line} />
        <rect x="20" y="66" width="140" height="34" rx="3" fill="#2f7d5b" {...line} />
        <rect x="20" y="63" width="140" height="5" fill={ACCENT} stroke={INK} strokeWidth="1.6" />
        {Array.from({ length: 7 }, (_, i) => (
            <rect key={`u${i}`} x={30 + i * 17.5} y="47" width="13" height="13" rx="2" fill="#f6edd0" stroke={INK} strokeWidth="1.6" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
            <rect key={`l${i}`} x={28 + i * 22} y="73" width="17" height="19" rx="2" fill="#f6edd0" stroke={INK} strokeWidth="1.6" />
        ))}
        <rect x="22" y="100" width="136" height="6" rx="2" fill="#3c3c3c" {...line} />
        <circle cx="46" cy="108" r="8" fill="#3c3c3c" {...line} />
        <circle cx="134" cy="108" r="8" fill="#3c3c3c" {...line} />
        <circle cx="46" cy="108" r="2.6" fill="#d8d2bf" />
        <circle cx="134" cy="108" r="2.6" fill="#d8d2bf" />
    </Art>
);

export const MilkTea: Motif = ({ className }) => (
    <Art viewBox="0 0 100 120" className={className}>
        <path d="M34 22q-6-8 0-14M48 24q-6-10 0-18M62 22q-6-8 0-14" {...line} opacity="0.55" />
        <ellipse cx="46" cy="106" rx="36" ry="8" fill="#f1e7d3" {...line} />
        <path d="M22 42V86Q22 102 38 102H54Q70 102 70 86V42Z" fill="#fbf4e8" {...line} />
        <path d="M22 60H70V69H22Z" fill={ACCENT} opacity="0.9" />
        <path d="M70 52C90 50 90 80 68 78" {...line} strokeWidth={5} />
        <ellipse cx="46" cy="42" rx="24" ry="7" fill="#b9835a" {...line} />
        <ellipse cx="46" cy="41" rx="15" ry="3.4" fill="#d3a67c" />
        <path d="M52 40L62 20" {...line} strokeWidth={1.6} />
        <rect x="58" y="12" width="11" height="10" rx="2" fill="#fff" {...line} strokeWidth={1.6} transform="rotate(14 63 17)" />
    </Art>
);

export const Steamer: Motif = ({ className }) => (
    <Art viewBox="0 0 120 112" className={className}>
        <path d="M40 18q-8-6-2-12M60 16q-8-8 0-16M80 18q-8-6-2-12" {...line} opacity="0.55" />
        <rect x="18" y="66" width="84" height="26" rx="6" fill="#d9b27a" {...line} />
        <rect x="22" y="44" width="76" height="24" rx="6" fill="#e1bd86" {...line} />
        <path d="M16 44Q60 8 104 44Z" fill="#ecd0a0" {...line} />
        <circle cx="60" cy="22" r="4.5" fill="#d9b27a" {...line} />
        {[34, 46, 58, 70, 82, 94].map(x => (
            <path key={x} d={`M${x} 70V90`} stroke={INK} strokeWidth="1.2" opacity="0.4" />
        ))}
        <path d="M30 50H90" stroke={ACCENT} strokeWidth="3.4" strokeLinecap="round" />
        <ellipse cx="60" cy="102" rx="40" ry="6" fill="#efe3cc" {...line} />
        <path d="M44 100C44 88 76 88 76 100Z" fill="#fff8ec" {...line} />
        <path d="M52 92V99M58 91V99M64 91V99M70 92V99" stroke={INK} strokeWidth="1.2" opacity="0.45" />
    </Art>
);

/* ───────────── Korea ───────────── */

export const HanokMoon: Motif = ({ className }) => (
    <Art viewBox="0 0 200 150" className={className}>
        <circle cx="150" cy="34" r="25" fill="#f6e3a4" opacity="0.45" />
        <circle cx="150" cy="34" r="19" fill="#f6e3a4" {...line} />
        <circle cx="144" cy="30" r="3.6" fill="#e9cf87" />
        <circle cx="156" cy="40" r="2.6" fill="#e9cf87" />
        <rect x="34" y="124" width="132" height="12" rx="3" fill="#a8a39a" {...line} />
        <rect x="46" y="84" width="108" height="42" fill="#f3e9d2" {...line} />
        {[46, 80, 114, 148].map(x => (
            <rect key={x} x={x} y="84" width="7" height="42" fill="#8a5a3b" {...line} strokeWidth={1.6} />
        ))}
        {[56, 90, 124].map(x => (
            <path key={x} d={`M${x} 92H${x + 22}V122H${x}ZM${x + 11} 92V122M${x} 107H${x + 22}`} stroke="#8a5a3b" strokeWidth="1.3" />
        ))}
        <rect x="36" y="78" width="128" height="8" fill="#8a5a3b" {...line} />
        {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={42 + i * 12.4} y="80" width="7" height="4" fill={['#3f7cac', '#d9473a', '#4e8b5a'][i % 3]} />
        ))}
        <path d="M5 66C32 76 56 70 72 52L100 36L128 52C144 70 168 76 195 66C188 78 170 82 150 80H50C30 82 12 78 5 66Z" fill="#4b5568" {...line} />
        <path d="M100 36V80M86 44L78 80M114 44L122 80M70 54L56 80M130 54L144 80" stroke="#6b7690" strokeWidth="1.6" strokeLinecap="round" />
    </Art>
);

export const Pine: Motif = ({ className }) => (
    <Art viewBox="0 0 120 200" className={className}>
        <path d="M62 198C56 160 72 132 58 102C52 84 62 62 68 40" stroke="#7a5236" strokeWidth="8" strokeLinecap="round" />
        <path d="M60 130C46 126 40 120 38 110M62 100C74 98 82 94 88 84M60 74C48 70 42 66 38 58" stroke="#7a5236" strokeWidth="4" strokeLinecap="round" />
        {[
            { cx: 68, cy: 30, rx: 33, ry: 15, f: '#3f6b4f' },
            { cx: 38, cy: 56, rx: 34, ry: 14, f: '#4b7c58' },
            { cx: 86, cy: 84, rx: 32, ry: 14, f: '#3f6b4f' },
            { cx: 40, cy: 114, rx: 34, ry: 14, f: '#4b7c58' },
        ].map(p => (
            <g key={`${p.cx}-${p.cy}`}>
                <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill={p.f} {...line} />
                <ellipse cx={p.cx - p.rx / 3} cy={p.cy - p.ry + 2} rx={p.rx / 2.6} ry={p.ry / 2} fill={p.f} {...line} strokeWidth={1.8} />
                <path d={`M${p.cx - p.rx / 2} ${p.cy}l5 -4M${p.cx} ${p.cy + 3}l5 -4M${p.cx + p.rx / 2} ${p.cy}l5 -4`} stroke="#9fc7a1" strokeWidth="1.6" strokeLinecap="round" />
            </g>
        ))}
    </Art>
);

export const Mugunghwa: Motif = ({ className }) => (
    <Art viewBox="0 0 100 100" className={className}>
        <Leaf x={50} y={52} a={128} s={1.1} fill="#6f9a5e" />
        <Leaf x={50} y={52} a={52} s={1.1} fill="#5f8a55" />
        {[0, 72, 144, 216, 288].map(r => (
            <path key={r} d="M50 52C30 42 28 16 50 8C72 16 70 42 50 52Z" transform={`rotate(${r} 50 52)`} fill="#f3b6d3" {...line} />
        ))}
        <circle cx="50" cy="52" r="10" fill="#b03a7a" {...line} />
        {[0, 72, 144, 216, 288].map(r => (
            <g key={`s${r}`} transform={`rotate(${r + 36} 50 52)`}>
                <path d="M50 46V34" stroke={INK} strokeWidth="1.6" />
                <circle cx="50" cy="32" r="2.6" fill="#f2c94c" />
            </g>
        ))}
    </Art>
);

/* ───────────── Italy ───────────── */

export const Cypress: Motif = ({ className }) => (
    <Art viewBox="0 0 70 232" className={className}>
        <rect x="31" y="206" width="8" height="24" rx="2" fill="#7a5236" {...line} />
        <path d="M35 4C42 26 55 52 56 82C59 104 63 132 58 162C56 192 46 214 35 214C24 214 14 192 12 162C7 132 11 104 14 82C15 52 28 26 35 4Z" fill="#2f5b45" {...line} />
        {[48, 76, 104, 132, 160, 188].map((y, i) => (
            <path key={y} d={`M${20 + (i % 2) * 4} ${y}q6 6 12 0q6 6 12 0q5 5 9 0`} stroke="#5a8f6d" strokeWidth="2.4" strokeLinecap="round" />
        ))}
    </Art>
);

function Lemon({ x, y, r }: { x: number; y: number; r: number }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M-19 0C-19-15 19-15 19 0C19 15-19 15-19 0Z" fill="#f4ce4a" {...line} />
            <circle cx="-20" cy="0" r="3" fill="#f4ce4a" {...line} strokeWidth={1.8} />
            <circle cx="20" cy="0" r="3" fill="#f4ce4a" {...line} strokeWidth={1.8} />
            <path d="M-10-6Q0-10 8-6" stroke="#fff3b8" strokeWidth="2.4" strokeLinecap="round" />
        </g>
    );
}

export const Lemons: Motif = ({ className }) => (
    <Art viewBox="0 0 130 112" className={className}>
        <path d="M6 18C40 28 76 38 124 26" stroke="#7a5236" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M40 30V46M76 38V52M104 32V44" stroke="#7a5236" strokeWidth="2.6" strokeLinecap="round" />
        <Leaf x={22} y={22} a={-40} s={0.95} fill="#5f9a55" />
        <Leaf x={58} y={34} a={-145} s={0.95} fill="#7fb06a" />
        <Leaf x={92} y={36} a={-35} s={0.9} fill="#5f9a55" />
        <Lemon x={40} y={62} r={-24} />
        <Lemon x={76} y={72} r={14} />
        <Lemon x={104} y={56} r={-34} />
    </Art>
);

export const Moka: Motif = ({ className }) => (
    <Art viewBox="0 0 100 132" className={className}>
        <path d="M36 20q-7-8 0-15M50 22q-7-10 0-18M64 20q-7-8 0-15" {...line} opacity="0.55" />
        <path d="M22 120L28 82H72L78 120Z" fill="#c7cbd4" {...line} />
        <rect x="26" y="75" width="48" height="8" rx="2" fill="#9aa0ad" {...line} />
        <path d="M28 76L22 42H78L72 76Z" fill="#d3d7df" {...line} />
        <path d="M22 42L30 30H70L78 42Z" fill="#8e94a3" {...line} />
        <circle cx="50" cy="25" r="5" fill="#3c3c3c" {...line} />
        <path d="M22 42L11 40L22 49Z" fill="#d3d7df" {...line} />
        <path d="M78 46C98 46 100 76 76 74" {...line} strokeWidth={6} stroke="#3c3c3c" />
        <path d="M40 46L42 74M50 46V74M60 46L58 74M38 86L36 116M50 86V116M62 86L64 116" stroke="#fff" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />
        <rect x="26" y="108" width="48" height="4" fill={ACCENT} opacity="0.9" />
    </Art>
);

/* ───────────── France ───────────── */

export const Eiffel: Motif = ({ className }) => (
    <Art viewBox="0 0 100 222" className={className}>
        <path d="M50 4L55 40L58 62L64 100C68 130 80 180 92 216H74C68 192 62 172 50 162C38 172 32 192 26 216H8C20 180 32 130 36 100L42 62L45 40Z" fill="#6c6f8f" {...line} />
        <rect x="38" y="60" width="24" height="7" rx="1.5" fill="#8c8fb0" {...line} strokeWidth={1.8} />
        <rect x="30" y="98" width="40" height="8" rx="1.5" fill="#8c8fb0" {...line} strokeWidth={1.8} />
        <path d="M44 70L56 96M56 70L44 96M38 110L62 150M62 110L38 150M30 150L70 112M26 160L40 178M74 160L60 178" stroke="#c4c6e0" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
        <path d="M50 4V-0" {...line} />
        <circle cx="50" cy="46" r="2.4" fill={ACCENT} />
    </Art>
);

export const Lavender: Motif = ({ className }) => {
    const stems = [
        { top: [20, 36], bend: [28, 100] },
        { top: [40, 14], bend: [40, 90] },
        { top: [60, 38], bend: [52, 100] },
    ];
    return (
        <Art viewBox="0 0 80 172" className={className}>
            {stems.map(s => (
                <path key={s.top[0]} d={`M40 168C${s.bend[0]} 150 ${s.bend[0]} ${s.bend[1]} ${s.top[0]} ${s.top[1]}`} stroke="#6b8a4e" strokeWidth="3" strokeLinecap="round" />
            ))}
            {stems.flatMap(s =>
                Array.from({ length: 6 }, (_, i) => {
                    const y = s.top[1] + i * 9;
                    const x = s.top[0] + (i % 2 ? 4 : -4) + (s.bend[0] - s.top[0]) * (i / 12);
                    return <ellipse key={`${s.top[0]}-${i}`} cx={x} cy={y} rx="4" ry="6.2" transform={`rotate(${i % 2 ? 24 : -24} ${x} ${y})`} fill={i % 2 ? '#a98be3' : '#8e6fd0'} {...line} strokeWidth={1.6} />;
                }),
            )}
            <Leaf x={40} y={160} a={-140} s={0.9} fill="#7fb06a" />
            <Leaf x={40} y={160} a={-40} s={0.9} fill="#5f9a55" />
        </Art>
    );
};

const croissantLobes = [
    { t: 214, rx: 12, ry: 11, f: '#d99a4b' },
    { t: 326, rx: 12, ry: 11, f: '#d99a4b' },
    { t: 242, rx: 16, ry: 14, f: '#e3a857' },
    { t: 298, rx: 16, ry: 14, f: '#e3a857' },
    { t: 270, rx: 20, ry: 17, f: '#ecb868' },
];

export const Croissant: Motif = ({ className }) => (
    <Art viewBox="0 0 120 90" className={className}>
        {croissantLobes.map(l => {
            const rad = (l.t * Math.PI) / 180;
            const x = 60 + 36 * Math.cos(rad);
            const y = 76 + 36 * Math.sin(rad);
            return <ellipse key={l.t} cx={x} cy={y} rx={l.rx} ry={l.ry} transform={`rotate(${l.t} ${x} ${y})`} fill={l.f} {...line} />;
        })}
        <path d="M50 36Q58 30 68 31" stroke="#fbe0a8" strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="100" cy="34" r="3" fill={ACCENT} opacity="0.9" />
    </Art>
);

/* ───────────── Cambodia ───────────── */

function Tower({ cx, y, w, tiers }: { cx: number; y: number; w: number; tiers: number }) {
    const parts: ReactNode[] = [];
    let top = y;
    let width = w;
    for (let i = 0; i < tiers; i++) {
        top -= 13;
        parts.push(<rect key={i} x={cx - width / 2} y={top} width={width} height="13" fill={i % 2 ? '#b98a50' : '#c9a06a'} {...line} strokeWidth={1.8} />);
        width -= 7;
    }
    parts.push(
        <path key="bud" d={`M${cx - width / 2 - 1} ${top}Q${cx - width / 2 - 2} ${top - 22} ${cx} ${top - 30}Q${cx + width / 2 + 2} ${top - 22} ${cx + width / 2 + 1} ${top}Z`} fill="#c9a06a" {...line} strokeWidth={1.8} />,
        <path key="spire" d={`M${cx} ${top - 30}V${top - 38}`} {...line} strokeWidth={1.8} />,
    );
    return <g>{parts}</g>;
}

export const Angkor: Motif = ({ className }) => (
    <Art viewBox="0 0 220 144" className={className}>
        <path d="M14 134Q40 128 66 134T118 134T170 134T206 134" stroke="#5da9a0" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 142Q56 136 82 142T134 142T186 142" stroke="#5da9a0" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        <rect x="16" y="116" width="188" height="9" rx="2" fill="#b98a50" {...line} />
        <rect x="24" y="104" width="172" height="12" fill="#c9a06a" {...line} />
        {[40, 64, 88, 112, 136, 160, 180].map(x => (
            <path key={x} d={`M${x - 5} 116V111Q${x} 105 ${x + 5} 111V116`} fill="#7a5a30" />
        ))}
        <Tower cx={46} y={104} w={24} tiers={2} />
        <Tower cx={174} y={104} w={24} tiers={2} />
        <Tower cx={78} y={104} w={32} tiers={3} />
        <Tower cx={142} y={104} w={32} tiers={3} />
        <Tower cx={110} y={104} w={42} tiers={4} />
        <circle cx="110" cy="14" r="2.4" fill={ACCENT} />
    </Art>
);

export const Lotus: Motif = ({ className }) => (
    <Art viewBox="0 0 120 120" className={className}>
        <ellipse cx="60" cy="102" rx="50" ry="12" fill="#6fa06a" {...line} />
        <path d="M60 102L60 90" stroke={INK} strokeWidth="2" />
        {[-60, 60].map(r => (
            <path key={r} d="M60 94C46 76 46 50 60 34C74 50 74 76 60 94Z" transform={`rotate(${r} 60 94)`} fill="#f29bb6" {...line} />
        ))}
        {[-32, 32].map(r => (
            <path key={r} d="M60 94C46 74 46 44 60 24C74 44 74 74 60 94Z" transform={`rotate(${r} 60 94)`} fill="#f6a9c0" {...line} />
        ))}
        <path d="M60 94C48 74 50 42 60 20C70 42 72 74 60 94Z" fill="#fbc7d6" {...line} />
        <path d="M60 30V80" stroke="#f29bb6" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </Art>
);

export const SugarPalm: Motif = ({ className }) => (
    <Art viewBox="0 0 190 232" className={className}>
        <g transform="translate(30 0)">
            <path d="M58 230C56 182 60 122 62 76H70C70 122 66 182 70 230Z" fill="#8a6b4a" {...line} />
            {[100, 122, 144, 166, 188, 210].map(y => (
                <path key={y} d={`M59 ${y}H69`} stroke={INK} strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
            ))}
            {[-8, -30, -52, -74].flatMap((r, i) => [
                <path key={`r${r}`} d="M0 0C16-26 46-30 68-6C46-14 18-10 0 0Z" transform={`translate(66 74) rotate(${r}) scale(1.3)`} fill={i % 2 ? '#4f8a4f' : '#3f7a45'} {...line} strokeWidth={1.6} />,
                <path key={`l${r}`} d="M0 0C16-26 46-30 68-6C46-14 18-10 0 0Z" transform={`translate(66 74) scale(-1 1) rotate(${r}) scale(1.3)`} fill={i % 2 ? '#3f7a45' : '#4f8a4f'} {...line} strokeWidth={1.6} />,
            ])}
            <path d="M66 74L66 44" stroke="#3f7a45" strokeWidth="5" strokeLinecap="round" />
            <circle cx="60" cy="84" r="5.5" fill="#5a3f2a" {...line} strokeWidth={1.6} />
            <circle cx="71" cy="86" r="5.5" fill="#5a3f2a" {...line} strokeWidth={1.6} />
            <circle cx="65" cy="95" r="5.5" fill="#5a3f2a" {...line} strokeWidth={1.6} />
        </g>
    </Art>
);

/* ───────────── Cambodia: temples ───────────── */

const STONE = '#b3a58b';
const STONE_DARK = '#8c7f68';

function BayonFace({ cx, cy, k = 1 }: { cx: number; cy: number; k?: number }) {
    return (
        <g transform={`translate(${cx} ${cy}) scale(${k})`} stroke={INK} strokeWidth={2 / k} strokeLinecap="round" strokeLinejoin="round">
            <path d="M-14 -8Q-8 -13 -2 -8M2 -8Q8 -13 14 -8" />
            <path d="M-12 -2Q-8 1 -4 -2M4 -2Q8 1 12 -2" />
            <path d="M0 -2V10M-5 12Q0 15 5 12" />
            <path d="M-10 19Q0 25 10 19M-8 15Q0 13 8 15" fill={STONE_DARK} />
        </g>
    );
}

export const Bayon: Motif = ({ className }) => (
    <Art viewBox="0 0 160 172" className={className}>
        <rect x="10" y="146" width="140" height="14" rx="2" fill={STONE_DARK} {...line} />
        <rect x="16" y="134" width="128" height="14" rx="2" fill={STONE} {...line} />
        {[{ x: 14, t: 78 }, { x: 114, t: 78 }].map(o => (
            <g key={o.x}>
                <rect x={o.x} y={o.t} width="32" height="58" fill={STONE} {...line} />
                <path d={`M${o.x - 1} ${o.t}Q${o.x + 16} ${o.t - 40} ${o.x + 33} ${o.t}Z`} fill={STONE_DARK} {...line} />
                <BayonFace cx={o.x + 16} cy={o.t + 26} k={0.55} />
            </g>
        ))}
        <rect x="46" y="58" width="68" height="78" fill={STONE} {...line} />
        <rect x="42" y="54" width="76" height="8" rx="2" fill={STONE_DARK} {...line} />
        <path d="M46 54C46 28 66 14 80 6C94 14 114 28 114 54Z" fill={STONE_DARK} {...line} />
        <path d="M80 6V0M64 40Q80 28 96 40" {...line} strokeWidth={1.8} />
        <BayonFace cx={80} cy={90} />
        <circle cx="80" cy="30" r="3" fill={ACCENT} />
    </Art>
);

export const TaProhm: Motif = ({ className }) => (
    <Art viewBox="0 0 170 160" className={className}>
        <rect x="14" y="76" width="142" height="64" fill={STONE} {...line} />
        <path d="M14 76H156M14 98H156M14 120H156" stroke={STONE_DARK} strokeWidth="1.6" />
        <path d="M66 140V104Q66 90 85 90Q104 90 104 104V140Z" fill="#4a4235" {...line} />
        <rect x="56" y="82" width="58" height="8" fill={STONE_DARK} {...line} />
        <circle cx="46" cy="30" r="22" fill="#5f9150" {...line} />
        <circle cx="86" cy="22" r="26" fill="#6f9f5e" {...line} />
        <circle cx="124" cy="32" r="22" fill="#5f9150" {...line} />
        <path d="M84 40C80 66 56 70 50 92C46 108 44 124 40 142" stroke="#8a7560" strokeWidth="11" strokeLinecap="round" />
        <path d="M90 40C96 64 118 72 122 94C124 112 126 126 130 142" stroke="#8a7560" strokeWidth="11" strokeLinecap="round" />
        <path d="M86 44C86 70 84 84 84 100" stroke="#8a7560" strokeWidth="8" strokeLinecap="round" />
        <path d="M84 40C80 66 56 70 50 92M90 40C96 64 118 72 122 94" stroke="#a8946f" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
        <path d="M20 142H152" {...line} />
    </Art>
);

/* ───────────── Phnom Penh ───────────── */

export const IndependenceMonument: Motif = ({ className }) => {
    const tiers = [60, 52, 44, 36, 28];
    return (
        <Art viewBox="0 0 110 192" className={className}>
            {[0, 1, 2].map(i => (
                <rect key={i} x={6 + i * 6} y={176 - i * 6} width={98 - i * 12} height="6" fill={i % 2 ? '#d9a785' : '#c98f6b'} {...line} strokeWidth={1.8} />
            ))}
            {tiers.map((w, i) => {
                const y = 158 - i * 24;
                return (
                    <g key={w}>
                        <rect x={55 - w / 2} y={y - 18} width={w} height="24" fill="#c98f6b" {...line} />
                        <rect x={55 - w / 2 - 3} y={y - 22} width={w + 6} height="6" rx="1.5" fill="#a96f4d" {...line} strokeWidth={1.8} />
                        <path d={`M${55 - w / 2 + 6} ${y - 10}H${55 + w / 2 - 6}`} stroke="#f1d3ba" strokeWidth="2" strokeLinecap="round" />
                        <circle cx={55 - w / 2 - 1} cy={y - 18} r="3" fill="#a96f4d" {...line} strokeWidth={1.6} />
                        <circle cx={55 + w / 2 + 1} cy={y - 18} r="3" fill="#a96f4d" {...line} strokeWidth={1.6} />
                    </g>
                );
            })}
            <path d="M41 40Q38 20 55 8Q72 20 69 40Z" fill="#c98f6b" {...line} />
            <path d="M55 8V1" {...line} />
            <circle cx="55" cy="26" r="3" fill={ACCENT} />
        </Art>
    );
};

export const RoyalPalace: Motif = ({ className }) => (
    <Art viewBox="0 0 200 152" className={className}>
        <rect x="26" y="108" width="148" height="30" fill="#f6efe0" {...line} />
        {[44, 72, 100, 128, 156].map(x => (
            <path key={x} d={`M${x - 6} 138V120Q${x} 112 ${x + 6} 120V138Z`} fill="#c7b58f" {...line} strokeWidth={1.6} />
        ))}
        <rect x="18" y="136" width="164" height="8" rx="2" fill="#d9ccb0" {...line} />
        <path d="M10 112Q38 108 58 90H142Q162 108 190 112L184 120H16Z" fill="#e8a93a" {...line} />
        <path d="M22 116Q46 112 64 96M178 116Q154 112 136 96" stroke="#c23b2e" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 92Q62 88 74 70H126Q138 88 156 92L152 98H48Z" fill="#f0b84a" {...line} />
        <rect x="86" y="34" width="28" height="36" fill="#f6efe0" {...line} />
        <path d="M82 36L100 28L118 36Z" fill="#e8a93a" {...line} />
        <path d="M88 28Q100 16 112 28Z" fill="#f0b84a" {...line} />
        <path d="M95 28L100 2L105 28Z" fill="#e6b84a" {...line} strokeWidth={1.8} />
        <circle cx="100" cy="50" r="5" fill={ACCENT} {...line} strokeWidth={1.6} />
    </Art>
);

export const WatPhnom: Motif = ({ className }) => (
    <Art viewBox="0 0 160 172" className={className}>
        <path d="M6 168C14 120 40 92 80 88C120 92 146 120 154 168Z" fill="#7fa668" {...line} />
        <path d="M66 168L72 96H88L94 168Z" fill="#e6dccb" {...line} />
        {[104, 116, 128, 140, 152].map(y => (
            <path key={y} d={`M${69 - (y - 100) * 0.05} ${y}H${91 + (y - 100) * 0.05}`} stroke={INK} strokeWidth="1.5" opacity="0.5" />
        ))}
        <rect x="44" y="64" width="72" height="26" fill="#f6efe0" {...line} />
        <path d="M36 66Q58 62 66 46H94Q102 62 124 66L120 72H40Z" fill="#d9473a" {...line} />
        <path d="M66 46Q80 38 94 46" fill="#e6b84a" {...line} />
        <path d="M73 46L80 8L87 46Z" fill="#e6b84a" {...line} />
        <path d="M76 30H84M77 38H83" stroke={INK} strokeWidth="1.4" />
        <rect x="70" y="72" width="20" height="18" rx="2" fill="#4a4235" {...line} strokeWidth={1.6} />
        <circle cx="26" cy="116" r="10" fill="#5f9150" {...line} />
        <circle cx="136" cy="120" r="10" fill="#5f9150" {...line} />
        <circle cx="80" cy="22" r="2.6" fill={ACCENT} />
    </Art>
);

export const TukTuk: Motif = ({ className }) => (
    <Art viewBox="0 0 150 112" className={className}>
        <path d="M66 28H140Q144 28 144 34V38H62V32Q62 28 66 28Z" fill={ACCENT} {...line} />
        <path d="M70 38V74M136 38V74" {...line} />
        <rect x="62" y="64" width="84" height="22" rx="4" fill="#f1e7d3" {...line} />
        <rect x="72" y="52" width="52" height="14" rx="4" fill="#c23b2e" {...line} />
        <path d="M62 86H146" {...line} />
        <path d="M30 86C28 72 34 62 44 60L62 64V86Z" fill="#2f5fa6" {...line} />
        <path d="M30 60L26 44M16 44H38" {...line} />
        <path d="M44 60L50 50H62" {...line} />
        <circle cx="30" cy="92" r="13" fill="#3c3c3c" {...line} />
        <circle cx="30" cy="92" r="4" fill="#d8d2bf" />
        <circle cx="116" cy="92" r="13" fill="#3c3c3c" {...line} />
        <circle cx="116" cy="92" r="4" fill="#d8d2bf" />
        <path d="M132 40H142" stroke="#ffe08a" strokeWidth="2.4" strokeLinecap="round" />
    </Art>
);

/* ───────────── Tboung Khmum · រឿងទុំទាវ ───────────── */

const SKIN = '#dfae7e';

/** Tum: the novice monk whose singing voice won Teav's heart. */
export const TumMonk: Motif = ({ className }) => (
    <Art viewBox="0 0 130 132" className={className}>
        <path d="M30 130C30 88 44 68 60 68C76 68 90 88 90 130Z" fill="#e59a1a" {...line} />
        <path d="M42 72C56 82 76 98 90 112V130H72C70 110 56 94 42 72Z" fill="#c97a0f" {...line} />
        <ellipse cx="39" cy="40" rx="5" ry="8" fill={SKIN} {...line} strokeWidth={1.8} />
        <ellipse cx="81" cy="40" rx="5" ry="8" fill={SKIN} {...line} strokeWidth={1.8} />
        <circle cx="60" cy="40" r="22" fill={SKIN} {...line} />
        <path d="M49 38Q53 34 57 38M63 38Q67 34 71 38" {...line} strokeWidth={2} />
        <ellipse cx="60" cy="50" rx="4" ry="3.4" fill="#8a3b2a" {...line} strokeWidth={1.6} />
        <circle cx="46" cy="47" r="4" fill={ACCENT} opacity="0.35" />
        <circle cx="74" cy="47" r="4" fill={ACCENT} opacity="0.35" />
        <path d="M60 98C50 98 48 86 54 80L60 74L66 80C72 86 70 98 60 98Z" fill={SKIN} {...line} />
        <path d="M60 76V96" {...line} strokeWidth={1.6} />
        <circle cx="104" cy="30" r="4.4" fill={ACCENT} {...line} strokeWidth={1.6} />
        <path d="M108 30V12Q118 14 118 24" {...line} stroke={ACCENT} strokeWidth={3} />
        <circle cx="94" cy="14" r="3.2" fill={ACCENT} {...line} strokeWidth={1.4} />
        <path d="M97 14V4" {...line} stroke={ACCENT} strokeWidth={2.4} />
    </Art>
);

/** Teav: holding a betel tray, the offering from the story. */
export const Teav: Motif = ({ className }) => (
    <Art viewBox="0 0 120 142" className={className}>
        <circle cx="60" cy="18" r="12" fill="#2b2220" {...line} />
        <path d="M38 44C38 24 48 14 60 14C72 14 82 24 82 44Z" fill="#2b2220" {...line} />
        <circle cx="60" cy="46" r="20" fill={SKIN} {...line} />
        <path d="M40 40C48 30 72 30 80 40C74 36 46 36 40 40Z" fill="#2b2220" />
        <path d="M50 46Q54 43 58 46M62 46Q66 43 70 46" {...line} strokeWidth={2} />
        <path d="M54 56Q60 61 66 56" {...line} strokeWidth={2} />
        <circle cx="46" cy="53" r="4" fill={ACCENT} opacity="0.4" />
        <circle cx="74" cy="53" r="4" fill={ACCENT} opacity="0.4" />
        <circle cx="76" cy="22" r="6" fill="#f3b6d3" {...line} strokeWidth={1.8} />
        <circle cx="76" cy="22" r="2" fill="#f2c94c" />
        <path d="M36 138C36 88 46 72 60 72C74 72 84 88 84 138Z" fill="#e9a3b8" {...line} />
        <path d="M44 74C58 88 72 104 84 114V138H70C68 112 56 94 44 74Z" fill="#2f8f8a" {...line} />
        <path d="M50 108H70" stroke="#e6b84a" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
        <ellipse cx="60" cy="122" rx="30" ry="7" fill="#e6b84a" {...line} />
        <Leaf x={44} y={118} a={-20} s={0.5} fill="#5f9a55" />
        <Leaf x={76} y={118} a={-160} s={0.5} fill="#7fb06a" />
        <circle cx="58" cy="116" r="4.5" fill="#c9a06a" {...line} strokeWidth={1.6} />
        <circle cx="66" cy="117" r="4" fill="#c9a06a" {...line} strokeWidth={1.6} />
    </Art>
);

/** Betel on a gold pedestal tray, next to a folded krama blanket (the gifts Teav offered). */
export const BetelTray: Motif = ({ className }) => (
    <Art viewBox="0 0 130 104" className={className}>
        <rect x="76" y="62" width="46" height="30" rx="3" fill="#fbf1dc" {...line} />
        {[0, 1, 2].map(r =>
            [0, 1, 2].map(c => (
                <rect key={`${r}${c}`} x={78 + c * 14.4} y={64 + r * 9.6} width="7.2" height="7.2" fill={(r + c) % 2 ? '#fbf1dc' : '#c23b2e'} />
            )),
        )}
        <rect x="76" y="62" width="46" height="30" rx="3" {...line} strokeWidth={1.8} />
        <path d="M18 44H74Q72 66 56 70V84H68V92H24V84H36V70Q20 66 18 44Z" fill="#e6b84a" {...line} />
        <path d="M24 50H68" stroke="#f6dc8a" strokeWidth="2.4" strokeLinecap="round" />
        <Leaf x={26} y={40} a={-28} s={0.8} fill="#5f9a55" />
        <Leaf x={48} y={42} a={-150} s={0.8} fill="#7fb06a" />
        <Leaf x={34} y={36} a={-90} s={0.7} fill="#8fc07a" />
        <circle cx="40" cy="38" r="5.5" fill="#c9a06a" {...line} strokeWidth={1.8} />
        <circle cx="52" cy="36" r="5" fill="#c9a06a" {...line} strokeWidth={1.8} />
        <circle cx="62" cy="38" r="3.4" fill={ACCENT} {...line} strokeWidth={1.4} />
    </Art>
);

/** Bamboo tubes, the bamboo rice containers Tum came to sell. */
export const BambooTubes: Motif = ({ className }) => (
    <Art viewBox="0 0 120 132" className={className}>
        {[26, 56, 86].map((x, i) => (
            <g key={x}>
                <rect x={x - 13} y={30 + i * 4} width="26" height={96 - i * 4} rx="5" fill="#d9b27a" {...line} />
                <path d={`M${x - 6} ${38 + i * 4}V122`} stroke="#f1d9a8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
                <rect x={x - 15} y={64 + i * 2} width="30" height="8" rx="4" fill="#b98a50" {...line} />
                <Leaf x={x} y={32 + i * 4} a={-118} s={0.8} fill="#6fa06a" />
                <Leaf x={x} y={32 + i * 4} a={-62} s={0.8} fill="#5f9150" />
            </g>
        ))}
        <path d="M8 96Q60 106 112 96" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        <path d="M8 96Q60 106 112 96" {...line} strokeWidth={1.2} opacity="0.5" />
    </Art>
);

/** Rubber tree being tapped: Tboung Khmum holds the big Chup rubber plantations. */
export const RubberTree: Motif = ({ className }) => (
    <Art viewBox="0 0 110 232" className={className}>
        <path d="M46 230C44 182 48 124 50 76H60C60 124 64 182 62 230Z" fill="#b9a58c" {...line} />
        <path d="M45 196L62 180M45 206L62 190" {...line} strokeWidth={2} />
        <path d="M52 192Q50 206 52 214" stroke="#fffdf7" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 196Q74 196 74 208Q74 218 60 218Z" fill={ACCENT} {...line} strokeWidth={1.8} />
        <circle cx="68" cy="206" r="3" fill="#fffdf7" />
        {[[34, 56, 26, '#5f9150'], [76, 52, 26, '#6f9f5e'], [55, 30, 26, '#7fb06a'], [52, 70, 20, '#5f9150']].map(([x, y, r, f]) => (
            <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r={r as number} fill={f as string} {...line} />
        ))}
        <Leaf x={55} y={30} a={-90} s={0.7} fill="#a8c892" />
        <Leaf x={30} y={52} a={-150} s={0.7} fill="#8fc07a" />
        <Leaf x={80} y={50} a={-30} s={0.7} fill="#8fc07a" />
        <path d="M30 230H80" {...line} />
    </Art>
);

/** A bee carrying a gem: the meaning of ត្បូងឃ្មុំ. */
export const BeeGem: Motif = ({ className }) => (
    <Art viewBox="0 0 100 100" className={className}>
        <ellipse cx="34" cy="26" rx="14" ry="9" transform="rotate(-28 34 26)" fill="#e8f6ff" opacity="0.9" {...line} strokeWidth={1.8} />
        <ellipse cx="66" cy="26" rx="14" ry="9" transform="rotate(28 66 26)" fill="#e8f6ff" opacity="0.9" {...line} strokeWidth={1.8} />
        <path d="M45 32L40 18M55 32L60 18" {...line} strokeWidth={1.8} />
        <circle cx="40" cy="17" r="2.4" fill={INK} />
        <circle cx="60" cy="17" r="2.4" fill={INK} />
        <path d="M50 30L72 42V68L50 82L28 68V42Z" fill="#6fcfc0" {...line} />
        <rect x="28.6" y="55" width="42.8" height="6" fill="#f4ce4a" />
        <rect x="28.6" y="64" width="42.8" height="5" fill="#f4ce4a" />
        <path d="M28 42L50 52L72 42M50 52V82" {...line} strokeWidth={1.6} opacity="0.55" />
        <path d="M50 30L72 42V68L50 82L28 68V42Z" {...line} />
        <circle cx="43" cy="44" r="2.2" fill={INK} />
        <circle cx="57" cy="44" r="2.2" fill={INK} />
        <path d="M46 49Q50 52 54 49" {...line} strokeWidth={1.6} />
        <path d="M46 83L50 94L54 83Z" fill={INK} />
        <path d="M34 48L38 46" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </Art>
);

/* ───────────── World tour ───────────── */

export const Globe: Motif = ({ className }) => (
    <Art viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="38" fill="#9ecbe0" {...line} />
        <path d="M30 28C42 24 50 34 44 44C38 52 26 48 24 40C24 34 26 30 30 28ZM58 52C70 48 80 56 76 68C72 78 60 76 56 68C54 62 54 56 58 52Z" fill="#8db36e" {...line} strokeWidth={1.8} />
        <ellipse cx="50" cy="50" rx="16" ry="38" {...line} strokeWidth={1.4} opacity="0.5" />
        <path d="M14 50H86" {...line} strokeWidth={1.4} opacity="0.5" />
        <path d="M70 18L78 10M80 16L86 14" stroke={ACCENT} strokeWidth="3.4" strokeLinecap="round" />
    </Art>
);
