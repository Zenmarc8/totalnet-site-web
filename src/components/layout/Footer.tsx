import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Cookie, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../../config/types';

interface FooterProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
  onOpenCookiePreferences: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  siteConfig,
  onNavigate,
  onOpenCookiePreferences
}) => {
  const currentYear = new Date().getFullYear();
  const activeServices = siteConfig.services.filter(s => s.isActive);
  const activeLocations = siteConfig.locations.filter(l => l.isActive);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Identity & Guarantee */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl">
              {siteConfig.branding.logoText.charAt(0)}
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight text-white">
                {siteConfig.branding.logoText}
              </span>
              <span className="block text-xs font-medium text-slate-400">
                {siteConfig.branding.logoSubtext}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            {siteConfig.branding.tagline}. Entreprise québécoise certifiée offrant des solutions complètes de propreté, d'assainissement et de conciergerie pour résidences, commerces et gestionnaires immobiliers.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <p className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Soumissions : <strong className="text-white">{siteConfig.contact.phoneDisplay}</strong></span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Courriel : <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-300 hover:text-white underline">{siteConfig.contact.email}</a></span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Siège : {siteConfig.contact.address.street}, {siteConfig.contact.address.city} ({siteConfig.contact.address.province}) {siteConfig.contact.address.postalCode}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-200 block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Garantie & Conformité Québec
            </span>
            <span>NEQ : {siteConfig.legal.quebecEnterpriseNumber} • Assurance responsabilité civile de {siteConfig.legal.insuranceCoverage}</span>
          </div>
        </div>

        {/* Col 2: Services phares */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Services populaires
          </h4>
          <ul className="space-y-2 text-xs">
            {activeServices.slice(0, 7).map(s => (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(`/services/${s.slug}`)}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  {s.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate('/services')}
                className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 mt-1"
              >
                Tous nos services <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Territoires */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Secteurs desservis
          </h4>
          <ul className="space-y-2 text-xs">
            {activeLocations.slice(0, 7).map(loc => (
              <li key={loc.id}>
                <button
                  onClick={() => onNavigate(`/secteurs-desservis/${loc.slug}`)}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  {loc.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => onNavigate('/secteurs-desservis')}
                className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 mt-1"
              >
                Tous nos secteurs <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Conformité & Liens Légaux (Loi 25) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Légal & Loi 25
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('/politique-confidentialite')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Politique de confidentialité (Loi 25)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/politique-gestion-renseignements')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Gestion des renseignements personnels
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/politique-cookies')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Politique relative aux témoins
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/conditions-utilisation')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Conditions d'utilisation
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/avis-legal')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Avis légal
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/accessibilite')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Déclaration d'accessibilité
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('/contact-protection-renseignements')}
                className="hover:text-white transition-colors text-slate-400 text-left"
              >
                Responsable Loi 25 (Contact RPRP)
              </button>
            </li>
            <li className="pt-2">
              <button
                onClick={onOpenCookiePreferences}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-blue-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Cookie className="w-3.5 h-3.5" />
                Gérer mes témoins (cookies)
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-slate-900 bg-black/40 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {currentYear} {siteConfig.legal.companyLegalName}. Tous droits réservés. Modèle maître multi-sites Rank & Rent Québec.
          </p>
          <p className="text-[11px] text-slate-400">
            Hébergement haute disponibilité • Certificat SSL 256-bit • Rendu statique optimisé Core Web Vitals
          </p>
        </div>
      </div>
    </footer>
  );
};
