/** Picks a handwriting style that really exists in the greeting's script. */
export function scriptClass(lang: string): string {
    if (lang === 'zh-CN') return 'font-script-zh text-3xl';
    if (lang === 'ko') return 'font-script-ko text-3xl';
    if (lang === 'zh-HK') return 'font-black text-2xl';
    return 'font-hand text-3xl';
}
