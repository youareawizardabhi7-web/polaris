'use client';

import React from 'react';
import { Database, Radio, Sliders, Navigation, Layers } from 'lucide-react';

export const Stats: React.FC = () => {
  const statsList = [
    {
      label: 'Scientific Datasets',
      value: '500+',
      description: 'Fully documented NetCDF, CSV & GeoJSON records',
      icon: Database,
      accent: 'text-sky-600'
    },
    {
      label: 'Research Stations',
      value: '25+',
      description: 'Active, seasonal & underwater observatories',
      icon: Radio,
      accent: 'text-blue-700'
    },
    {
      label: 'Observed Parameters',
      value: '100+',
      description: 'Meteorological, glaciological & oceanographic',
      icon: Sliders,
      accent: 'text-cyan-600'
    },
    {
      label: 'Polar Expeditions',
      value: '40+',
      description: 'Antarctic, Arctic & Southern Ocean missions',
      icon: Navigation,
      accent: 'text-indigo-600'
    },
    {
      label: 'Scientific Disciplines',
      value: '20+',
      description: 'Atmospheric, cryosphere, ocean & biology',
      icon: Layers,
      accent: 'text-slate-800'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="p-5 rounded-lg bg-slate-50/80 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.accent} group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                    POLAR DATA
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight group-hover:text-sky-900">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
