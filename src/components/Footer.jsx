import { useTranslation } from 'react-i18next';
import { TbBrandGithub, TbBrandLinkedin, TbBrandTelegram, TbArrowUpRight, TbBrandInstagram } from 'react-icons/tb';
import { socialLinks } from '../config/socialLinks';

export default function Footer() {
    const { t } = useTranslation();

    const socials = [
        { icon: <TbBrandGithub size={17} />, href: socialLinks.github, label: 'GitHub' },
        { icon: <TbBrandLinkedin size={17} />, href: socialLinks.linkedin, label: 'LinkedIn' },
        { icon: <TbBrandTelegram size={17} />, href: socialLinks.telegram, label: 'Telegram' },
        { icon: <TbBrandInstagram size={17} />, href: socialLinks.instagram, label: 'Instagram' },
    ];

    const navLinks = [
        { label: t('menu.home'), href: '#home' },
        { label: t('menu.skills'), href: '#skills' },
        { label: t('menu.projects'), href: '#projects' },
        { label: t('menu.contact'), href: '#contact' },
    ];

    return (
        <footer
            className="relative bg-cover bg-no-repeat bg-center border-t border-black/8 dark:border-white/8"
            style={{ backgroundImage: "url('/images/hero/chinese-great-wall.jpg')" }}
        >
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[0.5px]" />

            <div className="container mx-auto px-6 py-10 relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                    {/* Brand */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-purple-600 dark:to-purple-700 text-gray-900 dark:text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                osi
                            </div>
                            <span className="text-base font-bold text-[#1a1a1a] dark:text-[#f5f5f0] tracking-tight">
                                Okawasakii
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {t('footer.isAvailable')}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs leading-relaxed">
                            {t('footer.short_desc')}
                        </p>
                    </div>

                    {/* Nav links */}
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
                        {navLinks.map(l => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="inline-flex text-sm items-center gap-0.5 font-medium text-gray-600 dark:text-gray-300 hover:text-[#1a1a1a] dark:hover:text-[#f5f5f0] transition-colors duration-200 group no-underline"
                                >
                                    {l.label}
                                    <TbArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Social icons */}
                    <div className="flex gap-2">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 dark:hover:bg-purple-700 dark:hover:border-purple-700 transition-all duration-200 hover:-translate-y-0.5 no-underline"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        © 2025–{new Date().getFullYear()}{' '}
                        <span className="font-semibold text-gray-600 dark:text-gray-300 uppercase">Okawasakii</span>.
                        {' '}{t('footer.copyright')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        {t('footer.credit.text')} <span className="text-red-400">{t('footer.credit.symbol')}</span> {t('footer.credit.location')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
