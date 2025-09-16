import React, { useRef, useEffect, useState } from "react";
import { BsTools } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const skills = [
  { name: 'PHP', img: '/images/skills/php.svg' },
  { name: 'Laravel', img: '/images/skills/laravel.svg' },
  { name: 'MySQL', img: '/images/skills/mysql.svg' },
  { name: 'Vue.js', img: '/images/skills/vue.svg' },
  { name: 'Nextjs', img: '/images/skills/nextjs.svg' },
  { name: 'React', img: '/images/skills/react.svg' },
  { name: 'Tailwind', img: '/images/skills/tailwind.svg' },
  { name: 'Bootstrap', img: '/images/skills/bootstrap.svg' },
  { name: 'Git', img: '/images/skills/git.svg' },
  { name: 'Figma', img: '/images/skills/figma.svg' },
  { name: 'Photoshop', img: '/images/skills/photoshop.svg' },
  { name: 'C#', img: '/images/skills/csharp.svg' },
  { name: 'JavaScript', img: '/images/skills/javascript.svg' },
  { name: 'CSS3', img: '/images/skills/css3.svg' },
  { name: 'HTML5', img: '/images/skills/html5.svg' },
];

export default function Skills() {
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setScrollWidth(trackRef.current.scrollWidth / 2); // width of one set
    }
  }, []);

  return (
    <section id="skills" style={{ backgroundColor: "#121212" }}>
      <div className="container mx-auto px-6">
        <div className="bg-opacity-10 p-8 rounded-xl mb-10" style={{ backgroundColor: "#1E1E1E" }}>
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-gray-100">
            <span className="mr-2 text-2xl">
              <BsTools color="orange" fontSize={35} />
            </span>{" "}
            {t("skills.title")}
          </h2>

          <div className="scroll-container">
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{
                width: 'max-content',
                animation: scrollWidth
                  ? `scroll ${scrollWidth / 50}s linear infinite`
                  : 'none'
              }}
            >
              {[...skills, ...skills].map((skill, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#171717] h-32 min-w-[120px] hover:scale-105 transition-transform"
                >
                  <img
                    src={skill.img}
                    alt={skill.name}
                    className="w-14 h-14 object-contain mb-3 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
                  />
                  <h3 className="text-sm font-semibold text-gray-200 text-center">
                    {skill.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-16 space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{skills.length}+</div>
            <div className="text-gray-400 text-sm">{t("skills.technology")}</div>
          </div>
          <div className="w-px h-12 bg-gray-600"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">1+</div>
            <div className="text-gray-400 text-sm">{t("skills.experience")}</div>
          </div>
          <div className="w-px h-12 bg-gray-600"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">∞</div>
            <div className="text-gray-400 text-sm">{t("skills.learning")}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${scrollWidth}px); }
        }
      `}</style>
    </section>
  );
}
