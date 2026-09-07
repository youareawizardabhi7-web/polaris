'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Mountain, Waves } from 'lucide-react';
import { REGION_CARDS_DATA } from '@/lib/data/datasets';
import { Card3D } from '@/components/ui/animated-3d-card';

export const RegionCards: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'Antarctica':
        return <Compass className="w-8 h-8 text-white" />;
      case 'Arctic':
        return <Shield className="w-8 h-8 text-white" />;
      case 'Himalayas':
        return <Mountain className="w-8 h-8 text-white" />;
      case 'Southern Ocean':
        return <Waves className="w-8 h-8 text-white" />;
      default:
        return <Compass className="w-8 h-8 text-white" />;
    }
  };

  const themes = {
    Antarctica: 'secondary' as const,
    Arctic: 'info' as const,
    Himalayas: 'success' as const,
    'Southern Ocean': 'accent' as const,
  };

  return (
    <section className="py-12 bg-transparent border-b border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Glass Card */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-white tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GEOGRAPHIC COVERAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              Explore by Polar Region
            </h2>
          </div>
          <p className="text-sm text-white max-w-md leading-relaxed font-medium">
            Select a geographic domain to browse scientific data, active observation networks, and historical expeditions.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGION_CARDS_DATA.map((region) => (
            <Card3D
              key={region.id}
              title=""
              description=""
              size="auto"
              theme={themes[region.id as keyof typeof themes] || 'primary'}
              variant="premium"
              className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 shadow-2xl"
            >
              <div className="flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                      {getIcon(region.id)}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md my-2">
                    {region.title}
                  </h3>

                  <p className="text-xs text-white leading-relaxed mt-2 font-normal drop-shadow-sm">
                    {region.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60">
                  <Link
                    href={`/explore?region=${encodeURIComponent(region.id)}`}
                    className="inline-flex items-center text-xs font-bold text-white hover:text-slate-200 transition-colors space-x-1.5"
                  >
                    <span>Explore Datasets</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
