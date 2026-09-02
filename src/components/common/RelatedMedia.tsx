'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/data/media';
import { Video, Newspaper, ArrowRight, Calendar } from 'lucide-react';

interface RelatedMediaProps {
  mediaIds?: string[];
  title?: string;
}

export const RelatedMedia: React.FC<RelatedMediaProps> = ({ mediaIds, title = 'Related Media & Dispatches' }) => {
  if (!mediaIds || mediaIds.length === 0) return null;

  const linkedNews = MOCK_NEWS_ARTICLES.filter((n) => mediaIds.includes(n.id));
  const linkedVideos = MOCK_VIDEOS.filter((v) => mediaIds.includes(v.id));

  if (linkedNews.length === 0 && linkedVideos.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <Newspaper className="w-5 h-5 text-rose-700" />
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {linkedNews.map((article) => (
          <Link
            key={article.id}
            href={`/media/${article.id}`}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-900">
                  {article.category}
                </span>
                <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{article.publishedDate}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs font-mono font-bold text-rose-700">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

        {linkedVideos.map((video) => (
          <Link
            key={video.id}
            href={`/media`}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 flex items-center space-x-1">
                  <Video className="w-3 h-3 text-rose-400" />
                  <span>Video Archive ({video.duration})</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{video.publishedDate}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                {video.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs font-mono font-bold text-rose-700">
              <span>Watch Video Stream ▶</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
