'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface KnowledgeSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  placeholder?: string;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search articles, publications, reports and scientific topics..."
}) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center bg-white border border-slate-300 rounded-xl shadow-xs focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all overflow-hidden">
        <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="p-2 mr-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
