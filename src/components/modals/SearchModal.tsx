'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { unifiedSearch } from '@/lib/search';
import { Search, X, ArrowRight, Database, BookOpen, Newspaper, Navigation, Radio, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const { results, counts } = unifiedSearch(searchTerm, 'all');

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'dataset':
        return { label: 'DATASET', bg: 'bg-slate-800 text-sky-300 border-slate-700' };
      case 'knowledge':
        return { label: 'KNOWLEDGE', bg: 'bg-slate-800 text-emerald-300 border-slate-700' };
      case 'media':
        return { label: 'MEDIA', bg: 'bg-slate-800 text-rose-300 border-slate-700' };
      case 'expedition':
        return { label: 'EXPEDITION', bg: 'bg-slate-800 text-purple-300 border-slate-700' };
      case 'station':
        return { label: 'STATION', bg: 'bg-slate-800 text-blue-300 border-slate-700' };
      default:
        return { label: 'RESOURCE', bg: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="bg-slate-950/75 backdrop-blur-xl border border-slate-800/80 text-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in duration-150">
        
        {/* Search Header Input Form */}
        <form onSubmit={handleFullSearch} className="relative flex items-center border-b border-slate-800/80 pb-3">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search datasets, expeditions, stations, knowledge, media..."
            className="w-full bg-transparent px-3 py-1.5 text-white text-sm font-medium focus:outline-none placeholder-slate-400 font-sans"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-white mr-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-xs font-mono font-bold transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        {/* Quick Results Preview List */}
        <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
              {searchTerm.trim() ? `Found ${counts.all} Results` : 'Popular Searches'}
            </span>
          </div>

          {results.slice(0, 6).map((item) => {
            const badge = getTypeBadge(item.type);
            return (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => {
                  onClose();
                  router.push(item.url);
                }}
                className="p-3 rounded-xl border border-slate-800/60 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-800/60 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Footer Link to Full Search Page */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Press Enter to view all results</span>
          <button
            type="button"
            onClick={(e) => handleFullSearch(e)}
            className="text-slate-300 font-mono font-bold hover:text-white hover:underline flex items-center space-x-1 transition-colors"
          >
            <span>View All Search Results ({counts.all})</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
