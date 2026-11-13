import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { SiteConfig, ServiceItem } from '../config/types';
import { OptimizedImage } from '../components/images/OptimizedImage';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface ServicesIndexPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({ siteConfig, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous les services' },
    { id: 'residentiel', label: 'Résidentiel' },
    { id: 'commercial', label: 'Commercial & Bureaux' },
    { id: 'specialise', label: 'Tapis, Meubles & Spécialisé' },
    { id: 'sinistre', label: 'Urgence & Sinistre' },
    { id: 'exterieur', label: 'Extérieur & Vitres' }
  ];

  const activeServices = siteConfig.services.filter(s => s.isActive);

  const filteredServices = activeServices.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ name: 'Tous nos services', url: '/services' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Catalogue complet des prestations
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Services de nettoyage & conciergerie spécialisée au Québec
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Découvrez notre gamme de {activeServices.length} services professionnels. Chaque prestation est exécutée par des techniciens formés, munis d'équipements spécialisés et protégés par notre police d'assurance de 2 000 000 $.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un service..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Grid of services */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700">Aucun service ne correspond à votre recherche</h3>
          <p className="text-xs text-slate-400">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <OptimizedImage
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  width={600}
                  height={400}
                  aspectRatio="16/9"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {service.estimatedStartingPrice || 'Soumission personnalisée'}
                  </span>
                  <button
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    Voir la fiche complète <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Quote Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold">Vous hésitez sur le service requis ?</h3>
          <p className="text-xs text-blue-200">
            Remplissez notre fiche d'évaluation en ligne et nos experts vous recommanderont la formule optimale.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/soumission')}
          className="shrink-0 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md transition-colors"
        >
          Demander une soumission sans frais
        </button>
      </div>
    </div>
  );
};
