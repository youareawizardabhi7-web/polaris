'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_GLOSSARY_TERMS, GlossaryTerm } from '@/lib/data/knowledge';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { BookOpen, Search, Database, ChevronRight } from 'lucide-react';

export const Glossary: React.FC = () => {
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string>(MOCK_GLOSSARY_TERMS[0].id);

  const filteredTerms = MOCK_GLOSSARY_TERMS.filter((t) => {
    if (!glossaryQuery.trim()) return true;
    const q = glossaryQuery.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.simpleDefinition.toLowerCase().includes(q) ||
      t.scientificDefinition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const selectedTerm =
    MOCK_GLOSSARY_TERMS.find((t) => t.id === selectedTermId) || filteredTerms[0] || MOCK_GLOSSARY_TERMS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Glossary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-mono tracking-tight">
              Polar Science Glossary
            </h2>
            <p className="text-xs text-slate-500">
              Clear simple definitions and rigorous scientific terminology for polar research terms.
            </p>
          </div>
        </div>

        {/* Search Term Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={glossaryQuery}
            onChange={(e) => setGlossaryQuery(e.target.value)}
            placeholder="Filter terms (e.g. Albedo)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Main Glossary Layout: Term List + Detail Definition Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Alphabetical / List of Terms */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-[420px] overflow-y-auto space-y-1">
          {filteredTerms.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No matching terms found.
            </div>
          ) : (
            filteredTerms.map((item) => {
              const isSelected = selectedTerm.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTermId(item.id)}
                  className={`w-full text-left p-3 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className="font-sans text-sm font-semibold">{item.term}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-slate-800 text-cyan-300' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Definition Card */}
        <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-xl p-6 space-y-5">
          {selectedTerm ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    GLOSSARY TERM
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">{selectedTerm.term}</h3>
                </div>
                <span className="px-2.5 py-1 bg-cyan-100 text-cyan-900 border border-cyan-200 rounded text-xs font-mono font-bold">
                  {selectedTerm.category}
                </span>
              </div>

              {/* Simple Definition */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1">
                <span className="text-[10px] font-mono uppercase text-sky-700 font-bold block">
                  Simple Definition
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {selectedTerm.simpleDefinition}
                </p>
              </div>

              {/* Scientific Definition */}
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 space-y-1 font-mono text-xs border border-slate-800">
                <span className="text-[10px] uppercase text-cyan-400 font-bold block">
                  Scientific & Quantitative Definition
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedTerm.scientificDefinition}
                </p>
              </div>

              {/* Related POLARIS Datasets */}
              {selectedTerm.relatedDatasetIds && selectedTerm.relatedDatasetIds.length > 0 && (
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 font-mono uppercase flex items-center space-x-1">
                    <Database className="w-3.5 h-3.5 text-sky-600 mr-1" />
                    <span>Related Datasets:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedDatasetIds.map((dsId) => {
                      const ds = MOCK_DATASETS.find((d) => d.id === dsId);
                      if (!ds) return null;
                      return (
                        <Link
                          key={dsId}
                          href={`/datasets/${dsId}`}
                          className="px-3 py-1.5 bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50 rounded-lg text-xs font-mono text-slate-800 transition-colors flex items-center space-x-1.5"
                        >
                          <span className="font-bold text-sky-800">{ds.id}</span>
                          <span className="text-slate-500 truncate max-w-[200px]">{ds.title}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-mono">
              Select a term to view definitions.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
