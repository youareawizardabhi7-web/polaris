'use client';

import React from 'react';
import Link from 'next/link';
import { AssistantSource } from '@/types/assistant';
import { Database, BookOpen, Newspaper, Navigation, Radio, ArrowRight, ExternalLink } from 'lucide-react';

interface SourceCardProps {
  source: AssistantSource;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  const getBadgeStyle = (type: AssistantSource['type']) => {
    switch (type) {
      case 'dataset':
        return { label: 'DATASET', bg: 'bg-sky-100 text-sky-900 border-sky-300', icon: Database };
      case 'knowledge':
        return { label: 'KNOWLEDGE', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: BookOpen };
      case 'media':
        return { label: 'MEDIA', bg: 'bg-rose-100 text-rose-900 border-rose-300', icon: Newspaper };
      case 'expedition':
        return { label: 'EXPEDITION', bg: 'bg-purple-100 text-purple-900 border-purple-300', icon: Navigation };
      case 'station':
        return { label: 'STATION', bg: 'bg-blue-100 text-blue-900 border-blue-300', icon: Radio };
      default:
        return { label: 'RESOURCE', bg: 'bg-slate-100 text-slate-900 border-slate-300', icon: ExternalLink };
    }
  };

  const badge = getBadgeStyle(source.type);
  const Icon = badge.icon;

  return (
    <Link
      href={source.url}
      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 transition-all group flex flex-col justify-between space-y-2 shadow-2xs"
    >
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center space-x-1 ${badge.bg}`}>
            <Icon className="w-3 h-3" />
            <span>{badge.label}</span>
          </span>
        </div>

        <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-800 transition-colors line-clamp-1">
          {source.title}
        </h4>

        {source.description && (
          <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            {source.description}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono font-bold text-sky-700">
        <span>View {source.type}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
