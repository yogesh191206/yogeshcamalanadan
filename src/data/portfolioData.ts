import { Project, Experience, SkillItem, Certificate, Education, Course, InternshipItem } from '../types';

export const PERSONAL_INFO = {
  name: "Yogesh Camalanadan",
  role: "Aspiring Web Developer & B.Tech CSE Student",
  email: "yogesh191206@gmail.com",
  phone: "+91 7010245963",
  location: "Kalitheerthalkuppam, Puducherry, India",
  institution: "Sri Venkateshwaraa College of Engineering and Technology",
  github: "https://github.com/yogesh191206",
  portfolioRepo: "https://github.com/yogesh191206/portfolio-website.git",
  bio: "Computer Science and Engineering undergraduate passionate about crafting responsive, performant web applications and smart digital tools. Combining clean frontend craftsmanship with practical full-stack fundamentals.",
  availability: "Open for Software Engineering & Web Development Internships",
  graduatingYear: "2028",
};

export const EDUCATION: Education = {
  degree: "Bachelor of Technology (B.Tech) – Computer Science and Engineering",
  institution: "Sri Venkateshwaraa College of Engineering and Technology",
  period: "09/2024 – 05/2028",
  location: "Ariyur, Puducherry, India",
  status: "Currently Pursuing (1st/2nd Year)",
  focus: [
    "Web Development Fundamentals & Modern Standards",
    "Java & Object-Oriented Programming (OOP)",
    "Data Structures & Problem Solving",
    "Responsive Layout Engineering"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "tamilmathi",
    title: "TamilMathi",
    subtitle: "AI-Powered Educational Learning Platform",
    description: "A comprehensive digital learning ecosystem built with interactive modules, automated assessment quizzes, AI tutoring assistance, and administrative course governance.",
    longDescription: "TamilMathi was engineered to provide students with an accessible, highly responsive educational experience. Features include interactive structured course tracks, instantaneous quiz evaluation, an AI learning assistant to answer student queries, real-time progress visualization, certificate generation upon milestone completion, and an admin portal for instructor management.",
    tags: ["AI & Web", "Modern Web", "Quiz Engine", "Progress Tracking", "Admin Portal"],
    category: "AI & Web",
    featured: true,
    metrics: "Course & Quiz Modules + AI Tutoring Engine",
    keyFeatures: [
      "Interactive course viewer with modular topic progression",
      "Dynamic assessment quizzes with instant scoring and explanations",
      "AI-driven study companion for contextual doubt resolution",
      "Student progress analytics and milestone certificate awarding",
      "Instructor / admin management portal for lesson curation"
    ],
    techStack: ["JavaScript", "HTML5/CSS3", "AI Integration", "Responsive UI", "Local State Persistence"]
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    subtitle: "Responsive Web Development Showcase",
    description: "Modern, high-performance portfolio engineered with responsive design principles, structured semantic HTML, and version-controlled Git workflow.",
    longDescription: "A crafted web presence demonstrating clean layout engineering, fluid responsiveness across mobile and desktop viewpoints, interactive component design, and professional technical documentation.",
    tags: ["Responsive Design", "Semantic HTML5", "Modern CSS", "Git Workflow"],
    category: "Frontend",
    featured: true,
    githubUrl: "https://github.com/yogesh191206/portfolio-website.git",
    metrics: "100% Mobile Responsive & Version Controlled",
    keyFeatures: [
      "Fully responsive grid and flexbox layout across all breakpoints",
      "Clean semantic markup adhering to web accessibility guidelines",
      "Interactive project and experience inspection modals",
      "Direct communication channels and CV viewing engine"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Git & GitHub", "VCS"]
  },
  {
    id: "fullstack-task-hub",
    title: "Full-Stack Task & Quiz Suite",
    subtitle: "Python & JavaScript Application Suite",
    description: "Interactive data-driven utility suite built during full-stack internships, featuring dynamic DOM manipulation, Python scripting logic, and structured data handling.",
    longDescription: "Developed through practical assignments during the Eduskills Python Full Stack internship, focusing on modular code organization, stateful frontend interactions, and clean data modeling.",
    tags: ["Python", "JavaScript", "Full Stack", "Data Handling"],
    category: "Full-Stack",
    featured: false,
    metrics: "Modular Python & JS Architecture",
    keyFeatures: [
      "Dynamic data binding and real-time DOM updates",
      "Client-side verification and structured form handling",
      "Modular Python backend helper scripts",
      "Responsive user interface optimized for touch and desktop"
    ],
    techStack: ["Python", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "codealpha",
    role: "Frontend Development Intern",
    company: "CodeAlpha",
    period: "08/2026 – 08/2026",
    duration: "30-Day Virtual Internship",
    location: "Puducherry, India (Remote)",
    type: "Internship",
    summary: "Successfully completed a 30-day intensive virtual internship in Frontend Development, gaining practical hands-on experience in responsive web design and implementing core HTML5, CSS3, and JavaScript logic.",
    responsibilities: [
      "Engineered responsive user interface layouts optimized for multiple viewport dimensions.",
      "Implemented interactive client-side behaviors using modern JavaScript methods.",
      "Enhanced cross-browser compatibility and verified semantic accessibility standards.",
      "Delivered production-ready frontend task submissions on schedule."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "VS Code"]
  },
  {
    id: "thiranex",
    role: "Web Development Intern",
    company: "Thiranex",
    period: "07/2026 – 08/2026",
    duration: "30-Day Virtual Internship",
    location: "Puducherry, India",
    type: "Internship",
    summary: "Developed and deployed a responsive website utilizing HTML, CSS, and JavaScript with active version control via Git and GitHub.",
    responsibilities: [
      "Built and deployed a fully functional, mobile-first responsive website.",
      "Managed feature development, code reviews, and remote branch tracking using Git and GitHub.",
      "Streamlined UI components with clean styling rules and fluid flexbox grids.",
      "Applied modern debugging techniques in browser developer tools to optimize performance."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "Web Deployment"]
  },
  {
    id: "eduskills",
    role: "Python Full Stack Development Intern",
    company: "Eduskills",
    period: "05/2025 – 07/2025",
    duration: "2-Month Practical Internship",
    location: "Puducherry, India",
    type: "Internship",
    summary: "Gained comprehensive hands-on exposure to full-stack web development methodologies, Python programming, and frontend design through practical assignments and end-to-end projects.",
    responsibilities: [
      "Implemented backend logic routines and data handling algorithms in Python.",
      "Built clean, responsive client-facing interfaces combining HTML, CSS, and JavaScript.",
      "Participated in guided module reviews, coding sprints, and integration testing.",
      "Earned official course completion certification in Python Full Stack Development."
    ],
    technologies: ["Python", "HTML5", "CSS3", "JavaScript", "Full Stack Development", "VS Code"]
  }
];

export const SKILLS: SkillItem[] = [
  // Frontend
  { name: "HTML5", level: "Advanced", category: "frontend", description: "Semantic markup, accessibility, modern web elements" },
  { name: "CSS3", level: "Advanced", category: "frontend", description: "Flexbox, Grid, animations, media queries, modern variables" },
  { name: "JavaScript", level: "Intermediate", category: "frontend", description: "ES6+, DOM manipulation, event handling, asynchronous JS" },
  { name: "Bootstrap", level: "Intermediate", category: "frontend", description: "Rapid responsive prototyping, utility classes, grid systems" },
  { name: "Responsive Web Design", level: "Advanced", category: "frontend", description: "Mobile-first layouts, fluid typography, cross-device scaling" },
  
  // Backend & Core
  { name: "Python", level: "Intermediate", category: "backend", description: "Data structures, scripting, algorithm design, full-stack basics" },
  { name: "Java (Basics)", level: "Familiar", category: "backend", description: "OOP concepts, classes, inheritance, problem-solving" },
  
  // Tools & Workflow
  { name: "Git", level: "Intermediate", category: "tools", description: "Version control, branching, committing, merging, history tracking" },
  { name: "GitHub", level: "Intermediate", category: "tools", description: "Remote repository hosting, collaboration, GitHub Pages deployment" },
  { name: "VS Code", level: "Advanced", category: "tools", description: "Primary IDE, extensions ecosystem, debugging, snippet workflows" }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-eduskills",
    title: "Python Full Stack Development",
    issuer: "Eduskills",
    tag: "Full-Stack & Backend",
    description: "Hands-on certification covering full-stack web architecture, Python backend scripting, and responsive frontend implementation.",
    skills: ["Python", "Full Stack", "HTML/CSS", "JavaScript"],
    date: "07/2025"
  },
  {
    id: "cert-ibm",
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    tag: "Web Foundations",
    description: "Accreditation on internet architecture, client-server models, responsive web design principles, and enterprise web fundamentals.",
    skills: ["Web Standards", "Responsive UI", "Client-Server"],
    date: "04/2025"
  },
  {
    id: "cert-coursera",
    title: "HTML, CSS & JavaScript",
    issuer: "Coursera",
    tag: "Frontend Mastery",
    description: "In-depth course on modern frontend engineering, CSS layout mechanisms, interactive JavaScript DOM APIs, and responsive design.",
    skills: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    date: "02/2025"
  },
  {
    id: "cert-simplilearn",
    title: "GitHub Basics",
    issuer: "Simplilearn",
    tag: "Version Control",
    description: "Training in distributed version control, repository maintenance, collaborative workflows, and GitHub open-source practices.",
    skills: ["Git", "GitHub", "VCS", "Collaboration"],
    date: "01/2025"
  },
  {
    id: "cert-scalar",
    title: "Java Course",
    issuer: "Scalar",
    tag: "Core Programming",
    description: "Fundamental training in Java programming paradigms, Object-Oriented Programming (OOP) concepts, and algorithmic problem-solving.",
    skills: ["Java", "OOP", "Data Types", "Algorithms"],
    date: "11/2024"
  }
];

export const INITIAL_INTERNSHIPS: InternshipItem[] = [
  {
    id: "thiranex",
    role: "Web Development Intern",
    company: "Thiranex",
    badge: "30-Day Internship",
    duration: "1 Month (07/2026 – 08/2026)",
    description: "Built responsive web pages, practiced HTML, CSS, JavaScript, and learned how to develop user-friendly interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    certificate: "Completed with Certificate of Excellence"
  },
  {
    id: "eduskills",
    role: "Python Full Stack Development Intern",
    company: "Eduskills",
    badge: null,
    duration: "2 Months (05/2025 – 07/2025)",
    description: "Gained knowledge in Python backend development, worked with basic full-stack concepts, and understood web application structure.",
    skills: ["Python", "Full Stack Basics", "Backend Concepts"],
    certificate: "Verified by Eduskills Academy"
  },
  {
    id: "codealpha",
    role: "Frontend Development Intern",
    company: "CodeAlpha",
    badge: "30-Day Internship",
    duration: "1 Month (08/2026 – 08/2026)",
    description: "Worked on front-end tasks, improved HTML/CSS layouts, and built small web-based components as part of the internship.",
    skills: ["HTML", "CSS", "Frontend Development"],
    certificate: "Certificate of Completion"
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-coursera-web",
    name: "HTML, CSS, and Javascript for Web Developers",
    platform: "Coursera (Johns Hopkins University)",
    completionDate: "February 2025",
    description: "Comprehensive foundation in modern web development standards, responsive CSS layout frameworks, and interactive DOM programming.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    id: "course-ibm-skillsbuild",
    name: "Web Development Fundamentals & Cloud Concepts",
    platform: "IBM SkillsBuild",
    completionDate: "April 2025",
    description: "Client-server architecture, modern web accessibility protocols, version control, and cloud-hosted application basics.",
    skills: ["Client-Server Architecture", "Web Standards", "Cloud Basics"]
  },
  {
    id: "course-eduskills-python",
    name: "Python Programming & Backend Architecture",
    platform: "Eduskills Academy",
    completionDate: "July 2025",
    description: "Structured Python programming, object-oriented concepts, API endpoint fundamentals, and relational database connections.",
    skills: ["Python", "OOP", "Backend Logic", "Database Basics"]
  },
  {
    id: "course-scalar-java",
    name: "Java Masterclass & Object-Oriented Programming",
    platform: "Scalar Academy",
    completionDate: "November 2024",
    description: "Core Java programming principles, encapsulation, inheritance, polymorphism, and problem-solving methodologies.",
    skills: ["Java", "OOP", "Data Types", "Algorithms"]
  }
];
