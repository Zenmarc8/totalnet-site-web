import React from 'react';
import { ShieldAlert, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const PersonalDataPolicyPage: React.FC<Props> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Politique de gestion des renseignements', url: '/politique-gestion-renseignements' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Gouvernance & Sécurité Interne
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Politique de gestion et conservation des renseignements personnels
        </h1>
        <p className="text-xs text-slate-500">
          Encadrement de la conservation, de la destruction sécuritaire et du registre des incidents de confidentialité (Loi 25).
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Objectif de la politique de gouvernance</h2>
          <p>
            Cette politique vise à encadrer le cycle de vie complet des renseignements personnels détenus par <strong className="text-slate-900">{siteConfig.legal.companyLegalName}</strong>, de leur cueillette jusqu'à leur destruction irréversible, afin de prévenir tout accès non autorisé, perte ou divulgation accidentelle.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Règles de conservation et calendrier de destruction</h2>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 not-prose">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Soumissions sans suite :</span>
                <span className="text-slate-600">Suppression automatique après <strong>{siteConfig.legal.dataRetentionMonths} mois</strong>.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Dossiers clients & factures :</span>
                <span className="text-slate-600">Conservation de <strong>6 ans</strong> (exigence fiscale de Revenu Québec).</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Photographies transmises :</span>
                <span className="text-slate-600">Supprimées dès la confirmation de la fin des travaux.</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block">Consentements aux témoins :</span>
                <span className="text-slate-600">Expiration après <strong>13 mois</strong>.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Procédure de gestion des incidents de confidentialité</h2>
          <p>
            Conformément à l’article 3.5 de la Loi sur le privé du Québec, {siteConfig.branding.siteName} maintient un <strong>Registre officiel des incidents de confidentialité</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2 not-prose">
            <span className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Protocole en cas de risque sérieux de préjudice :
            </span>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Endiguer immédiatement la brèche et sécuriser les accès compromis.</li>
              <li>Évaluer la sensibilité des données et le risque de préjudice pour les personnes concernées.</li>
              <li>Aviser avec diligence la Commission d’accès à l’information du Québec (CAI).</li>
              <li>Notifier directement par courriel ou téléphone les personnes touchées si un risque sérieux de préjudice est identifié.</li>
              <li>Inscrire l'incident au registre interne conservé pendant au moins 5 ans.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Sensibilisation et formation du personnel</h2>
          <p>
            Tous nos employés et techniciens de terrain signent une entente de non-divulgation avant leur premier jour de travail. Des règles strictes interdisent formellement la prise de photos non autorisées ou la discussion de l'intimité des domiciles clients.
          </p>
        </section>
      </div>
    </div>
  );
};
