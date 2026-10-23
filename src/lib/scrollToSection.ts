import type { MouseEvent } from 'react';

const DURATION_MS = 700;

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const isHomepage = window.location.pathname === '/';

    if (!isHomepage) {
        return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    event.preventDefault();
    history.replaceState(null, '', window.location.pathname);

    const navHeight =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0;
    const startY = window.scrollY;
    const targetY = element.getBoundingClientRect().top + startY - navHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        return;
    }

    const startTime = performance.now();

    function step(now: number) {
        const progress = Math.min((now - startTime) / DURATION_MS, 1);
        const y = startY + (targetY - startY) * easeInOutCubic(progress);
        window.scrollTo({ top: y, behavior: 'instant' });
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}