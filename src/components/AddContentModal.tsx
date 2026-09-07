import React, { useState, useEffect } from 'react';
import { X, Plus, Briefcase, BookOpen, Award, Upload, Link as LinkIcon, Sparkles, Check, AlertCircle, Code2, Save } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AddContentModal: React.FC = () => {
  const {
    isAddModalOpen,
    addModalType,
    closeAddModal,
    addProject,
    updateProject,
    editingProject,
    addInternship,
    addCourse,
    addCertificate
  } = usePortfolio();

  // Project form fields
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSubtitle, setProjectSubtitle] = useState('');
  const [projectCategory, setProjectCategory] = useState<'Frontend' | 'Full-Stack' | 'AI & Web' | string>('Frontend');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTechStack, setProjectTechStack] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLiveDemo, setProjectLiveDemo] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [projectStatus, setProjectStatus] = useState<'Completed' | 'In Progress'>('Completed');
  const [projectDate, setProjectDate] = useState('');
  const [projectFeatured, setProjectFeatured] = useState(false);

  // Internship form fields
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [duration, setDuration] = useState('');
  const [internshipDesc, setInternshipDesc] = useState('');
  const [internshipSkills, setInternshipSkills] = useState('');
  const [internshipCert, setInternshipCert] = useState('');
  const [internshipBadge, setInternshipBadge] = useState('');

  // Course form fields
  const [courseName, setCourseName] = useState('');
  const [platform, setPlatform] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseSkills, setCourseSkills] = useState('');
  const [courseCert, setCourseCert] = useState('');

  // Certificate form fields
  const [certTitle, setCertTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certTag, setCertTag] = useState('Verified Credential');
  const [certLink, setCertLink] = useState('');
  const [certImage, setCertImage] = useState('');
  const [certDesc, setCertDesc] = useState('');
  const [certSkills, setCertSkills] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Pre-fill when editing project
  useEffect(() => {
    if (editingProject && addModalType === 'project') {
      setProjectTitle(editingProject.title || '');
      setProjectSubtitle(editingProject.subtitle || '');
      setProjectCategory(editingProject.category || 'Frontend');
      setProjectDesc(editingProject.description || '');
      setProjectTechStack(
        editingProject.techStack && editingProject.techStack.length > 0
          ? editingProject.techStack.join(', ')
          : (editingProject.tags ? editingProject.tags.join(', ') : '')
      );
      setProjectGithub(editingProject.githubUrl || '');
      setProjectLiveDemo(editingProject.liveDemoUrl || '');
      setProjectImage(editingProject.image || '');
      setProjectStatus(editingProject.status === 'In Progress' ? 'In Progress' : 'Completed');
      setProjectDate(editingProject.date || '');
      setProjectFeatured(!!editingProject.featured);
    }
  }, [editingProject, addModalType]);

  if (!isAddModalOpen || !addModalType) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('File size must be under 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('Image file size must be under 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForms = () => {
    setProjectTitle('');
    setProjectSubtitle('');
    setProjectCategory('Frontend');
    setProjectDesc('');
    setProjectTechStack('');
    setProjectGithub('');
    setProjectLiveDemo('');
    setProjectImage('');
    setProjectStatus('Completed');
    setProjectDate('');
    setProjectFeatured(false);

    setCompany('');
    setRole('');
    setDuration('');
    setInternshipDesc('');
    setInternshipSkills('');
    setInternshipCert('');
    setInternshipBadge('');

    setCourseName('');
    setPlatform('');
    setCompletionDate('');
    setCourseDesc('');
    setCourseSkills('');
    setCourseCert('');

    setCertTitle('');
    setIssuer('');
    setCertDate('');
    setCertTag('Verified Credential');
    setCertLink('');
    setCertImage('');
    setCertDesc('');
    setCertSkills('');

    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    resetForms();
    closeAddModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    let res: { success: boolean; message: string };

    if (addModalType === 'project') {
      if (!projectTitle.trim() || !projectDesc.trim()) {
        setError('Project Name and Description are required.');
        setLoading(false);
        return;
      }

      const techStackArr = projectTechStack
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const projectPayload = {
        title: projectTitle.trim(),
        subtitle: projectSubtitle.trim() || `${projectCategory} Application`,
        category: projectCategory as any,
        description: projectDesc.trim(),
        longDescription: projectDesc.trim(),
        techStack: techStackArr.length > 0 ? techStackArr : ['Web Development', 'Modern UI'],
        tags: techStackArr.slice(0, 4),
        keyFeatures: [
          'Engineered with responsive UI and modern styling',
          'Interactive state handling and modular component structure',
          'Clean, maintainable code adhering to web standards'
        ],
        githubUrl: projectGithub.trim() || undefined,
        liveDemoUrl: projectLiveDemo.trim() || undefined,
        image: projectImage.trim() || undefined,
        status: projectStatus,
        date: projectDate.trim() || undefined,
        featured: projectFeatured,
        metrics: projectStatus === 'In Progress' ? 'Active Development' : 'Production Ready'
      };

      if (editingProject) {
        res = await updateProject(editingProject.id, projectPayload);
      } else {
        res = await addProject(projectPayload);
      }
    } else if (addModalType === 'internship') {
      if (!company.trim() || !role.trim() || !duration.trim() || !internshipDesc.trim()) {
        setError('Please complete all required fields.');
        setLoading(false);
        return;
      }
      const skillsArr = internshipSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      res = await addInternship({
        company: company.trim(),
        role: role.trim(),
        duration: duration.trim(),
        description: internshipDesc.trim(),
        skills: skillsArr.length > 0 ? skillsArr : ['Web Development', 'Engineering'],
        certificate: internshipCert.trim() || undefined,
        badge: internshipBadge.trim() || (duration.toLowerCase().includes('30') ? '30-Day Internship' : null)
      });
    } else if (addModalType === 'course') {
      if (!courseName.trim() || !platform.trim() || !completionDate.trim() || !courseDesc.trim()) {
        setError('Please complete all required fields.');
        setLoading(false);
        return;
      }
      const skillsArr = courseSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      res = await addCourse({
        name: courseName.trim(),
        platform: platform.trim(),
        completionDate: completionDate.trim(),
        description: courseDesc.trim(),
        skills: skillsArr.length > 0 ? skillsArr : ['Coursework'],
        certificate: courseCert.trim() || undefined
      });
    } else {
      if (!certTitle.trim() || !issuer.trim() || !certDate.trim()) {
        setError('Please provide Certificate Name, Issuing Organization, and Date.');
        setLoading(false);
        return;
      }
      const skillsArr = certSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      res = await addCertificate({
        title: certTitle.trim(),
        issuer: issuer.trim(),
        date: certDate.trim(),
        tag: certTag.trim() || 'Accreditation',
        description: certDesc.trim() || `Official certification awarded by ${issuer.trim()}.`,
        skills: skillsArr.length > 0 ? skillsArr : ['Certified Skill'],
        certificateImage: certImage.trim() || undefined,
        certificateLink: certLink.trim() || undefined
      });
    }

    setLoading(false);

    if (res.success) {
      setSuccess(res.message);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } else {
      setError(res.message);
    }
  };

  const getTitle = () => {
    switch (addModalType) {
      case 'project':
        return {
          title: editingProject ? 'Edit Project' : 'Add New Project',
          subtitle: editingProject
            ? 'Update project details, links, tech stack, and progress status'
            : 'Publish a new project into the interactive Projects section',
          icon: <Code2 className="w-6 h-6 text-blue-400" />
        };
      case 'internship':
        return {
          title: 'Add New Internship',
          subtitle: 'Add work experience or virtual internships to the Experience section',
          icon: <Briefcase className="w-6 h-6 text-blue-400" />
        };
      case 'course':
        return {
          title: 'Add New Course',
          subtitle: 'Record academic, technical, or online coursework in the Courses section',
          icon: <BookOpen className="w-6 h-6 text-cyan-400" />
        };
      case 'certificate':
        return {
          title: 'Add New Certificate',
          subtitle: 'Showcase verified credentials with optional digital document / verification link',
          icon: <Award className="w-6 h-6 text-amber-400" />
        };
    }
  };

  const meta = getTitle();

  return (
    <div
      id="add-content-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="add-content-modal"
        className="w-full max-w-2xl my-8 rounded-2xl bg-[#061026] border border-blue-900/60 p-6 sm:p-8 shadow-2xl shadow-blue-950/60 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-blue-950/90 border border-blue-800/60 flex items-center justify-center shrink-0">
            {meta.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{meta.title}</h3>
            <p className="text-xs text-slate-400">{meta.subtitle}</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ================= PROJECT FORM ================= */}
          {addModalType === 'project' && (
            <>
              {/* Project Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. NextGen Cloud Studio, AI Code Assistant"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category <span className="text-blue-400">*</span>
                  </label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI & Web">AI & Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tools">Developer Tools</option>
                  </select>
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={projectSubtitle}
                  onChange={(e) => setProjectSubtitle(e.target.value)}
                  placeholder="e.g. Modern Full-Stack Web Platform, High Performance Dashboard"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Description <span className="text-blue-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Describe the problem solved, architecture highlights, functionality, and performance..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Technologies / Tech Stack */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Technologies / Tech Stack <span className="text-blue-400">*</span> (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={projectTechStack}
                  onChange={(e) => setProjectTechStack(e.target.value)}
                  placeholder="e.g. React, TypeScript, Tailwind CSS, Node.js, Express, Vite"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProjectStatus('Completed')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        projectStatus === 'Completed'
                          ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300 shadow-sm shadow-emerald-950'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Completed
                    </button>
                    <button
                      type="button"
                      onClick={() => setProjectStatus('In Progress')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        projectStatus === 'In Progress'
                          ? 'bg-amber-950/60 border-amber-600 text-amber-300 shadow-sm shadow-amber-950'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      In Progress
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Start / Completion Date (optional)
                  </label>
                  <input
                    type="text"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                    placeholder="e.g. Nov 2024, Aug 2026 – Present"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Links: GitHub & Live Demo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    GitHub Repository Link (optional)
                  </label>
                  <input
                    type="url"
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Live Demo Link (optional)
                  </label>
                  <input
                    type="url"
                    value={projectLiveDemo}
                    onChange={(e) => setProjectLiveDemo(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Project Image & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Image (optional: paste image URL or upload image)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={projectImage.startsWith('data:') ? 'Image Uploaded from Device' : projectImage}
                    onChange={(e) => setProjectImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or paste image URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <label className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer border border-slate-700 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProjectFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {projectImage && (
                  <div className="mt-2 relative w-24 h-14 rounded-lg overflow-hidden border border-blue-900/50 bg-slate-950">
                    <img
                      src={projectImage}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => setProjectImage('')}
                      className="absolute top-1 right-1 p-0.5 bg-black/70 rounded text-red-400 hover:text-white"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="project-featured"
                  checked={projectFeatured}
                  onChange={(e) => setProjectFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-blue-600 bg-slate-900 focus:ring-blue-500"
                />
                <label htmlFor="project-featured" className="text-xs text-slate-300 cursor-pointer select-none">
                  Highlight as <span className="font-semibold text-blue-400">Featured Project</span> with priority spotlight
                </label>
              </div>
            </>
          )}

          {/* ================= INTERNSHIP FORM ================= */}
          {addModalType === 'internship' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Company Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google, Microsoft, Tech Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Role / Position <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Full Stack Intern, React Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Internship Duration <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 1 Month (09/2026 – 10/2026)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Badge / Tag (optional)
                  </label>
                  <input
                    type="text"
                    value={internshipBadge}
                    onChange={(e) => setInternshipBadge(e.target.value)}
                    placeholder="e.g. 30-Day Internship, Virtual, Remote"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Description <span className="text-blue-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={internshipDesc}
                  onChange={(e) => setInternshipDesc(e.target.value)}
                  placeholder="Summary of your responsibilities, assignments, and contributions during the internship..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Technologies / Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={internshipSkills}
                  onChange={(e) => setInternshipSkills(e.target.value)}
                  placeholder="React, TypeScript, Node.js, Tailwind CSS"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Certificate / Verification Note (optional)
                </label>
                <input
                  type="text"
                  value={internshipCert}
                  onChange={(e) => setInternshipCert(e.target.value)}
                  placeholder="e.g. Certificate of Excellence / Letter of Recommendation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* ================= COURSE FORM ================= */}
          {addModalType === 'course' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Course Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Advanced Next.js & Full-Stack Systems"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Platform / Institution <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="e.g. Coursera, Udemy, Stanford Online, edX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Completion Date <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    placeholder="e.g. October 2026 or 10/2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Certificate Note / URL (optional)
                  </label>
                  <input
                    type="text"
                    value={courseCert}
                    onChange={(e) => setCourseCert(e.target.value)}
                    placeholder="e.g. Certificate Link or Credential ID"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Description <span className="text-blue-400">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  placeholder="Key concepts, architecture paradigms, and practical problem sets completed in this course..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Skills / Topics Learned (comma separated)
                </label>
                <input
                  type="text"
                  value={courseSkills}
                  onChange={(e) => setCourseSkills(e.target.value)}
                  placeholder="Data Structures, Algorithms, REST APIs, TypeScript"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* ================= CERTIFICATE FORM ================= */}
          {addModalType === 'certificate' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Certificate Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    placeholder="e.g. Meta Frontend Developer Professional Certificate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Issuing Organization <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Meta, AWS, IBM, Coursera"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Date <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    placeholder="e.g. 09/2026 or Sep 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={certTag}
                    onChange={(e) => setCertTag(e.target.value)}
                    placeholder="e.g. Web Mastery, Cloud, Security"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Certificate Link (optional)
                  </label>
                  <input
                    type="url"
                    value={certLink}
                    onChange={(e) => setCertLink(e.target.value)}
                    placeholder="https://coursera.org/verify/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Certificate Image / Document (upload or paste image URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={certImage.startsWith('data:') ? 'Document / Image Uploaded' : certImage}
                    onChange={(e) => setCertImage(e.target.value)}
                    placeholder="Paste image / PDF link or upload below..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <label className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer border border-slate-700">
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={certDesc}
                  onChange={(e) => setCertDesc(e.target.value)}
                  placeholder="Accreditation scope and certified topics..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Skills Covered (comma separated)
                </label>
                <input
                  type="text"
                  value={certSkills}
                  onChange={(e) => setCertSkills(e.target.value)}
                  placeholder="Frontend Architecture, Next.js, Cloud Services"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/90 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-medium shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {editingProject ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{loading ? 'Saving...' : (editingProject ? 'Save Changes' : 'Publish to Portfolio')}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
