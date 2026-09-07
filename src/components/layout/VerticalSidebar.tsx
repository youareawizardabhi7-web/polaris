'use client';

import React from 'react';
import Link from 'next/link';
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
  Compass,
  UserCheck
} from 'lucide-react';
import { LineSidebar, SidebarItemObject } from '@/components/ui/LineSidebar';

interface VerticalSidebarProps {
  onOpenSearch?: () => void;
  onOpenLogin?: () => void;
}

export const getSidebarNavLinks = (onOpenSearch?: () => void, onOpenLogin?: () => void): SidebarItemObject[] => [
  { name: 'Explore Data', href: '/explore', icon: Search },
  { name: 'AI Assistant', href: '/assistant', icon: Sparkles },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpenText },
  { name: 'Media', href: '/media', icon: Newspaper },
  { name: 'Polar Map', href: '/map', icon: Navigation },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Expeditions', href: '/expeditions', icon: Layers },
  { name: 'Research', href: '/research', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Global Search', icon: Search, onClick: onOpenSearch, badge: '⌘K', isSpecial: true },
  { name: 'Researcher Portal', icon: UserCheck, onClick: onOpenLogin, isSpecial: true },
];

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({ onOpenSearch, onOpenLogin }) => {
  const pathname = usePathname();
  const links = getSidebarNavLinks(onOpenSearch, onOpenLogin);

  return (
    <aside className="fixed left-6 top-6 z-40 hidden xl:block w-64 bg-slate-950/45 backdrop-blur-2xl border border-slate-800/50 rounded-2xl p-5 shadow-2xl transition-all duration-300">
      {/* Large POLARIS Brand Title */}
      <Link href="/" className="block mb-4 pb-3 border-b border-slate-800/60 group">
        <span className="font-extrabold text-2xl sm:text-3xl tracking-wider text-white font-mono block">POLARIS</span>
      </Link>

      <LineSidebar
        items={links}
        accentColor="#ffffff"
        textColor="#ffffff"
        markerColor="#94a3b8"
        showIndex={true}
        showMarker={true}
        proximityRadius={90}
        maxShift={20}
        falloff="smooth"
        markerLength={36}
        markerGap={6}
        tickScale={0.5}
        scaleTick={true}
        itemGap={12}
        fontSize={0.88}
        smoothing={100}
        activePath={pathname}
      />
    </aside>
  );
};
