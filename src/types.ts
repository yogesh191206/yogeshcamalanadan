export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'Full-Stack' | 'Frontend' | 'AI & Web';
  featured: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
  keyFeatures: string[];
  techStack: string[];
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Familiar';
  category: 'frontend' | 'backend' | 'tools' | 'core';
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  tag: string;
  description: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string[];
  status: string;
}
