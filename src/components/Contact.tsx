import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Contact Inquiry',
          message: formData.message.trim()
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      // Fallback: still provide mailto backup if offline
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hello Yogesh,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
      )}`;
      window.open(mailtoUrl, '_blank');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-10 text-left">
          <div className="text-blue-500 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
            CONTACT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Looking for an enthusiastic web developer or have an inquiry? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div 
              onClick={handleCopyEmail}
              className="p-5 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/60 transition-all flex items-center justify-between cursor-pointer group shadow-lg"
              title="Click to copy email address"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Address</div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg text-slate-400 hover:text-white" aria-label="Copy email">
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div 
              onClick={handleCopyPhone}
              className="p-5 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/60 transition-all flex items-center justify-between cursor-pointer group shadow-lg"
              title="Click to copy phone number"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Phone</div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-lg text-slate-400 hover:text-white" aria-label="Copy phone">
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-[#061026]/90 border border-slate-800/80 flex items-center gap-4 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Location</div>
                <div className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

            {/* GitHub Profile Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-[#061026]/90 border border-slate-800/80 hover:border-blue-500/60 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-900/60 flex items-center justify-center text-blue-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">GitHub Code Repositories</div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    github.com/yogesh
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-400 font-medium">Visit Profile →</div>
            </a>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#061026]/90 border border-slate-800/80 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Send a Message</span>
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Have an internship opportunity or a query? Drop a message below and I'll get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-blue-950/40 border border-blue-800/60 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out! Your message has been safely delivered and dispatched to <span className="text-blue-400 font-mono">yogesh191206@gmail.com</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold mt-2 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship / Collaboration Inquiry"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Yogesh, I came across your portfolio..."
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
