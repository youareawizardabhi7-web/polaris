'use client';

import React from 'react';
import { Database, Radio, Sliders, Navigation, Layers } from 'lucide-react';
import { Card3D } from '@/components/ui/animated-3d-card';

export const Stats: React.FC = () => {
  const statsList = [
    {
      label: 'Scientific Datasets',
      value: '500+',
      description: 'Fully documented NetCDF, CSV & GeoJSON records',
      icon: Database,
      theme: 'primary' as const
    },
    {
      label: 'Research Stations',
      value: '25+',
      description: 'Active, seasonal & underwater observatories',
      icon: Radio,
      theme: 'secondary' as const
    },
    {
      label: 'Observed Parameters',
      value: '100+',
      description: 'Meteorological, glaciological & oceanographic',
      icon: Sliders,
      theme: 'info' as const
    },
    {
      label: 'Polar Expeditions',
      value: '40+',
      description: 'Antarctic, Arctic & Southern Ocean missions',
      icon: Navigation,
      theme: 'accent' as const
    },
    {
      label: 'Scientific Disciplines',
      value: '20+',
      description: 'Atmospheric, cryosphere, ocean & biology',
      icon: Layers,
      theme: 'success' as const
    }
  ];

  return (
    <section className="bg-transparent border-b border-slate-800/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card3D
                key={index}
                title=""
                description=""
                size="auto"
                theme={stat.theme}
                variant="premium"
                className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 shadow-2xl"
              >
                <div className="flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shadow-inner">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-white font-bold tracking-wider">
                      POLAR DATA
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-white mt-1 drop-shadow-sm">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-white mt-1 leading-snug font-medium drop-shadow-sm">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
