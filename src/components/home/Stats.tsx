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
      accent: 'text-white'
    },
    {
      label: 'Research Stations',
      value: '25+',
      description: 'Active, seasonal & underwater observatories',
      icon: Radio,
      accent: 'text-white'
    },
    {
      label: 'Observed Parameters',
      value: '100+',
      description: 'Meteorological, glaciological & oceanographic',
      icon: Sliders,
      accent: 'text-white'
    },
    {
      label: 'Polar Expeditions',
      value: '40+',
      description: 'Antarctic, Arctic & Southern Ocean missions',
      icon: Navigation,
      accent: 'text-white'
    },
    {
      label: 'Scientific Disciplines',
      value: '20+',
      description: 'Atmospheric, cryosphere, ocean & biology',
      icon: Layers,
      accent: 'text-white'
    }
  ];

  return (
    <section className="bg-transparent border-b border-slate-800/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="p-5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 hover:border-slate-600 hover:bg-slate-950 transition-all duration-200 group shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.accent} group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] font-mono uppercase text-white font-bold tracking-wider">
                    POLAR DATA
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-sm group-hover:text-slate-200">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-100 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-300 mt-1 leading-snug">
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
