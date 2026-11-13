import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Home,
  Check
} from 'lucide-react';
import { SiteConfig, LocationItem } from '../config/types';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface LocationDetailPageProps {
  slug: string;
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({
  slug,
  siteConfig,
  onNavigate
}) => {
  const location = siteConfig.locations.find(l => l.slug === slug);

  if (!location) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Secteur non trouvé ou inactif</h2>
        <p className="text-sm text-slate-500">
          Ce territoire n’est pas configuré pour ce site modèle.
        </p>
        <button
          onClick={() => onNavigate('/secteurs-desservis')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Retour aux secteurs
        </button>
      </div>
    );
  }

  // Find featured services for this city
  const featuredServices = siteConfig.services.filter(s =>
    location.featuredServices.includes(s.id) && s.isActive
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Secteurs desservis', url: '/secteurs-desservis' },
          { name: location.name, url: `/secteurs-desservis/${location.slug}` }
        ]}
        onNavigate={onNavigate}
      />

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Secteur officiel • {location.region}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Délai moyen : {location.averageResponseTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Services de nettoyage professionnel à <span className="text-blue-800">{location.name}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {location.fullDescription}
          </p>

          {/* Postal Code Coverage Box */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Préfixes de codes postaux desservis à {location.name} :
            </h3>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {location.postalPrefixes.map(prefix => (
                <span
                  key={prefix}
                  className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold"
                >
                  {prefix}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Vous résidez dans l'un de ces secteurs ? Nos unités mobiles n'appliquent aucun frais de déplacement supplémentaire.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate(`/soumission?city=${encodeURIComponent(location.name)}`)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              Demander une soumission pour {location.name}
            </button>
            <a
              href={`tel:${location.localPhone ? location.localPhone.replace(/\D/g, '') : siteConfig.contact.phoneRaw}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              Ligne locale : {location.localPhone || siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Right column: Neighborhoods card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Quartiers & Districts de {location.name}
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {location.keyNeighborhoods.map((n, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Assurance responsabilité civile 2 M$
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                Disponibilité 7 jours sur 7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services for this Location */}
      <div className="pt-8 border-t border-slate-200 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Demandes fréquentes</span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Services les plus demandés à {location.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map(service => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-500 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-base text-slate-900">{service.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{service.shortDescription}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {service.estimatedStartingPrice || 'Sur devis'}
                </span>
                <button
                  onClick={() => onNavigate(`/services/${service.slug}`)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  Détails <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
