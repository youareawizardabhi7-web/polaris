'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MOCK_KNOWLEDGE_RESOURCES, 
  MOCK_EDUCATIONAL_RESOURCES, 
  KnowledgeCategory, 
  KnowledgeResource 
} from '@/lib/data/knowledge';
import { KnowledgeCard } from '@/components/knowledge/KnowledgeCard';
import { KnowledgeSearch } from '@/components/knowledge/KnowledgeSearch';
import { KnowledgeFilters } from '@/components/knowledge/KnowledgeFilters';
import { FAQAccordion } from '@/components/knowledge/FAQAccordion';
import { Glossary } from '@/components/knowledge/Glossary';
import { 
  BookOpenText, 
  Sparkles, 
  GraduationCap, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Database,
  FilterX
} from 'lucide-react';

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<KnowledgeCategory>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'title'>('relevance');

  // Featured resources
  const featuredResources = useMemo(() => {
    return MOCK_KNOWLEDGE_RESOURCES.filter((r) => r.featured);
  }, []);

  // Filtered & Sorted resources
  const filteredResources = useMemo(() => {
    return MOCK_KNOWLEDGE_RESOURCES.filter((resource) => {
      // Category filter
      if (activeCategory !== 'All' && activeCategory !== 'FAQs' && activeCategory !== 'Glossary') {
        if (resource.category !== activeCategory) return false;
      }

      // Search query filter across title, description, author, tags, category
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(q);
        const matchesDesc = resource.description.toLowerCase().includes(q);
        const matchesAuthor = resource.author.toLowerCase().includes(q) || resource.organization.toLowerCase().includes(q);
        const matchesCategory = resource.category.toLowerCase().includes(q);
        const matchesTags = resource.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesAuthor && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0; // relevance keeps original order
    });
  }, [searchQuery, activeCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Knowledge Repository Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200 text-xs font-mono font-bold">
            <BookOpenText className="w-4 h-4 text-sky-600" />
            <span>National Polar Infrastructure Knowledge Base</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Polar Science Knowledge Repository
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mt-2">
              Explore research, publications, reports and educational resources from India's polar science ecosystem.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="max-w-3xl pt-2">
            <KnowledgeSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
          <KnowledgeFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Search Result Stats & Clear Filters */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
            <span>
              Showing <strong>{filteredResources.length}</strong> resources
              {activeCategory !== 'All' && <span> in category <strong>{activeCategory}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </span>

            {(searchQuery || activeCategory !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center space-x-1 text-sky-700 hover:text-sky-900 font-bold transition-colors"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Section 1: Featured Knowledge Resources */}
        {activeCategory === 'All' && !searchQuery && (
          <section className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Featured Research & Publications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <KnowledgeCard key={resource.id} resource={resource} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Complete Knowledge Catalog Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpenText className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900">
                {activeCategory === 'All' ? 'Scientific Knowledge Catalog' : `${activeCategory} Resources`}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {filteredResources.length} Articles Available
            </span>
          </div>

          {filteredResources.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
              <FilterX className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No Knowledge Resources Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No articles match your search criteria. Try adjusting your category filters or search keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold font-mono transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <KnowledgeCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Educational Resources - Learn Polar Science */}
        {(activeCategory === 'All' || activeCategory === 'Education') && (
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6 text-amber-800" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Learn Polar Science</h2>
                  <p className="text-xs text-slate-500">
                    Accessible scientific guides written for students, educators, and the general public.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded text-xs font-mono font-bold hidden sm:inline">
                Educational Series
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_EDUCATIONAL_RESOURCES.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900">
                        {edu.targetAudience}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{edu.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{edu.description}</p>
                    
                    <div className="pt-2 border-t border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Key Learnings:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {edu.keyTakeaways.map((kt, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{kt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {edu.relatedDatasetIds && edu.relatedDatasetIds.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">Includes Data Links</span>
                      <Link
                        href={`/datasets/${edu.relatedDatasetIds[0]}`}
                        className="inline-flex items-center text-xs font-bold text-sky-700 hover:underline space-x-1"
                      >
                        <span>View Related Dataset</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Frequently Asked Questions (Accordion) */}
        {(activeCategory === 'All' || activeCategory === 'FAQs') && (
          <FAQAccordion />
        )}

        {/* Section 5: Polar Science Glossary */}
        {(activeCategory === 'All' || activeCategory === 'Glossary') && (
          <Glossary />
        )}

      </div>
    </div>
  );
}
