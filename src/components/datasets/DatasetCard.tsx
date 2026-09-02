'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DatasetItem } from '@/types/portal';
import { Calendar, MapPin, FileCode, HardDrive, Bookmark, ArrowRight, Check, Tag } from 'lucide-react';

interface DatasetCardProps {
  dataset: DatasetItem;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getRegionBadgeColor = (region: string) => {
    switch (region) {
      case 'Antarctica':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Arctic':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Himalayas':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Southern Ocean':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Header Badges & Bookmark Button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getRegionBadgeColor(dataset.region)}`}>
              {dataset.region}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 font-mono">
              {dataset.discipline}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-50 text-sky-700 border border-sky-200 font-bold">
              {dataset.dataFormat}
            </span>
          </div>

          <button
            onClick={toggleBookmark}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Saved to Research Workspace' : 'Save Dataset'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Dataset Title */}
        <Link href={`/datasets/${dataset.id}`} className="block group-hover:text-sky-800 transition-colors">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {dataset.title}
          </h3>
        </Link>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-slate-600 my-3 pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{dataset.station}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{dataset.temporalCoverage}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-400" />
            <span>{dataset.fileSize}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate font-mono">{dataset.id}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {dataset.shortDescription}
        </p>

        {/* Tag List */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {dataset.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="inline-flex items-center text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
              <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Updated: <span className="font-mono text-slate-600">{dataset.lastUpdated}</span>
        </span>

        <Link
          href={`/datasets/${dataset.id}`}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center space-x-1.5 active:scale-95 shadow-xs"
        >
          <span>View Dataset</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </Link>
      </div>
    </div>
  );
};
