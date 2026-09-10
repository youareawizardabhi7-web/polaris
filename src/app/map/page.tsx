'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PolarMapComponent } from '@/components/map/PolarMapComponent';
import { fetchMapLocations } from '@/lib/api/portal';
import { PolarMapStation } from '@/types/portal';
import { Navigation, Radio, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { CoverflowCarousel } from '@/components/ui/coverflow-carousel';

function MapPageContent() {
  const searchParams = useSearchParams();
  const stationId = searchParams.get('station') || undefined;

  const [stations, setStations] = useState<PolarMapStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetchMapLocations()
      .then((data) => {
        if (isMounted) {
          setStations(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('[MAP PAGE] Failed to load stations:', err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-white mb-1">
              <Navigation className="w-4 h-4 text-white" />
              <span>POLAR SPATIAL INFRASTRUCTURE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3D Scientific Polar Globe & Observatories
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Interactive 3D Earth globe visualization powered by MapLibre GL JS and live backend telemetry from NCPOR, MoES, and international polar stations.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-100 p-3 rounded-xl border border-slate-200 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-800">
              {loading ? 'Connecting...' : `${stations.length} Backend Locations`}
            </span>
          </div>
        </div>

        {/* 3D Globe Map Container */}
        <PolarMapComponent initialStationId={stationId} />

        {/* Research Observatories Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Radio className="w-5 h-5 text-sky-400" />
              <span>Backend Research Observatories & Expeditions</span>
            </h2>
            <span className="text-xs font-mono text-slate-300">Source: GET /api/v1/map/locations</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3 animate-pulse">
                  <div className="h-4 bg-slate-200/80 rounded w-1/3"></div>
                  <div className="h-6 bg-slate-200/80 rounded w-2/3"></div>
                  <div className="h-12 bg-slate-100/80 rounded"></div>
                </div>
              ))}
            </div>
          ) : stations.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl p-8 text-center text-slate-500 text-xs font-mono">
              No station locations available from the backend API.
            </div>
          ) : (
            <div className="py-2">
              <CoverflowCarousel
                cardWidth="clamp(290px, 30vw, 360px)"
                showNavigation={true}
                showPagination={true}
                rotate={36}
                depth={0.5}
                gap={0.06}
                slides={stations.map((station, index) => ({
                  title: station.name,
                  subtitle: station.location,
                  content: (
                    <div
                      key={`${station.id}-${index}`}
                      className="h-full w-full bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between select-none"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-sky-100/80 text-sky-800 border border-sky-200/80">
                            {station.region}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            station.type === 'expedition' ? 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/80' : 'bg-slate-100/80 text-slate-700 border border-slate-200/80'
                          }`}>
                            {station.type.toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-slate-900">{station.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5 font-mono">{station.location}</p>
                        </div>

                        {station.description && (
                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {station.description}
                          </p>
                        )}

                        <div className="bg-slate-50/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200/80 text-xs font-mono text-slate-700 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Coordinates:</span>
                            <strong className="text-sky-700">{station.lat.toFixed(4)}°, {station.lng.toFixed(4)}°</strong>
                          </div>
                          {station.established && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Established:</span>
                              <strong>{station.established}</strong>
                            </div>
                          )}
                          {station.status && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status:</span>
                              <strong className="text-emerald-700">{station.status}</strong>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-200/80 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 truncate max-w-[170px]" title={station.id}>
                          ID: <strong className="text-slate-900">{station.id}</strong>
                        </span>

                        <Link
                          href={station.url || `/explore?station=${encodeURIComponent(station.name)}`}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-all inline-flex items-center space-x-1 shadow-xs shrink-0"
                        >
                          <span>Explore</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </div>
                    </div>
                  )
                }))}
              />
            </div>
          )}
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
