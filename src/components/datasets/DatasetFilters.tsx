'use client';

import React from 'react';
import { FilterState, PolarRegion, ScientificDiscipline, DataFormat } from '@/types/portal';
import { Filter, RotateCcw, Compass, Database, MapPin, Calendar, FileCode, Check } from 'lucide-react';

interface DatasetFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const DatasetFilters: React.FC<DatasetFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const regions: (PolarRegion | 'All')[] = ['All', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'];
  
  const disciplines: (ScientificDiscipline | 'All')[] = [
    'All',
    'Atmospheric Sciences',
    'Glaciology & Cryosphere',
    'Oceanography',
    'Geology & Geophysics',
    'Polar Biology & Ecosystems'
  ];

  const stations = [
    'All',
    'Maitri Station',
    'Bharati Station',
    'Himadri Station',
    'IndARC Mooring',
    'Chhota Shigri Observatory',
    'SAGE High-Altitude Observatory'
  ];

  const formats: (DataFormat | 'All')[] = ['All', 'NetCDF', 'CSV', 'GeoJSON', 'ASCII'];

  const handleRegionChange = (region: PolarRegion | 'All') => {
    onChange({ ...filters, region });
  };

  const handleDisciplineChange = (discipline: ScientificDiscipline | 'All') => {
    onChange({ ...filters, discipline });
  };

  const handleStationChange = (station: string) => {
    onChange({ ...filters, station });
  };

  const handleFormatChange = (dataFormat: DataFormat | 'All') => {
    onChange({ ...filters, dataFormat });
  };

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChange({ ...filters, startYear: val });
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onChange({ ...filters, endYear: val });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div className="flex items-center space-x-2 text-slate-900">
          <Filter className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-sm tracking-tight">Dataset Filters</h3>
        </div>
        
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-sky-700 flex items-center space-x-1 hover:underline transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Filter 1: Polar Region */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>Polar Region</span>
        </label>
        <div className="space-y-1">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => handleRegionChange(reg)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                filters.region === reg
                  ? 'bg-sky-100/80 text-sky-900 font-semibold border border-sky-300/60 shadow-2xs'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <span>{reg}</span>
              {filters.region === reg && <Check className="w-3.5 h-3.5 text-sky-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* Filter 2: Scientific Discipline */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>Discipline</span>
        </label>
        <div className="space-y-1">
          {disciplines.map((disc) => (
            <button
              key={disc}
              onClick={() => handleDisciplineChange(disc)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                filters.discipline === disc
                  ? 'bg-sky-100/80 text-sky-900 font-semibold border border-sky-300/60 shadow-2xs'
                  : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
            >
              <span className="truncate">{disc}</span>
              {filters.discipline === disc && <Check className="w-3.5 h-3.5 text-sky-700 flex-shrink-0 ml-1" />}
            </button>
          ))}
        </div>
      </div>

      {/* Filter 3: Research Station */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Research Station</span>
        </label>
        <select
          value={filters.station}
          onChange={(e) => handleStationChange(e.target.value)}
          className="w-full bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-md px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white/80 transition-colors"
        >
          {stations.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 4: Time Range */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Temporal Range</span>
          </span>
          <span className="text-sky-700 text-xs font-bold font-mono">
            {filters.startYear} – {filters.endYear}
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block mb-1">Start Year</span>
            <input
              type="number"
              min="2005"
              max={filters.endYear}
              value={filters.startYear}
              onChange={handleStartYearChange}
              className="w-full bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-md px-2 py-1 text-slate-800 font-mono text-center focus:outline-none focus:border-sky-500 focus:bg-white/80 transition-colors"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block mb-1">End Year</span>
            <input
              type="number"
              min={filters.startYear}
              max="2025"
              value={filters.endYear}
              onChange={handleEndYearChange}
              className="w-full bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-md px-2 py-1 text-slate-800 font-mono text-center focus:outline-none focus:border-sky-500 focus:bg-white/80 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Filter 5: Data Format */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <FileCode className="w-3.5 h-3.5 text-slate-400" />
          <span>Data Format</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => handleFormatChange(fmt)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                filters.dataFormat === fmt
                  ? 'bg-slate-900/90 text-white font-bold shadow-xs'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80 border border-slate-200/60'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Active Count Footer */}
      <div className="pt-3 border-t border-slate-200/80 text-center">
        <span className="text-xs text-slate-500 font-mono">
          Showing <strong className="text-slate-900">{totalResults}</strong> matching datasets
        </span>
      </div>

    </div>
  );
};
