'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Database, Globe, FileText, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* About Hero Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-200 text-xs font-mono font-bold">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>National Polar Data Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About POLARIS Portal
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            POLARIS (Polar Science Data Discovery & Visualization Portal) is an open-access scientific repository inspired by India's polar science data ecosystem.
          </p>
        </div>

        {/* Core Scientific Mission & Domains */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-mono uppercase tracking-wider">
            Mandate & Scientific Scope
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Antarctic Research Domain</h3>
              <p className="leading-relaxed">
                Archiving observational data from Maitri and Bharati stations, Schirmacher Oasis lake ice cores, katabatic boundary layer meteorology, and fast-ice altimetry in Prydz Bay.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Arctic Research Domain</h3>
              <p className="leading-relaxed">
                Hosting aerosol black carbon radiative forcing parameters from Himadri Station in Ny-Ålesund, Svalbard, alongside multi-year hydrographic time-series from the IndARC subsurface mooring.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Himalayan Cryosphere Domain</h3>
              <p className="leading-relaxed">
                Benchmark glaciological mass balance, DGPS ice surface flow velocity, seasonal snow chemistry, and hydrological discharge from Chhota Shigri Glacier and Sutri Dhaka field stations.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-sans">Southern Ocean Domain</h3>
              <p className="leading-relaxed">
                Deep ocean CTD hydrography, dissolved inorganic carbon inventories, Subtropical-Polar Front dynamics, and marine phytoplankton ecology collected during annual ORV Sagar Kanya cruises.
              </p>
            </div>
          </div>
        </div>

        {/* FAIR Principles & Metadata Standards Section */}
        <div id="fair-principles" className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Open Science Standards</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            FAIR Data Compliance & Metadata ISO 19115
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 font-bold block text-base">F — Findable</strong>
              <p className="text-emerald-800 text-[11px]">All datasets assigned unique persistent DOIs and GCMD DIF metadata tags.</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 font-bold block text-base">A — Accessible</strong>
              <p className="text-emerald-800 text-[11px]">Open HTTP protocol access, REST APIs, and direct NetCDF/CSV package downloads.</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 font-bold block text-base">I — Interoperable</strong>
              <p className="text-emerald-800 text-[11px]">Structured in CF-compliant NetCDF4, GeoJSON, and WMO standard schemas.</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 font-bold block text-base">R — Reusable</strong>
              <p className="text-emerald-800 text-[11px]">Released under Creative Commons CC-BY 4.0 open scientific data license.</p>
            </div>
          </div>
        </div>

        {/* REST API & Data Access Policy */}
        <div id="api" className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl space-y-4">
          <h2 className="text-lg font-bold font-mono text-sky-400 uppercase tracking-wider">
            RESTful Data API Reference (v1)
          </h2>
          <p className="text-xs text-slate-300">
            Programmatic endpoint for automated dataset query, metadata retrieval, and time-series extraction.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-sky-300 space-y-2 border border-slate-800 overflow-x-auto">
            <p className="text-slate-400"># Query datasets by region and parameter</p>
            <p>GET https://data.ncpor.res.in/api/v1/datasets?region=Antarctica&parameter=temperature</p>
            <p className="text-slate-400 pt-2"># Fetch dataset detail & sample JSON</p>
            <p>GET https://data.ncpor.res.in/api/v1/datasets/POL-ANT-2024-001</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-4 text-xs font-mono">
          <h2 className="text-lg font-bold text-slate-900 font-sans">NCPOR Data Centre Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Headland Sada, Vasco-da-Gama, Goa 403804, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>polar-data@ncpor.res.in</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-sky-600" />
              <span>+91-832-2525600</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
