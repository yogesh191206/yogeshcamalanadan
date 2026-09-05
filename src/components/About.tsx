import React from 'react';
import { BookOpen, Heart, Globe, Palette, Puzzle, Headphones } from 'lucide-react';

interface AboutProps {
  onOpenResume?: () => void;
}

export const About: React.FC<AboutProps> = () => {
  const currentlyLearning = [
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Backend Development"
  ];

  const interests = [
    { label: "Web Development", icon: Globe },
    { label: "UI/UX Design", icon: Palette },
    { label: "Problem Solving", icon: Puzzle },
    { label: "Open Source", icon: Headphones },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-left mb-3">
          <span className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
            ABOUT ME
          </span>
        </div>

        {/* Section Heading: Get to know me */}
        <div className="text-left mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Get to know <span className="text-[#38bdf8]">me</span>
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-6 text-left">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              I'm a Computer Science and Engineering student pursuing my Bachelor's degree with a strong interest in Web Development. I enjoy building clean, user-friendly and responsive websites. I'm always eager to learn new technologies and improve my skills.
            </p>
          </div>

          {/* Right Column: Two Cards Side by Side */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Currently Learning */}
            <div className="rounded-2xl bg-[#061026]/90 border border-slate-800/80 p-6 text-left shadow-xl hover:border-blue-900/60 transition-colors">
              <div className="flex items-center gap-2.5 mb-5">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white text-base sm:text-lg">
                  Currently Learning
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {currentlyLearning.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Interests */}
            <div className="rounded-2xl bg-[#061026]/90 border border-slate-800/80 p-6 text-left shadow-xl hover:border-blue-900/60 transition-colors">
              <div className="flex items-center gap-2.5 mb-5">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                <h3 className="font-semibold text-white text-base sm:text-lg">
                  Interests
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {interests.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
