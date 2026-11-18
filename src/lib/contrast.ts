/** Picks a readable text color (dark ink or white) for a given background hex. */
function channel(value: number): number {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function readableOn(background: string): string {
    // Contrast against white vs. against near-black; take the better one.
    const l = luminance(background);
    const againstWhite = 1.05 / (l + 0.05);
    const againstInk = (l + 0.05) / 0.06;
    return againstWhite >= againstInk ? '#ffffff' : '#1c1917';
}
