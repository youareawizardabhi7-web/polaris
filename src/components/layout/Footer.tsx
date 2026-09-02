'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, ExternalLink, Globe, Database, FileText, Mail } from 'lucide-react';

import { getCurrentYear } from '@/lib/utils/date';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Organization Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-sky-900/60 border border-sky-600/40 flex items-center justify-center text-sky-400">
                <Compass className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white font-mono">POLARIS</span>
                <p className="text-xs text-sky-300 font-medium">Polar Science Data Discovery Portal</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Inspired by India's polar science data ecosystem. Open-access prototype portal for polar research, station telemetry, and scientific dataset visualization.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-sky-300">
                SIH Prototype Portal
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">
                Sample Scientific Records
              </span>
            </div>
          </div>

          {/* Column 1: Scientific Data */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Data Discovery</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/explore?region=Antarctica" className="hover:text-sky-300 transition-colors">Antarctic Datasets</Link></li>
              <li><Link href="/explore?region=Arctic" className="hover:text-sky-300 transition-colors">Arctic Observations</Link></li>
              <li><Link href="/explore?region=Himalayas" className="hover:text-sky-300 transition-colors">Himalayan Cryosphere</Link></li>
              <li><Link href="/explore?region=Southern+Ocean" className="hover:text-sky-300 transition-colors">Southern Ocean CTD</Link></li>
              <li><Link href="/datasets" className="hover:text-sky-300 transition-colors">Complete Data Catalog</Link></li>
            </ul>
          </div>

          {/* Column 2: Infrastructure */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Infrastructure</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/map" className="hover:text-sky-300 transition-colors">Interactive Station Map</Link></li>
              <li><Link href="/map?station=maitri-station" className="hover:text-sky-300 transition-colors">Maitri Station (Antarctica)</Link></li>
              <li><Link href="/map?station=bharati-station" className="hover:text-sky-300 transition-colors">Bharati Station (Antarctica)</Link></li>
              <li><Link href="/map?station=himadri-station" className="hover:text-sky-300 transition-colors">Himadri Station (Arctic)</Link></li>
              <li><Link href="/expeditions" className="hover:text-sky-300 transition-colors">Indian Polar Expeditions</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & External */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Knowledge & Media</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/knowledge" className="hover:text-sky-300 transition-colors">Knowledge Repository</Link></li>
              <li><Link href="/media" className="hover:text-sky-300 transition-colors">Media & News Dissemination</Link></li>
              <li><Link href="/research" className="hover:text-sky-300 transition-colors">Researcher Portal & Workspace</Link></li>
              <li><Link href="/about#fair-principles" className="hover:text-sky-300 transition-colors">FAIR Data Standards</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span>Built for Polar Science and Research</span>
            <span>•</span>
            <span>© {getCurrentYear()} POLARIS</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">Prototype Disclaimer</Link>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Terms of Data Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
