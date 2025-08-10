// constants/index.js
export const navLinks = [
  { id: 1, name: 'Home', href: '#home', icon: 'bi-house' },
  { id: 2, name: 'About', href: '#about', icon: 'bi-info-circle' },
  { id: 3, name: 'Work', href: '#work', icon: 'bi-briefcase' },
  { id: 4, name: 'Contact', href: '#contact', icon: 'bi-envelope' },
];

export const clientReviews = [
  {
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
    ],
  },
];

export const myProjects = [
  {
    title: 'Podcastr - AI Podcast Platform',
    desc: 'Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.',
    subdesc: 'Built as a unique Software-as-a-Service app with Next.js 14, Tailwind CSS, TypeScript, Framer Motion and Convex, Podcastr is designed for optimal performance and scalability.',
    href: '',
    texture: '/textures/project/p1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { name: 'Next.js', path: '/assets/nextjs-logo.png' },
      { name: 'TypeScript', path: '/assets/typescript.png' },
      { name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { name: 'Framer Motion', path: '/assets/framer.svg' },
      { name: 'Convex', path: '/assets/code.svg' },
    ],
  },
  {
    title: 'Dzum - Fullstack Zoom Clone App',
    desc: 'Dzum is a cutting-edge video conferencing platform that offers a seamless user experience. It features real-time video and audio communication, screen sharing, and chat functionality, making it ideal for remote work and virtual meetings. It also has the functionality to record meetings, schedule meetings, and share links to join meetings.',
    subdesc: 'With Dzum, users can enjoy a secure and reliable video conferencing experience. Built with Next.js, Tailwind CSS, TypeScript, Dzum is designed for optimal performance and scalability.',
    href: '',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { name: 'Next.js', path: '/assets/nextjs-logo.png' },
      { name: 'TypeScript', path: '/assets/typescript.png' },
      { name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { name: 'Framer Motion', path: '/assets/framer.svg' },
    ],
  },
  {
    title: 'Still updating...',
    desc: 'More exciting projects coming soon. Stay tuned for updates!',
    subdesc: 'This space will showcase future work and innovations.',
    href: '#',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#1A1A2E',
      border: '0.2px solid #22223B',
      boxShadow: '0px 0px 60px 0px #3A3C6D4D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { name: 'Coming Soon', path: '/assets/star.png' },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'InternBoot',
    pos: 'Website Developer Intern',
    duration: '2025 - Present',
    title: "InternBoot serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Monash Peer Mentoring',
    pos: 'Peer Mentor',
    duration: '2023 - 2024',
    title: "As a Peer Mentor, I provide guidance and support to fellow students, helping them navigate their academic journey. I facilitate study groups, offer feedback on assignments, and share resources to enhance their learning experience.",
    icon: '/assets/monash-logo.png',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Monash Human Power Student Team',
    pos: 'Web Developer',
    duration: '2023 - present',
    title: "Joining the Monash Human Power Student Team has been a rewarding experience. I work with a talented group of individuals to design, develop, deploy, and maintain the team's website.",
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
  {
    id: 4,
    name: 'Personal Projects',
    pos: '',
    duration: '2022 - present',
    title: "I am passionate about design, develop, and deploy websites and applications. I have created a variety of projects, including e-commerce platforms, delivery app, coffee shop dashboard, .. using different frameworks, and libraries such as React, Next.js, TailwindCSS, Typescript, Node.js, Express.js, MongoDB, Firebase.",
    icon: '/assets/personal_project.png',
    animation: 'salute',
  }
];
