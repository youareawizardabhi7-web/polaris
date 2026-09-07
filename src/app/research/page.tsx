'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { RESEARCH_STATIONS } from '@/lib/data/stations';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { 
  UserCheck, 
  Bookmark, 
  Download, 
  Clock, 
  BarChart2, 
  FileText, 
  FolderPlus, 
  Share2, 
  Check, 
  Radio, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ResearchDashboardPage() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'saved' | 'recent' | 'downloads' | 'stations' | 'citations'>('saved');

  const savedDatasets = MOCK_DATASETS.slice(0, 3);
  const recentDatasets = MOCK_DATASETS.slice(2, 6);
  const recentDownloads = [
    { title: 'Antarctic Surface Meteorology & AWS High-Resolution Time Series', date: 'Today at 10:14 AM', format: 'NetCDF4 (3.2 GB)', id: 'POL-ANT-2024-001' },
    { title: 'Black Carbon Observations — Arctic', date: 'Yesterday at 04:45 PM', format: 'CSV (640 MB)', id: 'POL-ARC-2024-002' },
    { title: 'Southern Ocean CTD Deep Hydrographic Profiles', date: '28 Aug 2026', format: 'NetCDF4 (1.8 GB)', id: 'POL-SO-2023-003' }
  ];

  return (
    <div className="min-h-screen bg-transparent py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Researcher Header Banner */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-sky-300 border border-slate-700 flex items-center justify-center font-bold text-xl shadow-md">
              <UserCheck className="w-7 h-7 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-white">Researcher Workspace</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-emerald-400 border border-slate-700">
                  NCPOR Verified Principal Investigator
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Manage your saved polar datasets, custom parameter charts, download history, and APA/BibTeX citations.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
              <span className="text-slate-400 block text-[10px]">SAVED DATASETS</span>
              <strong className="text-sky-800 text-base">{savedDatasets.length} Items</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
              <span className="text-slate-400 block text-[10px]">RECENT DOWNLOADS</span>
              <strong className="text-slate-900 text-base">3 Files</strong>
            </div>
          </div>
        </div>

        {/* Workspace Tab Navigation */}
        <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xs flex flex-wrap items-center gap-2">
          {[
            { id: 'saved', label: 'Saved Datasets', icon: Bookmark, count: savedDatasets.length },
            { id: 'recent', label: 'Recently Viewed', icon: Clock, count: recentDatasets.length },
            { id: 'downloads', label: 'Download Log', icon: Download, count: 3 },
            { id: 'stations', label: 'Favorite Stations', icon: Radio, count: 3 },
            { id: 'citations', label: 'Citation Generator', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeWorkspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveWorkspaceTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isActive ? 'bg-slate-800 text-sky-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Workspace Body */}
        <div className="space-y-6">
          
          {/* TAB 1: SAVED DATASETS */}
          {activeWorkspaceTab === 'saved' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Saved Research Datasets</h2>
                <span className="text-xs font-mono text-slate-500">Bookmarked for offline analysis</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedDatasets.map((ds) => (
                  <DatasetCard key={ds.id} dataset={ds} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RECENTLY VIEWED */}
          {activeWorkspaceTab === 'recent' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Recently Viewed Datasets</h2>
                <span className="text-xs font-mono text-slate-500">Browsing History</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentDatasets.map((ds) => (
                  <DatasetCard key={ds.id} dataset={ds} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOWNLOAD LOG */}
          {activeWorkspaceTab === 'downloads' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Download Activity Log</h2>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs font-mono">
                {recentDownloads.map((dl, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors">
                    <div className="space-y-1">
                      <strong className="text-slate-900 text-sm block">{dl.title}</strong>
                      <span className="text-slate-500">{dl.format} • Downloaded: {dl.date}</span>
                    </div>
                    <Link
                      href={`/datasets/${dl.id}`}
                      className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
                    >
                      Re-download Package
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FAVORITE STATIONS */}
          {activeWorkspaceTab === 'stations' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESEARCH_STATIONS.slice(0, 3).map((st) => (
                <div key={st.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-100 text-sky-800">
                      {st.region}
                    </span>
                    <span className="text-xs text-emerald-600 font-mono font-bold">● Active</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{st.name}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{st.description}</p>
                  <Link
                    href={`/map?station=${st.id}`}
                    className="inline-flex items-center text-xs font-bold text-sky-700 hover:underline pt-2"
                  >
                    <span>View Live Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CITATION GENERATOR */}
          {activeWorkspaceTab === 'citations' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-700">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>WORKSPACE CITATION EXPORTER</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Bulk Citation Generator for Saved Datasets</h2>
              <div className="bg-slate-900 text-sky-300 p-4 rounded-xl font-mono text-xs space-y-3 border border-slate-800">
                <p>% Polaris Data Portal Citation Export (APA 7th)</p>
                {savedDatasets.map((ds, idx) => (
                  <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-300">
                    {ds.citation}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
