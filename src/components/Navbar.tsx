import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'internships', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section === 'home' ? 'hero' : section === 'internships' ? 'experience' : section === 'certifications' ? 'certificates' : section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'internships', label: 'Internships', href: '#internships' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'certifications', label: 'Certifications', href: '#certifications' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleDownload = () => {
    onOpenResume();
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-md border-b border-blue-950/80 shadow-xl shadow-black/70'
          : 'bg-[#030712]/75 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo: </> Yogesh */}
        <a
          id="nav-logo"
          href="#"
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span className="text-blue-400 font-mono font-bold text-xl sm:text-2xl group-hover:scale-105 transition-transform">
            &lt;/&gt;
          </span>
          <span className="font-sans font-bold text-lg sm:text-xl text-white tracking-tight">
            Yogesh
          </span>
        </a>

        {/* Center Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle & Download Resume */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme toggle switch pill */}
          <button
            id="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-slate-600 transition-all cursor-pointer"
            title="Toggle theme appearance"
            aria-label="Toggle theme appearance"
          >
            <div className={`p-1 rounded-full transition-all ${isDarkMode ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400'}`}>
              <Moon className="w-3.5 h-3.5" />
            </div>
            <div className={`p-1 rounded-full transition-all ${!isDarkMode ? 'bg-amber-500 text-black shadow-sm' : 'text-slate-400'}`}>
              <Sun className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Download Resume Button */}
          <button
            id="btn-nav-resume"
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-200 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleDownload}
            className="p-2 text-white bg-blue-600 rounded-lg sm:hidden shadow-md"
            title="Download Resume"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="lg:hidden bg-[#030712]/98 border-b border-blue-950 px-5 py-5 space-y-3 backdrop-blur-xl shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'bg-blue-950/60 text-blue-400 border border-blue-900/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownload();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white text-xs font-medium shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
