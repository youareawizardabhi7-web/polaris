'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { RegionCards } from '@/components/home/RegionCards';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { Database, ArrowRight, Sparkles, Navigation, Layers, ShieldCheck, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const featuredDatasets = MOCK_DATASETS.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* Live Platform Statistics */}
      <Stats />

      {/* Explore by Region */}
      <RegionCards />

      {/* Featured Scientific Datasets Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase font-semibold text-sky-700 tracking-wider mb-1">
                <Database className="w-4 h-4 text-sky-600" />
                <span>BENCHMARK DATASETS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Scientific Datasets
              </h2>
            </div>
            <Link
              href="/datasets"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors mt-2 md:mt-0"
            >
              <span>View All 500+ Datasets</span>
              <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-400 mb-1">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>HISTORICAL & ONGOING MISSIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Indian Polar Expeditions
              </h2>
            </div>
            <Link
              href="/expeditions"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors mt-2 md:mt-0"
            >
              <span>Explore Expeditions Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Expeditions Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDIAN_POLAR_EXPEDITIONS.slice(0, 3).map((exp) => (
              <div
                key={exp.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-sky-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800">
                    {exp.expeditionNumber}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{exp.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{exp.participatingScientists} Scientists</span>
                  <span className="text-sky-400">{exp.datasetsCollected} Datasets</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAIR Principles & Government Mission Callout */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Open Science & FAIR Compliance</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                National Polar Data Management Framework
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                POLARIS adheres strictly to international FAIR principles (Findable, Accessible, Interoperable, Reusable) and ISO 19115 scientific metadata standards. Researchers can cite datasets using persistent DOIs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link
                href="/explore?mode=ai"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs text-center transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Try Natural Query AI</span>
              </Link>
              <Link
                href="/about"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold rounded-xl text-xs text-center transition-all"
              >
                <span>Read Data Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
