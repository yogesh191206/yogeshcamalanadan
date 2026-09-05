import React from 'react';

export const Skills: React.FC = () => {
  const skillsList = [
    {
      id: 'html',
      name: 'HTML',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          {/* HTML5 Shield */}
          <path d="M6 3l2.4 23.6 7.6 2.4 7.6-2.4L26 3H6z" fill="#E44D26" />
          <path d="M16 26.8l6.1-1.9 2-19.9H16v21.8z" fill="#F16529" />
          <path d="M16 9.4h-5.2l.4 4.2h4.8V9.4zm0 6.8h-2.5l-.2-2.1H9.8l.5 6h5.7v-3.9zm0 0" fill="#EBEBEB" />
          <path d="M16 9.4v4.2h4.8l-.5 4.5-4.3 1.2v2.6l6.6-1.8.9-10.7H16zm0 0" fill="#FFFFFF" />
          <path d="M16 19.3l-2.7-.7-.2-2H10.6l.3 4 5.1 1.4v-2.7z" fill="#EBEBEB" />
        </svg>
      ),
    },
    {
      id: 'css',
      name: 'CSS',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          {/* CSS3 Shield */}
          <path d="M6 3l2.4 23.6 7.6 2.4 7.6-2.4L26 3H6z" fill="#1572B6" />
          <path d="M16 26.8l6.1-1.9 2-19.9H16v21.8z" fill="#33A9DC" />
          <path d="M16 9.4h-5.2l.4 4.2h4.8V9.4zm0 6.8h-2.5l-.2-2.1H9.8l.5 6h5.7v-3.9zm0 0" fill="#EBEBEB" />
          <path d="M16 9.4v4.2h4.8l-.5 4.5-4.3 1.2v2.6l6.6-1.8.9-10.7H16zm0 0" fill="#FFFFFF" />
          <path d="M16 19.3l-2.7-.7-.2-2H10.6l.3 4 5.1 1.4v-2.7z" fill="#EBEBEB" />
        </svg>
      ),
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: (
        <div className="w-10 h-10 rounded-md bg-[#F7DF1E] flex items-end justify-end p-1 shadow-md">
          <span className="font-sans font-black text-black text-sm leading-none">
            JS
          </span>
        </div>
      ),
    },
    {
      id: 'java',
      name: 'Java',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10">
          {/* Java cup and steam logo */}
          <path d="M11 20c0 2 2.5 3 5 3s5-1 5-3" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M9 23.5c0 2.5 3.5 3.5 7 3.5s7-1 7-3.5" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M7 27c0 3 4.5 4 9 4s9-1 9-4" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M14 6c0 3 4 3 4 6" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M18 4c0 3-4 4-4 7" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M12 10c0 2 3 3 3 5" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      id: 'git',
      name: 'Git',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          {/* Git orange diamond with branching node */}
          <rect x="16" y="2" width="18" height="18" rx="3" transform="rotate(45 16 2)" fill="#F05032" />
          <circle cx="16" cy="11" r="2.2" fill="#FFFFFF" />
          <circle cx="21" cy="16" r="2.2" fill="#FFFFFF" />
          <circle cx="16" cy="21" r="2.2" fill="#FFFFFF" />
          <path d="M16 13.2v5.6M16 14.5l5 1.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0D1117]">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'responsive',
      name: 'Responsive Design',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          <rect x="4" y="6" width="20" height="14" rx="2" stroke="#38BDF8" strokeWidth="2" />
          <path d="M10 24h8M14 20v4" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <rect x="18" y="11" width="10" height="15" rx="1.5" fill="#0A1628" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="23" cy="23" r="1" fill="#38BDF8" />
        </svg>
      ),
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: (
        <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
          <rect x="4" y="5" width="24" height="22" rx="3" stroke="#38BDF8" strokeWidth="2" />
          <path d="M4 11h24" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="1" fill="#38BDF8" />
          <circle cx="12" cy="8" r="1" fill="#38BDF8" />
          <circle cx="16" cy="8" r="1" fill="#38BDF8" />
          <path d="M12 17l-3 3 3 3M20 17l3 3-3 3M17 16l-2 8" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="skills" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-left mb-3">
          <span className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
            MY SKILLS
          </span>
        </div>

        {/* Section Heading: Technologies I work with */}
        <div className="text-left mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Technologies I work with
          </h2>
        </div>

        {/* 8 Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {skillsList.map((skill) => (
            <div
              key={skill.id}
              id={`tech-skill-${skill.id}`}
              className="p-4 rounded-xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/60 hover:bg-[#0b1b38] transition-all duration-200 flex flex-col items-center justify-center gap-3 text-center shadow-lg group cursor-default"
            >
              <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <span className="font-medium text-xs sm:text-[13px] text-white leading-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
