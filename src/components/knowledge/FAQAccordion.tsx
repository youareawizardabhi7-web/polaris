'use client';

import React, { useState } from 'react';
import { MOCK_FAQ_ITEMS, FAQItem } from '@/lib/data/knowledge';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [faqQuery, setFaqQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = MOCK_FAQ_ITEMS.filter((item) => {
    if (!faqQuery.trim()) return true;
    const q = faqQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">
              Clear answers regarding polar research, stations, data collection, and POLARIS access.
            </p>
          </div>
        </div>

        {/* Quick Search for FAQ */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={faqQuery}
            onChange={(e) => setFaqQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No matching FAQ items found.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen ? 'bg-sky-50/40 border-sky-300 shadow-2xs' : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-sm text-slate-900"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700 shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-sky-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
