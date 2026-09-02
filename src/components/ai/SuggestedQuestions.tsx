'use client';

import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  const suggestions = [
    'Find datasets related to Maitri',
    'Explain Antarctic atmospheric research',
    'What expeditions are related to glaciers?',
    'Show me information about the Arctic',
    'Explain this dataset simply',
    'Show related research'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
        <HelpCircle className="w-4 h-4 text-sky-600" />
        <span>Suggested Scientific Prompts</span>
      </div>

      <p className="text-xs text-slate-600">
        Click any suggested prompt below to query the POLARIS knowledge base:
      </p>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="px-3 py-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-900 hover:border-sky-300 border border-slate-200 text-slate-700 rounded-xl text-xs font-mono transition-all text-left flex items-center space-x-2 shadow-2xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform shrink-0" />
            <span>{q}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
