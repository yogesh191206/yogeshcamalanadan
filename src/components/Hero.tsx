import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroLaptopGraphic } from './HeroLaptopGraphic';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Radial Glow & Gradient */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-sky-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">
            
            {/* Pill: 👋 Hello, I'm */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200 shadow-md">
              <span className="text-base">👋</span>
              <span>Hello, I'm</span>
            </div>

            {/* Main Headline: Yogesh */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                Yogesh
              </h1>
              
              {/* Role Title */}
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#38bdf8] leading-snug">
                Computer Science & Engineering Student <br className="hidden sm:inline" />
                <span className="text-slate-400 font-normal">|</span> Web Developer
              </h2>
            </div>

            {/* Bio Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Passionate about building responsive web applications and learning new technologies. I love turning ideas into real-world digital solutions.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* View Projects Button */}
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume Button */}
              <button
                id="hero-open-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#070d1d] hover:bg-[#0f1b38] border border-slate-700/80 hover:border-slate-500 text-white text-sm font-medium transition-all duration-200 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Resume</span>
                <Download className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-3">
              {/* GitHub */}
              <a
                id="hero-social-github"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-950/40 transition-all shadow-md"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                id="hero-social-linkedin"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:bg-blue-950/40 transition-all shadow-md"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              {/* Email */}
              <a
                id="hero-social-email"
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 hover:bg-blue-950/40 transition-all shadow-md"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Hero Graphic Column: 3D Laptop with glowing code and floating badges */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <HeroLaptopGraphic />
          </div>

        </div>
      </div>
    </section>
  );
};
