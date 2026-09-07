'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { ResearcherModal } from '@/components/modals/ResearcherModal';
import { VerticalSidebar, getSidebarNavLinks } from '@/components/layout/VerticalSidebar';
import { LineSidebar } from '@/components/ui/LineSidebar';
import { VideoScrubBackground } from '@/components/home/VideoScrubBackground';
import { Menu, X, Compass } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileNavLinks = getSidebarNavLinks(
    () => setIsSearchOpen(true),
    () => setIsLoginOpen(true)
  );

  return (
    <html lang="en">
      <head>
        <title>POLARIS | Polar Science Data Discovery & Visualization Portal</title>
        <meta
          name="description"
          content="National Polar Science Data Discovery Portal. Discover, explore, visualize, and download scientific datasets from Antarctica, the Arctic, the Himalayas, and the Southern Ocean."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-white antialiased selection:bg-sky-500/30 selection:text-sky-200 relative">
        {/* Looping Video Background Across All Pages */}
        <VideoScrubBackground />

        {/* Floating Mobile Toggle Button (Visible on screens smaller than xl) */}
        <div className="xl:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-xl text-white shadow-2xl flex items-center space-x-2"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            <span className="font-mono text-xs font-bold text-white">Menu</span>
          </button>
        </div>

        {/* Mobile LineSidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-2xl p-6 pt-20 overflow-y-auto">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block mb-6 pb-4 border-b border-slate-800">
              <span className="font-extrabold text-2xl sm:text-3xl tracking-wider text-white font-mono block">POLARIS</span>
            </Link>
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

        <div className="flex-1 flex w-full relative">
          {/* Vertical Taskbar Sidebar using React Bits LineSidebar */}
          <VerticalSidebar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenLogin={() => setIsLoginOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 xl:pl-72 transition-all duration-300">
            {children}
          </main>
        </div>

        <Footer />

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ResearcherModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </body>
    </html>
  );
}
