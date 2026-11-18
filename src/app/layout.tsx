import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from './providers';
import Navigation from '../components/section/Navigation';
import ColorThemePicker from '../components/ColorThemePicker';
import Footer from '../components/Footer';
import { Caveat, Fraunces, Jost, Kantumruy_Pro } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
    title: 'Chet Okawasakii',
    description:
        'Frontend developer specializing in fast, accessible web apps. Explore projects built with React, and modern performance best practices.',
    icons: { icon: '/images/skills/git.svg' },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
});

// Applies the saved theme before first paint to avoid a light-mode flash.
const themeInitScript = `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['SOFT', 'WONK', 'opsz'], display: 'swap' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const kantumruy = Kantumruy_Pro({ subsets: ['khmer', 'latin'], variable: '--font-kantumruy', display: 'swap' });

// Applies the saved culture before first paint so paper colors never flash.
const cultureInitScript = `try{var c=localStorage.getItem('culture');if(c){document.documentElement.dataset.culture=c}}catch(e){}`;

// Greeting-only subsets of two script fonts (a handful of glyphs, not the full CJK/Hangul fonts).
const scriptFontZh = 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&text=%E4%BD%A0%E5%A5%BD&display=swap';
const scriptFontKo = 'https://fonts.googleapis.com/css2?family=Gaegu:wght@700&text=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94&display=swap';

// Script to set language font before first paint
const langInitScript = `try{var l=localStorage.getItem('app_lang');if(l==='km'){document.documentElement.classList.add('font-km')}else{document.documentElement.classList.add('font-en')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${fraunces.variable} ${jost.variable} ${kantumruy.variable} ${caveat.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
                <script dangerouslySetInnerHTML={{ __html: cultureInitScript }} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link rel="stylesheet" href={scriptFontZh} />
                <link rel="stylesheet" href={scriptFontKo} />
            </head>
            <body>
                <SpeedInsights debug={false} />
                <Analytics />
                <Providers>
                    <Navigation />
                    <ColorThemePicker />
                    <main id="main-content">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
