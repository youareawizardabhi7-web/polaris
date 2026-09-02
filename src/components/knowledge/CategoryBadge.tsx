'use client';

import React from 'react';
import { KnowledgeCategory } from '@/lib/data/knowledge';

interface CategoryBadgeProps {
  category: KnowledgeCategory | string;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'Research':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'Publications':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Reports':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Education':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'FAQs':
        return 'bg-slate-100 text-slate-900 border-slate-200';
      case 'Glossary':
        return 'bg-cyan-100 text-cyan-900 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold font-mono border ${getBadgeStyle(
        category
      )} ${className}`}
    >
      {category}
    </span>
  );
};
