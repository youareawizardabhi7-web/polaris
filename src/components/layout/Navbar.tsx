'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Search, 
  Globe, 
  UserCheck, 
  Menu, 
  X, 
  Layers, 
  Database, 
  Navigation, 
  BookOpen,
  BookOpenText, 
  Newspaper,
  Info,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenLogin }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English (EN)');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
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

  const languages = [
    { code: 'EN', name: 'English (EN)' },
    { code: 'HI', name: 'हिन्दी (HI)' },
    { code: 'FR', name: 'Français (FR)' },
    { code: 'ES', name: 'Español (ES)' },
  ];

  const isActive = (path: string) => {
    if (path === '/explore' && pathname === '/explore') return true;
    if (path === '/datasets' && (pathname === '/datasets' || pathname.startsWith('/datasets/'))) return true;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top National Scientific Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="inline-flex items-center text-sky-400 font-semibold tracking-wider uppercase text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              National Polar Infrastructure
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
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

      {/* Main Sticky Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Subtitle */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 flex items-center justify-center text-sky-400 shadow-sm border border-slate-700 group-hover:border-sky-500 transition-all">
              <Compass className="w-6 h-6 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 font-mono">POLARIS</span>
                <span className="text-[10px] uppercase font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">
                  v2.0
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium tracking-tight">
                Polar Science Data Discovery Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-1.5 ${
                    active
                      ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-200'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Search Dialog Button */}
            <Link
              href="/search"
              onClick={(e) => {
                if (onOpenSearch) {
                  e.preventDefault();
                  onOpenSearch();
                }
              }}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center space-x-2 text-xs font-medium"
              title="Search POLARIS Datasets & Knowledge Graph"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden xl:inline text-slate-600 font-mono">Global Search...</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-300 rounded text-slate-500">⌘K</kbd>
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center space-x-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{currentLang.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.name);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between ${
                        currentLang === lang.name ? 'font-semibold text-sky-700 bg-sky-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {currentLang === lang.name && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Researcher Portal / Login */}
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2 rounded-md text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-xs border border-slate-800 active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Researcher Portal</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-sky-100 text-sky-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <link.icon className="w-4 h-4 text-sky-700" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenLogin) onOpenLogin();
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-md flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span>Researcher Portal Access</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
