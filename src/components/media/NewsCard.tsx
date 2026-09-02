'use client';

import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/lib/data/media';
import { MediaCategoryBadge } from '@/components/media/MediaCategoryBadge';
import { Clock, Calendar, ArrowRight, Tag, UserCheck } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
      {/* Image Thumbnail */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <MediaCategoryBadge category={article.category} />
        </div>
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
          <Clock className="w-3 h-3 text-sky-400" />
          <span>{article.readingTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedDate}</span>
            </span>
            <span className="truncate max-w-[150px]">{article.source}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
            <Link href={`/media/${article.id}`}>{article.title}</Link>
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.slice(0, 3).map((t, idx) => (
              <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 flex items-center">
                <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Read More Link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">{article.author}</span>
          <Link
            href={`/media/${article.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
