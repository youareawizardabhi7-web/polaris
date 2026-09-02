'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { MOCK_KNOWLEDGE_RESOURCES } from '@/lib/data/knowledge';
import { DatasetVisualization } from '@/components/datasets/DatasetVisualization';
import { RelatedStations } from '@/components/common/RelatedStations';
import { RelatedMedia } from '@/components/common/RelatedMedia';
import { 
  Download, 
  Navigation, 
  BarChart2, 
  Share2, 
  Bookmark, 
  FileText, 
  Database, 
  MapPin, 
  Calendar, 
  HardDrive, 
  ShieldCheck, 
  Check, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Info,
  Tag,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function DatasetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const datasetId = params.id as string;

  const dataset = MOCK_DATASETS.find((d) => d.id === datasetId) || MOCK_DATASETS[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'metadata' | 'visualization' | 'spatial' | 'files' | 'citation'>('overview');
  const [isCopied, setIsCopied] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'metadata', label: 'Metadata', icon: FileText },
    { id: 'visualization', label: 'Visualization', icon: BarChart2 },
    { id: 'spatial', label: 'Spatial Coverage', icon: MapPin },
    { id: 'files', label: 'Files & Downloads', icon: HardDrive },
    { id: 'citation', label: 'Citation & DOI', icon: ShieldCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/datasets" className="hover:text-slate-900">Datasets</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{dataset.id}</span>
        </nav>

        {/* Dataset Detail Header Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-100 text-sky-900 border border-sky-200 rounded-md text-xs font-extrabold font-mono uppercase">
                {dataset.region}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-md text-xs font-semibold">
                {dataset.discipline}
              </span>
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-md text-xs font-mono font-bold">
                {dataset.dataFormat}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                DOI: <a href={`https://doi.org/${dataset.doi}`} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">{dataset.doi}</a>
              </span>
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-600' : ''}`} />
              <span>{isBookmarked ? 'Saved to Workspace' : 'Save Dataset'}</span>
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {dataset.title}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-4xl">
              {dataset.shortDescription}
            </p>
          </div>

          {/* Key Metadata Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Station / Location</span>
              <strong className="text-slate-900">{dataset.station}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Temporal Range</span>
              <strong className="text-slate-900">{dataset.temporalCoverage}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Provider / Agency</span>
              <strong className="text-slate-900 truncate block">{dataset.provider}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Downloads</span>
              <strong className="text-sky-800">{dataset.downloadsCount} downloads</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Dataset ({dataset.fileSize})</span>
            </button>

            <Link
              href={`/map?station=${encodeURIComponent(dataset.station)}`}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all flex items-center space-x-2 shadow-xs"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>View on Map</span>
            </Link>

            <button
              onClick={() => setActiveTab('visualization')}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-sky-300 text-slate-800 font-bold rounded-xl text-xs transition-all flex items-center space-x-2 shadow-xs"
            >
              <BarChart2 className="w-4 h-4 text-sky-600" />
              <span>Visualize Parameters</span>
            </button>

            <Link
              href={`/assistant?contextType=dataset&contextId=${dataset.id}&contextTitle=${encodeURIComponent(dataset.title)}`}
              className="px-4 py-2.5 bg-sky-50 border border-sky-300 hover:bg-sky-100 text-sky-900 font-bold rounded-xl text-xs transition-all flex items-center space-x-2 shadow-2xs font-mono"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Explain Simply with AI</span>
            </Link>

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 bg-white rounded-xl p-2 shadow-xs flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="min-h-[400px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Scientific Abstract & Background</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {dataset.fullDescription}
                </p>
              </div>

              {/* Variables Table */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                  Monitored Scientific Variables
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="py-2.5 px-4">Variable Code</th>
                        <th className="py-2.5 px-4">Measurement Unit</th>
                        <th className="py-2.5 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      {dataset.variables.map((v, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-4 font-bold text-sky-800">{v.name}</td>
                          <td className="py-2 px-4 text-slate-600">{v.unit}</td>
                          <td className="py-2 px-4">{v.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
                <span className="font-bold text-slate-900 block uppercase">Principal Investigator & Institution:</span>
                <p>{dataset.provider}</p>
                <p>NCPOR Headland Sada, Vasco-da-Gama, Goa 403804, India</p>
              </div>
            </div>
          )}

          {/* TAB 2: METADATA */}
          {activeTab === 'metadata' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 font-mono text-xs">
              <h3 className="text-lg font-bold text-slate-900 font-sans">ISO 19115 / GCMD DIF Metadata Record</h3>
              <div className="bg-slate-900 text-sky-300 p-4 rounded-xl overflow-x-auto text-[11px] leading-relaxed border border-slate-800">
                <pre>{`{
  "DatasetID": "${dataset.id}",
  "Title": "${dataset.title}",
  "DOI": "${dataset.doi}",
  "SpatialCoverage": "${dataset.spatialCoverage}",
  "TemporalStart": "${dataset.startYear}-01-01",
  "TemporalEnd": "${dataset.endYear}-12-31",
  "Format": "${dataset.dataFormat}",
  "Publisher": "National Centre for Polar and Ocean Research",
  "License": "CC-BY 4.0 Open Scientific License"
}`}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: VISUALIZATION */}
          {activeTab === 'visualization' && (
            <DatasetVisualization dataset={dataset} />
          )}

          {/* TAB 4: SPATIAL COVERAGE */}
          {activeTab === 'spatial' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Spatial Extent & Coordinates</h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 font-mono text-xs">
                <p><strong>Bounding Region:</strong> {dataset.spatialCoverage}</p>
                {dataset.coordinates && (
                  <p><strong>Centroid Latitude / Longitude:</strong> {dataset.coordinates.lat}°, {dataset.coordinates.lng}°</p>
                )}
              </div>
              <div className="h-64 bg-slate-900 rounded-xl flex items-center justify-center text-sky-300 font-mono text-xs border border-slate-800">
                <span>[ Map Boundary Preview: {dataset.spatialCoverage} ]</span>
              </div>
            </div>
          )}

          {/* TAB 5: FILES */}
          {activeTab === 'files' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Available Data Packages & Files</h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs font-mono">
                {dataset.fileList.map((file, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 flex items-center justify-between hover:bg-sky-50 transition-colors">
                    <div className="space-y-0.5">
                      <strong className="text-slate-900 block text-sm">{file.filename}</strong>
                      <span className="text-slate-500 text-[11px]">{file.size} • Format: {file.format} • Updated: {file.updated}</span>
                    </div>
                    <button
                      onClick={() => setDownloadModalOpen(true)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CITATION */}
          {activeTab === 'citation' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Dataset Citation Guidelines</h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-slate-700 font-mono uppercase block">APA 7th Format:</span>
                <p className="text-xs text-slate-800 font-serif leading-relaxed italic bg-white p-3 border border-slate-200 rounded-lg">
                  {dataset.citation}
                </p>
              </div>

              <div className="p-4 bg-slate-900 text-sky-300 rounded-xl space-y-2 font-mono text-xs border border-slate-800">
                <span className="text-slate-400 font-bold block">BibTeX Format:</span>
                <pre className="text-[11px] leading-relaxed overflow-x-auto">{`@misc{ncpor_${dataset.id.toLowerCase().replace(/-/g, '_')},
  author = {National Centre for Polar and Ocean Research},
  title = {${dataset.title}},
  year = {${dataset.endYear}},
  publisher = {Polaris Data Portal},
  doi = {${dataset.doi}}
}`}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Unified Cross-Linking Section */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-sans flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
            <span>Connected Scientific Knowledge Graph</span>
          </h2>

          {/* Related Expedition Card */}
          {dataset.relatedExpeditionIds && dataset.relatedExpeditionIds.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Navigation className="w-5 h-5 text-purple-700" />
                <h3 className="text-base font-bold text-slate-900">Related Indian Polar Expedition</h3>
              </div>
              {INDIAN_POLAR_EXPEDITIONS.filter((e) => dataset.relatedExpeditionIds?.includes(e.id)).map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-900">
                      {exp.region} • {exp.year}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{exp.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{exp.summary}</p>
                  </div>
                  <Link
                    href="/expeditions"
                    className="px-4 py-2 bg-slate-900 hover:bg-purple-800 text-white rounded-lg text-xs font-mono font-bold transition-colors shrink-0 flex items-center space-x-1"
                  >
                    <span>View Expedition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Related Stations Component */}
          <RelatedStations stationIds={dataset.relatedStationIds} />

          {/* Related Knowledge Articles */}
          {dataset.relatedKnowledgeIds && dataset.relatedKnowledgeIds.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Related Knowledge Articles</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_KNOWLEDGE_RESOURCES.filter((k) => dataset.relatedKnowledgeIds?.includes(k.id)).map((article) => (
                  <Link
                    key={article.id}
                    href={`/knowledge/${article.id}`}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900">
                        {article.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs font-mono font-bold text-emerald-700">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Media Component */}
          <RelatedMedia mediaIds={dataset.relatedMediaIds} />
        </div>

      </div>

      {/* Mock Download Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Download Data Package</h3>
            <p className="text-xs text-slate-600">
              Select your desired file format for <strong className="text-slate-900">{dataset.title}</strong>
            </p>
            <div className="space-y-2 pt-2">
              {['NetCDF4 Binary Archive (.nc)', 'CSV Tabular Spreadsheets (.csv)', 'GeoJSON Vector Layer (.geojson)'].map((fmt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    alert(`Starting mock download of ${fmt} for ${dataset.id}`);
                    setDownloadModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 text-xs font-mono font-bold text-slate-800 transition-colors flex items-center justify-between"
                >
                  <span>{fmt}</span>
                  <Download className="w-4 h-4 text-sky-600" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
