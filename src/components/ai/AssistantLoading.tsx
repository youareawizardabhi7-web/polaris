'use client';

import React from 'react';
import { Compass, Loader2 } from 'lucide-react';

export const AssistantLoading: React.FC = () => {
  return (
    <div className="flex items-start space-x-3 animate-in fade-in duration-200">
      <div className="w-8 h-8 rounded-lg bg-slate-900 text-sky-400 flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
        <Compass className="w-4 h-4 text-sky-400 animate-spin" />
      </div>

      <div className="bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs font-mono text-slate-700 flex items-center space-x-2.5 shadow-2xs">
        <Loader2 className="w-4 h-4 text-sky-600 animate-spin shrink-0" />
        <span>Analyzing POLARIS scientific knowledge base...</span>
      </div>
    </div>
  );
};
