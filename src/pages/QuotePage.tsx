import React from 'react';
import { ShieldCheck, Clock, Award, Phone, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../config/types';
import { LeadQualificationWizard } from '../components/forms/LeadQualificationWizard';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';

interface QuotePageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ name: 'Demande de soumission', url: '/soumission' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Soumission gratuite & sans engagement
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Obtenez votre estimation en 2 minutes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Complétez notre fiche de qualification ci-dessous. Un conseiller {siteConfig.branding.siteName} vous transmettra un devis fixe et détaillé sous 24 heures ouvrables.
        </p>
      </div>

      {/* Guarantees Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Assurance responsabilité civile 2 M$</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Réponse garantie sous 24h</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Protection Loi 25 respectée</span>
        </div>
      </div>

      {/* The 6-Step Wizard */}
      <LeadQualificationWizard siteConfig={siteConfig} />

      {/* Direct Phone Fallback */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-2">
        <p className="text-sm font-semibold">
          Vous préférez parler immédiatement avec un technicien ?
        </p>
        <p className="text-xs text-slate-400">
          Notre centre d'appels répond du lundi au vendredi de 7h à 20h.
        </p>
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white font-bold text-sm pt-1"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          {siteConfig.contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
};
