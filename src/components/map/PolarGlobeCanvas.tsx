'use client';

import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PolarMapStation, PolarRegion } from '@/types/portal';
import { RotateCw, ZoomIn, ZoomOut, Maximize, Play, Pause, Layers } from 'lucide-react';

interface PolarGlobeCanvasProps {
  stations: PolarMapStation[];
  selectedStationId: string | null;
  onSelectStation: (station: PolarMapStation) => void;
  activeRegion: PolarRegion | 'All';
  showStationsLayer: boolean;
  showRoutesLayer: boolean;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
}

const REGION_COORDINATES: Record<PolarRegion | 'All', { center: [number, number]; zoom: number; pitch: number; bearing: number }> = {
  All: { center: [30, 20], zoom: 1.5, pitch: 20, bearing: 0 },
  Arctic: { center: [15, 78], zoom: 2.8, pitch: 35, bearing: 0 },
  Antarctica: { center: [45, -75], zoom: 2.4, pitch: 40, bearing: 0 },
  'Southern Ocean': { center: [60, -60], zoom: 2.5, pitch: 30, bearing: 0 },
  Himalayas: { center: [78, 32], zoom: 4.8, pitch: 45, bearing: 15 }
};

export const PolarGlobeCanvas: React.FC<PolarGlobeCanvasProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  activeRegion,
  showStationsLayer,
  showRoutesLayer,
  isAutoRotating,
  onToggleAutoRotate
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ id: string; marker: maplibregl.Marker }[]>([]);
  const activePopupRef = useRef<maplibregl.Popup | null>(null);
  const rotationFrameRef = useRef<number | null>(null);

  // Initialize MapLibre Globe
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialCoord = REGION_COORDINATES[activeRegion] || REGION_COORDINATES.All;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'esri-dark-base': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
          },
          'esri-dark-labels': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'esri-dark-base-layer',
            type: 'raster',
            source: 'esri-dark-base',
            minzoom: 0,
            maxzoom: 16
          },
          {
            id: 'esri-dark-labels-layer',
            type: 'raster',
            source: 'esri-dark-labels',
            minzoom: 0,
            maxzoom: 16,
            paint: {
              'raster-opacity': 0.7
            }
          }
        ]
      },
      center: initialCoord.center,
      zoom: initialCoord.zoom,
      pitch: initialCoord.pitch,
      bearing: initialCoord.bearing
    });

    mapRef.current = map;

    map.on('load', () => {
      // Enable Globe projection if supported by MapLibre GL JS
      try {
        const globeMap = map as maplibregl.Map & { setProjection?: (config: { type: string }) => void; setFog?: (fog: Record<string, unknown>) => void };
        if (typeof globeMap.setProjection === 'function') {
          globeMap.setProjection({ type: 'globe' });
        }
        if (typeof globeMap.setFog === 'function') {
          globeMap.setFog({
            color: 'rgba(3, 7, 18, 0.85)',
            'high-color': 'rgba(14, 165, 233, 0.35)',
            'space-color': 'rgba(3, 7, 18, 1)',
            'horizon-blend': 0.15
          });
        }
      } catch (err) {
        console.warn('Globe projection / fog setup skipped:', err);
      }
    });

    return () => {
      if (rotationFrameRef.current) {
        cancelAnimationFrame(rotationFrameRef.current);
      }
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers on stations change or layer toggle
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current = [];

    if (!showStationsLayer) return;

    stations.forEach((st) => {
      const isSelected = st.id === selectedStationId;

      // Custom marker DOM element
      const el = document.createElement('div');
      el.className = 'group cursor-pointer relative flex flex-col items-center justify-center pointer-events-auto';

      const isExpedition = st.type === 'expedition';
      const badgeColor = isExpedition ? 'bg-emerald-400' : 'bg-cyan-400';
      const glowColor = isExpedition ? 'rgba(52, 211, 153, 0.6)' : 'rgba(34, 211, 238, 0.6)';

      el.innerHTML = `
        <div class="relative flex flex-col items-center">
          <span class="w-5 h-5 rounded-full absolute -top-1 animate-ping" style="background-color: ${glowColor}"></span>
          <div class="w-7 h-7 rounded-full border-2 border-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-125 ${
            isSelected ? 'bg-sky-400 scale-125 shadow-sky-500/50' : isExpedition ? 'bg-emerald-600' : 'bg-slate-900 border-cyan-400'
          }" style="box-shadow: 0 0 12px ${glowColor}">
            <svg class="w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-300'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div class="mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md border transition-all ${
            isSelected ? 'bg-sky-400 text-slate-950 border-white scale-105' : 'bg-slate-950/90 text-cyan-200 border-slate-700 group-hover:border-cyan-400'
          }">
            ${st.name}
          </div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectStation(st);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([st.lng, st.lat])
        .addTo(map);

      markersRef.current.push({ id: st.id, marker });
    });
  }, [stations, selectedStationId, showStationsLayer, onSelectStation]);

  // Handle Station Selection Camera flyTo and Popup
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedStationId) return;

    const st = stations.find((s) => s.id === selectedStationId);
    if (!st) return;

    // Smooth camera flyTo
    map.flyTo({
      center: [st.lng, st.lat],
      zoom: Math.max(map.getZoom(), 4.5),
      pitch: 35,
      duration: 1800,
      essential: true
    });

    // Close existing popup
    if (activePopupRef.current) {
      activePopupRef.current.remove();
      activePopupRef.current = null;
    }

    // Create MapLibre Popup
    const popupContent = document.createElement('div');
    popupContent.className = 'p-3 font-sans text-slate-100 space-y-2 max-w-xs';
    
    let metaFieldsHTML = '';
    if (st.established) metaFieldsHTML += `<div><span class="text-slate-400">Established:</span> ${st.established}</div>`;
    if (st.agency) metaFieldsHTML += `<div><span class="text-slate-400">Agency:</span> ${st.agency}</div>`;
    if (st.elevation) metaFieldsHTML += `<div><span class="text-slate-400">Elevation:</span> ${st.elevation}</div>`;
    if (st.photoCount !== undefined && st.photoCount > 0) metaFieldsHTML += `<div><span class="text-slate-400">Photos:</span> ${st.photoCount}</div>`;
    if (st.paperCount !== undefined && st.paperCount > 0) metaFieldsHTML += `<div><span class="text-slate-400">Publications:</span> ${st.paperCount}</div>`;

    popupContent.innerHTML = `
      <div class="border-b border-slate-700/80 pb-2">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">${st.region}</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${st.type === 'expedition' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-sky-950 text-sky-300 border border-sky-800'}">
            ${st.type.toUpperCase()}
          </span>
        </div>
        <h4 class="text-sm font-extrabold text-white font-mono mt-0.5">${st.name}</h4>
      </div>

      <div class="text-xs text-slate-300 space-y-1">
        <div><strong class="text-slate-400 font-mono text-[11px]">LOCATION:</strong> ${st.location}</div>
        <div class="font-mono text-[11px] text-cyan-300">${st.lat.toFixed(4)}°, ${st.lng.toFixed(4)}°</div>
        ${st.description ? `<p class="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">${st.description}</p>` : ''}
      </div>

      ${metaFieldsHTML ? `<div class="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded border border-slate-800">${metaFieldsHTML}</div>` : ''}

      ${st.url ? `
        <div class="pt-1 border-t border-slate-800 text-right">
          <a href="${st.url}" class="inline-flex items-center text-[11px] font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors">
            <span>Explore Station</span> &rarr;
          </a>
        </div>
      ` : ''}
    `;

    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: false,
      className: 'polaris-globe-popup'
    })
      .setLngLat([st.lng, st.lat])
      .setDOMContent(popupContent)
      .addTo(map);

    activePopupRef.current = popup;
  }, [selectedStationId, stations]);

  // Handle Region Camera FlyTo
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const coord = REGION_COORDINATES[activeRegion] || REGION_COORDINATES.All;

    map.flyTo({
      center: coord.center,
      zoom: coord.zoom,
      pitch: coord.pitch,
      bearing: coord.bearing,
      duration: 2000,
      essential: true
    });
  }, [activeRegion]);

  // Auto-rotate globe continuous animation loop
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let isSubscribed = true;

    const rotateGlobe = () => {
      if (!isSubscribed || !isAutoRotating || !mapRef.current) return;

      const center = mapRef.current.getCenter();
      center.lng = (center.lng + 0.15) % 360;
      mapRef.current.setCenter(center);

      rotationFrameRef.current = requestAnimationFrame(rotateGlobe);
    };

    if (isAutoRotating) {
      rotationFrameRef.current = requestAnimationFrame(rotateGlobe);
    } else if (rotationFrameRef.current) {
      cancelAnimationFrame(rotationFrameRef.current);
    }

    return () => {
      isSubscribed = false;
      if (rotationFrameRef.current) {
        cancelAnimationFrame(rotationFrameRef.current);
      }
    };
  }, [isAutoRotating]);

  // Control button handlers
  const handleResetGlobe = () => {
    const map = mapRef.current;
    if (!map) return;
    const coord = REGION_COORDINATES[activeRegion] || REGION_COORDINATES.All;
    map.flyTo({ center: coord.center, zoom: coord.zoom, pitch: coord.pitch, bearing: coord.bearing, duration: 1500 });
  };

  const handleZoomIn = () => {
    mapRef.current?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut({ duration: 300 });
  };

  const handleFitAllStations = () => {
    const map = mapRef.current;
    if (!map || stations.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();
    stations.forEach((st) => bounds.extend([st.lng, st.lat]));

    map.fitBounds(bounds, { padding: 80, maxZoom: 5, duration: 1800 });
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
      
      {/* MapLibre DOM Mount Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Control Panel */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-xl shadow-xl backdrop-blur-md text-slate-200">
        <button
          onClick={handleResetGlobe}
          title="Reset Globe Camera"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-cyan-400 hover:text-cyan-300 flex items-center justify-center"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white flex items-center justify-center"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white flex items-center justify-center"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={handleFitAllStations}
          title="Fit All Stations"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-sky-400 hover:text-sky-300 flex items-center justify-center"
        >
          <Maximize className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleAutoRotate}
          title={isAutoRotating ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
            isAutoRotating ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Map CSS Customization Overrides */}
      <style jsx global>{`
        .polaris-globe-popup .maplibregl-popup-content {
          background-color: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(51, 65, 85, 0.9);
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
        }
        .polaris-globe-popup .maplibregl-popup-tip {
          border-top-color: rgba(15, 23, 42, 0.95);
          border-bottom-color: rgba(15, 23, 42, 0.95);
        }
        .polaris-globe-popup .maplibregl-popup-close-button {
          color: #94a3b8;
          font-size: 16px;
          padding: 4px 8px;
          border-top-right-radius: 12px;
        }
        .polaris-globe-popup .maplibregl-popup-close-button:hover {
          color: #ffffff;
          background: transparent;
        }
      `}</style>
    </div>
  );
};
