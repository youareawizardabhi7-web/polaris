'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Mountain, Waves } from 'lucide-react';
import { REGION_CARDS_DATA } from '@/lib/data/datasets';

export const RegionCards: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'Antarctica':
        return <Compass className="w-8 h-8 text-blue-600" />;
      case 'Arctic':
        return <Shield className="w-8 h-8 text-sky-600" />;
      case 'Himalayas':
        return <Mountain className="w-8 h-8 text-teal-600" />;
      case 'Southern Ocean':
        return <Waves className="w-8 h-8 text-indigo-600" />;
      default:
        return <Compass className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-semibold text-sky-700 tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>GEOGRAPHIC COVERAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Polar Region
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md mt-2 md:mt-0">
            Select a geographic domain to browse scientific data, active observation networks, and historical expeditions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGION_CARDS_DATA.map((region) => (
            <div
              key={region.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon & Count Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-sky-50 group-hover:border-sky-200 transition-colors">
                    {getIcon(region.id)}
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold rounded-md">
                    {region.datasetCount}
                  </span>
                </div>

                {/* Title & Stations Info */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                  {region.title}
                </h3>
                
                <span className="inline-block text-xs font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 my-2">
                  {region.stationsCount}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {region.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={`/explore?region=${encodeURIComponent(region.id)}`}
                  className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors space-x-1.5"
                >
                  <span>Explore Datasets</span>
                  <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
