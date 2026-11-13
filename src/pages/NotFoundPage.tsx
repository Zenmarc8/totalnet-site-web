import React from 'react';
import { Home, ArrowLeft, Search, Layers } from 'lucide-react';
import { SiteConfig } from '../config/types';

interface NotFoundPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-900 mx-auto flex items-center justify-center font-extrabold text-2xl">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Page introuvable
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          L’adresse demandée n’existe pas ou a été déplacée. Vous pouvez revenir à la page d’accueil ou explorer nos principaux services de nettoyage ci-dessous.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Retour à l’accueil
        </button>
        <button
          onClick={() => onNavigate('/services')}
          className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer"
        >
          <Layers className="w-4 h-4" />
          Voir nos services
        </button>
      </div>

      {/* Suggested Services */}
      <div className="pt-8 border-t border-slate-200 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
          Pages populaires fréquemment consultées :
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {siteConfig.services.filter(s => s.isActive).slice(0, 4).map(s => (
            <button
              key={s.id}
              onClick={() => onNavigate(`/services/${s.slug}`)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 text-left font-medium transition-colors"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
