import React, { useState, useMemo } from 'react';
import { Sparkles, Github, ArrowUpRight, Code2, Plus, Pencil, Trash2, ExternalLink, AlertTriangle } from 'lucide-react';
import { Project } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const { projects, isAdmin, openAddModal, deleteItem } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Compute all available categories while preserving default order
  const categories = useMemo(() => {
    const base = ['All', 'Frontend', 'Full-Stack', 'AI & Web'];
    const projectCats = projects.map(p => p.category).filter((c): c is string => Boolean(c));
    const extraCats = projectCats.filter((c, idx, self) => self.indexOf(c) === idx && !base.includes(c));
    return [...base, ...extraCats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    await deleteItem('projects', projectToDelete.id);
    setIsDeleting(false);
    setProjectToDelete(null);
  };

  return (
    <section id="projects" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div className="space-y-2">
            <div className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
              PROJECTS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Real-world web applications and systems engineered with responsive layouts and interactive components.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Owner "+ Add Project" Button - Strictly visible only to authenticated portfolio owner */}
            {isAdmin && (
              <button
                id="btn-add-project-admin"
                onClick={() => openAddModal('project')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Project</span>
              </button>
            )}

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-project-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/50 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-blue-950/30 relative"
            >
              <div className="space-y-4">
                {/* Optional Project Image */}
                {project.image && (
                  <div className="mb-2 rounded-xl overflow-hidden border border-blue-950/80 bg-slate-950/60 aspect-video w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Top Category, Badges, and Admin Controls */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-medium">
                      {project.category}
                    </span>
                    {project.status && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border ${
                        project.status === 'Completed'
                          ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400'
                          : 'bg-amber-950/60 border-amber-800/60 text-amber-400'
                      }`}>
                        {project.status}
                      </span>
                    )}
                    {project.date && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {project.date}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-blue-950/80 border border-blue-800/60 text-cyan-300 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Featured
                      </span>
                    )}

                    {/* Admin Edit & Delete Controls - only visible to owner */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 ml-1 border-l border-slate-800 pl-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddModal('project', project);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-400 hover:bg-blue-950/50 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjectToDelete(project);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#0b162c] border border-blue-950/80 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  id={`btn-inspect-project-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Explore Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {project.liveDemoUrl && (
                    <a
                      id={`btn-live-demo-project-${project.id}`}
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-blue-400 hover:text-blue-300 hover:border-blue-700/50 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      id={`btn-github-project-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                      title="View Source on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div
          id="delete-project-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setProjectToDelete(null)}
        >
          <div
            id="delete-project-modal"
            className="w-full max-w-md rounded-2xl bg-[#061026] border border-red-900/60 p-6 shadow-2xl shadow-black/80 space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Project</h3>
                <p className="text-xs text-slate-400">Confirmation required</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-white">"{projectToDelete.title}"</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-delete-project"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-medium shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
