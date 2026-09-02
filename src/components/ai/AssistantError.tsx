'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface AssistantErrorProps {
  message?: string;
  onRetry: () => void;
}

export const AssistantError: React.FC<AssistantErrorProps> = ({ 
  message = "Unable to connect to the POLARIS AI service.", 
  onRetry 
}) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-amber-950">{message}</h4>
          <p className="text-[11px] text-amber-800 font-mono">Please try again.</p>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="px-3.5 py-2 bg-amber-900 hover:bg-amber-950 text-white rounded-lg font-mono font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shrink-0 shadow-2xs"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
};
