'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Search, 
  UserCheck, 
  Menu, 
  X,
  Sidebar
} from 'lucide-react';
import { LineSidebar } from '@/components/ui/LineSidebar';
import { getSidebarNavLinks } from '@/components/layout/VerticalSidebar';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenLogin?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSearch, 
  onOpenLogin,
  onToggleSidebar,
  isSidebarOpen 
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavLinks = getSidebarNavLinks(onOpenSearch, onOpenLogin);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg">
      {/* Top National Scientific Banner */}
      <div className="bg-slate-950/90 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="inline-flex items-center text-sky-400 font-semibold tracking-wider uppercase text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              National Polar Infrastructure
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-300">Inspired by India's polar science data ecosystem</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <a href="https://data.ncpor.res.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors hidden sm:inline">
              NCPOR Main Data Portal ↗
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/about#fair-principles" className="hover:text-sky-300 transition-colors">
              FAIR Data Compliant
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar (Logo + Search + Researcher Portal) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button for Desktop/Tablet */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center space-x-2 text-xs font-semibold"
              title="Toggle Vertical Line Sidebar"
            >
              <Sidebar className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline font-mono">Menu</span>
            </button>

            {/* Brand Logo & Subtitle */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 shadow-sm group-hover:border-sky-400 transition-all">
                <Compass className="w-6 h-6 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xl tracking-tight text-white font-mono">POLARIS</span>
                  <span className="text-[10px] uppercase font-bold bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800">
                    v2.0
                  </span>
                </div>
                <span className="text-xs text-slate-300 font-medium tracking-tight">
                  Polar Science Data Discovery Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden rounded-md text-slate-200 hover:bg-slate-800/60"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Vertical LineSidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-6 py-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-400 tracking-wider mb-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Navigation Menu</span>
          </div>

          <LineSidebar
            items={mobileNavLinks}
            accentColor="#ffffff"
            textColor="#ffffff"
            markerColor="#94a3b8"
            showIndex={true}
            showMarker={true}
            proximityRadius={80}
            maxShift={18}
            falloff="smooth"
            markerLength={32}
            markerGap={6}
            tickScale={0.5}
            scaleTick={true}
            itemGap={12}
            fontSize={0.9}
            smoothing={100}
            activePath={pathname}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
};
