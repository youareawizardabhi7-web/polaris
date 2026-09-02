'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_KNOWLEDGE_RESOURCES } from '@/lib/data/knowledge';
import { CategoryBadge } from '@/components/knowledge/CategoryBadge';
import { RelatedDatasets } from '@/components/knowledge/RelatedDatasets';
import { RelatedExpeditions } from '@/components/knowledge/RelatedExpeditions';
import { RelatedMedia } from '@/components/common/RelatedMedia';
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  UserCheck, 
  Tag, 
  Share2, 
  Bookmark, 
  Check, 
  FileText, 
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function KnowledgeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = params.id as string;

  const resource =
    MOCK_KNOWLEDGE_RESOURCES.find((r) => r.id === resourceId || r.slug === resourceId) ||
    MOCK_KNOWLEDGE_RESOURCES[0];

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
        
        {/* Breadcrumb Navigation & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/knowledge" className="hover:text-slate-900">Knowledge Repository</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-xs">{resource.title}</span>
          </nav>

          <Link
            href="/knowledge"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Repository</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CategoryBadge category={resource.category} />
              <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{resource.readingTime}</span>
              </span>
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
                <span>{isSaved ? 'Saved to Workspace' : 'Save Article'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <Link
                href={`/assistant?contextType=knowledge&contextId=${resource.id}&contextTitle=${encodeURIComponent(resource.title)}`}
                className="px-3 py-1.5 bg-sky-50 border border-sky-300 hover:bg-sky-100 text-sky-900 font-bold rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Explain Simply with AI</span>
              </Link>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {resource.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed font-sans border-l-4 border-sky-500 pl-4 py-1 bg-sky-50/40 rounded-r-lg">
            {resource.description}
          </p>

          {/* Author & Publication Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Scientific Author</span>
                <strong className="text-slate-900">{resource.author}</strong> ({resource.organization})
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Publication Record</span>
                <span className="text-slate-900">Published: {resource.publishedDate} • Updated: {resource.updatedDate}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1">Tags:</span>
            {resource.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono border border-slate-200 flex items-center space-x-1"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main Article Body (Structured Sections) */}
        <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 font-sans">
          {resource.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tracking-tight border-b border-slate-200 pb-2">
                {sec.title}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.keyPoints && sec.keyPoints.length > 0 && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-2 text-xs sm:text-sm font-mono text-slate-800">
                  <span className="font-bold text-sky-900 uppercase tracking-wider block">Key Technical Highlights:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {sec.keyPoints.map((kp, kpIdx) => (
                      <li key={kpIdx}>{kp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* References */}
          {resource.references && resource.references.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3 font-mono text-xs text-slate-600">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Scientific References & Citations</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {resource.references.map((ref, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">{ref}</li>
                ))}
              </ol>
            </div>
          )}
        </article>

        {/* Connected Datasets */}
        <RelatedDatasets datasetIds={resource.relatedDatasetIds} />

        {/* Connected Expeditions */}
        <RelatedExpeditions expeditionIds={resource.relatedExpeditionIds} />

        {/* Connected Media & Dispatches */}
        <RelatedMedia mediaIds={resource.relatedMediaIds} />

      </div>
    </div>
  );
}
