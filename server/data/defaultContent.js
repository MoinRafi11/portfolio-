export const defaultProfile = {
  name: "Your Name",
  initials: "YN",
  role: "Full-Stack Developer",
  headline: "The Person Behind The Code",
  bio: [
    "Hi! I'm a passionate full-stack developer based in Jammu & Kashmir, India, with over 5 years of experience crafting scalable web applications and intuitive user interfaces.",
    "I specialize in building end-to-end solutions using React, Node.js, and modern databases. Whether it's architecting a backend API or polishing a pixel-perfect UI, I bring the same level of attention to every layer of the stack.",
    "When I'm not coding, you'll find me contributing to open-source projects, exploring new ideas, or mentoring junior developers.",
  ],
  location: "Jammu & Kashmir, India",
  experience: "5+ Years",
  speciality: "Full-Stack Development",
  languages: "English, Hindi, Urdu",
  email: "hello@yourportfolio.dev",
  timezone: "IST (UTC+5:30)",
  responseTime: "Within 24 hours",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

export const defaultProjects = [
  {
    num: "01",
    tag: "Full-Stack",
    title: "E-Commerce Platform",
    desc: "A scalable shopping platform with real-time inventory, payment integration, and an admin dashboard built on React + Node.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#c9a84c",
    order: 1,
  },
  {
    num: "02",
    tag: "Frontend",
    title: "SaaS Dashboard",
    desc: "Analytics dashboard with interactive charts, real-time updates, and role-based access control.",
    tech: ["React", "D3.js", "WebSockets", "CSS"],
    color: "#4c7cc9",
    order: 2,
  },
  {
    num: "03",
    tag: "Mobile",
    title: "Fitness Tracker App",
    desc: "Cross-platform mobile app for workout tracking, progress visualization, and coaching suggestions.",
    tech: ["React Native", "Firebase", "Node.js"],
    color: "#4caf7d",
    order: 3,
  },
];

export const defaultSkills = [
  {
    category: "Frontend",
    color: "#4c7cc9",
    order: 1,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "HTML & CSS", level: 98 },
      { name: "TypeScript", level: 85 },
      { name: "Vue.js", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    color: "#c9a84c",
    order: 2,
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "REST APIs", level: 93 },
      { name: "MongoDB", level: 85 },
      { name: "JWT Auth", level: 88 },
      { name: "WebSockets", level: 78 },
    ],
  },
];

export const defaultServices = [
  {
    icon: "WD",
    title: "Web Development",
    desc: "End-to-end web applications from architecture planning to deployment and maintenance.",
    tags: ["React", "Node.js", "MongoDB"],
    order: 1,
  },
  {
    icon: "UI",
    title: "UI/UX Design",
    desc: "User-centered interfaces that are both beautiful and intuitive.",
    tags: ["Figma", "CSS", "Design Systems"],
    order: 2,
  },
  {
    icon: "API",
    title: "API Development",
    desc: "Robust, well-documented REST APIs built to scale and easy to consume.",
    tags: ["REST", "Express", "JWT"],
    order: 3,
  },
];

export const defaultTimeline = [
  {
    year: "2024-Present",
    role: "Senior Full-Stack Developer",
    company: "Tech Startup",
    desc: "Leading development of a SaaS platform serving 10k+ users.",
    order: 1,
  },
  {
    year: "2022-2024",
    role: "Frontend Engineer",
    company: "Digital Agency",
    desc: "Built high-performance React applications for client projects.",
    order: 2,
  },
  {
    year: "2020-2022",
    role: "Junior Developer",
    company: "Web Studio",
    desc: "Developed e-commerce solutions and landing pages.",
    order: 3,
  },
];
