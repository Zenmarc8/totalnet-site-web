import React from 'react';
import { MapPin, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../config/types';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface LocationsIndexPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const LocationsIndexPage: React.FC<LocationsIndexPageProps> = ({
  siteConfig,
  onNavigate
}) => {
  const activeLocations = siteConfig.locations.filter(l => l.isActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[{ name: 'Secteurs desservis', url: '/secteurs-desservis' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Territoires & Unités Mobiles
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Secteurs desservis par nos équipes au Québec
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Grâce à notre flotte de véhicules entièrement équipés (camion-usine à haute pression et unités mobiles légères), nous assurons des interventions rapides et ponctuelles à travers le Grand Montréal, Laval, la Rive-Nord et la Rive-Sud.
        </p>
      </div>

      {/* Map & Response Time Guarantee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 text-white p-8 rounded-3xl">
        <div className="space-y-2">
          <Clock className="w-8 h-8 text-blue-400" />
          <h3 className="font-bold text-base">Délais d'intervention rapides</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Intervention habituelle en 24 à 48 heures. Équipes de garde disponibles pour les urgences après sinistre.
          </p>
        </div>
        <div className="space-y-2">
          <MapPin className="w-8 h-8 text-emerald-400" />
          <h3 className="font-bold text-base">Vérification de code postal</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Notre formulaire valide instantanément votre code postal canadien pour garantir la disponibilité d'une équipe.
          </p>
        </div>
        <div className="space-y-2">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <h3 className="font-bold text-base">Mêmes tarifs régionaux</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aucun frais kilométrique abusif : nos forfaits restent uniformes et transparents sur l'ensemble du territoire desservi.
          </p>
        </div>
      </div>

      {/* Grid of locations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Toutes nos municipalités partenaires ({activeLocations.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeLocations.map(loc => (
            <div
              key={loc.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {loc.name}
                  </h3>
                  {loc.isPrimaryHub && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Hub principal
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Région : {loc.region} • Réponse : {loc.averageResponseTime}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {loc.shortDescription}
                </p>

                {loc.keyNeighborhoods && loc.keyNeighborhoods.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Quartiers desservis :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {loc.keyNeighborhoods.slice(0, 4).map((q, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {q}
                        </span>
                      ))}
                      {loc.keyNeighborhoods.length > 4 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5">
                          +{loc.keyNeighborhoods.length - 4} autres
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">
                  {loc.localPhone || siteConfig.contact.phoneDisplay}
                </span>
                <button
                  onClick={() => onNavigate(`/secteurs-desservis/${loc.slug}`)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  Voir la page locale <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
