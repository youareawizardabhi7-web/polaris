'use client';

import React from 'react';

interface MediaCategoryBadgeProps {
  category: string;
  className?: string;
}

export const MediaCategoryBadge: React.FC<MediaCategoryBadgeProps> = ({ category, className = '' }) => {
  const getStyle = (cat: string) => {
    switch (cat) {
      case 'News':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Expedition Updates':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'Announcements':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Research Highlights':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Events':
        return 'bg-indigo-100 text-indigo-900 border-indigo-200';
      case 'Videos':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      case 'Photo Stories':
        return 'bg-cyan-100 text-cyan-900 border-cyan-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold font-mono border ${getStyle(
        category
      )} ${className}`}
    >
      {category}
    </span>
  );
};
