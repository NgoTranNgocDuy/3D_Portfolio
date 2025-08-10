import React from 'react';

const hobbies = [
  {
    name: 'Solving LeetCode Problems',
    desc: 'Sharpening my coding and problem-solving skills through daily challenges.',
    icon: '💻',
  },
  {
    name: 'Learning',
    desc: 'Constantly exploring new technologies, frameworks, and ideas.',
    icon: '🧠',
  },
  {
    name: 'Traveling',
    desc: 'Exploring new cultures, foods, and places around the world.',
    icon: '🌏',
  },
  {
    name: 'Music',
    desc: 'Listening to and composing music, especially piano and guitar.',
    icon: '🎵',
  },
  {
    name: 'Gaming',
    desc: 'Enjoying strategy and adventure games for fun and relaxation.',
    icon: '🎮',
  },
  {
    name: 'Reading',
    desc: 'Diving into books about technology, history, and self-development.',
    icon: '📚',
  },
];

const Hobbies = () => (
  <section className="c-space my-20">
  <h2 className="head-text text-3xl sm:text-4xl">Hobbies & Interests</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {hobbies.map((hobby, idx) => (
        <div key={idx} className="flex items-center gap-6 p-6 bg-black/80 rounded-lg shadow-lg">
          <span className="text-4xl">{hobby.icon}</span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{hobby.name}</h3>
            <p className="text-neutral-300 text-base sm:text-lg">{hobby.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Hobbies;
