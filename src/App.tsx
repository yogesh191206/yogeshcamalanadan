import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Courses } from './components/Courses';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AddContentModal } from './components/AddContentModal';
import { AdminFloatingBar } from './components/AdminFloatingBar';
import { PortfolioProvider } from './context/PortfolioContext';
import { Project } from './types';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        {/* Top Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <About onOpenResume={() => setResumeOpen(true)} />
          <Skills />
          <Experience />
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
          <Courses />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Resume View & Print Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Deep Dive Project Architecture & Demo Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Admin Authentication & Content Addition Modals */}
        <AdminLoginModal />
        <AddContentModal />

        {/* Admin floating management bar */}
        <AdminFloatingBar />
      </div>
    </PortfolioProvider>
  );
}
