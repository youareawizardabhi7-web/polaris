'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EXPEDITION_UPDATES } from '@/lib/data/media';
import { sortByDateDesc } from '@/lib/utils/date';
import { Layers, ArrowRight, Calendar, Database } from 'lucide-react';

export const ExpeditionUpdatesList: React.FC = () => {
  const sortedUpdates = sortByDateDesc(MOCK_EXPEDITION_UPDATES, 'date');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Expedition Updates</h2>
            <p className="text-xs text-slate-500">
              Live field reports, logistics updates, and sensor deployment dispatches from ongoing missions.
            </p>
          </div>
        </div>

        <Link
          href="/expeditions"
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-sky-700 hover:text-sky-900 hover:underline"
        >
          <span>All Indian Expeditions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Updates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedUpdates.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-900">
                  {item.region}
                </span>
                <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.expeditionTitle}</h3>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{item.summary}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">{item.details}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              {item.relatedDatasetIds && item.relatedDatasetIds.length > 0 && (
                <Link
                  href={`/datasets/${item.relatedDatasetIds[0]}`}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-sky-800 hover:underline"
                >
                  <Database className="w-3 h-3 text-sky-600" />
                  <span>Dataset {item.relatedDatasetIds[0]}</span>
                </Link>
              )}

              <Link
                href="/expeditions"
                className="inline-flex items-center space-x-1 text-xs font-bold text-slate-900 hover:text-sky-700"
              >
                <span>View Expedition</span>
                <ArrowRight className="w-3 h-3 text-sky-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
