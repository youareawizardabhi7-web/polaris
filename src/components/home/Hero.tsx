'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Navigation, ArrowRight, Activity, MapPin, Database } from 'lucide-react';
import DecryptedText from '@/components/ui/DecryptedText';
import TextType from '@/components/ui/TextType';
import { RESEARCH_STATIONS } from '@/lib/data/stations';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activePolarTab, setActivePolarTab] = useState<'antarctica' | 'arctic'>('antarctica');
  const [selectedStation, setSelectedStation] = useState(RESEARCH_STATIONS[0]);

  const suggestions = [
    { label: 'Antarctic climate data', region: 'Antarctica', query: 'Antarctic climate' },
    { label: 'Maitri station datasets', station: 'Maitri Station', query: 'Maitri' },
    { label: 'Arctic atmospheric data', region: 'Arctic', query: 'Arctic atmospheric' },
    { label: 'Oceanographic observations', discipline: 'Oceanography', query: 'Oceanography' },
    { label: 'Glacier datasets', region: 'Himalayas', query: 'Glacier' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSuggestionClick = (s: typeof suggestions[0]) => {
    router.push(`/explore?q=${encodeURIComponent(s.query)}`);
  };

  return (
    <div className="relative bg-transparent text-white overflow-hidden border-b border-slate-800/40">
      {/* Subtle Polar Glow Highlights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hero Copy & Intelligent Search in a sleek dark glass container */}
          <div className="lg:col-span-7 bg-slate-950/45 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            


            {/* Headline with DecryptedText Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] cursor-pointer">
              <DecryptedText
                text="Explore Earth's Polar Data"
                animateOn="view"
                speed={50}
                maxIterations={15}
                useOriginalCharsOnly={false}
                className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                encryptedClassName="text-slate-400"
              />
            </h1>

            {/* Subheading with TextType Effect */}
            <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] min-h-[3.5rem]">
              <TextType
                text={[
                  "Discover, visualize and analyze scientific datasets from Antarctica, the Arctic and the Himalayan region.",
                  "Access 500+ open benchmark datasets from Maitri, Bharati, and Himadri research stations.",
                  "Real-time telemetry and oceanographic observation networks for polar climate science."
                ]}
                typingSpeed={40}
                pauseDuration={3500}
                deletingSpeed={20}
                loop={true}
                cursorCharacter="▌"
                cursorClassName="text-white ml-1 font-bold"
              />
            </div>

            {/* Large Intelligent Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-slate-700/40 rounded-xl blur-md opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative flex items-center bg-slate-900/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-2 shadow-2xl focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500/20 transition-all">
                  <Search className="w-6 h-6 text-white ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search datasets, stations, parameters, expeditions..."
                    className="w-full bg-transparent px-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none"
                  />
                  <div className="flex items-center space-x-2 mr-1">
                    <Link
                      href="/explore?mode=ai"
                      className="hidden sm:flex items-center space-x-1.5 px-3 py-2 bg-slate-800/50 hover:bg-slate-700/70 text-white rounded-lg text-xs font-medium border border-slate-600/60 transition-colors"
                      title="Try Natural Language Query Mode"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>AI Search</span>
                    </Link>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs tracking-wide transition-all shadow-md flex items-center space-x-1.5 active:scale-95"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Quick Suggestions Chips */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
                Quick Suggestions:
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-1.5 bg-slate-900/40 hover:bg-slate-800/70 text-white border border-slate-700/60 hover:border-sky-400 rounded-md text-xs transition-all flex items-center space-x-1 font-medium backdrop-blur-sm"
                  >
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Elegant Interactive Polar Map Concept */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-950/10 backdrop-blur-md border border-slate-800/30 p-6 shadow-2xl overflow-hidden">
              
              {/* Tab Switcher for Antarctic / Arctic View */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActivePolarTab('antarctica')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-all border ${
                      activePolarTab === 'antarctica'
                        ? 'bg-slate-700/60 backdrop-blur-md text-white border-slate-500/50 shadow-sm'
                        : 'bg-slate-900/40 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800/40'
                    }`}
                  >
                    South Pole (Antarctica)
                  </button>
                  <button
                    onClick={() => setActivePolarTab('arctic')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-all border ${
                      activePolarTab === 'arctic'
                        ? 'bg-slate-700/60 backdrop-blur-md text-white border-slate-500/50 shadow-sm'
                        : 'bg-slate-900/40 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-slate-800/50 border-slate-800/40'
                    }`}
                  >
                    North Pole (Arctic)
                  </button>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIVE NODES</span>
                </span>
              </div>

              {/* Scientific Vector Canvas Simulation */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl bg-transparent border border-slate-700/30 flex items-center justify-center overflow-hidden">
                {/* Concentric Polar Grid Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-60 h-60 rounded-full border border-sky-500/10 animate-spin" style={{ animationDuration: '60s' }}></div>
                  <div className="absolute w-44 h-44 rounded-full border border-sky-500/20"></div>
                  <div className="absolute w-28 h-28 rounded-full border border-sky-500/30"></div>
                  <div className="absolute w-12 h-12 rounded-full border border-sky-400/40 bg-sky-950/40"></div>
                  {/* Crosshair lines */}
                  <div className="absolute w-full h-[1px] bg-sky-500/15"></div>
                  <div className="absolute h-full w-[1px] bg-sky-500/15"></div>
                </div>

                {/* Simulated Geographic Data Points & Stations */}
                {activePolarTab === 'antarctica' ? (
                  <div className="relative w-full h-full p-4 flex flex-col justify-between">
                    {/* Maitri Station Point */}
                    <div
                      onClick={() => setSelectedStation(RESEARCH_STATIONS[0])}
                      className="absolute top-16 left-20 cursor-pointer group"
                    >
                      <div className="relative flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-white animate-ping absolute"></span>
                        <span className="w-3 h-3 rounded-full bg-white border border-slate-900"></span>
                        <div className="bg-slate-950/15 backdrop-blur-sm border border-slate-700/40 text-white font-bold text-[10px] font-mono px-2 py-0.5 rounded shadow-lg group-hover:border-white transition-colors">
                          Maitri Station (-70.77°, 11.73°)
                        </div>
                      </div>
                    </div>

                    {/* Bharati Station Point */}
                    <div
                      onClick={() => setSelectedStation(RESEARCH_STATIONS[1])}
                      className="absolute bottom-20 right-16 cursor-pointer group"
                    >
                      <div className="relative flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-white animate-ping absolute"></span>
                        <span className="w-3 h-3 rounded-full bg-white border border-slate-900"></span>
                        <div className="bg-slate-950/15 backdrop-blur-sm border border-slate-700/40 text-white font-bold text-[10px] font-mono px-2 py-0.5 rounded shadow-lg group-hover:border-white transition-colors">
                          Bharati Station (-69.41°, 76.19°)
                        </div>
                      </div>
                    </div>

                    {/* Southern Ocean Data Buoy */}
                    <div className="absolute bottom-8 left-28 cursor-pointer group">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="text-[9px] text-white font-mono font-bold">ORV Sagar Kanya CTD</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full p-4">
                    {/* Himadri Station Point */}
                    <div
                      onClick={() => setSelectedStation(RESEARCH_STATIONS[2])}
                      className="absolute top-20 right-24 cursor-pointer group"
                    >
                      <div className="relative flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-white animate-ping absolute"></span>
                        <span className="w-3 h-3 rounded-full bg-white border border-slate-900"></span>
                        <div className="bg-slate-950/15 backdrop-blur-sm border border-slate-700/40 text-white font-bold text-[10px] font-mono px-2 py-0.5 rounded shadow-lg group-hover:border-white transition-colors">
                          Himadri Station (78.92° N)
                        </div>
                      </div>
                    </div>

                    {/* IndARC Mooring Point */}
                    <div
                      onClick={() => setSelectedStation(RESEARCH_STATIONS[3])}
                      className="absolute bottom-16 left-24 cursor-pointer group"
                    >
                      <div className="relative flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-white animate-ping absolute"></span>
                        <span className="w-3 h-3 rounded-full bg-white border border-slate-900"></span>
                        <div className="bg-slate-950/15 backdrop-blur-sm border border-slate-700/40 text-white font-bold text-[10px] font-mono px-2 py-0.5 rounded shadow-lg group-hover:border-white transition-colors">
                          IndARC Mooring (Subsurface)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Station Info Quick Box */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-300 block text-[10px] uppercase font-mono">Selected Node:</span>
                  <span className="font-bold text-white">{selectedStation.name}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-slate-300 block text-[10px]">LATEST TEMP</span>
                  <span className="text-white font-extrabold">{selectedStation.latestObservation.temp}</span>
                </div>
                <Link
                  href={`/map?station=${selectedStation.id}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded text-xs border border-slate-700 transition-colors"
                >
                  View on Map ↗
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
