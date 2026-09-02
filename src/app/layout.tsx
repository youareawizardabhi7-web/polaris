'use client';

import React, { useState } from 'react';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { ResearcherModal } from '@/components/modals/ResearcherModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-sky-200 selection:text-sky-900">
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <main className="flex-1">{children}</main>
        <Footer />

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ResearcherModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </body>
    </html>
  );
}
