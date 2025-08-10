import React from 'react';

const skills = [
  { name: 'JavaScript', level: 90, icon: '/assets/js-logo.png' },
  { name: 'Python', level: 85, icon: '/assets/python-logo.png' },
  { name: 'Java', level: 80, icon: '/assets/java-logo.png' },
  { name: 'Next.js', level: 80, icon: '/assets/nextjs-logo.png' },
  { name: 'MongoDB', level: 75, icon: '/assets/mongodb-logo.png' },
  { name: 'Express.js', level: 70, icon: '/assets/express-logo.png' },
  { name: 'React', level: 85, icon: '/assets/react.svg' },
  { name: 'TypeScript', level: 80, icon: '/assets/typescript.png' },
  { name: 'Node.js', level: 75, icon: '/assets/node-logo.png' },
  { name: 'TailwindCSS', level: 70, icon: '/assets/tailwindcss.png' },
];

const Skills = () => (
  <section className="c-space my-20">
  <h2 className="head-text text-3xl sm:text-4xl">Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {skills.map(skill => (
        <div key={skill.name} className="flex items-center gap-4 p-4 bg-black/80 rounded-lg shadow-lg">
          <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
          <div className="w-full">
            <div className="flex justify-between">
              <span className="text-white font-semibold text-lg sm:text-xl">{skill.name}</span>
              <span className="text-neutral-400 text-base sm:text-lg">{skill.level}%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2 mt-2">
              <div style={{ width: `${skill.level}%` }} className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
