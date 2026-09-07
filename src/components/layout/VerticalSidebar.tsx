'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  BookOpenText, 
  Newspaper, 
  Navigation, 
  Database, 
  Layers, 
  BookOpen, 
  Info,
  Compass
} from 'lucide-react';
import { LineSidebar, SidebarItemObject } from '@/components/ui/LineSidebar';

interface VerticalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const navLinks: SidebarItemObject[] = [
  { name: 'Explore Data', href: '/explore', icon: Search },
  { name: 'AI Assistant', href: '/assistant', icon: Sparkles },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpenText },
  { name: 'Media', href: '/media', icon: Newspaper },
  { name: 'Polar Map', href: '/map', icon: Navigation },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Expeditions', href: '/expeditions', icon: Layers },
  { name: 'Research', href: '/research', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
];

export const VerticalSidebar: React.FC<VerticalSidebarProps> = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-4 top-24 z-40 hidden xl:block w-64 bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-2xl transition-all duration-300">
      <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-400 tracking-wider mb-4 pb-3 border-b border-slate-800/80">
        <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
        <span>Polaris Menu</span>
      </div>

      <LineSidebar
        items={navLinks}
        accentColor="#38bdf8"
        textColor="#cbd5e1"
        markerColor="#475569"
        showIndex={true}
        showMarker={true}
        proximityRadius={90}
        maxShift={20}
        falloff="smooth"
        markerLength={36}
        markerGap={6}
        tickScale={0.5}
        scaleTick={true}
        itemGap={14}
        fontSize={0.88}
        smoothing={100}
        activePath={pathname}
      />
    </aside>
  );
};
