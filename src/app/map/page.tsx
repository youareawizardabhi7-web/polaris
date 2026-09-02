'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PolarMapComponent } from '@/components/map/PolarMapComponent';
import { RESEARCH_STATIONS } from '@/lib/data/stations';
import { Navigation, Compass, MapPin, Radio, Layers, Info } from 'lucide-react';
import Link from 'next/link';

function MapPageContent() {
  const searchParams = useSearchParams();
  const stationId = searchParams.get('station') || undefined;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-700 mb-1">
              <Navigation className="w-4 h-4 text-cyan-600" />
              <span>POLAR SPATIAL INFRASTRUCTURE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Polar Map & Station Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Explore active research observatories, deep-sea moorings, expedition transects, and spatial dataset points.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-100 p-2.5 rounded-xl border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-800">6 Active Station Observatories</span>
          </div>
        </div>

        {/* Map Component Container */}
        <PolarMapComponent initialStationId={stationId} />

        {/* Research Stations Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Radio className="w-5 h-5 text-sky-600" />
              <span>National Polar Research Stations</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">NCPOR & MoES Observatories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_STATIONS.map((station) => (
              <div
                key={station.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-sky-100 text-sky-800 border border-sky-200">
                      {station.region}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Established {station.established}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{station.name}</h3>
                    {station.nativeName && (
                      <span className="text-xs text-slate-500">{station.nativeName}</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {station.description}
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lat/Lng:</span>
                      <strong>{station.coordinates.lat}°, {station.coordinates.lng}°</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Latest Temp:</span>
                      <strong className="text-sky-700">{station.latestObservation.temp}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    <strong className="text-slate-900">{station.availableDatasetsCount}</strong> Datasets
                  </span>

                  <Link
                    href={`/explore?station=${encodeURIComponent(station.name)}`}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-all"
                  >
                    Browse Datasets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-slate-500">Loading Polar Map...</div>}>
      <MapPageContent />
    </Suspense>
  );
}
