'use client';

import React from 'react';
import Link from 'next/link';
import { RESEARCH_STATIONS } from '@/lib/data/stations';
import { Radio, ArrowRight, MapPin, Compass } from 'lucide-react';

interface RelatedStationsProps {
  stationIds?: string[];
  title?: string;
}

export const RelatedStations: React.FC<RelatedStationsProps> = ({ stationIds, title = 'Related Research Stations' }) => {
  if (!stationIds || stationIds.length === 0) return null;

  const linkedStations = RESEARCH_STATIONS.filter((s) => stationIds.includes(s.id));
  if (linkedStations.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <Radio className="w-5 h-5 text-blue-700" />
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {linkedStations.map((station) => (
          <Link
            key={station.id}
            href={`/map?station=${station.id}`}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900">
                  {station.region}
                </span>
                <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Est. {station.established}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {station.name}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {station.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs font-mono font-bold text-blue-700">
              <span>View Station on Polar Map</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
