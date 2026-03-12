import { useTranslation } from 'react-i18next';
import { TbBrandGithub, TbBrandLinkedin, TbBrandTelegram, TbArrowUpRight, TbBrandInstagram } from 'react-icons/tb';

const socials = [
    { icon: <TbBrandGithub size={17} />, href: 'https://github.com/Minwook07', label: 'GitHub' },
    { icon: <TbBrandLinkedin size={17} />, href: 'https://www.linkedin.com/in/mith-chet-ab56b5295/', label: 'LinkedIn' },
    { icon: <TbBrandTelegram size={17} />, href: 'https://t.me/min7wook_lee', label: 'Telegram' },
    { icon: <TbBrandInstagram size={17} />, href: '#', label: 'Instagram' },
];

export default function Footer() {
    const { t } = useTranslation();
    const navLinks = [
        { label: t('menu.home'), href: '#home' },
        { label: t('menu.skills'), href: '#skills' },
        { label: t('menu.projects'), href: '#projects' },
        { label: t('menu.contact'), href: '#contact' },
    ];
    return (
        <footer className="bg-[#f0ede8] dark:bg-[#0f0f0f] border-t border-black/8 dark:border-white/8">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-purple-600 dark:to-purple-700 text-gray-900 dark:text-white  flex items-center justify-center font-bold text-xs flex-shrink-0">
                                osi
                            </div>
                            <span className="text-base font-bold text-[#1a1a1a] dark:text-[#f5f5f0] tracking-tight">
                                Okawasaki
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {t('footer.isAvailable')}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-600 max-w-xs leading-relaxed">
                            {t('footer.short_desc')}
                        </p>
                    </div>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
                        {navLinks.map(l => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className="inline-flex text-sm items-center gap-0.5 font-medium text-gray-500 dark:text-gray-500 hover:text-[#1a1a1a] dark:hover:text-[#f5f5f0] transition-colors duration-200 group no-underline"
                                >
                                    {l.label}
                                    <TbArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-2">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 dark:hover:bg-purple-700 dark:hover:border-purple-700 transition-all duration-200 hover:-translate-y-0.5 no-underline"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-sm text-gray-400 dark:text-gray-600">
                        © 2025–{new Date().getFullYear()}{' '}
                        <span className="font-semibold text-gray-500 dark:text-gray-500 uppercase">Okawasaki</span>.
                        {' '}{t('footer.copyright')}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600 flex items-center gap-1">
                        {t('footer.credit.text')} <span className="text-red-400">{t('footer.credit.symbol')}</span> {t('footer.credit.location')}
                    </p>
                </div>
            </div>
        </footer>
    );
}