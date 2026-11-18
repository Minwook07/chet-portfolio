import type { CultureId } from '../../styles/cultures';
import {
    Angkor, Bamboo, Bayon, Bonsai, Croissant, Cypress, Eiffel, Globe, HanokMoon, IndependenceMonument, Lantern, Lavender,
    Lemons, Lotus, Matcha, MilkTea, Moka, Mugunghwa, NeonSign, Panda, Pine, Sprig, Steamer,
    SugarPalm, TaProhm, Tram, TukTuk, RoyalPalace, WatPhnom, BambooTubes, BeeGem, BetelTray, RubberTree, Teav, TumMonk, type Motif,
} from './motifs';

/**
 * Where a motif sits around the hero photo.
 * back: behind the arch · left/right: tall plants peeking out from behind
 * topRight: hanging piece · bottomLeft/bottomRight: die-cut stickers on the corners
 */
export type SceneSlot = 'back' | 'left' | 'right' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface SceneItem {
    slot: SceneSlot;
    Motif: Motif;
    /** Mirror horizontally (applied to the svg so animations are not affected) */
    flip?: boolean;
    /** Extra classes on the positioned box, e.g. a shorter height */
    className?: string;
}

export interface CultureArt {
    scene: SceneItem[];
    /** The culture's three signature motifs, reused as route stops and board decor */
    motifs: Motif[];
    /** Small icon shown in the picker, loader and footer */
    icon: Motif;
    /** Illustration printed on the contact postcard stamp */
    stamp: Motif;
}

export const cultureArt: Record<CultureId, CultureArt> = {
    cozy: {
        scene: [
            { slot: 'left', Motif: Sprig },
            { slot: 'right', Motif: Sprig, flip: true, className: 'h-[78%]' },
            { slot: 'bottomLeft', Motif: Matcha },
            { slot: 'bottomRight', Motif: Bonsai },
        ],
        motifs: [Bonsai, Matcha, Sprig],
        icon: Matcha,
        stamp: Bonsai,
    },
    china: {
        scene: [
            { slot: 'left', Motif: Bamboo },
            { slot: 'right', Motif: Bamboo, flip: true, className: 'h-[80%]' },
            { slot: 'topRight', Motif: Lantern },
            { slot: 'bottomLeft', Motif: Panda },
        ],
        motifs: [Bamboo, Lantern, Panda],
        icon: Bamboo,
        stamp: Panda,
    },
    hongkong: {
        scene: [
            { slot: 'left', Motif: NeonSign, className: 'h-[84%]' },
            { slot: 'topRight', Motif: Steamer },
            { slot: 'bottomLeft', Motif: MilkTea },
            { slot: 'bottomRight', Motif: Tram, className: 'w-32 sm:w-44' },
        ],
        motifs: [Tram, MilkTea, Steamer],
        icon: MilkTea,
        stamp: Tram,
    },
    korea: {
        scene: [
            { slot: 'back', Motif: HanokMoon },
            { slot: 'left', Motif: Pine },
            { slot: 'bottomLeft', Motif: Mugunghwa },
        ],
        motifs: [HanokMoon, Pine, Mugunghwa],
        icon: Mugunghwa,
        stamp: HanokMoon,
    },
    italy: {
        scene: [
            { slot: 'left', Motif: Cypress },
            { slot: 'right', Motif: Cypress, flip: true, className: 'h-[84%]' },
            { slot: 'bottomLeft', Motif: Moka },
            { slot: 'bottomRight', Motif: Lemons },
        ],
        motifs: [Cypress, Lemons, Moka],
        icon: Lemons,
        stamp: Moka,
    },
    france: {
        scene: [
            { slot: 'left', Motif: Eiffel },
            { slot: 'right', Motif: Lavender, className: 'h-[70%]' },
            { slot: 'bottomLeft', Motif: Croissant },
        ],
        motifs: [Eiffel, Lavender, Croissant],
        icon: Croissant,
        stamp: Eiffel,
    },
    khmer: {
        scene: [
            { slot: 'left', Motif: SugarPalm },
            { slot: 'right', Motif: SugarPalm, flip: true, className: 'h-[78%]' },
            { slot: 'topRight', Motif: Bayon, className: '-top-12! w-24! sm:w-32!' },
            { slot: 'bottomLeft', Motif: TaProhm, className: 'w-28 sm:w-36' },
            { slot: 'bottomRight', Motif: Angkor, className: 'w-32 sm:w-44' },
        ],
        motifs: [Angkor, Bayon, TaProhm, Lotus, SugarPalm],
        icon: Angkor,
        stamp: Angkor,
    },
    phnompenh: {
        scene: [
            { slot: 'back', Motif: RoyalPalace },
            { slot: 'left', Motif: IndependenceMonument },
            { slot: 'bottomLeft', Motif: TukTuk, className: 'w-32 sm:w-40' },
            { slot: 'bottomRight', Motif: WatPhnom },
        ],
        motifs: [IndependenceMonument, RoyalPalace, WatPhnom, TukTuk],
        icon: IndependenceMonument,
        stamp: RoyalPalace,
    },
    tboungkhmum: {
        scene: [
            { slot: 'left', Motif: RubberTree },
            { slot: 'right', Motif: RubberTree, flip: true, className: 'h-[80%]' },
            { slot: 'topRight', Motif: BeeGem },
            { slot: 'bottomLeft', Motif: TumMonk },
            { slot: 'bottomRight', Motif: Teav },
        ],
        motifs: [TumMonk, BetelTray, Teav, BambooTubes, BeeGem, RubberTree],
        icon: BeeGem,
        stamp: Teav,
    },
    world: {
        scene: [
            { slot: 'left', Motif: Bamboo },
            { slot: 'right', Motif: SugarPalm, className: 'h-[80%]' },
            { slot: 'topRight', Motif: Lantern },
            { slot: 'bottomLeft', Motif: Croissant },
            { slot: 'bottomRight', Motif: Tram, className: 'w-32 sm:w-44' },
        ],
        motifs: [Bamboo, Tram, HanokMoon, Cypress, Eiffel, Lotus, Globe],
        icon: Globe,
        stamp: Globe,
    },
};
