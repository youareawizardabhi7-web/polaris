'use client';

import React, { useState } from 'react';
import { MOCK_PHOTO_STORIES, PhotoStory } from '@/lib/data/media';
import { Camera, X, Maximize2, MapPin, User, Calendar } from 'lucide-react';

export const PhotoGalleryModal: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoStory | null>(null);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
            <Camera className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Polar Science Photo Stories</h2>
            <p className="text-xs text-slate-500">
              High-resolution imagery from polar expeditions, research stations, glaciers, and field instrumentation.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-cyan-50 text-cyan-900 border border-cyan-200 rounded text-xs font-mono font-bold">
          {MOCK_PHOTO_STORIES.length} Photo Records
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PHOTO_STORIES.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-3 py-1 bg-slate-900/90 text-white rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enlarge Photo</span>
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/80 text-cyan-300 border border-slate-800">
                  {photo.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                {photo.title}
              </h3>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
              <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1 pt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{photo.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Close Fullscreen View"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-Res Image View */}
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Photo Metadata Footer */}
            <div className="p-6 space-y-3 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedPhoto.title}</h3>
                </div>
                <div className="text-right text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-1 justify-end text-slate-300">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedPhoto.photographer}</span>
                  </div>
                  <div className="flex items-center space-x-1 justify-end mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{selectedPhoto.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedPhoto.caption}
              </p>

              <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Geographic Location: {selectedPhoto.location}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
