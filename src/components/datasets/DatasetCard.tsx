'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DatasetItem } from '@/types/portal';
import { Calendar, MapPin, FileCode, HardDrive, Bookmark, ArrowRight, Tag } from 'lucide-react';
import { Card3D } from '@/components/ui/animated-3d-card';

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
    return 'bg-slate-900 text-white border-slate-700 font-bold';
  };

  return (
    <Card3D
      title=""
      description=""
      size="auto"
      theme="primary"
      variant="premium"
      className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 shadow-2xl"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Header Badges & Bookmark Button */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getRegionBadgeColor(dataset.region)}`}>
                {dataset.region}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-900 text-white border border-slate-700 font-mono">
                {dataset.discipline}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-white border border-slate-700 font-bold">
                {dataset.dataFormat}
              </span>
            </div>

            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                  : 'text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Saved to Research Workspace' : 'Save Dataset'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>

          {/* Dataset Title */}
          <Link href={`/datasets/${dataset.id}`} className="block group-hover:text-slate-200 transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {dataset.title}
            </h3>
          </Link>

          {/* Metadata Details Grid */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-white my-3 pt-2 border-t border-slate-800/60 font-medium">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span className="truncate">{dataset.station}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span className="truncate">{dataset.temporalCoverage}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <HardDrive className="w-3.5 h-3.5 text-white" />
              <span>{dataset.fileSize}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FileCode className="w-3.5 h-3.5 text-white" />
              <span className="truncate font-mono text-white">{dataset.id}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-white line-clamp-2 leading-relaxed font-normal">
            {dataset.shortDescription}
          </p>

          {/* Tag List */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {dataset.tags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="inline-flex items-center text-[10px] text-white bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-medium">
                <Tag className="w-2.5 h-2.5 mr-1 text-white" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-[11px] text-white">
            Updated: <span className="font-mono text-white font-semibold">{dataset.lastUpdated}</span>
          </span>

          <Link
            href={`/datasets/${dataset.id}`}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-white hover:bg-slate-200 transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
          >
            <span>View Dataset</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </Link>
        </div>
      </div>
    </Card3D>
  );
};
