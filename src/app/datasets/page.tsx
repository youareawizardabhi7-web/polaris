'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { fetchDatasets } from '@/lib/api/portal';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { DatasetFilters } from '@/components/datasets/DatasetFilters';
import { NLQuerySearch } from '@/components/datasets/NLQuerySearch';
import Carousel from '@/components/ui/specials-linear-carousel';
import { FilterState, PolarRegion, ScientificDiscipline, DataFormat, DatasetItem } from '@/types/portal';
import { Search, Sparkles, LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function DatasetsExplorerContent() {
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const initialRegion = (searchParams.get('region') as PolarRegion) || 'All';
  const initialStation = searchParams.get('station') || 'All';
  const initialMode = searchParams.get('mode') === 'ai';

  const [allDatasets, setAllDatasets] = useState<DatasetItem[]>(MOCK_DATASETS);
  const [isAIMode, setIsAIMode] = useState(initialMode);
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchDatasets().then((items) => {
      if (items && items.length > 0) {
        setAllDatasets(items);
      }
    });
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    region: initialRegion,
    discipline: 'All',
    station: initialStation,
    dataFormat: 'All',
    startYear: 2010,
    endYear: 2024,
    sortBy: 'relevance'
  });

  useEffect(() => {
    if (initialQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: initialQuery }));
    }
    if (initialRegion) {
      setFilters((prev) => ({ ...prev, region: initialRegion }));
    }
  }, [initialQuery, initialRegion]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      region: 'All',
      discipline: 'All',
      station: 'All',
      dataFormat: 'All',
      startYear: 2010,
      endYear: 2024,
      sortBy: 'relevance'
    });
  };

  // Filter & Sort Logic
  const filteredDatasets = allDatasets.filter((ds) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchesTitle = ds.title.toLowerCase().includes(q);
      const matchesDesc = ds.shortDescription.toLowerCase().includes(q);
      const matchesStation = ds.station.toLowerCase().includes(q);
      const matchesTags = ds.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesStation && !matchesTags) return false;
    }

    if (filters.region !== 'All' && ds.region !== filters.region) return false;
    if (filters.discipline !== 'All' && ds.discipline !== filters.discipline) return false;
    if (filters.station !== 'All' && !ds.station.toLowerCase().includes(filters.station.toLowerCase().split(' ')[0])) return false;
    if (filters.dataFormat !== 'All' && ds.dataFormat !== filters.dataFormat) return false;
    if (ds.startYear > filters.endYear || ds.endYear < filters.startYear) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'newest') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    if (filters.sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
    if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="min-h-screen bg-transparent py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Mode Toggle */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span>POLAR DATA DISCOVERY ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dataset Catalog & Exploration
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Search and filter high-resolution meteorological, glaciological and oceanographic datasets.
            </p>
          </div>

          {/* AI Search Mode Switcher */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setIsAIMode(false)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                !isAIMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Standard Filter Explorer</span>
            </button>
            <button
              onClick={() => setIsAIMode(true)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                isAIMode ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>AI Natural Search</span>
            </button>
          </div>
        </div>

        {/* AI Natural Query Section if toggled */}
        {isAIMode ? (
          <NLQuerySearch />
        ) : (
          /* Standard Explorer Layout: Sidebar + Results */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Filters Sidebar (4 Cols) */}
            <div className="lg:col-span-4">
              <DatasetFilters
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                totalResults={filteredDatasets.length}
              />
            </div>

            {/* RIGHT: Results Area (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Search Bar & Controls Bar */}
              <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Inline Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    placeholder="Search titles, stations..."
                    className="w-full bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-lg pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white/80 transition-colors"
                  />
                </div>

                {/* Sort By & View Toggle */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-mono">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sort:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e: any) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest First</option>
                      <option value="downloads">Most Downloaded</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                  </div>

                  <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center space-x-1">
                    <button
                      onClick={() => setViewStyle('grid')}
                      className={`p-1.5 rounded ${viewStyle === 'grid' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500'}`}
                      title="Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewStyle('list')}
                      className={`p-1.5 rounded ${viewStyle === 'list' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500'}`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Dataset Cards */}
              {filteredDatasets.length > 0 ? (
                viewStyle === 'grid' ? (
                  <Carousel
                    autoplay={false}
                    items={filteredDatasets.map((ds) => (
                      <div key={ds.id} className="w-[320px] sm:w-[380px] shrink-0">
                        <DatasetCard dataset={ds} />
                      </div>
                    ))}
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredDatasets.map((ds) => (
                      <DatasetCard key={ds.id} dataset={ds} />
                    ))}
                  </div>
                )
              ) : (
                /* Empty state */
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Datasets Match Your Criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try loosening your region, station, or temporal range filters to discover available scientific records.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function DatasetsExplorerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-slate-500">Loading POLARIS Explorer...</div>}>
      <DatasetsExplorerContent />
    </Suspense>
  );
}
