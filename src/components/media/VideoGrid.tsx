'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_VIDEOS, VideoItem } from '@/lib/data/media';
import { sortByDateDesc } from '@/lib/utils/date';
import { Video, Play, Clock, X, Database, AlertCircle, VideoOff } from 'lucide-react';

export const VideoGrid: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const sortedVideos = sortByDateDesc(MOCK_VIDEOS, 'publishedDate');

  const handleOpenVideo = (vid: VideoItem) => {
    setHasVideoError(false);
    setActiveVideo(vid);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setHasVideoError(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center font-bold">
            <Video className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Polar Science Video Archive</h2>
            <p className="text-xs text-slate-500">
              Field footage, instrument deployments, station tours, and scientific interviews.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded text-xs font-mono font-bold">
          {MOCK_VIDEOS.length} Video Reports
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => handleOpenVideo(vid)}
            className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with Play Icon / Status */}
              <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                  {vid.videoUrl ? (
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  ) : (
                    <div className="px-2.5 py-1 rounded bg-slate-900/90 text-amber-300 border border-amber-500/40 text-[10px] font-mono flex items-center space-x-1 shadow-md">
                      <VideoOff className="w-3 h-3 text-amber-400" />
                      <span>Preview Unavailable</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>{vid.duration}</span>
                </div>

                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/80 text-rose-300 border border-slate-800">
                    {vid.category}
                  </span>
                </div>
              </div>

              {/* Text info */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors line-clamp-2">
                  {vid.title}
                </h3>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-100">
              <span>Published: {vid.publishedDate}</span>
              {vid.videoUrl ? (
                <span className="text-rose-600 font-bold group-hover:underline">Play Video ▶</span>
              ) : (
                <span className="text-slate-400 italic">No Media Source</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 relative flex flex-col">
            {/* Modal Close Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 pr-8">
              <div>
                <span className="text-xs font-mono text-rose-400 uppercase font-bold">
                  {activeVideo.category} • {activeVideo.duration}
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">{activeVideo.title}</h3>
              </div>
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Video Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* HTML5 Video Element OR Fallback Error View */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {activeVideo.videoUrl && !hasVideoError ? (
                <video
                  key={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain rounded-xl"
                  onError={() => setHasVideoError(true)}
                >
                  <source src={activeVideo.videoUrl} type="video/mp4" />
                  <source src={activeVideo.videoUrl} type="video/webm" />
                  Your browser does not support HTML video.
                </video>
              ) : (
                <div className="p-8 text-center space-y-3 max-w-md">
                  <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base">Video Preview Unavailable</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    The requested media file is not attached or could not be streamed for this scientific resource.
                  </p>
                  <button
                    onClick={handleCloseVideo}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono font-bold transition-colors"
                  >
                    Close Player
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeVideo.description}
            </p>

            {activeVideo.relatedDatasetIds && activeVideo.relatedDatasetIds.length > 0 && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Connected Scientific Dataset:</span>
                <Link
                  href={`/datasets/${activeVideo.relatedDatasetIds[0]}`}
                  className="text-sky-400 hover:underline flex items-center space-x-1"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{activeVideo.relatedDatasetIds[0]}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
