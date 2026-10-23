import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from './providers';
import Navigation from '../components/section/Navigation';
import ColorThemePicker from '../components/ColorThemePicker';
import Footer from '../components/Footer';
import { Jost, Kantumruy_Pro } from 'next/font/google';
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

// Applies the saved theme before first paint to avoid a light-mode flash.
const themeInitScript = `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

const jost = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });
const kantumruy = Kantumruy_Pro({ subsets: ['khmer', 'latin'], variable: '--font-kantumruy', display: 'swap' });

// Script to set language font before first paint
const langInitScript = `try{var l=localStorage.getItem('app_lang');if(l==='km'){document.documentElement.classList.add('font-km')}else{document.documentElement.classList.add('font-en')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${jost.variable} ${kantumruy.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
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
