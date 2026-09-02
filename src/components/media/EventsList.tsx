'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/lib/data/media';
import { Calendar, MapPin, Tag, ArrowRight, ExternalLink } from 'lucide-react';

export const EventsList: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Upcoming Polar Science Events</h2>
            <p className="text-xs text-slate-500">
              National conferences, scientific workshops, public lectures, and symposiums.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded text-xs font-mono font-bold">
          {MOCK_EVENTS.length} Scheduled Events
        </span>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_EVENTS.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                  {evt.eventType}
                </span>
                <span className="text-xs font-mono font-bold text-sky-800 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>{evt.date}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">{evt.title}</h3>
              
              <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-mono">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{evt.location}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {evt.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Official Event</span>
              <button
                onClick={() => alert(`Mock Registration for ${evt.title}`)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
              >
                <span>Register / Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
