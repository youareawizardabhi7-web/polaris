'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MOCK_NEWS_ARTICLES, 
  MOCK_VIDEOS, 
  MOCK_PHOTO_STORIES, 
  MOCK_EVENTS,
  MediaCategory, 
  NewsArticle 
} from '@/lib/data/media';
import { FeaturedNews } from '@/components/media/FeaturedNews';
import { NewsCard } from '@/components/media/NewsCard';
import { VideoGrid } from '@/components/media/VideoGrid';
import { PhotoGalleryModal } from '@/components/media/PhotoGalleryModal';
import { MediaCategoryBadge } from '@/components/media/MediaCategoryBadge';
import CarouselStacked, { Slide } from '@/components/ui/carousel-07';
import { 
  Newspaper, 
  Search, 
  SlidersHorizontal, 
  FilterX, 
  X, 
  Sparkles, 
  Radio, 
  Layers, 
  Video, 
  Camera, 
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MediaCategory>('All');

  const categories: MediaCategory[] = [
    'All',
    'News',
    'Announcements',
    'Research Highlights',
    'Events',
    'Videos',
    'Photo Stories'
  ];

  const featuredArticle = useMemo(() => {
    return MOCK_NEWS_ARTICLES.find((a) => a.featured) || MOCK_NEWS_ARTICLES[0];
  }, []);

  // Filtered News Articles (Sorted Date Descending)
  const filteredNews = useMemo(() => {
    const filtered = MOCK_NEWS_ARTICLES.filter((article) => {
      // Category filter
      if (activeCategory !== 'All' && activeCategory !== 'Videos' && activeCategory !== 'Photo Stories' && activeCategory !== 'Events') {
        if (article.category !== activeCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesDesc = article.summary.toLowerCase().includes(q);
        const matchesCategory = article.category.toLowerCase().includes(q);
        const matchesTags = article.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }, [searchQuery, activeCategory]);

  const handleClear = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-transparent py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Media Header */}
        <div className="bg-slate-950/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 text-white border border-slate-700 text-xs font-mono font-bold">
            <Newspaper className="w-4 h-4 text-white" />
            <span>National Polar Media & News Dissemination</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Polar Science Media
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mt-2">
              Stay informed about polar research, expeditions, discoveries, events and scientific developments.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl pt-2">
            <div className="relative flex items-center bg-white border border-slate-300 rounded-xl shadow-xs focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news stories, expedition updates, videos, photo stories and events..."
                className="w-full bg-transparent px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 mr-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Category Filter Bar */}
        <div className="bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs border border-slate-900'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {(searchQuery || activeCategory !== 'All') && (
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1 border-t border-slate-100">
              <span>
                Filtered by category: <strong>{activeCategory}</strong>
                {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
              </span>
              <button
                onClick={handleClear}
                className="inline-flex items-center space-x-1 text-sky-700 hover:text-sky-900 font-bold"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Section 1: Featured Story */}
        {activeCategory === 'All' && !searchQuery && (
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Featured Polar Science Report</h2>
            </div>
            <FeaturedNews article={featuredArticle} />
          </section>
        )}

        {/* Section 2: News & Press Grid */}
        {(activeCategory === 'All' || activeCategory === 'News' || activeCategory === 'Announcements' || activeCategory === 'Research Highlights') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-blue-700" />
                <h2 className="text-xl font-bold text-slate-900">
                  {activeCategory === 'All' ? 'Latest News & Scientific Dispatches' : `${activeCategory} Dispatches`}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {filteredNews.length} Stories Available
              </span>
            </div>

            {filteredNews.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-12 text-center space-y-4">
                <FilterX className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No News Stories Found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  No articles match your search filter. Try resetting filters or searching with different keywords.
                </p>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold font-mono"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="py-2">
                <CarouselStacked
                  slides={filteredNews.map((article) => ({
                    image: article.imageUrl,
                    title: article.title,
                    description: article.summary,
                    badge: article.category,
                    content: (
                      <div className="relative h-full w-full bg-slate-950 text-white flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                        {/* Top Badges */}
                        <div className="relative z-10 p-4 flex items-center justify-between">
                          <MediaCategoryBadge category={article.category} />
                          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center space-x-1 border border-slate-700/60">
                            <Clock className="w-3 h-3 text-sky-400" />
                            <span>{article.readingTime}</span>
                          </span>
                        </div>

                        {/* Bottom Content */}
                        <div className="relative z-10 p-5 space-y-2.5">
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-300">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{article.publishedDate}</span>
                            </span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{article.source}</span>
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {article.summary}
                          </p>

                          <div className="pt-2 flex items-center justify-between text-[11px] font-mono">
                            <span className="text-slate-400 text-[10px] truncate max-w-[110px]">{article.author}</span>
                            <Link
                              href={`/media/${article.id}`}
                              className="inline-flex items-center space-x-1 text-xs font-bold text-sky-400 hover:text-sky-300 pointer-events-auto"
                            >
                              <span>Read Story</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  }))}
                />
              </div>
            )}
          </section>
        )}

        {/* Section 4: Polar Science Videos */}
        {(activeCategory === 'All' || activeCategory === 'Videos') && (
          <VideoGrid />
        )}

        {/* Section 5: Photo Stories & Gallery */}
        {(activeCategory === 'All' || activeCategory === 'Photo Stories') && (
          <PhotoGalleryModal />
        )}

      </div>
    </div>
  );
}
