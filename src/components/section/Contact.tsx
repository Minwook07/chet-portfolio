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

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

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
        { name: 'GitHub', icon: TbBrandGithub, url: socialLinks.github, color: 'bg-gray-900 text-white dark:bg-gray-800' },
        { name: 'LinkedIn', icon: TbBrandLinkedin, url: socialLinks.linkedin, color: 'bg-[#0A66C2] text-white' },
        { name: 'Telegram', icon: TbBrandTelegram, url: socialLinks.telegram, color: 'bg-[#0088cc] text-white' },
        { name: 'Instagram', icon: TbBrandInstagram, url: socialLinks.instagram, color: 'bg-[#E1306C] text-white' },
    ];

    return (
        <section id="contact" className="py-24 bg-[#FFF8F5] dark:bg-gray-950 relative overflow-hidden text-gray-900 dark:text-gray-100">
            <ToastContainer />

            {/* Decorative background blur elements */}
            <div className="absolute top-1/2 -left-20 w-80 h-80 bg-orange-200/30 dark:bg-orange-950/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-100/40 dark:bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* <span className="inline-block px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold shadow-xs mb-3">
                        Get in touch
                    </span> */}

                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] dark:text-white">
                        {mounted ? (t('contact.title') || "Say Hello") : "Say Hello"}{' '}
                        <span 
                            className="relative inline-block"
                            style={{ color: 'var(--bg-color-primary)' }}
                        >
                            👋
                            <svg 
                                className="absolute -bottom-2 left-0 w-full h-3" 
                                style={{ color: 'var(--bg-color-primary)' }}
                                viewBox="0 0 100 20" 
                                preserveAspectRatio="none"
                            >
                                <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p 
                        className="text-xl mt-3 italic font-medium"
                        style={{ 
                            fontFamily: "'Caveat', cursive, sans-serif",
                            color: 'var(--bg-color-primary)'
                        }}
                    >
                        Let's build something cool together! ✉️
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Contact Details & Social Stickers */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Information Card */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                                    {mounted ? (t('contact.sub_title') || "Let's Talk") : "Let's Talk"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                    {mounted ? t('contact.text_info') : ''}
                                </p>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-3 pt-2">
                                <div 
                                    className="w-10 h-10 rounded-2xl bg-[#FFF3EE] dark:bg-gray-800 flex items-center justify-center shrink-0"
                                    style={{ color: 'var(--bg-color-primary)' }}
                                >
                                    <TbMapPin size={22} />
                                </div>
                                <a
                                    href={socialLinks.maps}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-700 dark:text-gray-300 font-bold transition-colors text-sm hover:opacity-80"
                                >
                                    {mounted ? t('contact.address_town') : 'Phnom Penh'}
                                </a>
                            </div>
                        </div>

                        {/* Social Media Sticker Buttons */}
                        <div className="space-y-3">
                            <span 
                                className="text-lg italic block pl-1"
                                style={{ 
                                    fontFamily: "'Caveat', cursive, sans-serif",
                                    color: 'var(--bg-color-primary)'
                                }}
                            >
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
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`flex items-center gap-3 p-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all ${soc.color}`}
                                        >
                                            <Icon size={20} />
                                            <span>{soc.name}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                        {mounted ? t('contact.form_info.name') : 'Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        placeholder={mounted ? t('contact.form_info.place_holder.place_holder_name') : 'Your Name'}
                                        className="w-full p-4 text-sm text-gray-900 dark:text-white bg-[#FFF8F5] dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                        {mounted ? t('contact.form_info.email') : 'Email'}
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        placeholder="your.email@example.com"
                                        className="w-full p-4 text-sm text-gray-900 dark:text-white bg-[#FFF8F5] dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    {mounted ? t('contact.form_info.subject') : 'Subject'}
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder={mounted ? t('contact.form_info.subject') : 'Subject'}
                                    className="w-full p-4 text-sm text-gray-900 dark:text-white bg-[#FFF8F5] dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">
                                    {mounted ? t('contact.form_info.message') : 'Message'}
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    placeholder={mounted ? t('contact.form_info.place_holder.place_holder_message') : 'Your message...'}
                                    className="w-full p-4 text-sm text-gray-900 dark:text-white bg-[#FFF8F5] dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none transition-all h-36 resize-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ backgroundColor: 'var(--bg-color-primary)' }}
                                className="w-full py-4 text-white rounded-full font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:opacity-90"
                            >
                                <span>{isSubmitting ? 'Sending...' : (mounted ? t('contact.form_info.btn_submit') : 'Send Message')}</span>
                                <TbSend size={18} />
                            </motion.button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}