'use client';

import React, { useState } from 'react';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { ResearcherModal } from '@/components/modals/ResearcherModal';
import { VerticalSidebar } from '@/components/layout/VerticalSidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <body className="min-h-screen flex flex-col bg-slate-950 text-white antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 flex w-full relative">
          {/* Vertical Taskbar Sidebar using React Bits LineSidebar */}
          {isSidebarOpen && <VerticalSidebar />}

          {/* Main Content Area */}
          <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'xl:pl-72' : ''}`}>
            {children}
          </main>
        </div>

        <Footer />

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ResearcherModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </body>
    </html>
  );
};
