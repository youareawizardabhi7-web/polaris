'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_NEWS_ARTICLES } from '@/lib/data/media';
import { MediaCategoryBadge } from '@/components/media/MediaCategoryBadge';
import { RelatedDatasets } from '@/components/knowledge/RelatedDatasets';
import { RelatedExpeditions } from '@/components/knowledge/RelatedExpeditions';
import { RelatedKnowledge } from '@/components/media/RelatedKnowledge';
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  UserCheck, 
  Tag, 
  Share2, 
  Bookmark, 
  Check, 
  ArrowLeft, 
  Newspaper 
} from 'lucide-react';

export default function MediaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const article =
    MOCK_NEWS_ARTICLES.find((a) => a.id === articleId || a.slug === articleId) ||
    MOCK_NEWS_ARTICLES[0];

  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/media" className="hover:text-slate-900">Media & News</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-xs">{article.title}</span>
          </nav>

          <Link
            href="/media"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Media Portal</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-6">
          
          {/* Hero Banner Image */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <MediaCategoryBadge category={article.category} />
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono px-3 py-1 rounded-lg">
              {article.readingTime}
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Published: {article.publishedDate}</span>
                </span>
                <span>•</span>
                <span>{article.source}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                    isSaved
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-600' : ''}`} />
                  <span>{isSaved ? 'Saved Story' : 'Save Story'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-slate-700 font-semibold leading-relaxed border-l-4 border-blue-600 pl-4 py-1 bg-blue-50/30 rounded-r-lg">
              {article.summary}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Reported By</span>
                <strong className="text-slate-900">{article.author}</strong> — {article.source}
              </div>
            </div>
          </div>

        </div>

        {/* Article Body */}
        <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 font-sans">
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1">Topic Tags:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono border border-slate-200 flex items-center space-x-1"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </article>

        {/* Connected Modules: Datasets, Expeditions & Knowledge */}
        <RelatedDatasets datasetIds={article.relatedDatasetIds} />
        <RelatedExpeditions expeditionIds={article.relatedExpeditionIds} />
        <RelatedKnowledge knowledgeIds={article.relatedKnowledgeIds} />

      </div>
    </div>
  );
}
