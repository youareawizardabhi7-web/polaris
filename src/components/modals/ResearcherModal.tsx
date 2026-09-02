'use client';

import React, { useState } from 'react';
import { X, UserCheck, Shield, Key, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface ResearcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearcherModal: React.FC<ResearcherModalProps> = ({ isOpen, onClose }) => {
  const [authType, setAuthType] = useState<'orcid' | 'ncpor' | 'guest'>('ncpor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Researcher Portal Access</h3>
            <p className="text-xs text-slate-500">Log in to save visualizations & request restricted datasets</p>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-bold text-slate-900 text-base">Authentication Successful</h4>
            <p className="text-xs text-slate-600">Welcome to POLARIS Scientific Research Workspace!</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Auth Provider Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAuthType('ncpor')}
                className={`py-2 rounded-lg text-xs font-semibold border flex flex-col items-center justify-center space-y-1 transition-all ${
                  authType === 'ncpor'
                    ? 'bg-sky-50 text-sky-900 border-sky-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4 text-sky-700" />
                <span>NCPOR SSO</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthType('orcid')}
                className={`py-2 rounded-lg text-xs font-semibold border flex flex-col items-center justify-center space-y-1 transition-all ${
                  authType === 'orcid'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>ORCID iD</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthType('guest')}
                className={`py-2 rounded-lg text-xs font-semibold border flex flex-col items-center justify-center space-y-1 transition-all ${
                  authType === 'guest'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Guest Token</span>
              </button>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-mono block">Researcher Institutional Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scientist@ncpor.res.in"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 font-mono block">Security Passcode / Token</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Authenticate & Access Workspace</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>

            <p className="text-[11px] text-center text-slate-500 pt-1">
              Protected by Ministry of Earth Sciences (MoES) Cyber Security Guidelines.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
