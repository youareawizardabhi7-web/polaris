'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { PolarRegion } from '@/types/portal';
import { Layers, Calendar, Users, Database, ArrowRight, CheckCircle2, Ship } from 'lucide-react';

export default function ExpeditionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<PolarRegion | 'All'>('All');

  const filteredExpeditions = INDIAN_POLAR_EXPEDITIONS.filter((exp) =>
    selectedRegion === 'All' ? true : exp.region === selectedRegion
  );

  return (
    <div className="min-h-screen bg-transparent py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-white mb-1">
              <Ship className="w-4 h-4 text-white" />
              <span>INDIAN POLAR SCIENTIFIC MISSIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Indian Polar Expeditions & Missions
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Historical timeline and active field deployments across Antarctica, Arctic, Southern Ocean, and High Mountain Asia.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {(['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                  selectedRegion === reg
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Expeditions Grid */}
        <div className="space-y-6">
          {filteredExpeditions.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/70 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-sky-500/50 transition-all space-y-6"
            >
              
              {/* Expedition Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-md text-xs font-mono font-bold">
                      {exp.expeditionNumber}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800/80 text-slate-200 border border-slate-700/80 rounded-md text-xs font-mono font-semibold">
                      {exp.region}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${
                      exp.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white pt-1">{exp.title}</h2>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-slate-400 space-y-0.5">
                  <div>Deployment Year: <strong className="text-white">{exp.year}</strong></div>
                  <div>Base / Vessel: <strong className="text-white">{exp.vesselOrBase}</strong></div>
                </div>
              </div>

              {/* Summary & Leader */}
              <div className="space-y-2">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.summary}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  Mission Expedition Leader: <strong className="text-slate-200">{exp.leader}</strong>
                </p>
              </div>

              {/* Research Objectives */}
              <div className="space-y-2 bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl">
                <span className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
                  Key Research Objectives:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  {exp.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Stats & Dataset Action */}
              <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center space-x-6 text-slate-300">
                  <span className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{exp.participatingScientists} Scientists</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Database className="w-4 h-4 text-sky-400" />
                    <span>{exp.datasetsCollected} Open Datasets</span>
                  </span>
                </div>

                <Link
                  href={`/explore?region=${encodeURIComponent(exp.region)}`}
                  className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>Explore Expedition Datasets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Cross-Linking Knowledge Graph Links */}
              <div className="pt-4 border-t border-slate-800/60 space-y-3">
                <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider block">
                  Expedition Connected Knowledge Graph:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {exp.relatedDatasetIds && exp.relatedDatasetIds.length > 0 ? (
                    <Link
                      href={`/datasets/${exp.relatedDatasetIds[0]}`}
                      className="p-3 bg-sky-950/30 border border-sky-800/40 rounded-xl hover:bg-sky-900/40 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-400 uppercase block">Research Data</span>
                        <span className="font-bold text-slate-200 group-hover:text-white">{exp.relatedDatasetIds.length} Linked Datasets</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedStationIds && exp.relatedStationIds.length > 0 ? (
                    <Link
                      href={`/map?station=${exp.relatedStationIds[0]}`}
                      className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl hover:bg-blue-900/40 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-400 uppercase block">Research Base</span>
                        <span className="font-bold text-slate-200 group-hover:text-white">{exp.relatedStationIds.length} Stations</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedKnowledgeIds && exp.relatedKnowledgeIds.length > 0 ? (
                    <Link
                      href={`/knowledge/${exp.relatedKnowledgeIds[0]}`}
                      className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl hover:bg-emerald-900/40 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Knowledge</span>
                        <span className="font-bold text-slate-200 group-hover:text-white">{exp.relatedKnowledgeIds.length} Publications</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedMediaIds && exp.relatedMediaIds.length > 0 ? (
                    <Link
                      href="/media"
                      className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl hover:bg-rose-900/40 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block">Media & News</span>
                        <span className="font-bold text-slate-200 group-hover:text-white">{exp.relatedMediaIds.length} Dispatches</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
