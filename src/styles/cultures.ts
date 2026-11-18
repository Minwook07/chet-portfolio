/**
 * Culture registry — data only.
 * To add a country: add an id here, give it paper tokens in globals.css
 * (`[data-culture="<id>"]`), and register its art in components/culture/registry.tsx.
 * Accent colors are NOT defined here; they always come from the color picker (styles/colors.ts + ColorThemeContext).
 */
export type CultureId =
    | 'khmer'
    | 'phnompenh'
    | 'tboungkhmum'
    | 'china'
    | 'hongkong'
    | 'korea'
    | 'italy'
    | 'france'
    | 'world'
    | 'cozy';

export interface Culture {
    id: CultureId;
    /** English label shown in the picker */
    name: string;
    /** Name written in the local script */
    native: string;
    /** "Hello" in the local language, shown as a handwritten tag */
    greeting: string;
    /** BCP-47 tag so screen readers and fonts pick the right script */
    lang: string;
    /** What is in the cup today (the "currently sipping" note) */
    sip: string;
    /** Postmark text on the contact postcard */
    postmark: string;
    /** One short line describing the motifs, used as the picker tooltip */
    motifs: string;
}

export const cultures: Culture[] = [
    {
        id: 'khmer',
        name: 'Cambodia',
        native: 'កម្ពុជា',
        greeting: 'សួស្តី',
        lang: 'km',
        sip: 'iced coffee កាហ្វេទឹកកក',
        postmark: 'SIEM REAP សៀមរាប',
        motifs: 'Angkor Wat, Bayon faces, Ta Prohm roots and sugar palms',
    },
    {
        id: 'phnompenh',
        name: 'Phnom Penh',
        native: 'ភ្នំពេញ',
        greeting: 'សួស្តី',
        lang: 'km',
        sip: 'sugarcane juice ទឹកអំពៅ',
        postmark: 'PHNOM PENH ភ្នំពេញ',
        motifs: 'Royal Palace, Independence Monument, Wat Phnom and a tuk-tuk',
    },
    {
        id: 'tboungkhmum',
        name: 'Tboung Khmum',
        native: 'ត្បូងឃ្មុំ',
        greeting: 'ជម្រាបសួរ',
        lang: 'km',
        sip: 'fresh coconut water ទឹកដូង',
        postmark: 'TBOUNG KHMUM ត្បូងឃ្មុំ',
        motifs: 'Tum and Teav, betel, bamboo, rubber trees and the bee gem',
    },
    {
        id: 'china',
        name: 'China',
        native: '中国',
        greeting: '你好',
        lang: 'zh-CN',
        sip: 'jasmine tea 茉莉花茶',
        postmark: 'CHENGDU 成都',
        motifs: 'Bamboo grove, red lantern and a peeking panda',
    },
    {
        id: 'hongkong',
        name: 'Hong Kong',
        native: '香港',
        greeting: '哈囉',
        lang: 'zh-HK',
        sip: 'milk tea 港式奶茶',
        postmark: 'HONG KONG 香港',
        motifs: 'Ding ding tram, milk tea and a dim sum steamer',
    },
    {
        id: 'korea',
        name: 'Korea',
        native: '한국',
        greeting: '안녕하세요',
        lang: 'ko',
        sip: 'banana milk 바나나우유',
        postmark: 'SEOUL 서울',
        motifs: 'Hanok roof under the moon, pine tree and mugunghwa',
    },
    {
        id: 'italy',
        name: 'Italy',
        native: 'Italia',
        greeting: 'Ciao',
        lang: 'it',
        sip: 'a tiny espresso',
        postmark: 'ROMA',
        motifs: 'Cypress trees, lemons and a moka pot',
    },
    {
        id: 'france',
        name: 'France',
        native: 'France',
        greeting: 'Bonjour',
        lang: 'fr',
        sip: 'café au lait',
        postmark: 'PARIS',
        motifs: 'Eiffel Tower, lavender and a croissant',
    },
    {
        id: 'world',
        name: 'World Tour',
        native: 'all of them',
        greeting: 'ciao · 你好 · សួស្តី',
        lang: 'en',
        sip: 'a cup from everywhere',
        postmark: 'AIR MAIL',
        motifs: 'One motif from every culture, mixed together',
    },
    {
        id: 'cozy',
        name: 'Cozy Desk',
        native: 'matcha morning',
        greeting: 'hello, friend',
        lang: 'en',
        sip: 'a matcha latte',
        postmark: 'FROM MY DESK',
        motifs: 'Bonsai, matcha and leafy sprigs',
    },
];

export const DEFAULT_CULTURE_ID: CultureId = 'cozy';

export function findCulture(id: string): Culture {
    return cultures.find(c => c.id === id) ?? cultures[0];
}