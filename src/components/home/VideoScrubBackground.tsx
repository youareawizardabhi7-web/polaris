'use client';

import React, { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GJaYKPxdnQG0Q9O26lu6DPmcHu/hf_20260805_192612_e00017a8-56b0-4957-935b-9ffd87663994.mp4';

interface VideoScrubBackgroundProps {
  videoUrl?: string;
}

export const VideoScrubBackground: React.FC<VideoScrubBackgroundProps> = ({
  videoUrl = VIDEO_URL,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser, retrying muted play:', err);
      });
    }
  }, [videoUrl]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-slate-950">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};
