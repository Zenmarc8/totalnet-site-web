import React from 'react';
import { Building, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const LegalNoticePage: React.FC<Props> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ name: 'Avis légal', url: '/avis-legal' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Identité corporative
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Avis légal & Mentions obligatoires
        </h1>
        <p className="text-xs text-slate-500">
          Renseignements légaux relatifs à l'exploitant du site Web au Québec
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 text-xs sm:text-sm text-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Raison sociale officielle
            </span>
            <p className="font-bold text-slate-900 text-sm">{siteConfig.legal.companyLegalName}</p>
            <p className="text-xs text-slate-600">Nom commercial : {siteConfig.branding.siteName}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Numéro d'entreprise du Québec (NEQ)
            </span>
            <p className="font-mono font-bold text-slate-900 text-sm">{siteConfig.legal.quebecEnterpriseNumber}</p>
            <p className="text-xs text-slate-600">Statut : En règle au Registraire des entreprises</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-slate-900 text-sm">Adresse civique d'exploitation :</h3>
          <p className="text-slate-600">
            {siteConfig.contact.address.street}, {siteConfig.contact.address.city} ({siteConfig.contact.address.province}) {siteConfig.contact.address.postalCode}, Canada
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Assurances et cautions :</h3>
          <p className="text-slate-600">
            {siteConfig.legal.insuranceCoverage} souscrite auprès d'une compagnie d'assurance agréée au Québec.
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Propriété intellectuelle :</h3>
          <p className="text-slate-600 leading-relaxed">
            L'ensemble des textes, photographies, éléments graphiques et codes sources composant ce site sont protégés par les lois québécoises et canadiennes relatives au droit d'auteur et à la propriété intellectuelle. Toute reproduction non autorisée est strictement prohibée.
          </p>
        </div>
      </div>
    </div>
  );
};
