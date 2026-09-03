'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchMapLocations } from '@/lib/api/portal';
import { PolarMapStation, PolarRegion } from '@/types/portal';
import {
  Compass,
  Layers,
  Search,
  Radio,
  RefreshCw,
  AlertTriangle,
  Info,
  MapPin,
  SlidersHorizontal
} from 'lucide-react';

// SSR-safe dynamic import for MapLibre 3D Globe
const PolarGlobeCanvas = dynamic(
  () => import('./PolarGlobeCanvas').then((mod) => mod.PolarGlobeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-slate-400 font-mono text-xs space-y-3 border border-slate-800">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-cyan-300 font-semibold">Initializing 3D MapLibre Globe...</span>
      </div>
    )
  }
);

interface PolarMapComponentProps {
  initialStationId?: string;
  initialRegion?: PolarRegion | 'All';
}

export const PolarMapComponent: React.FC<PolarMapComponentProps> = ({
  initialStationId,
  initialRegion = 'All'
}) => {
  const [stations, setStations] = useState<PolarMapStation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeRegion, setActiveRegion] = useState<PolarRegion | 'All'>(initialRegion);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(initialStationId || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [layers, setLayers] = useState({
    stations: true,
    routes: true
  });
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Load locations from backend API
  const loadLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMapLocations();
      setStations(data);

      if (initialStationId) {
        const found = data.find((s) => s.id === initialStationId || s.name.toLowerCase().includes(initialStationId.toLowerCase()));
        if (found) setSelectedStationId(found.id);
      } else if (data.length > 0) {
        setSelectedStationId(data[0].id);
      }
    } catch (err: unknown) {
      console.error('[POLARMAP] Error fetching map locations:', err);
      const msg = err instanceof Error ? err.message : 'Failed to load polar station locations from backend API';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchMapLocations()
      .then((data) => {
        if (!isMounted) return;
        setStations(data);
        if (initialStationId) {
          const found = data.find((s) => s.id === initialStationId || s.name.toLowerCase().includes(initialStationId.toLowerCase()));
          if (found) setSelectedStationId(found.id);
        } else if (data.length > 0) {
          setSelectedStationId(data[0].id);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        console.error('[POLARMAP] Error fetching map locations:', err);
        const msg = err instanceof Error ? err.message : 'Failed to load polar station locations from backend API';
        setError(msg);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialStationId]);

  // Filter stations based on Region & Search Query
  const filteredStations = stations.filter((st) => {
    const matchesRegion = activeRegion === 'All' || st.region === activeRegion;
    const matchesSearch =
      !searchQuery.trim() ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      
      {/* Map Control Header Bar */}
      <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-white">
        
        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center space-x-1.5 mr-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Region Focus:</span>
          </span>
          {(['All', 'Arctic', 'Antarctica', 'Southern Ocean', 'Himalayas'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => {
                setActiveRegion(reg);
                const firstInReg = stations.find((s) => reg === 'All' || s.region === reg);
                if (firstInReg) setSelectedStationId(firstInReg.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                activeRegion === reg
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Layer Toggles & Controls */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 text-slate-400">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Layers:</span>
            </span>

            <label className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={layers.stations}
                onChange={() => setLayers((p) => ({ ...p, stations: !p.stations }))}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className={layers.stations ? 'text-cyan-300 font-semibold' : 'text-slate-500'}>Observatories</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={layers.routes}
                onChange={() => setLayers((p) => ({ ...p, routes: !p.routes }))}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className={layers.routes ? 'text-emerald-300 font-semibold' : 'text-slate-500'}>Routes</span>
            </label>
          </div>

          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700 flex items-center space-x-1 text-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Explorer ({filteredStations.length})</span>
          </button>
        </div>

      </div>

      {/* Main Map Body: Grid with 3D Globe + Explorer Sidebar */}
      <div className="relative flex flex-col lg:flex-row w-full min-h-[550px] bg-slate-950 overflow-hidden">
        
        {/* Loading State Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-lg shadow-cyan-500/20"></div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white font-mono">Fetching Live Station Observatories</h4>
              <p className="text-xs text-slate-400 font-mono">Connecting to backend API at polar-outreach.onrender.com...</p>
            </div>
          </div>
        )}

        {/* Error State Overlay */}
        {error && !loading && (
          <div className="absolute inset-0 bg-slate-950/95 z-40 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 shadow-xl">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md">
              <h4 className="text-lg font-bold text-white font-mono">Backend Connection Failed</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">{error}</p>
            </div>
            <button
              onClick={loadLocations}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono rounded-lg text-xs transition-all flex items-center space-x-2 shadow-lg shadow-sky-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry API Fetch</span>
            </button>
          </div>
        )}

        {/* 3D Globe Visualization Canvas */}
        <div className="flex-1 relative w-full h-[520px] sm:h-[600px] lg:h-[650px]">
          <PolarGlobeCanvas
            stations={filteredStations}
            selectedStationId={selectedStationId}
            onSelectStation={(st) => setSelectedStationId(st.id)}
            activeRegion={activeRegion}
            showStationsLayer={layers.stations}
            showRoutesLayer={layers.routes}
            isAutoRotating={isAutoRotating}
            onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
          />        </div>

        {/* Station Explorer Sidebar (Desktop & Responsive Mobile Collapsible) */}
        <div className={`w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-[400px] lg:h-[650px] transition-all ${
          isMobileSidebarOpen ? 'block' : 'hidden lg:flex'
        }`}>
          
          {/* Sidebar Search Bar */}
          <div className="p-3.5 border-b border-slate-800 space-y-2.5 bg-slate-950">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center space-x-1.5">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Station Explorer</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                {filteredStations.length} Listed
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search observatories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Station Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredStations.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Info className="w-6 h-6 mx-auto text-slate-600" />
                <p className="text-xs font-mono text-slate-400">No observatories found matching criteria.</p>
              </div>
            ) : (
              filteredStations.map((st, index) => {
                const isSelected = selectedStationId === st.id;
                return (
                  <div
                    key={`${st.id}-${index}`}
                    onClick={() => setSelectedStationId(st.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-400/80 text-white shadow-lg shadow-cyan-950/50'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-bold font-mono text-white group-hover:text-cyan-300">
                        {st.name}
                      </h5>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold whitespace-nowrap ${
                        st.type === 'expedition' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {st.region}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {st.location}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{st.lat.toFixed(2)}°, {st.lng.toFixed(2)}°</span>
                      </span>
                      {st.established && <span>Est. {st.established}</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
