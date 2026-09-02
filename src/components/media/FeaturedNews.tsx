'use client';

import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/lib/data/media';
import { MediaCategoryBadge } from '@/components/media/MediaCategoryBadge';
import { ArrowRight, Calendar, Layers, Database, Sparkles } from 'lucide-react';

interface FeaturedNewsProps {
  article: NewsArticle;
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ article }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:border-sky-300 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0 group">
      
      {/* Hero Image / Banner */}
      <div className="lg:col-span-6 relative min-h-[280px] bg-slate-900 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded text-xs font-mono font-bold flex items-center space-x-1 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED STORY</span>
          </span>
          <MediaCategoryBadge category={article.category} />
        </div>
      </div>

      {/* Hero Copy */}
      <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedDate}</span>
            </span>
            <span>•</span>
            <span>{article.source}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
            <Link href={`/media/${article.id}`}>{article.title}</Link>
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Action Buttons & Links */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/media/${article.id}`}
              className="px-5 py-2.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-2"
            >
              <span>Read Full Report</span>
              <ArrowRight className="w-4 h-4 text-sky-300" />
            </Link>

            {article.relatedExpeditionIds && article.relatedExpeditionIds.length > 0 && (
              <Link
                href="/expeditions"
                className="px-3.5 py-2 bg-slate-100 hover:bg-blue-100 text-blue-900 border border-slate-200 rounded-xl text-xs font-mono font-bold transition-colors flex items-center space-x-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Related Expedition</span>
              </Link>
            )}

            {article.relatedDatasetIds && article.relatedDatasetIds.length > 0 && (
              <Link
                href={`/datasets/${article.relatedDatasetIds[0]}`}
                className="px-3.5 py-2 bg-slate-100 hover:bg-sky-100 text-sky-900 border border-slate-200 rounded-xl text-xs font-mono font-bold transition-colors flex items-center space-x-1.5"
              >
                <Database className="w-3.5 h-3.5 text-sky-600" />
                <span>View Dataset</span>
              </Link>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
