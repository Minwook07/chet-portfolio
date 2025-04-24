import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { MdOutlineContactSupport } from 'react-icons/md';
import { RiTelegram2Line } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    const form = useRef();

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
        <section id="contact" className="py-20" style={{ backgroundColor: '#121212' }}>
            <ToastContainer />
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 flex items-center justify-center">
                    <span className="mr-2 text-2xl">
                        <MdOutlineContactSupport color="orange" fontSize={35} />
                    </span>
                    Contact
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info Section */}
                    <div>
                        <div className="mb-10">
                            <h3 className="text-2xl font-semibold text-orange-500 mb-4">Let's Connect</h3>
                            <p className="text-gray-300 mb-8">
                                Fill out the form or reach out through the provided contact details.
                            </p>
                            <div className="flex items-center mb-4">
                                <div className="text-orange-500 mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <span>
                                    <a
                                        href="mailto:mith.chett@gmail.com"
                                        className="text-white-400 hover:underline hover:text-orange-500 transition-colors duration-200"
                                    >
                                        mith.chett@gmail.com
                                    </a>
                                </span>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="text-orange-500 mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <span>
                                    <a
                                        href="tel:+855978272965"
                                        className="text-white-400 hover:underline hover:text-orange-500 transition-colors duration-200"
                                    >
                                        097 82 72 965
                                    </a>
                                </span>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="text-orange-500 mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <span>
                                    <a
                                        href="https://maps.app.goo.gl/EfTTUYva6FZCFT1PA"
                                        target="_blank"
                                        className="text-white-400 hover:underline hover:text-orange-500 transition-colors duration-200"
                                    >
                                        Phnom Penh, Cambodia
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/Minwook07"
                                target="_blank"
                                className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mith-chet-ab56b5295/"
                                target="_blank"
                                className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a
                                href="https://t.me/min7wook_lee"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                <RiTelegram2Line fontSize={23} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-[#1E1E1E] rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="border bg-[#1E1E1E] border-[#1E1E1E] rounded-xl p-8"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-[#171717] border border-[#171717] rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="Your name"
                                    name="user_name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-3 bg-[#171717] border border-[#171717] rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="your.email@example.com"
                                    name="user_email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-[#171717] border border-[#171717] rounded-lg focus:outline-none focus:border-orange-500"
                                    placeholder="Subject"
                                    name="subject"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    className="w-full p-3 bg-[#171717] border border-[#171717] rounded-lg focus:outline-none focus:border-orange-500 h-32 resize-none"
                                    placeholder="Your message here..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
