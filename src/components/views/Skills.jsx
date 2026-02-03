import { BsTools } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const skills = [
    // { name: 'HTML5', img: '/images/skills/html5.svg' },
    // { name: 'CSS3', img: '/images/skills/css3.svg' },
    { name: 'Laravel', img: '/images/skills/laravel.svg' },
    // { name: 'PHP', img: '/images/skills/php.svg' },
    { name: 'MySQL', img: '/images/skills/mysql.svg' },
    { name: 'Vue.js', img: '/images/skills/vue.svg' },
    // { name: 'Nextjs', img: '/images/skills/nextjs.svg' },
    // { name: 'React', img: '/images/skills/react.svg' },
    // { name: 'Tailwind', img: '/images/skills/tailwind.svg' },
    // { name: 'Bootstrap', img: '/images/skills/bootstrap.svg' },
    // { name: 'Git', img: '/images/skills/git.svg' },
    // { name: 'Figma', img: '/images/skills/figma.svg' },
    // { name: 'Photoshop', img: '/images/skills/photoshop.svg' },
    // { name: 'C#', img: '/images/skills/csharp.svg' },
    // { name: 'JavaScript', img: '/images/skills/javascript.svg' }
];

export default function Skills() {
    const { t } = useTranslation();
    const totalSkills = skills.length
    const finalSkill = totalSkills < 10 ? totalSkills : `${totalSkills}+`

    return (
        <section id="skills">
            <div className="container mx-auto px-6 py-10">
                <div className="bg-opacity-10 p-8 rounded-xl bg-gray-300 dark:bg-[#1E1E1E]">
                    <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-gray-950 dark:text-gray-100">
                        <span className="mr-2 text-2xl">
                            <BsTools fontSize={35} className='text-primary' />
                        </span>{" "}
                        {t("skills.title")}
                    </h2>
‍‍‍                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center">
                        {skills.map((skill, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-[#171717] h-32 hover:scale-105 transition-transform"
                            >
                                <img
                                    src={skill.img}
                                    alt={skill.name}
                                    className="w-14 h-14 object-contain mb-3 transition-transform duration-300 filter drop-shadow-lg"
                                />
                                <h3 className="text-sm font-semibold text-gray-950 dark:text-gray-100 text-center">
                                    {skill.name}
                                </h3>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="flex justify-center items-center space-x-8 mt-10">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#fdc435] dark:text-purple-400 mb-1">{finalSkill}</div>
                        <div className="text-gray-400 text-sm">{t("skills.technology")}</div>
                    </div>
                    <div className="w-px h-12 bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#fdc435] dark:text-purple-500 mb-1">1+</div>
                        <div className="text-gray-400 text-sm">{t("skills.experience")}</div>
                    </div>
                    <div className="w-px h-12 bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#fdc435] dark:text-purple-300 mb-1">∞</div>
                        <div className="text-gray-400 text-sm">{t("skills.learning")}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
