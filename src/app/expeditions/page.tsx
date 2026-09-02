'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { PolarRegion } from '@/types/portal';
import { Layers, Calendar, Users, Database, ArrowRight, CheckCircle2, Navigation, Ship } from 'lucide-react';

export default function ExpeditionsPage() {
  const [selectedRegion, setSelectedRegion] = useState<PolarRegion | 'All'>('All');

  const filteredExpeditions = INDIAN_POLAR_EXPEDITIONS.filter((exp) =>
    selectedRegion === 'All' ? true : exp.region === selectedRegion
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-700 mb-1">
              <Ship className="w-4 h-4 text-sky-600" />
              <span>INDIAN POLAR SCIENTIFIC MISSIONS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Indian Polar Expeditions & Missions
            </h1>
            <p className="text-xs text-slate-500 mt-1">
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

        {/* Horizontal Scientific Timeline Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Scientific Timeline Overview</span>
            </span>
            <span className="text-xs font-mono text-slate-400">1981 – Present</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
            {INDIAN_POLAR_EXPEDITIONS.map((exp, idx) => (
              <div
                key={exp.id}
                className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1 relative"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-sky-400 font-bold">{exp.expeditionNumber}</span>
                  <span className="text-slate-500">{exp.year.split('-')[0]}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate">{exp.title}</h4>
                <span className="text-[10px] text-slate-400 block font-mono">{exp.region}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Expeditions Grid */}
        <div className="space-y-6">
          {filteredExpeditions.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-sky-300 transition-all space-y-6"
            >
              
              {/* Expedition Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-sky-100 text-sky-900 border border-sky-200 rounded-md text-xs font-mono font-bold">
                      {exp.expeditionNumber}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-md text-xs font-mono font-semibold">
                      {exp.region}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${
                      exp.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1">{exp.title}</h2>
                </div>

                <div className="text-left sm:text-right font-mono text-xs text-slate-500 space-y-0.5">
                  <div>Deployment Year: <strong className="text-slate-900">{exp.year}</strong></div>
                  <div>Base / Vessel: <strong className="text-slate-900">{exp.vesselOrBase}</strong></div>
                </div>
              </div>

              {/* Summary & Leader */}
              <div className="space-y-2">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {exp.summary}
                </p>
                <p className="text-xs font-mono text-slate-500">
                  Mission Expedition Leader: <strong className="text-slate-800">{exp.leader}</strong>
                </p>
              </div>

              {/* Research Objectives */}
              <div className="space-y-2 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider block">
                  Key Research Objectives:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                  {exp.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Stats & Dataset Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center space-x-6 text-slate-600">
                  <span className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{exp.participatingScientists} Scientists</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Database className="w-4 h-4 text-sky-600" />
                    <span>{exp.datasetsCollected} Open Datasets</span>
                  </span>
                </div>

                <Link
                  href={`/explore?region=${encodeURIComponent(exp.region)}`}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-sky-800 text-white rounded-lg font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <span>Explore Expedition Datasets</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Cross-Linking Knowledge Graph Links */}
              <div className="pt-4 border-t border-slate-200/80 space-y-3">
                <span className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider block">
                  Expedition Connected Knowledge Graph:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {exp.relatedDatasetIds && exp.relatedDatasetIds.length > 0 ? (
                    <Link
                      href={`/datasets/${exp.relatedDatasetIds[0]}`}
                      className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">Research Data</span>
                        <span className="font-bold text-slate-900 group-hover:text-sky-800">{exp.relatedDatasetIds.length} Linked Datasets</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedStationIds && exp.relatedStationIds.length > 0 ? (
                    <Link
                      href={`/map?station=${exp.relatedStationIds[0]}`}
                      className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-800 uppercase block">Research Base</span>
                        <span className="font-bold text-slate-900 group-hover:text-blue-800">{exp.relatedStationIds.length} Stations</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedKnowledgeIds && exp.relatedKnowledgeIds.length > 0 ? (
                    <Link
                      href={`/knowledge/${exp.relatedKnowledgeIds[0]}`}
                      className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">Knowledge</span>
                        <span className="font-bold text-slate-900 group-hover:text-emerald-800">{exp.relatedKnowledgeIds.length} Publications</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null}

                  {exp.relatedMediaIds && exp.relatedMediaIds.length > 0 ? (
                    <Link
                      href="/media"
                      className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">Media & News</span>
                        <span className="font-bold text-slate-900 group-hover:text-rose-800">{exp.relatedMediaIds.length} Dispatches</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-600 group-hover:translate-x-1 transition-transform" />
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
