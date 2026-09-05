import React from 'react';
import { Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10 text-left">
          <div className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
            CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Certifications & Courses
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Accredited course completions across full-stack engineering, web fundamentals, programming paradigms, and modern developer tools.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="p-6 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                    {cert.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#38bdf8] mt-1">
                    {cert.issuer}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Skills covered */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-[#0b162c] border border-blue-950/80 text-[11px] font-mono text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
