import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginOpen, closeAdminLogin, loginAdmin } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter your admin passcode.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const res = await loginAdmin(passcode.trim());
    setLoading(false);

    if (res.success) {
      setSuccess(res.message);
      setTimeout(() => {
        setPasscode('');
        setSuccess(null);
      }, 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <div
      id="admin-login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAdminLogin}
    >
      <div
        id="admin-login-modal"
        className="w-full max-w-md rounded-2xl bg-[#061026] border border-blue-900/60 p-6 sm:p-8 shadow-2xl shadow-blue-950/50 space-y-6 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAdminLogin}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Owner Authentication</h3>
            <p className="text-xs text-slate-400">Enter your secure passcode to manage portfolio items</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Passcode</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. yogesh@2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/90 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Default passcode: <span className="text-blue-400 font-mono">yogesh@2026</span>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeAdminLogin}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Verifying...' : 'Unlock Admin Portal'}
            </button>
          </div>
        </form>

        <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
          Shortcut tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">A</kbd> anytime to open this prompt.
        </div>
      </div>
    </div>
  );
};
