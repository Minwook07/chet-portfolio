import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandTelegram, TbMapPin, TbMessageQuestion } from 'react-icons/tb';

export default function Contact() {
    const form = useRef();
    const { t } = useTranslation();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_sqho7re',
                'template_w35rh1l',
                form.current,
                'X9mPXd-vubu0WW5U-'
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success('Message sent successfully!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                    toast.error('Something went wrong!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            );
    };

    return (
        <section id="contact" className="py-10 lg:py-24">
            <style>{`
                input::placeholder,
                textarea::placeholder {
                    color: #6b7280 !important;
                    opacity: 1 !important;
                }
                
                .dark input::placeholder,
                .dark textarea::placeholder {
                    color: #9ca3af !important;
                    opacity: 1 !important;
                }
            `}</style>
            <ToastContainer />
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center text-gray-950 dark:text-white">
                    <span className="mr-2 text-2xl">
                        <TbMessageQuestion fontSize={35} className='text-primary' />
                    </span>
                    {t('contact.title')}
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info Section */}
                    <div>
                        <div className="mb-10">
                            <h3 className="text-2xl font-semibold text-primary mb-4">{t('contact.sub_title')}</h3>
                            <p className="text-gray-950 dark:text-gray-300 mb-8">
                                {t('contact.text_info')}
                            </p>

                            <div className="flex items-center mb-4">
                                <div className="text-primary mr-4">
                                    <TbMapPin size={20} />
                                </div>
                                <span>
                                    <a
                                        href="https://maps.app.goo.gl/EfTTUYva6FZCFT1PA"
                                        target="_blank"
                                        className="text-white-400 hover:underline text-primary transition-colors duration-200"
                                    >
                                        {t('contact.address_town')}
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/Minwook07"
                                target="_blank"
                                className="w-10 h-10 bg-[#333333] dark:bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#7e22ce] dark:hover:bg-[#333333] transition-colors"
                            >
                                <TbBrandGithub size={23} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mith-chet-ab56b5295/"
                                target="_blank"
                                className="w-10 h-10 bg-[#0A66C2] dark:bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#084d92] dark:hover:bg-[#0A66C2] transition-colors"
                            >
                                <TbBrandLinkedin fontSize={23} />
                            </a>
                            <a
                                href="https://t.me/min7wook_lee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-[#0088cc] dark:bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-[#006699] dark:hover:bg-[#0088cc] transition-colors"
                            >
                                <TbBrandTelegram fontSize={23} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#E1306C] hover:bg-[#b9275a] dark:bg-[#1E1E1E] dark:hover:bg-[#E1306C]"
                            >
                                <TbBrandInstagram size={23} />
                            </a>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="border bg-[#f5f5f5] dark:bg-[#1E1E1E] border-[#e5e5e5] dark:border-[#1E1E1E] rounded-xl p-8"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-[#171717] dark:text-[#ffffff]">{t('contact.form_info.name')}</label>
                                <input
                                    type="text"
                                    className="w-full p-3 text-[#111827] dark:text-[#ffffff] bg-[#ffffff] dark:bg-[#171717] border border-[#dadada] dark:border-[#171717] rounded-lg focus:outline-none focus:border-[#fdc435] dark:focus:border-[#7e22ce]"
                                    placeholder={t('contact.form_info.place_holder.place_holder_name')}
                                    name="user_name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-[#171717] dark:text-[#ffffff]">{t('contact.form_info.email')}</label>
                                <input
                                    type="email"
                                    className="w-full p-3 text-[#111827] dark:text-[#ffffff] bg-[#ffffff] dark:bg-[#171717] border border-[#dadada] dark:border-[#171717] rounded-lg focus:outline-none focus:border-[#fdc435] dark:focus:border-[#7e22ce]"
                                    placeholder="your.email@example.com"
                                    name="user_email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-[#171717] dark:text-[#ffffff]">{t('contact.form_info.subject')}</label>
                                <input
                                    type="text"
                                    className="w-full p-3 text-[#111827] dark:text-[#ffffff] bg-[#ffffff] dark:bg-[#171717] border border-[#dadada] dark:border-[#171717] rounded-lg focus:outline-none focus:border-[#fdc435] dark:focus:border-[#7e22ce]"
                                    placeholder={t('contact.form_info.subject')}
                                    name="subject"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-[#171717] dark:text-[#ffffff]">{t('contact.form_info.message')}</label>
                                <textarea
                                    name="message"
                                    className="w-full p-3 text-[#111827] dark:text-[#ffffff] bg-[#ffffff] dark:bg-[#171717] border border-[#dadada] dark:border-[#171717] rounded-lg focus:outline-none focus:border-[#fdc435] dark:focus:border-[#7e22ce] h-32 resize-none"
                                    placeholder={t('contact.form_info.place_holder.place_holder_message')}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-[#db2777] transition-colors cursor-pointer"
                            >
                                {t('contact.form_info.btn_submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
