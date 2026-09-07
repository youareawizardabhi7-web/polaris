'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Mountain, Waves } from 'lucide-react';
import { REGION_CARDS_DATA } from '@/lib/data/datasets';

export const RegionCards: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'Antarctica':
        return <Compass className="w-8 h-8 text-slate-200" />;
      case 'Arctic':
        return <Shield className="w-8 h-8 text-slate-200" />;
      case 'Himalayas':
        return <Mountain className="w-8 h-8 text-slate-200" />;
      case 'Southern Ocean':
        return <Waves className="w-8 h-8 text-slate-200" />;
      default:
        return <Compass className="w-8 h-8 text-slate-200" />;
    }
  };

  return (
    <section className="py-12 bg-transparent border-b border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Glass Card */}
        <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-slate-300 tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GEOGRAPHIC COVERAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              Explore by Polar Region
            </h2>
          </div>
          <p className="text-sm text-slate-200 max-w-md leading-relaxed">
            Select a geographic domain to browse scientific data, active observation networks, and historical expeditions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGION_CARDS_DATA.map((region) => (
            <div
              key={region.id}
              className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:border-slate-600 hover:bg-slate-950 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon & Count Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                    {getIcon(region.id)}
                  </div>
                  <span className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 text-slate-200 font-mono text-xs font-bold rounded-md">
                    {region.datasetCount}
                  </span>
                </div>

                {/* Title & Stations Info */}
                <h3 className="text-xl font-bold text-white group-hover:text-slate-200 transition-colors">
                  {region.title}
                </h3>
                
                <span className="inline-block text-xs font-bold text-slate-200 bg-slate-900 px-2.5 py-1 rounded border border-slate-700 my-2">
                  {region.stationsCount}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {region.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-800/60">
                <Link
                  href={`/explore?region=${encodeURIComponent(region.id)}`}
                  className="inline-flex items-center text-xs font-bold text-slate-200 hover:text-white transition-colors space-x-1.5"
                >
                  <span>Explore Datasets</span>
                  <ArrowRight className="w-4 h-4 text-slate-200 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
