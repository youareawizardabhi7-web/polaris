'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent py-10 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* About Hero Header */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About POLARIS Portal
          </h1>

          <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
            POLARIS (Polar Science Data Discovery & Visualization Portal) is an open-access scientific repository inspired by India's polar science data ecosystem.
          </p>
        </div>

        {/* Core Scientific Mission & Domains */}
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-mono uppercase tracking-wider">
            Mandate & Scientific Scope
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-xl space-y-2 hover:bg-white/80 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Antarctic Research Domain</h3>
              <p className="leading-relaxed">
                Archiving observational data from Maitri and Bharati stations, Schirmacher Oasis lake ice cores, katabatic boundary layer meteorology, and fast-ice altimetry in Prydz Bay.
              </p>
            </div>

            <div className="p-4 bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-xl space-y-2 hover:bg-white/80 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Arctic Research Domain</h3>
              <p className="leading-relaxed">
                Hosting aerosol black carbon radiative forcing parameters from Himadri Station in Ny-Ålesund, Svalbard, alongside multi-year hydrographic time-series from the IndARC subsurface mooring.
              </p>
            </div>

            <div className="p-4 bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-xl space-y-2 hover:bg-white/80 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Himalayan Cryosphere Domain</h3>
              <p className="leading-relaxed">
                Benchmark glaciological mass balance, DGPS ice surface flow velocity, seasonal snow chemistry, and hydrological discharge from Chhota Shigri Glacier and Sutri Dhaka field stations.
              </p>
            </div>

            <div className="p-4 bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-xl space-y-2 hover:bg-white/80 transition-colors">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Southern Ocean Domain</h3>
              <p className="leading-relaxed">
                Deep ocean CTD hydrography, dissolved inorganic carbon inventories, Subtropical-Polar Front dynamics, and marine phytoplankton ecology collected during annual ORV Sagar Kanya cruises.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
