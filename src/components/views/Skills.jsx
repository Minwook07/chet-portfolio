import React from 'react';
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
  // { name: '.NET', img: '/images/skills/dotnet.svg' },
  // { name: 'VS Code', img: '/images/skills/vscode.svg' },
];
export default function Skills() {
  const { t } = useTranslation();
  return (
    <section id="skills" style={{ backgroundColor: '#121212' }}>
      <div className="container mx-auto px-6">
        <div className="bg-opacity-10 p-8 rounded-xl mb-10" style={{ backgroundColor: '#1E1E1E' }}>
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-gray-100">
            <span className="mr-2 text-2xl"><BsTools color='orange' fontSize={35}/></span> {t('skills.title')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:scale-105 transition-transform"
                style={{ backgroundColor: '#171717', height: '132px' }}
              >
                <img
                  src={skill.img}
                  alt={skill.name}
                  className="w-12 h-12 object-contain mb-2"
                />
                <span><h3 className="text-lg font-semibold text-gray-200">{skill.name}</h3></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}