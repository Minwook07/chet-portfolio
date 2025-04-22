import React from 'react';
import { BsTools } from 'react-icons/bs';
// import { FaVuejs, FaLaravel, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact } from 'react-icons/fa';
// import { SiTailwindcss, SiCsharp, SiDotnet, SiPhp, SiMysql, SiFigma, SiAdobephotoshop } from 'react-icons/si';

const skills = [
  { name: 'Vue.js', img: '/images/vue.svg' },
  { name: 'Laravel', img: '/images/laravel.svg' },
  { name: 'HTML5', img: '/images/html5.svg' },
  { name: 'CSS3', img: '/images/css3.svg' },
  { name: 'JavaScript', img: '/images/javascript.svg' },
  { name: 'Bootstrap', img: '/images/bootstrap.svg' },
  { name: 'Tailwind', img: '/images/tailwind.svg' },
  { name: 'React', img: '/images/react.svg' },
  { name: 'C#', img: '/images/csharp.svg' },
  // { name: '.NET', img: '/images/dotnet.svg' },
  { name: 'PHP', img: '/images/php.svg' },
  { name: 'MySQL', img: '/images/mysql.svg' },
  { name: 'Figma', img: '/images/figma.svg' },
  { name: 'Photoshop', img: '/images/photoshop.svg' },
  { name: 'Git', img: '/images/git.svg' },
  // { name: 'VS Code', img: '/images/vscode.svg' },
];
export default function Skills() {
  return (
    <section id="skills" style={{ backgroundColor: '#121212' }}>
      <div className="container mx-auto px-6">
        <div className="bg-opacity-10 p-8 rounded-xl mb-10" style={{ backgroundColor: '#1E1E1E' }}>
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center text-gray-100">
            <span className="mr-2 text-2xl"><BsTools color='orange' fontSize={35}/></span> Skills
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