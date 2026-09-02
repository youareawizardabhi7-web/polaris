'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RESEARCH_STATIONS } from '@/lib/data/stations';
import { ResearchStation, PolarRegion } from '@/types/portal';
import { MapPin, Compass, Layers, Radio, Thermometer, Wind, Gauge, ExternalLink, Filter, Info, Eye } from 'lucide-react';

interface PolarMapComponentProps {
  initialStationId?: string;
  initialRegion?: PolarRegion;
}

export const PolarMapComponent: React.FC<PolarMapComponentProps> = ({
  initialStationId,
  initialRegion = 'Antarctica'
}) => {
  const [activeRegion, setActiveRegion] = useState<PolarRegion>(initialRegion);
  const [selectedStation, setSelectedStation] = useState<ResearchStation>(
    RESEARCH_STATIONS.find((s) => s.id === initialStationId) || RESEARCH_STATIONS[0]
  );

  const [layers, setLayers] = useState({
    stations: true,
    datasets: true,
    routes: true,
    seaIce: true
  });

  const filteredStations = RESEARCH_STATIONS.filter((st) => st.region === activeRegion);

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Map Toolbar Header */}
      <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-white">
        
        {/* Region Projection Tabs */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center space-x-1.5 mr-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Polar Projection:</span>
          </span>
          {(['Antarctica', 'Arctic', 'Himalayas'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => {
                setActiveRegion(reg);
                const firstRegStation = RESEARCH_STATIONS.find((s) => s.region === reg);
                if (firstRegStation) setSelectedStation(firstRegStation);
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold font-mono transition-all ${
                activeRegion === reg
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Map Layers Toggles */}
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-300">
          <span className="flex items-center space-x-1 text-slate-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Layers:</span>
          </span>
          
          <label className="flex items-center space-x-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.stations}
              onChange={() => toggleLayer('stations')}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
            <span className={layers.stations ? 'text-sky-300' : 'text-slate-500'}>Stations</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.routes}
              onChange={() => toggleLayer('routes')}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
            <span className={layers.routes ? 'text-emerald-300' : 'text-slate-500'}>Routes</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.seaIce}
              onChange={() => toggleLayer('seaIce')}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
            <span className={layers.seaIce ? 'text-cyan-300' : 'text-slate-500'}>Sea Ice</span>
          </label>
        </div>

      </div>

      {/* Main Map Body: Interactive Canvas / Vector Grid with Station Nodes */}
      <div className="relative h-[480px] sm:h-[540px] w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        
        {/* Polar Circular Projection Grid Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[520px] h-[520px] rounded-full border border-sky-400"></div>
          <div className="absolute w-[380px] h-[380px] rounded-full border border-sky-400/80"></div>
          <div className="absolute w-[240px] h-[240px] rounded-full border border-sky-400/60"></div>
          <div className="absolute w-[100px] h-[100px] rounded-full border border-sky-400/40 bg-sky-950"></div>
          <div className="absolute w-full h-[1px] bg-sky-400/20"></div>
          <div className="absolute h-full w-[1px] bg-sky-400/20"></div>
        </div>

        {/* Sea Ice Boundary Simulation Overlay */}
        {layers.seaIce && (
          <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-dashed border-cyan-400/40 bg-cyan-950/10 pointer-events-none animate-pulse"></div>
        )}

        {/* Simulated Expedition Cruise Routes */}
        {layers.routes && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <path
              d="M 150 400 Q 300 250 500 180 T 700 350"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          </svg>
        )}

        {/* Station Markers on Map Canvas */}
        {layers.stations && (
          <div className="relative w-full h-full max-w-4xl max-h-[460px]">
            {filteredStations.map((st, index) => {
              const isSelected = selectedStation.id === st.id;
              
              // Position math simulation for demonstration
              const positions = [
                { top: '35%', left: '30%' },
                { top: '62%', left: '72%' },
                { top: '25%', left: '55%' },
                { top: '70%', left: '38%' }
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={st.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedStation(st)}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Pulsing Beacon */}
                    <span className={`w-4 h-4 rounded-full absolute -top-1 animate-ping ${isSelected ? 'bg-sky-400' : 'bg-cyan-400/60'}`}></span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                      isSelected
                        ? 'bg-sky-400 border-white text-slate-950 scale-110'
                        : 'bg-slate-900 border-sky-400 text-sky-400'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    {/* Station Name Label Tag */}
                    <div className={`mt-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold whitespace-nowrap shadow-xl border transition-all ${
                      isSelected
                        ? 'bg-sky-400 text-slate-950 border-white'
                        : 'bg-slate-900/90 text-sky-300 border-slate-700 group-hover:border-sky-400'
                    }`}>
                      {st.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Station Floating Popup Card */}
        {selectedStation && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-80 sm:w-96 bg-slate-900/95 border border-slate-700/90 rounded-xl p-4 shadow-2xl backdrop-blur-md text-white z-30 space-y-3">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                  {selectedStation.agency}
                </span>
                <h4 className="text-base font-bold text-white font-mono">
                  {selectedStation.name}
                </h4>
                {selectedStation.nativeName && (
                  <span className="text-xs text-slate-400 block">{selectedStation.nativeName}</span>
                )}
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                {selectedStation.status}
              </span>
            </div>

            {/* Coordinates & Elevation */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block">COORDINATES</span>
                <span className="text-sky-300 font-semibold">{selectedStation.coordinates.lat}°, {selectedStation.coordinates.lng}°</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">ELEVATION</span>
                <span className="text-sky-300 font-semibold">{selectedStation.elevation}</span>
              </div>
            </div>

            {/* Live Observation */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Latest Station Observation ({selectedStation.latestObservation.updatedAt}):
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-800/80 border border-slate-700 p-2 rounded">
                  <Thermometer className="w-3.5 h-3.5 mx-auto text-sky-400 mb-1" />
                  <span className="font-bold text-white block">{selectedStation.latestObservation.temp}</span>
                  <span className="text-[9px] text-slate-400">Temp</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 p-2 rounded">
                  <Wind className="w-3.5 h-3.5 mx-auto text-cyan-400 mb-1" />
                  <span className="font-bold text-white block">{selectedStation.latestObservation.wind}</span>
                  <span className="text-[9px] text-slate-400">Wind</span>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 p-2 rounded">
                  <Gauge className="w-3.5 h-3.5 mx-auto text-indigo-400 mb-1" />
                  <span className="font-bold text-white block">{selectedStation.latestObservation.pressure}</span>
                  <span className="text-[9px] text-slate-400">Pressure</span>
                </div>
              </div>
            </div>

            {/* Connected Knowledge Graph Links */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs font-mono">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Station Knowledge Graph:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedStation.relatedExpeditionIds && selectedStation.relatedExpeditionIds.length > 0 && (
                  <Link href="/expeditions" className="px-2 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-800 hover:bg-purple-900 transition-colors text-[10px]">
                    {selectedStation.relatedExpeditionIds.length} Expeditions
                  </Link>
                )}
                {selectedStation.relatedDatasetIds && selectedStation.relatedDatasetIds.length > 0 && (
                  <Link href={`/datasets/${selectedStation.relatedDatasetIds[0]}`} className="px-2 py-1 rounded bg-sky-950/80 text-sky-300 border border-sky-800 hover:bg-sky-900 transition-colors text-[10px]">
                    {selectedStation.relatedDatasetIds[0]}
                  </Link>
                )}
                {selectedStation.relatedMediaIds && selectedStation.relatedMediaIds.length > 0 && (
                  <Link href="/media" className="px-2 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-800 hover:bg-rose-900 transition-colors text-[10px]">
                    {selectedStation.relatedMediaIds.length} Media Stories
                  </Link>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                <strong className="text-sky-300">{selectedStation.availableDatasetsCount}</strong> Datasets
              </span>

              <Link
                href={`/explore?station=${encodeURIComponent(selectedStation.name)}`}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs tracking-wide transition-all flex items-center space-x-1 shadow-md"
              >
                <span>Explore Datasets</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
