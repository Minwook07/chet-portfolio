'use client';

import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
    TbBrandGithub, 
    TbBrandInstagram, 
    TbBrandLinkedin, 
    TbBrandTelegram, 
    TbMapPin, 
    TbSend
} from 'react-icons/tb';
import { socialLinks } from '../../config/socialLinks';
import { useCulture } from '../../contexts/CultureContext';
import { cultureArt } from '../culture/registry';
import CultureStrip from '../culture/CultureStrip';
import SectionHeading from '../SectionHeading';

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { culture } = useCulture();
    const Stamp = cultureArt[culture.id].stamp;

    useEffect(() => {
        setMounted(true);
    }, []);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSubmitting(true);

        emailjs
            .sendForm('service_fx2pjmn', 'template_w35rh1l', form.current, 'X9mPXd-vubu0WW5U-')
            .then(
                () => {
                    toast.success('Message sent successfully! 🚀', { position: 'top-right', autoClose: 5000 });
                    form.current?.reset();
                    setIsSubmitting(false);
                },
                () => {
                    toast.error('Something went wrong. Please try again! 😅', { position: 'top-right', autoClose: 5000 });
                    setIsSubmitting(false);
                }
            );
    };

    const socials = [
        { name: 'GitHub', icon: TbBrandGithub, url: socialLinks.github },
        { name: 'LinkedIn', icon: TbBrandLinkedin, url: socialLinks.linkedin },
        { name: 'Telegram', icon: TbBrandTelegram, url: socialLinks.telegram },
        { name: 'Instagram', icon: TbBrandInstagram, url: socialLinks.instagram },
    ];

    return (
        <section id="contact" className="relative overflow-hidden bg-paper py-24 text-ink">
            <ToastContainer />
            <div className="accent-blob-a pointer-events-none absolute -left-24 top-1/3 h-96 w-96" />
            <div className="accent-blob-b pointer-events-none absolute -right-10 bottom-10 h-[26rem] w-[26rem]" />

            <div className="container relative z-10 mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <SectionHeading
                        title={mounted ? (t('contact.title') || 'Say Hello') : 'Say Hello'}
                        note="Let's build something cool together!"
                    />
                </div>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    {/* Left: details + socials */}
                    <div className="space-y-8 lg:col-span-5">
                        <div className="tray space-y-5 rounded-[1.75rem] p-8">
                            <h3 className="font-display text-2xl font-semibold">
                                {mounted ? (t('contact.sub_title') || "Let's Talk") : "Let's Talk"}
                            </h3>
                            <p className="text-sm leading-relaxed text-ink-soft">{mounted ? t('contact.text_info') : ''}</p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-2"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    <TbMapPin size={22} />
                                </div>
                                <a href={socialLinks.maps} target="_blank" rel="noreferrer" className="text-sm font-bold text-ink hover:opacity-80">
                                    {mounted ? t('contact.address_town') : 'Phnom Penh'}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="font-hand block pl-1 text-xl" style={{ color: 'var(--bg-color-primary)' }}>
                                find me on social media:
                            </span>
                            <div className="grid grid-cols-2 gap-3">
                                {socials.map((soc) => {
                                    const Icon = soc.icon;
                                    return (
                                        <motion.a
                                            key={soc.name}
                                            href={soc.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            whileHover={{ scale: 1.03, rotate: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="tray flex items-center gap-3 rounded-2xl p-3.5 text-sm font-bold text-ink"
                                        >
                                            <span style={{ color: 'var(--bg-color-primary)' }}><Icon size={20} /></span>
                                            <span>{soc.name}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: the postcard */}
                    <div className="lg:col-span-7">
                        <form ref={form} onSubmit={sendEmail} className="tray relative space-y-6 rounded-md p-8 sm:p-10">
                            <div className="tape absolute -top-3 left-10 h-6 w-28 -rotate-2" />

                            {/* Stamp + postmark */}
                            <div className="flex items-start justify-end gap-4">
                                <div
                                    key={culture.id}
                                    className="grow-in flex h-20 w-20 -rotate-6 items-center justify-center rounded-full border-2 border-dashed text-center font-hand text-[11px] font-bold leading-tight text-ink-soft"
                                    style={{ borderColor: 'var(--stitch)' }}
                                    aria-hidden="true"
                                >
                                    <span lang={culture.lang} className="px-1">{culture.postmark}</span>
                                </div>
                                <div
                                    className="stamp grow-in flex h-24 w-20 rotate-3 items-center justify-center p-1.5"
                                    style={{ ['--stamp-bg' as string]: 'color-mix(in srgb, var(--bg-color-primary) 22%, var(--paper-2))' }}
                                    aria-hidden="true"
                                >
                                    <Stamp className="h-full w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="c-name" className="font-hand text-xl text-ink">{mounted ? t('contact.form_info.name') : 'Name'}</label>
                                    <input id="c-name" type="text" name="user_name" required className="field"
                                        placeholder={mounted ? t('contact.form_info.place_holder.place_holder_name') : 'Your Name'} />
                                </div>
                                <div>
                                    <label htmlFor="c-email" className="font-hand text-xl text-ink">{mounted ? t('contact.form_info.email') : 'Email'}</label>
                                    <input id="c-email" type="email" name="user_email" required className="field" placeholder="your.email@example.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="c-subject" className="font-hand text-xl text-ink">{mounted ? t('contact.form_info.subject') : 'Subject'}</label>
                                <input id="c-subject" type="text" name="subject" required className="field"
                                    placeholder={mounted ? t('contact.form_info.subject') : 'Subject'} />
                            </div>

                            <div>
                                <label htmlFor="c-message" className="font-hand text-xl text-ink">{mounted ? t('contact.form_info.message') : 'Message'}</label>
                                <textarea id="c-message" name="message" required className="field h-36 resize-none"
                                    placeholder={mounted ? t('contact.form_info.place_holder.place_holder_message') : 'Your message...'} />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ backgroundColor: 'var(--bg-color-primary)' }}
                                className="on-accent flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-sm font-bold shadow-lg transition-all hover:opacity-90 disabled:opacity-60"
                            >
                                <span>{isSubmitting ? 'Sending...' : (mounted ? t('contact.form_info.btn_submit') : 'Send Message')}</span>
                                <TbSend size={18} />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
            <CultureStrip className="absolute bottom-0 left-0" />
        </section>
    );
}
