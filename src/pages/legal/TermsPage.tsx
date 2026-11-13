import React from 'react';
import { FileCheck, ShieldAlert } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<Props> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ name: 'Conditions d’utilisation', url: '/conditions-utilisation' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Modalités contractuelles
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Conditions d’utilisation et de service
        </h1>
        <p className="text-xs text-slate-500">
          Régit l’utilisation du site Web et les contrats de prestations de nettoyage
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptation des conditions</h2>
          <p>
            L’accès au présent site Web et la soumission d'une demande de devis impliquent l’acceptation pleine et entière des présentes conditions par le client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Soumissions et validation des tarifs</h2>
          <p>
            Toutes les estimations transmises par notre simulateur en ligne ou par téléphone sont établies sur la base des informations déclarées par le client. Si, lors de l’arrivée sur place, les dimensions réelles ou le niveau de contamination diffèrent substantiellement de la description fournie, le technicien informera le client avant d'entamer les travaux.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Politique d’annulation et de report</h2>
          <p>
            {siteConfig.legal.cancellationPolicy}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Accès aux lieux et sécurité</h2>
          <p>
            Le client s'engage à fournir un accès sécuritaire aux lieux aux heures convenues (codes d'accès, clés ou présence physique). L'eau courante et l'électricité doivent être fonctionnelles pour l'utilisation de nos appareils d'extraction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Droit applicable</h2>
          <p>
            Les présentes modalités sont régies par les lois applicables dans la province de Québec et les lois du Canada qui s'y appliquent. Tout litige relève de la compétence exclusive des tribunaux du district judiciaire de Montréal ou de Laval.
          </p>
        </section>
      </div>
    </div>
  );
};
