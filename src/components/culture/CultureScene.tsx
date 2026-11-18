'use client';

import { useCulture } from '../../contexts/CultureContext';
import { cultureArt, type SceneSlot } from './registry';

const slotClass: Record<SceneSlot, string> = {
    back: 'absolute left-1/2 -top-14 z-0 w-[130%] -translate-x-1/2',
    left: 'absolute -left-10 bottom-[-1.5rem] z-0 h-[104%] sm:-left-20',
    right: 'absolute -right-8 bottom-[-0.5rem] z-0 h-[88%] sm:-right-16',
    topRight: 'absolute -top-8 right-2 z-20 w-14 sm:w-[4.5rem]',
    bottomLeft: 'absolute -bottom-5 -left-5 z-20 w-24 -rotate-6 sm:-left-8 sm:w-28',
    bottomRight: 'absolute -bottom-4 -right-4 z-20 w-24 rotate-6 sm:-right-8 sm:w-28',
};

const tallSlots: SceneSlot[] = ['left', 'right'];
const stickerSlots: SceneSlot[] = ['bottomLeft', 'bottomRight'];

/**
 * The illustrated frame around the hero photo. Re-mounts on culture change,
 * so every motif "grows in" once, which is the only motion tied to the choice.
 */
export default function CultureScene() {
    const { culture } = useCulture();
    const { scene } = cultureArt[culture.id];

    return (
        <div key={culture.id} className="pointer-events-none absolute inset-0" aria-hidden="true">
            {scene.map((item, i) => {
                const { Motif } = item;
                const isTall = tallSlots.includes(item.slot);
                const isSticker = stickerSlots.includes(item.slot);
                const flip = item.flip ? '-scale-x-100' : '';

                return (
                    <div key={`${item.slot}-${i}`} className={`${slotClass[item.slot]} ${item.className ?? ''}`}>
                        <div className="grow-in h-full" style={{ animationDelay: `${i * 90}ms` }}>
                            {isSticker ? (
                                <div className="sticker rounded-[1.6rem] bg-card p-2">
                                    <Motif className={`h-auto w-full ${flip}`} />
                                </div>
                            ) : (
                                <div className={`h-full ${isTall ? 'sway' : ''}`}>
                                    <Motif className={`h-full w-auto ${flip}`} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
