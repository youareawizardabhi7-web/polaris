'use client';

import React from 'react';
import { KnowledgeCategory } from '@/lib/data/knowledge';
import { SlidersHorizontal } from 'lucide-react';

interface KnowledgeFiltersProps {
  activeCategory: KnowledgeCategory;
  onCategoryChange: (cat: KnowledgeCategory) => void;
  sortBy: 'relevance' | 'newest' | 'title';
  onSortChange: (sort: 'relevance' | 'newest' | 'title') => void;
}

export const KnowledgeFilters: React.FC<KnowledgeFiltersProps> = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  const categories: KnowledgeCategory[] = [
    'All',
    'Research',
    'Publications',
    'Reports',
    'Education',
    'FAQs',
    'Glossary'
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs border border-slate-900'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center space-x-2 shrink-0">
        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-mono text-slate-500">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest First</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
};
