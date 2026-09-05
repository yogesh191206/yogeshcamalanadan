import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCES, PROJECTS, SKILLS, CERTIFICATES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textVersion = `
${PERSONAL_INFO.name.toUpperCase()}
${PERSONAL_INFO.role}
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}

SUMMARY:
${PERSONAL_INFO.bio}

EDUCATION:
${EDUCATION.degree}
${EDUCATION.institution} (${EDUCATION.period}) - ${EDUCATION.location}

SKILLS:
Frontend: HTML5, CSS3, JavaScript, Bootstrap, Responsive Web Design
Languages & Backend: Python, Java (Basics)
Tools: Git, GitHub, VS Code

PROJECTS:
1. TamilMathi, AI-Powered Educational Learning Platform
   - Developed a responsive learning platform with interactive courses, quizzes, AI-powered assistance, progress tracking, certificates, and an admin portal using modern web technologies.
2. Personal Portfolio Website
   - ${PERSONAL_INFO.portfolioRepo}
   - Responsive Web Development Project showcasing technical skills and work.

PROFESSIONAL EXPERIENCE:
1. Frontend Development Intern — CodeAlpha (08/2026 – 08/2026 | Puducherry, India)
   - 30-Day Internship: Successfully completed virtual internship in Frontend Development, gaining hands-on experience in responsive web design, HTML, CSS, and JavaScript.
2. Web Development Intern — Thiranex (07/2026 – 08/2026 | Puducherry, India)
   - 30-Day Internship: Developed and deployed a responsive website using HTML, CSS, and JavaScript, with hands-on experience in Git, GitHub, front-end development, and responsive design.
3. Python Full Stack Development Intern — Eduskills (05/2025 – 07/2025 | Puducherry, India)
   - Gained hands-on experience in Python, HTML, CSS, JavaScript, and full-stack web development through practical assignments and projects.

CERTIFICATES:
- Python Full Stack Development – Eduskills
- Web Development Fundamentals – IBM SkillsBuild
- HTML, CSS & JavaScript – Coursera
- GitHub Basics – Simplilearn
- Java Course – Scalar
    `.trim();

    navigator.clipboard.writeText(textVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/15 rounded-sm shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Control Bar */}
        <div className="p-4 sm:px-6 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="serif text-base font-normal text-[#f5f5f5]">Curriculum Vitae</span>
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider hidden sm:inline">• ATS Structured</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-modal-copy-btn"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm border border-white/15 bg-white/[0.02] text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              id="resume-modal-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider font-medium rounded-sm bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="resume-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-sm border border-white/10 bg-white/[0.02] text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet View */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-black/40">
          <div 
            id="printable-resume-paper"
            className="max-w-3xl mx-auto bg-white text-neutral-900 rounded-sm p-8 sm:p-12 shadow-2xl text-left font-sans space-y-6 print:p-0 print:shadow-none print:max-w-full"
          >
            {/* Resume Header */}
            <div className="border-b border-neutral-300 pb-5 space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-semibold text-neutral-700">
                Aspiring Web Developer | B.Tech Computer Science and Engineering Student
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  {PERSONAL_INFO.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  {PERSONAL_INFO.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Summary
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Computer Science and Engineering student pursuing a Bachelor's degree with a strong interest in Web
                Development. Skilled in HTML, CSS, JavaScript, Git, GitHub, and Java basics. Passionate about learning new
                technologies and building responsive web applications.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Education
              </h2>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{EDUCATION.degree}</div>
                  <div className="text-neutral-700">{EDUCATION.institution}</div>
                  <div className="text-neutral-600 text-[11px] mt-0.5">
                    Currently pursuing B.Tech in Computer Science and Engineering with a focus on Web Development, Java and problem-solving.
                  </div>
                </div>
                <div className="text-right text-[11px] text-neutral-600 shrink-0 font-medium">
                  <div>{EDUCATION.period}</div>
                  <div>{EDUCATION.location}</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Skills
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                HTML5, CSS3, JavaScript (Basics), Bootstrap, Java (Basics), Git, GitHub, VS Code, Responsive Web Design, Python.
              </p>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Projects
              </h2>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-neutral-900 flex items-center justify-between">
                  <span>TamilMathi, AI-Powered Educational Learning Platform</span>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  Developed a responsive learning platform with interactive courses, quizzes, AI-powered assistance, progress tracking, certificates, and an admin portal using modern web technologies.
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-neutral-900 flex items-center justify-between">
                  <span>Personal Portfolio Website</span>
                  <span className="text-[11px] text-teal-700 font-mono">github.com/yogesh191206/portfolio-website</span>
                </div>
                <p className="text-neutral-700 leading-relaxed">
                  Responsive Web Development Project built with semantic HTML5, CSS3 styling rules, and Git version control.
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Professional Experience
              </h2>

              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-start font-bold text-neutral-900">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-[11px] text-neutral-600 font-medium shrink-0">
                      {exp.period} | {exp.location}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    • <span className="font-semibold">{exp.role} — {exp.company} | {exp.duration}: </span>
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
                Certificates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-700">
                {CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                    <span><strong className="text-neutral-900">{cert.title}</strong> – {cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
