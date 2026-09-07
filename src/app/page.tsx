'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoScrubBackground } from '@/components/home/VideoScrubBackground';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { RegionCards } from '@/components/home/RegionCards';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { fetchDatasets } from '@/lib/api/portal';
import { DatasetItem } from '@/types/portal';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { Database, ArrowRight, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [datasets, setDatasets] = useState<DatasetItem[]>(MOCK_DATASETS);

  useEffect(() => {
    fetchDatasets().then((items) => {
      if (items && items.length > 0) {
        setDatasets(items);
      }
    });
  }, []);

  const featuredDatasets = datasets.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-slate-950/40">
      {/* Background Scroll-Tied Video Layer */}
      <VideoScrubBackground />

      {/* Existing POLARIS Homepage Content */}
      <div className="relative z-10 space-y-0">
        {/* Hero Section */}
        <Hero />

        {/* Live Platform Statistics */}
        <Stats />

        {/* Explore by Region */}
        <RegionCards />

        {/* Featured Scientific Datasets Section */}
        <section className="py-12 bg-transparent border-b border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Glass Card */}
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-slate-300 tracking-wider mb-1">
                  <Database className="w-4 h-4 text-slate-200" />
                  <span>BENCHMARK DATASETS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  Featured Scientific Datasets
                </h2>
              </div>
              <Link
                href="/datasets"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-200 hover:text-white transition-colors"
              >
                <span>View All 500+ Datasets</span>
                <ArrowRight className="w-4 h-4 text-slate-200" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>

          </div>
        </section>

        {/* Indian Polar Expeditions Timeline Preview */}
        <section className="py-12 bg-transparent border-b border-slate-800/40 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Header Glass Card */}
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-slate-300 mb-1">
                  <Navigation className="w-4 h-4 text-slate-200" />
                  <span>HISTORICAL & ONGOING MISSIONS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  Indian Polar Expeditions
                </h2>
              </div>
              <Link
                href="/expeditions"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-200 hover:text-white transition-colors"
              >
                <span>Explore Expeditions Timeline</span>
                <ArrowRight className="w-4 h-4 text-slate-200" />
              </Link>
            </div>

            {/* Expeditions Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INDIAN_POLAR_EXPEDITIONS.slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 space-y-4 hover:border-slate-600 transition-all group shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 text-white border border-slate-700">
                      {exp.expeditionNumber}
                    </span>
                    <span className="text-xs font-mono text-slate-300">{exp.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span>{exp.participatingScientists} Scientists</span>
                    <span className="text-white font-bold">{exp.datasetsCollected} Datasets</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FAIR Principles & Government Mission Callout */}
        <section className="py-16 bg-transparent border-b border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/70 text-xs font-mono font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Open Science & FAIR Compliance</span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  National Polar Data Management Framework
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  POLARIS adheres strictly to international FAIR principles (Findable, Accessible, Interoperable, Reusable) and ISO 19115 scientific metadata standards. Researchers can cite datasets using persistent DOIs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link
                  href="/explore?mode=ai"
                  className="px-5 py-3 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold rounded-xl text-xs text-center transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Try Natural Query AI</span>
                </Link>
                <Link
                  href="/about"
                  className="px-5 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs text-center transition-all"
                >
                  <span>Read Data Policy</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
