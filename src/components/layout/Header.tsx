import React, { useState } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Shield,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { SiteConfig } from '../../config/types';

interface HeaderProps {
  siteConfig: SiteConfig;
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  siteConfig,
  currentPath,
  onNavigate,
  onOpenDashboard
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const activeServices = siteConfig.services.filter(s => s.isActive);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* 1. TOP UTILITY BAR (Phone, Hours, Emergency Line) */}
      <div className="bg-[#05284F] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#76A8F9]" />
              {siteConfig.branding.heroBadgeText}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#76A8F9]" />
              Lun-Ven : {siteConfig.contact.businessHours.mondayFriday}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#76A8F9] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ligne directe : <strong className="underline decoration-[#76A8F9]">{siteConfig.contact.phoneDisplay}</strong></span>
            </a>

            <button
              onClick={onOpenDashboard}
              title="Ouvrir la console de gestion Rank & Rent"
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#76A8F9] border border-blue-400/30 transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Console Rank & Rent
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-left focus-visible:outline-hidden group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#05284F] text-white flex items-center justify-center font-black text-xl shadow-md group-hover:bg-[#07386d] transition-colors">
            {siteConfig.branding.logoText.charAt(0)}
          </div>
          <div>
            <span className="block text-xl font-extrabold tracking-tight text-[#05284F] group-hover:text-blue-800 transition-colors">
              {siteConfig.branding.logoText}
            </span>
            {siteConfig.branding.logoSubtext && (
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {siteConfig.branding.logoSubtext}
              </span>
            )}
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button
            onClick={() => handleNav('/')}
            className={`transition-colors hover:text-blue-700 ${currentPath === '/' ? 'text-blue-700 font-bold' : ''}`}
          >
            Accueil
          </button>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`flex items-center gap-1 transition-colors hover:text-blue-700 ${currentPath.startsWith('/services') ? 'text-blue-700 font-bold' : ''}`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full -left-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 px-2 z-50 animate-fade-in"
              >
                <button
                  onClick={() => handleNav('/services')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-blue-900 bg-blue-50/70 hover:bg-blue-100 mb-2 flex items-center justify-between"
                >
                  <span>Tous nos 20 services</span>
                  <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded">Voir tout</span>
                </button>
                <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                  {activeServices.slice(0, 10).map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleNav(`/services/${s.slug}`)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-100 text-slate-800 flex items-center justify-between group"
                    >
                      <span className="group-hover:text-blue-700 font-medium">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNav('/secteurs-desservis')}
            className={`transition-colors hover:text-blue-700 ${currentPath.startsWith('/secteurs') ? 'text-blue-700 font-bold' : ''}`}
          >
            Secteurs desservis
          </button>

          <button
            onClick={() => handleNav('/a-propos')}
            className={`transition-colors hover:text-blue-700 ${currentPath === '/a-propos' ? 'text-blue-700 font-bold' : ''}`}
          >
            À propos
          </button>

          <button
            onClick={() => handleNav('/faq')}
            className={`transition-colors hover:text-blue-700 ${currentPath === '/faq' ? 'text-blue-700 font-bold' : ''}`}
          >
            FAQ
          </button>

          <button
            onClick={() => handleNav('/contact')}
            className={`transition-colors hover:text-blue-700 ${currentPath === '/contact' ? 'text-blue-700 font-bold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('/soumission')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#05284F] hover:bg-blue-900 shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#76A8F9]" />
            Demander une soumission
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
            className="lg:hidden p-2 text-slate-700 hover:text-blue-800 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4 animate-fade-in shadow-xl">
          <div className="space-y-2 text-base font-semibold text-slate-800">
            <button
              onClick={() => handleNav('/')}
              className="block w-full text-left py-2 border-b border-slate-100"
            >
              Accueil
            </button>
            <button
              onClick={() => handleNav('/services')}
              className="block w-full text-left py-2 border-b border-slate-100 flex items-center justify-between"
            >
              <span>Tous nos services</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">20 services</span>
            </button>
            <button
              onClick={() => handleNav('/secteurs-desservis')}
              className="block w-full text-left py-2 border-b border-slate-100"
            >
              Secteurs desservis (Québec)
            </button>
            <button
              onClick={() => handleNav('/a-propos')}
              className="block w-full text-left py-2 border-b border-slate-100"
            >
              À propos
            </button>
            <button
              onClick={() => handleNav('/faq')}
              className="block w-full text-left py-2 border-b border-slate-100"
            >
              Foire aux questions (FAQ)
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="block w-full text-left py-2 border-b border-slate-100"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => handleNav('/soumission')}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-[#05284F] hover:bg-blue-900 shadow-md text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#76A8F9]" />
              Demander une soumission en ligne
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              Console Rank & Rent (30+ sites)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
