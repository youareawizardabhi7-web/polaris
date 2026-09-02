'use client';

import React from 'react';
import Link from 'next/link';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { Layers, ArrowRight, User, Ship, Calendar } from 'lucide-react';

interface RelatedExpeditionsProps {
  expeditionIds: string[];
}

export const RelatedExpeditions: React.FC<RelatedExpeditionsProps> = ({ expeditionIds }) => {
  if (!expeditionIds || expeditionIds.length === 0) return null;

  const matchedExpeditions = INDIAN_POLAR_EXPEDITIONS.filter((exp) => expeditionIds.includes(exp.id));

  if (matchedExpeditions.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4 text-blue-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Connected Polar Expeditions</h3>
            <p className="text-xs text-slate-500">
              Field campaigns and scientific missions where research observations were gathered.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded text-xs font-mono font-bold">
          {matchedExpeditions.length} Expeditions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedExpeditions.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900">
                {exp.region}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{exp.year}</span>
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900">{exp.title}</h4>
            <p className="text-xs text-slate-600 line-clamp-2">{exp.summary}</p>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 font-mono space-y-1">
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Leader: {exp.leader}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Ship className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Base/Vessel: {exp.vesselOrBase}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <Link
                href="/expeditions"
                className="inline-flex items-center text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline space-x-1"
              >
                <span>Explore Expeditions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
