'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { unifiedSearch, SearchResultItem } from '@/lib/search';
import { 
  Search as SearchIcon, 
  X, 
  Database, 
  BookOpen, 
  Newspaper, 
  Navigation, 
  Radio, 
  ArrowRight, 
  Sparkles,
  Tag,
  Calendar,
  MapPin,
  HelpCircle
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('type') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${activeCategory}`);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${cat}`);
  };

  const handleSuggestionClick = (suggested: string) => {
    setQuery(suggested);
    router.push(`/search?q=${encodeURIComponent(suggested)}&type=${activeCategory}`);
  };

  const handleClear = () => {
    setQuery('');
    router.push('/search');
  };

  // Perform search
  const { results, counts } = useMemo(() => {
    return unifiedSearch(query, activeCategory);
  }, [query, activeCategory]);

  const suggestions = [
    '45th Antarctic Expedition',
    'Maitri Station',
    'Antarctic climate',
    'Black Carbon',
    'Glacier research',
    'Southern Ocean CTD'
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Results', count: counts.all },
    { id: 'dataset', label: 'Datasets', count: counts.dataset, icon: Database },
    { id: 'knowledge', label: 'Knowledge', count: counts.knowledge, icon: BookOpen },
    { id: 'media', label: 'Media & News', count: counts.media, icon: Newspaper },
    { id: 'expedition', label: 'Expeditions', count: counts.expedition, icon: Navigation },
    { id: 'station', label: 'Stations', count: counts.station, icon: Radio }
  ];

  const getTypeBadge = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'dataset':
        return { label: 'DATASET', bg: 'bg-sky-100 text-sky-900 border-sky-300', icon: Database };
      case 'knowledge':
        return { label: 'KNOWLEDGE', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: BookOpen };
      case 'media':
        return { label: 'MEDIA', bg: 'bg-rose-100 text-rose-900 border-rose-300', icon: Newspaper };
      case 'expedition':
        return { label: 'EXPEDITION', bg: 'bg-purple-100 text-purple-900 border-purple-300', icon: Navigation };
      case 'station':
        return { label: 'STATION', bg: 'bg-blue-100 text-blue-900 border-blue-300', icon: Radio };
      default:
        return { label: 'RESOURCE', bg: 'bg-slate-100 text-slate-900 border-slate-300', icon: Sparkles };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>POLARIS Unified Search Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Search POLARIS
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Discover datasets, research publications, expedition logs, media dispatches, and polar stations.
            </p>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-3xl">
            <div className="relative flex items-center">
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by keywords, station, expedition number, dataset DOI..."
                className="w-full pl-12 pr-24 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all shadow-2xs font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-mono font-bold transition-colors shadow-2xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-mono">Suggested Searches:</span>
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => handleSuggestionClick(item)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300 border border-slate-200 text-slate-700 rounded-lg transition-colors font-mono"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary & Category Tabs */}
        {query.trim() && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Search results for: <span className="text-sky-700">"{query}"</span>
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Found {counts.all} matching scientific records across the POLARIS knowledge graph
                </p>
              </div>

              {/* Dynamic Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleCategoryChange(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 border transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      <span>{tab.label}</span>
                      <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${isActive ? 'bg-slate-800 text-sky-300' : 'bg-slate-100 text-slate-600'}`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results List */}
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((item) => {
                  const badge = getTypeBadge(item.type);
                  const BadgeIcon = badge.icon;
                  return (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                      <div className="space-y-2 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center space-x-1 ${badge.bg}`}>
                            <BadgeIcon className="w-3 h-3" />
                            <span>{badge.label}</span>
                          </span>

                          {item.category && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                              {item.category}
                            </span>
                          )}

                          {item.date && (
                            <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{item.date}</span>
                            </span>
                          )}

                          {item.location && (
                            <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{item.location}</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                          <Link href={item.url}>{item.title}</Link>
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <Tag className="w-3 h-3 text-slate-400" />
                            {item.tags.slice(0, 5).map((t) => (
                              <span key={t} className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center md:flex-col justify-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <Link
                          href={item.url}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-sky-800 text-white rounded-lg text-xs font-mono font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
                        >
                          <span>View {item.type.toUpperCase()}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search State */
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching results found</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No POLARIS records matched your search query "<span className="font-semibold">{query}</span>". Try using broader scientific terms or searching for station names like <span className="font-mono text-sky-700">"Maitri"</span>, <span className="font-mono text-sky-700">"Himadri"</span>, or expedition numbers like <span className="font-mono text-sky-700">"46th Antarctic Expedition"</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-mono font-bold transition-colors"
                  >
                    Clear Search Query
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 py-12 text-center text-xs font-mono text-slate-500">
        Loading POLARIS Unified Search...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
