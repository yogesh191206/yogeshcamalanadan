import React from 'react';

export const Experience: React.FC = () => {
  const internships = [
    {
      id: 'thiranex',
      role: 'Web Development Intern',
      company: 'Thiranex',
      badge: '30-Day Internship',
      description: 'Built responsive web pages, practiced HTML, CSS, JavaScript, and learned how to develop user-friendly interfaces.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    },
    {
      id: 'eduskills',
      role: 'Python Full Stack Development Intern',
      company: 'Eduskills',
      badge: null,
      description: 'Gained knowledge in Python backend development, worked with basic full-stack concepts, and understood web application structure.',
      skills: ['Python', 'Full Stack Basics', 'Backend Concepts'],
    },
    {
      id: 'codealpha',
      role: 'Frontend Development Intern',
      company: 'CodeAlpha',
      badge: '30-Day Internship',
      description: 'Worked on front-end tasks, improved HTML/CSS layouts, and built small web-based components as part of the internship.',
      skills: ['HTML', 'CSS', 'Frontend Development'],
    },
  ];

  return (
    <section id="experience" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-left mb-3">
          <span className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
            EXPERIENCE
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="text-left mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Internships
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-normal">
            Internships done as part of learning and academic curriculum.
          </p>
        </div>

        {/* 3 Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {internships.map((item) => (
            <div
              key={item.id}
              id={`internship-card-${item.id}`}
              className="rounded-2xl bg-[#061026]/90 border border-slate-800/80 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 group"
            >
              <div>
                {/* Header with Title and Optional Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {item.role}
                  </h3>
                  {item.badge && (
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-950/80 border border-blue-800/60 text-[#38bdf8] whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="text-sm font-medium text-slate-400 mb-4">
                  {item.company}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0b162c] border border-blue-950/80 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
