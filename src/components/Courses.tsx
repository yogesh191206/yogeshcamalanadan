import React from 'react';
import { BookOpen, Plus, Calendar, CheckCircle, ExternalLink, Trash2, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Courses: React.FC = () => {
  const { courses, isAdmin, openAddModal, deleteItem } = usePortfolio();

  return (
    <section id="courses" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div className="space-y-2">
            <div className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
              COURSES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Courses & Learning Tracks
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Academic, professional, and self-paced technical courses completed to master software engineering principles.
            </p>
          </div>

          {/* Admin "Add Course" Button - Visible only to owner/admin */}
          {isAdmin && (
            <button
              id="btn-add-course-admin"
              onClick={() => openAddModal('course')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-left">
          {courses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="p-6 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-200 flex flex-col justify-between group space-y-4 relative"
            >
              <div className="space-y-3">
                {/* Header Icon & Date */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-cyan-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {course.completionDate}
                    </span>
                    {isAdmin && course.isCustom && (
                      <button
                        onClick={() => deleteItem('courses', course.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Course Name & Platform */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#38bdf8] mt-1">
                    {course.platform}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Bottom Skills & Certificate Info */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                {course.skills && course.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#0b162c] border border-blue-950/80 text-[11px] font-mono text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {course.certificate && (
                  <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-mono text-[11px] truncate">
                      {course.certificate}
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
