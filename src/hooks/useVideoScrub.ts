'use client';

import { useEffect, useRef, useState } from 'react';
import * as MP4BoxModule from 'mp4box';

const DEFAULT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3GJaYKPxdnQG0Q9O26lu6DPmcHu/hf_20260805_192612_e00017a8-56b0-4957-935b-9ffd87663994.mp4';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const WATCHDOG = 60000;

interface DecodedFrame {
  timestampSec: number;
  bitmap: ImageBitmap;
}

export function useVideoScrub(videoUrl: string = DEFAULT_VIDEO_URL) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  // Smooth playback state
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const videoDurationRef = useRef(10); // Default placeholder until metadata loaded

  // WebCodecs / MP4Box frames bank & LRU cache
  const frameBankRef = useRef<DecodedFrame[]>([]);
  const lruMapRef = useRef<Map<number, ImageBitmap>>(new Map());
  const decoderRef = useRef<VideoDecoder | null>(null);
  const isWebCodecsFailedRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();
    let watchdogTimer: NodeJS.Timeout;

    // Check motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set watchdog timer to force native fallback if canvas doesn't render in 60s
    watchdogTimer = setTimeout(() => {
      if (!isCanvasReady) {
        setUsingFallback(true);
        isWebCodecsFailedRef.current = true;
      }
    }, WATCHDOG);

    // Scroll progress handler
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let maxScroll = 1;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalHeight = rect.height || document.documentElement.scrollHeight;
        maxScroll = Math.max(1, totalHeight - window.innerHeight);
      } else {
        const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        maxScroll = Math.max(1, docHeight - window.innerHeight);
      }

      const p = Math.min(1, Math.max(0, scrollY / maxScroll));
      const duration = videoRef.current?.duration || videoDurationRef.current;
      targetTimeRef.current = p * duration;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 1. Binary Search for decoded frame bank
    const getNearestFrameIndex = (targetSec: number, frames: DecodedFrame[]) => {
      if (frames.length === 0) return -1;
      let low = 0;
      let high = frames.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (frames[mid].timestampSec === targetSec) return mid;
        if (frames[mid].timestampSec < targetSec) low = mid + 1;
        else high = mid - 1;
      }

      const idx = Math.min(Math.max(0, low), frames.length - 1);
      if (idx > 0) {
        const prevDiff = Math.abs(frames[idx - 1].timestampSec - targetSec);
        const currDiff = Math.abs(frames[idx].timestampSec - targetSec);
        return prevDiff < currDiff ? idx - 1 : idx;
      }
      return idx;
    };

    // 2. Render frame onto Canvas
    const drawFrameToCanvas = (bitmap: ImageBitmap) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      if (canvas.width !== 1920 || canvas.height !== 1080) {
        canvas.width = 1920;
        canvas.height = 1080;
      }

      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      if (!isCanvasReady) {
        setIsCanvasReady(true);
        clearTimeout(watchdogTimer);
      }
    };

    // 3. Animation Loop with LERP interpolation
    const renderLoop = (now: number) => {
      const deltaSeconds = Math.max(0.001, (now - lastTimestamp) / 1000);
      lastTimestamp = now;

      const dt = Math.min(0.1, deltaSeconds);
      const target = targetTimeRef.current;
      let current = currentTimeRef.current;

      if (prefersReducedMotion) {
        current = target;
      } else {
        current += (target - current) * (1 - Math.exp(-dt * LERP_TAU));
        if (Math.abs(target - current) < SNAP) {
          current = target;
        }
      }
      currentTimeRef.current = current;

      // Render step: canvas (WebCodecs) vs fallback (<video>)
      if (
        !isWebCodecsFailedRef.current &&
        frameBankRef.current.length > 0 &&
        canvasRef.current
      ) {
        const frameIdx = getNearestFrameIndex(current, frameBankRef.current);
        if (frameIdx >= 0) {
          const frame = frameBankRef.current[frameIdx];
          drawFrameToCanvas(frame.bitmap);

          // Warm LRU Cache (i-1, i, i+1, i+2)
          const lruMap = lruMapRef.current;
          const warmIndices = [frameIdx - 1, frameIdx, frameIdx + 1, frameIdx + 2];
          warmIndices.forEach((idx) => {
            if (idx >= 0 && idx < frameBankRef.current.length) {
              const item = frameBankRef.current[idx];
              if (!lruMap.has(idx)) {
                lruMap.set(idx, item.bitmap);
              }
            }
          });

          // Evict old LRU entries if exceeded limit
          if (lruMap.size > LRU_MAX) {
            const firstKey = lruMap.keys().next().value;
            if (firstKey !== undefined) lruMap.delete(firstKey);
          }
        }
      } else if (videoRef.current) {
        // Fallback: direct HTML5 video currentTime seeking
        if (Math.abs(videoRef.current.currentTime - current) > 0.03) {
          videoRef.current.currentTime = current;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // 4. Initialize WebCodecs & MP4Box decoding (with software fallback)
    const initWebCodecsDecoder = async () => {
      if (typeof window === 'undefined' || !('VideoDecoder' in window)) {
        setUsingFallback(true);
        isWebCodecsFailedRef.current = true;
        return;
      }

      try {
        const response = await fetch(videoUrl, { mode: 'cors' });
        if (!response.ok) throw new Error('Fetch failed');

        const arrayBuffer = await response.arrayBuffer();
        const mp4boxfile = MP4BoxModule.createFile();

        mp4boxfile.onError = (e) => {
          console.warn('MP4Box error, using video fallback:', e);
          isWebCodecsFailedRef.current = true;
          setUsingFallback(true);
        };

        mp4boxfile.onReady = (info) => {
          const videoTrack = info.tracks.find((t) => t.video);
          if (!videoTrack) {
            isWebCodecsFailedRef.current = true;
            setUsingFallback(true);
            return;
          }

          videoDurationRef.current = info.duration / info.timescale;

          let decoderConfig: VideoDecoderConfig = {
            codec: videoTrack.codec.startsWith('vp') ? videoTrack.codec : 'avc1.640028',
            codedWidth: videoTrack.track_width,
            codedHeight: videoTrack.track_height,
            hardwareAcceleration: 'prefer-hardware',
          };

          const handleDecodedFrame = async (frame: VideoFrame) => {
            try {
              const bitmap = await createImageBitmap(frame);
              const timestampSec = (frame.timestamp || 0) / 1000000;

              frameBankRef.current.push({ timestampSec, bitmap });
              frameBankRef.current.sort((a, b) => a.timestampSec - b.timestampSec);
            } catch (err) {
              // ignore
            } finally {
              frame.close();
            }
          };

          const handleDecodeError = (err: any) => {
            console.warn('VideoDecoder error, trying software fallback', err);
            if (decoderConfig.hardwareAcceleration === 'prefer-hardware') {
              try {
                decoderConfig.hardwareAcceleration = 'prefer-software';
                decoderRef.current?.configure(decoderConfig);
                return;
              } catch (e) {
                // fall through
              }
            }
            isWebCodecsFailedRef.current = true;
            setUsingFallback(true);
          };

          const trackTimescale = videoTrack.timescale || 1000;

          try {
            const decoder = new VideoDecoder({
              output: handleDecodedFrame,
              error: handleDecodeError,
            });

            decoder.configure(decoderConfig);
            decoderRef.current = decoder;

            mp4boxfile.setExtractionOptions(videoTrack.id, null, { nbSamples: 1000 });

            mp4boxfile.onSamples = (id, user, samples) => {
              if (isWebCodecsFailedRef.current || !decoderRef.current) return;

              for (const sample of samples) {
                const tsScale = sample.timescale || trackTimescale;
                const chunk = new EncodedVideoChunk({
                  type: sample.is_sync ? 'key' : 'delta',
                  timestamp: (sample.cts * 1000000) / tsScale,
                  duration: (sample.duration * 1000000) / tsScale,
                  data: sample.data,
                });

                try {
                  decoderRef.current.decode(chunk);
                } catch (e) {
                  console.warn('Decode chunk failed:', e);
                  break;
                }
              }
            };

            mp4boxfile.start();
          } catch (err) {
            console.warn('Failed to configure VideoDecoder:', err);
            isWebCodecsFailedRef.current = true;
            setUsingFallback(true);
          }
        };

        (arrayBuffer as any).fileStart = 0;
        mp4boxfile.appendBuffer(arrayBuffer as any);
        mp4boxfile.flush();
      } catch (err) {
        console.warn('WebCodecs init failed, fallback to native video:', err);
        isWebCodecsFailedRef.current = true;
        setUsingFallback(true);
      }
    };

    initWebCodecsDecoder();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(watchdogTimer);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);

      if (decoderRef.current && decoderRef.current.state !== 'closed') {
        try {
          decoderRef.current.close();
        } catch (e) {
          // ignore
        }
      }

      frameBankRef.current.forEach((f) => f.bitmap.close());
      frameBankRef.current = [];
      lruMapRef.current.clear();
    };
  }, [videoUrl]);

  return {
    videoRef,
    canvasRef,
    containerRef,
    isCanvasReady,
    usingFallback,
  };
}
