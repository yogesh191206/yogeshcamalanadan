import React from 'react';
import { Plus, Trash2, Award, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { internships, isAdmin, openAddModal, deleteItem } = usePortfolio();

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Internships
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal">
              Internships done as part of learning and academic curriculum.
            </p>
          </div>

          {/* Admin "Add Internship" Button - Only visible to owner/admin */}
          {isAdmin && (
            <button
              id="btn-add-internship-admin"
              onClick={() => openAddModal('internship')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Internship</span>
            </button>
          )}
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {internships.map((item) => (
            <div
              key={item.id}
              id={`internship-card-${item.id}`}
              className="rounded-2xl bg-[#061026]/90 border border-slate-800/80 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 group relative"
            >
              <div>
                {/* Header with Title and Optional Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-950/80 border border-blue-800/60 text-[#38bdf8] whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                    {isAdmin && item.isCustom && (
                      <button
                        onClick={() => deleteItem('internships', item.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors ml-1"
                        title="Delete Internship"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Company Name & Duration */}
                <div className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-slate-400 mb-4">
                  <span className="text-white font-semibold">{item.company}</span>
                  {item.duration && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        {item.duration}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Skills Tags & Optional Certificate */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#0b162c] border border-blue-950/80 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {item.certificate && (
                  <div className="flex items-center gap-2 text-xs text-blue-400 pt-1">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-mono text-[11px] truncate">
                      {item.certificate}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
