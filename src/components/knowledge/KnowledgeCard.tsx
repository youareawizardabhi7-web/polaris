'use client';

import React from 'react';
import Link from 'next/link';
import { KnowledgeResource } from '@/lib/data/knowledge';
import { CategoryBadge } from '@/components/knowledge/CategoryBadge';
import { Clock, Calendar, ArrowRight, UserCheck, Tag } from 'lucide-react';

interface KnowledgeCardProps {
  resource: KnowledgeResource;
  featured?: boolean;
}

export const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ resource, featured = false }) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group ${
        featured ? 'ring-1 ring-sky-200 bg-gradient-to-br from-white via-white to-sky-50/30' : ''
      }`}
    >
      <div className="space-y-4">
        {/* Top Badge & Read Time */}
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={resource.category} />
          <div className="flex items-center space-x-1 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{resource.readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
          <Link href={`/knowledge/${resource.id}`}>{resource.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
          {resource.description}
        </p>

        {/* Metadata: Author / Org / Date */}
        <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-1.5 text-slate-700 font-medium truncate">
            <UserCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate">{resource.author} • {resource.organization}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Published: {resource.publishedDate}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {resource.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200"
            >
              <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* View Button */}
      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">Scientific Article</span>
        <Link
          href={`/knowledge/${resource.id}`}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs group-hover:bg-sky-600"
        >
          <span>Read Resource</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
        </Link>
      </div>
    </div>
  );
};
