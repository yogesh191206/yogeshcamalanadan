import React, { useState } from 'react';
import { Award, Plus, Calendar, ExternalLink, Trash2, Eye, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Certificate } from '../types';

export const Certifications: React.FC = () => {
  const { certificates, isAdmin, openAddModal, deleteItem } = usePortfolio();
  const [activeCertPreview, setActiveCertPreview] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div className="space-y-2">
            <div className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
              CERTIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Certifications
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Accredited course completions across full-stack engineering, web fundamentals, programming paradigms, and modern developer tools.
            </p>
          </div>

          {/* Admin "Add Certificate" Button - Only visible to owner/admin */}
          {isAdmin && (
            <button
              id="btn-add-certificate-admin"
              onClick={() => openAddModal('certificate')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certificate</span>
            </button>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="p-6 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200 flex flex-col justify-between group space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                      {cert.tag}
                    </span>
                    {isAdmin && cert.isCustom && (
                      <button
                        onClick={() => deleteItem('certificates', cert.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <p className="font-semibold text-[#38bdf8]">
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        {cert.date}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Skills covered & Certificate Links */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
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

                {/* Certificate Action links */}
                {(cert.certificateLink || cert.certificateImage) && (
                  <div className="pt-2 flex items-center gap-3 text-xs">
                    {cert.certificateImage && (
                      <button
                        onClick={() => setActiveCertPreview(cert)}
                        className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Document</span>
                      </button>
                    )}
                    {cert.certificateLink && (
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#38bdf8] hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Certificate Document Preview Modal */}
      {activeCertPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveCertPreview(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#061026] border border-blue-900/80 p-6 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCertPreview(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">{activeCertPreview.title}</h3>
              <p className="text-xs text-blue-400 font-semibold">{activeCertPreview.issuer} • {activeCertPreview.date}</p>
            </div>

            {activeCertPreview.certificateImage?.startsWith('data:application/pdf') ? (
              <embed
                src={activeCertPreview.certificateImage}
                type="application/pdf"
                className="w-full h-[500px] rounded-xl border border-slate-800"
              />
            ) : (
              <img
                src={activeCertPreview.certificateImage}
                alt={activeCertPreview.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[500px] object-contain rounded-xl border border-slate-800 bg-black/50"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
