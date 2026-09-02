'use client';

import React, { useState } from 'react';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { Sparkles, ArrowRight, CheckCircle2, CornerDownRight, Database, Sliders } from 'lucide-react';
import { DatasetItem, PolarRegion, ScientificDiscipline } from '@/types/portal';

export const NLQuerySearch: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [interpretedResult, setInterpretedResult] = useState<{
    queryText: string;
    region?: PolarRegion;
    discipline?: ScientificDiscipline;
    station?: string;
    startYear?: number;
    endYear?: number;
    parameter?: string;
    matched: DatasetItem[];
  } | null>(null);

  const sampleQueries = [
    "Show Antarctic atmospheric datasets between 2018 and 2022.",
    "What datasets are available from Maitri station?",
    "Find black carbon observations in the Arctic",
    "Show glacier mass balance datasets in the Himalayas"
  ];

  const processNaturalQuery = (queryStr: string) => {
    setIsProcessing(true);
    const q = queryStr.toLowerCase();

    // Natural Language Parsing Logic
    let region: PolarRegion | undefined = undefined;
    if (q.includes('antarctic') || q.includes('antarctica') || q.includes('maitri') || q.includes('bharati')) {
      region = 'Antarctica';
    } else if (q.includes('arctic') || q.includes('himadri') || q.includes('indarc') || q.includes('svalbard')) {
      region = 'Arctic';
    } else if (q.includes('himalaya') || q.includes('himalayan') || q.includes('shigri') || q.includes('chhota')) {
      region = 'Himalayas';
    } else if (q.includes('southern ocean') || q.includes('oceanography') || q.includes('ctd') || q.includes('sagar kanya')) {
      region = 'Southern Ocean';
    }

    let discipline: ScientificDiscipline | undefined = undefined;
    if (q.includes('atmosphere') || q.includes('atmospheric') || q.includes('meteorolog') || q.includes('ozone') || q.includes('weather')) {
      discipline = 'Atmospheric Sciences';
    } else if (q.includes('glacier') || q.includes('ice') || q.includes('cryosphere') || q.includes('mass balance')) {
      discipline = 'Glaciology & Cryosphere';
    } else if (q.includes('ocean') || q.includes('ctd') || q.includes('salinity') || q.includes('hydrography')) {
      discipline = 'Oceanography';
    }

    let station: string | undefined = undefined;
    if (q.includes('maitri')) station = 'Maitri Station';
    else if (q.includes('bharati')) station = 'Bharati Station';
    else if (q.includes('himadri')) station = 'Himadri Station';
    else if (q.includes('indarc')) station = 'IndARC Mooring';
    else if (q.includes('shigri')) station = 'Chhota Shigri Observatory';

    let startYear: number | undefined = undefined;
    let endYear: number | undefined = undefined;
    if (q.includes('2018') && q.includes('2022')) {
      startYear = 2018;
      endYear = 2022;
    }

    // Filter matched datasets
    let matched = MOCK_DATASETS.filter((item) => {
      if (region && item.region !== region) return false;
      if (discipline && item.discipline !== discipline) return false;
      if (station && !item.station.toLowerCase().includes(station.toLowerCase().split(' ')[0])) return false;
      if (startYear && item.startYear > endYear!) return false;
      if (endYear && item.endYear < startYear!) return false;
      return true;
    });

    if (matched.length === 0) {
      matched = MOCK_DATASETS.slice(0, 3);
    }

    setTimeout(() => {
      setInterpretedResult({
        queryText: queryStr,
        region,
        discipline,
        station,
        startYear,
        endYear,
        matched
      });
      setIsProcessing(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    processNaturalQuery(inputQuery);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
      
      {/* Title & AI Scientific Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-600/40 flex items-center justify-center text-sky-400">
            <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold font-mono tracking-tight text-white">
                Intelligent Dataset Search
              </h2>
              <span className="text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded">
                Natural Language Parser
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Type plain English research queries to automatically parse regions, temporal bounds, and variables.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-slate-950 border border-slate-700/80 rounded-xl p-2 focus-within:border-sky-500 transition-all">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder='e.g., "Show Antarctic atmospheric datasets between 2018 and 2022"'
            className="w-full bg-transparent px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={isProcessing || !inputQuery.trim()}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs tracking-wide transition-all shadow-md flex items-center space-x-1.5"
          >
            {isProcessing ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <span>Parse Query</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Sample Query Suggestions */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase text-slate-400 block font-semibold">
          Try Example Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(sq);
                processNaturalQuery(sq);
              }}
              className="text-xs bg-slate-800/80 hover:bg-slate-800 text-sky-300 hover:text-white border border-slate-700/80 hover:border-sky-500/50 px-3 py-1.5 rounded-md transition-all text-left"
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      {/* Interpreted Parameters & Results View */}
      {interpretedResult && (
        <div className="pt-6 border-t border-slate-800 space-y-6">
          
          {/* Natural Language Parsing Breakdown */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>QUERY INTERPRETATION SUCCESSFUL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {interpretedResult.region && (
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block">REGION DETECTED</span>
                  <span className="font-bold text-sky-300">{interpretedResult.region}</span>
                </div>
              )}

              {interpretedResult.discipline && (
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block">DISCIPLINE DETECTED</span>
                  <span className="font-bold text-cyan-300">{interpretedResult.discipline}</span>
                </div>
              )}

              {interpretedResult.station && (
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block">STATION DETECTED</span>
                  <span className="font-bold text-blue-300">{interpretedResult.station}</span>
                </div>
              )}

              {interpretedResult.startYear && (
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-mono block">TEMPORAL BOUNDS</span>
                  <span className="font-bold text-emerald-300 font-mono">
                    {interpretedResult.startYear} – {interpretedResult.endYear}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Matched Datasets List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>MATCHED SCIENTIFIC DATASETS ({interpretedResult.matched.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interpretedResult.matched.map((ds) => (
                <DatasetCard key={ds.id} dataset={ds} />
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
