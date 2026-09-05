import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, BookOpen, Award, Layers, Bot, Send } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Interactive mini-simulator for TamilMathi to demonstrate live capabilities!
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz' | 'ai-assistant'>('overview');
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'வணக்கம் (Vanakkam)! I am TamilMathi AI assistant. Ask me anything about learning modules, syntax concepts, or course progression!' }
  ]);

  if (!project) return null;

  const sampleQuiz = {
    question: "In modern responsive web design, which CSS layout module is ideal for 2-dimensional layouts (rows and columns simultaneously)?",
    options: [
      "CSS Float property",
      "CSS Grid Layout",
      "Inline Block Display",
      "Table-Cell positioning"
    ],
    correctIndex: 1,
    explanation: "CSS Grid is designed specifically for two-dimensional layout control across both columns and rows, whereas Flexbox is primarily one-dimensional."
  };

  const handleAskBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(newMessages);
    setChatInput('');

    // Instant simulated smart educational response
    setTimeout(() => {
      let reply = "Great question! TamilMathi's learning framework breaks this concept down into bite-sized interactive lessons with quizzes to reinforce your understanding.";
      if (userText.toLowerCase().includes('quiz') || userText.toLowerCase().includes('score')) {
        reply = "TamilMathi's dynamic quiz engine assesses your responses instantly, updates your profile competency score, and issues milestone certificates upon 80%+ completion!";
      } else if (userText.toLowerCase().includes('html') || userText.toLowerCase().includes('css') || userText.toLowerCase().includes('javascript')) {
        reply = "Frontend mastery requires solid semantic HTML5 for structure, modern CSS (Flexbox & Grid) for fluid responsiveness, and JavaScript for dynamic interactivity.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/15 rounded-sm shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#0a0a0a]">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/15 text-white/80">
                {project.category}
              </span>
              {project.metrics && (
                <span className="text-[11px] text-white/40 font-mono">
                  • {project.metrics}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#f5f5f5] serif">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 font-mono mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-sm border border-white/10 bg-white/[0.02] text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Tabs for TamilMathi showcase */}
        {project.id === 'tamilmathi' && (
          <div className="px-6 pt-3 border-b border-white/10 flex gap-2 bg-white/[0.01] text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer text-[11px] ${
                activeTab === 'overview'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              Overview & Architecture
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] ${
                activeTab === 'quiz'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-white/60" />
              <span>Interactive Quiz Engine</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] ${
                activeTab === 'ai-assistant'
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-white/60" />
              <span>AI Companion</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
          {project.id === 'tamilmathi' && activeTab === 'quiz' ? (
            /* Quiz Engine Simulator */
            <div className="space-y-4">
              <div className="p-5 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 uppercase tracking-wider">
                  <span className="text-white/70">Interactive Quiz Engine</span>
                  <span>Question 1 of 1</span>
                </div>
                <h4 className="text-base font-normal text-[#f5f5f5] serif leading-snug">
                  {sampleQuiz.question}
                </h4>

                <div className="space-y-2 pt-2">
                  {sampleQuiz.options.map((option, idx) => {
                    let btnStyle = "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.04]";
                    if (quizSubmitted) {
                      if (idx === sampleQuiz.correctIndex) {
                        btnStyle = "border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
                      } else if (quizSelected === idx) {
                        btnStyle = "border-rose-500/60 bg-rose-500/10 text-rose-300";
                      }
                    } else if (quizSelected === idx) {
                      btnStyle = "border-white/40 bg-white/[0.06] text-white";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setQuizSelected(idx)}
                        className={`w-full text-left p-3 rounded-sm border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && idx === sampleQuiz.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={quizSelected === null}
                    className="w-full py-2.5 rounded-sm bg-white text-black font-medium font-mono text-xs uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <p className="text-xs text-white/70 leading-relaxed">
                      <span className="font-semibold text-emerald-400">Analysis: </span>
                      {sampleQuiz.explanation}
                    </p>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizSelected(null);
                      }}
                      className="text-xs text-white/80 hover:text-white underline cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : project.id === 'tamilmathi' && activeTab === 'ai-assistant' ? (
            /* AI Assistant Simulator */
            <div className="space-y-4">
              <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10 flex flex-col h-72">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-white text-black font-medium'
                            : 'bg-white/[0.03] border border-white/10 text-white/80'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAskBot} className="pt-3 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about responsive design, CSS, or quiz mechanics..."
                    className="flex-1 px-3 py-2 text-xs rounded-sm bg-white/[0.02] border border-white/15 text-white focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-sm bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Default Overview Tab */
            <>
              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                  About the Project
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                  Key Capabilities & Implementations
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-sm bg-white/[0.02] border border-white/10 text-xs text-white/70 flex items-start gap-2.5"
                    >
                      <span className="text-white/30 font-mono text-[10px] mt-0.5">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2.5">
                  Technologies Utilized
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] rounded-sm bg-white/[0.03] border border-white/10 text-white/60 font-mono uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between gap-3">
          <div className="text-[11px] text-white/45 font-mono">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white underline underline-offset-4"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            ) : (
              <span>Developed by Yogesh Camalanadan</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:text-white rounded-sm transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
