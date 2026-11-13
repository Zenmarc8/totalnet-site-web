import React from 'react';
import { Layers, SlidersHorizontal, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { allSitePresets } from '../../config/multisite-presets';

interface SiteSwitcherBannerProps {
  currentSiteConfig: SiteConfig;
  onSelectSite: (siteId: string) => void;
  onOpenDashboard: () => void;
}

export const SiteSwitcherBanner: React.FC<SiteSwitcherBannerProps> = ({
  currentSiteConfig,
  onSelectSite,
  onOpenDashboard
}) => {
  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          Moteur Rank & Rent Multisite
        </span>
        <span className="hidden sm:inline text-slate-300">
          Site actif : <strong className="text-white">{currentSiteConfig.branding.siteName}</strong> ({currentSiteConfig.domain})
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label htmlFor="site-preset-selector" className="text-slate-400 hidden md:inline">
          Changer de site modèle :
        </label>
        <select
          id="site-preset-selector"
          value={currentSiteConfig.siteId}
          onChange={(e) => onSelectSite(e.target.value)}
          className="bg-slate-800 text-white border border-slate-600 rounded-lg px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="totalnet-general">1. TotalNet (Nettoyage Général QC)</option>
          <option value="tapis-expert-laval">2. Tapis Expert Laval (Spécialisé Tapis)</option>
          <option value="commercial-rive-sud">3. ProCommercial Rive-Sud (B2B Commercial)</option>
          <option value="lavage-vitres-pro">4. Vitres Pro Montréal (Lavage de vitres)</option>
        </select>

        <button
          onClick={onOpenDashboard}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="hidden sm:inline">Console</span> Admin
        </button>
      </div>
    </div>
  );
};
