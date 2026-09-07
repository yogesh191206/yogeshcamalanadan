export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'Full-Stack' | 'Frontend' | 'AI & Web' | string;
  featured: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
  keyFeatures: string[];
  techStack: string[];
  metrics?: string;
  status?: 'Completed' | 'In Progress';
  date?: string;
  image?: string;
  isCustom?: boolean;
  createdAt?: string;
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
  tag?: string;
  date?: string;
  description: string;
  skills: string[];
  certificateImage?: string;
  certificateLink?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface Course {
  id: string;
  name: string;
  platform: string;
  completionDate: string;
  description: string;
  certificate?: string;
  skills?: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  badge?: string | null;
  duration?: string;
  description: string;
  skills: string[];
  certificate?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
  read?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string[];
  status: string;
}
