'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_KNOWLEDGE_RESOURCES } from '@/lib/data/knowledge';
import { BookOpenText, ArrowRight, Clock, UserCheck } from 'lucide-react';

interface RelatedKnowledgeProps {
  knowledgeIds: string[];
}

export const RelatedKnowledge: React.FC<RelatedKnowledgeProps> = ({ knowledgeIds }) => {
  if (!knowledgeIds || knowledgeIds.length === 0) return null;

  const matchedArticles = MOCK_KNOWLEDGE_RESOURCES.filter(
    (k) => knowledgeIds.includes(k.id) || knowledgeIds.includes(k.slug)
  );

  if (matchedArticles.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <BookOpenText className="w-4 h-4 text-sky-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Connected Knowledge Repository Resources</h3>
            <p className="text-xs text-slate-500">
              Deep-dive scientific publications and analytical reports related to this news story.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded text-xs font-mono font-bold">
          {matchedArticles.length} Related Resources
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedArticles.map((art) => (
          <div
            key={art.id}
            className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-sky-300 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-900">
                  {art.category}
                </span>
                <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.readingTime}</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{art.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{art.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">{art.author}</span>
              <Link
                href={`/knowledge/${art.id}`}
                className="inline-flex items-center space-x-1 text-xs font-bold text-sky-700 hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
