import React, { useState } from 'react';
import { Shield, Plus, Briefcase, BookOpen, Award, MessageSquare, LogOut, Check, ChevronUp, ChevronDown, Mail, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminFloatingBar: React.FC = () => {
  const { isAdmin, logoutAdmin, openAddModal, messages, fetchMessages } = usePortfolio();
  const [expanded, setExpanded] = useState(false);
  const [messagesModalOpen, setMessagesModalOpen] = useState(false);

  if (!isAdmin) return null;

  const handleOpenMessages = async () => {
    await fetchMessages();
    setMessagesModalOpen(true);
  };

  return (
    <>
      {/* Floating Pill */}
      <div
        id="admin-floating-bar"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      >
        {/* Expanded menu */}
        {expanded && (
          <div className="p-3 rounded-2xl bg-[#061026]/95 border border-blue-600/50 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-[11px] font-mono font-bold text-blue-400 px-2 uppercase tracking-wider">
              Owner Management
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  openAddModal('project');
                  setExpanded(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-blue-600/30 border border-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors text-left"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Add Project</span>
              </button>

              <button
                onClick={() => {
                  openAddModal('internship');
                  setExpanded(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-blue-600/30 border border-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors text-left"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Add Internship</span>
              </button>

              <button
                onClick={() => {
                  openAddModal('course');
                  setExpanded(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-cyan-600/30 border border-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Add Course</span>
              </button>

              <button
                onClick={() => {
                  openAddModal('certificate');
                  setExpanded(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-amber-600/30 border border-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors text-left"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Certificate</span>
              </button>

              <button
                onClick={() => {
                  handleOpenMessages();
                  setExpanded(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-purple-600/30 border border-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors text-left"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                <span>Inbox Messages</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs font-medium transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Pill */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#061026] border border-blue-500/80 shadow-xl shadow-blue-950/70">
          <div className="flex items-center gap-2 pl-3 pr-2 py-1 text-xs font-medium text-white">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Admin Mode Active</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md cursor-pointer"
            title="Toggle Admin Tools"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Messages Inbox Modal */}
      {messagesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setMessagesModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#061026] border border-blue-900/60 p-6 shadow-2xl shadow-blue-950/60 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Contact Submissions Inbox</h3>
                  <p className="text-xs text-slate-400">Inquiries submitted by website visitors</p>
                </div>
              </div>
              <button
                onClick={() => setMessagesModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm space-y-2">
                <Mail className="w-8 h-8 mx-auto text-slate-600" />
                <p>No contact inquiries received yet.</p>
                <p className="text-xs text-slate-500">Messages sent via the Contact form will be securely archived here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-white text-sm">{msg.name}</div>
                        <a href={`mailto:${msg.email}`} className="text-xs text-blue-400 hover:underline">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {msg.subject && (
                      <div className="text-xs font-semibold text-slate-300">
                        Subject: {msg.subject}
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-slate-300 bg-black/40 p-3 rounded-lg border border-slate-800/80 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
