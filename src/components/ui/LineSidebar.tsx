'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import './LineSidebar.css';

export interface SidebarItemObject {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: string;
  isSpecial?: boolean;
}

export type SidebarItem = string | SidebarItemObject;

export interface LineSidebarProps {
  items?: SidebarItem[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: 'linear' | 'smooth' | 'sharp';
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  activePath?: string;
  onItemClick?: (index: number, label: string, item?: SidebarItem) => void;
  className?: string;
}

const FALLOFF_CURVES = {
  linear: (p: number) => p,
  smooth: (p: number) => p * p * (3 - 2 * p),
  sharp: (p: number) => p * p * p,
};

const DEFAULT_ITEMS: SidebarItem[] = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
];

export const LineSidebar: React.FC<LineSidebarProps> = ({
  items = DEFAULT_ITEMS,
  accentColor = '#38bdf8',
  textColor = '#f8fafc',
  markerColor = '#475569',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 24,
  falloff = 'smooth',
  markerLength = 45,
  markerGap = 8,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.95,
  smoothing = 100,
  defaultActive = null,
  activePath,
  onItemClick,
  className = '',
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef<number>(smoothing);

  const findActiveIndex = () => {
    if (activePath) {
      const idx = items.findIndex((item) => {
        if (typeof item === 'object') {
          return item.href === activePath || (item.href && item.href !== '/' && activePath.startsWith(item.href));
        }
        return false;
      });
      if (idx !== -1) return idx;
    }
    return defaultActive;
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(findActiveIndex());

  useEffect(() => {
    setActiveIndex(findActiveIndex());
  }, [activePath]);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const currentItems = itemRefs.current;
    for (let i = 0; i < currentItems.length; i++) {
      const el = currentItems[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const currentItems = itemRefs.current;
      for (let i = 0; i < currentItems.length; i++) {
        const el = currentItems[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string, item: SidebarItem) => {
      setActiveIndex(index);
      if (typeof item === 'object' && item.onClick) {
        item.onClick();
      }
      onItemClick?.(index, label, item);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    []
  );

  return (
    <nav
      className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${
        scaleTick ? ' line-sidebar--scale-tick' : ''
      }${className ? ` ${className}` : ''}`}
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': `${markerLength}px`,
          '--marker-gap': `${markerGap}px`,
          '--tick-scale': tickScale,
          '--max-shift': `${maxShift}px`,
          '--item-gap': `${itemGap}px`,
          '--font-size': `${fontSize}rem`,
          '--smoothing': `${smoothing}ms`,
        } as React.CSSProperties
      }
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => {
          const label = typeof item === 'string' ? item : item.name;
          const href = typeof item === 'object' ? item.href : undefined;
          const Icon = typeof item === 'object' ? item.icon : undefined;
          const badge = typeof item === 'object' ? item.badge : undefined;
          const isSpecial = typeof item === 'object' ? item.isSpecial : undefined;

          const content = (
            <>
              {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
              <span className="line-sidebar__label">
                {showIndex && (
                  <span className="line-sidebar__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                {Icon && <Icon className="w-4 h-4 mr-2 inline-block text-white" />}
                <span className="line-sidebar__text text-white font-medium">{label}</span>
                {badge && (
                  <kbd className="ml-2 px-1.5 py-0.5 text-[9px] font-mono bg-slate-900 border border-slate-700 rounded text-white font-bold">
                    {badge}
                  </kbd>
                )}
              </span>
            </>
          );

          return (
            <li
              key={`${label}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="line-sidebar__item"
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => handleClick(index, label, item)}
            >
              {href && (typeof item !== 'object' || !item.onClick) ? (
                <Link href={href} className="block w-full">{content}</Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LineSidebar;
