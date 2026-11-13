import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, AlertCircle, Clock } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const PrivacyContactPage: React.FC<Props> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Contact Protection Renseignements Personnels (Loi 25)', url: '/contact-protection-renseignements' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Responsable Officiel (Loi 25)
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Responsable de la protection des renseignements personnels
        </h1>
        <p className="text-xs text-slate-500">
          Point de contact officiel désigné conformément à l’article 3.2 de la Loi sur le privé du Québec
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {siteConfig.legal.privacyOfficer.name}
            </h2>
            <p className="text-xs font-semibold text-blue-700">
              {siteConfig.legal.privacyOfficer.title}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {siteConfig.legal.companyLegalName} • NEQ : {siteConfig.legal.quebecEnterpriseNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Courriel sécurisé de la protection :
            </span>
            <a
              href={`mailto:${siteConfig.legal.privacyOfficer.email}`}
              className="text-blue-700 font-bold hover:underline block text-sm"
            >
              {siteConfig.legal.privacyOfficer.email}
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Ligne téléphonique directe :
            </span>
            <span className="font-bold text-slate-800 block text-sm">
              {siteConfig.legal.privacyOfficer.phone}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <span className="text-slate-500 flex items-center gap-1.5 font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Adresse postale pour demandes écrites officielles :
          </span>
          <p className="font-medium text-slate-800">
            {siteConfig.legal.privacyOfficer.address}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-950 space-y-2">
          <span className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-700" />
            Délais de traitement prescrits par la loi :
          </span>
          <p className="leading-relaxed">
            Toute demande écrite d'accès, de rectification ou de désindexation de vos renseignements personnels reçoit un accusé de réception immédiat et une réponse formelle dans les <strong>30 jours</strong> suivant sa réception, comme prescrit par la législation québécoise.
          </p>
        </div>
      </div>
    </div>
  );
};
