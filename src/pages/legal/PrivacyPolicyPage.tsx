import React from 'react';
import { ShieldCheck, AlertCircle, Calendar, Lock } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface LegalPageProps {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ name: 'Politique de confidentialité (Loi 25)', url: '/politique-confidentialite' }]}
        onNavigate={onNavigate}
      />

      {/* Legal validation banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">AVIS DE CONFORMITÉ QUÉBEC (LOI 25) :</strong>
          Ce texte constitue le modèle de gouvernance de base pour l’entreprise <span className="font-semibold">{siteConfig.legal.companyLegalName}</span>. Les détails opérationnels doivent être revus et validés avec votre conseiller juridique selon vos intégrations réelles (CRM, processeurs de paiement).
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Protection des renseignements personnels
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="text-xs text-slate-500">
          Dernière mise à jour : 12 novembre 2026 • Conforme à la Loi 25 du Québec et à la LPRPDE
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Préambule et engagement</h2>
          <p>
            <strong className="text-slate-900">{siteConfig.legal.companyLegalName}</strong> (opérant sous la marque commerciale <strong className="text-slate-900">{siteConfig.branding.siteName}</strong>, NEQ : {siteConfig.legal.quebecEnterpriseNumber}) s'engage fermement à protéger la vie privée et la sécurité des renseignements personnels recueillis auprès des utilisateurs de son site Web et de ses clients.
          </p>
          <p>
            La présente politique énonce nos pratiques de collecte, d'utilisation, de communication, de conservation et de destruction des renseignements personnels, conformément à la <em>Loi sur la protection des renseignements personnels dans le secteur privé</em> (RLRQ, c. P-39.1) modernisée par la <strong>Loi 25</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Renseignements personnels collectés</h2>
          <p>
            Nous ne collectons que les renseignements strictement nécessaires pour traiter vos demandes de soumission et exécuter les services de nettoyage convenus :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Identité :</strong> Prénom, nom de famille.</li>
            <li><strong>Coordonnées :</strong> Numéro de téléphone, adresse courriel, ville, code postal, adresse civique des travaux.</li>
            <li><strong>Détails des lieux :</strong> Type de bâtiment (maison, bureau, etc.), superficie approximative, nombre de pièces, photographies éventuelles transmises volontairement par vous pour l’évaluation.</li>
            <li><strong>Données de navigation :</strong> Adresse IP, type d’appareil (uniquement si vous consentez aux témoins d’analyse).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Finalités de la collecte</h2>
          <p>Vos renseignements sont recueillis pour les fins suivantes :</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Établir et vous transmettre une soumission personnalisée sans frais.</li>
            <li>Planifier, coordonner et exécuter la prestation de nettoyage à votre adresse.</li>
            <li>Assurer le service après-vente et le respect de notre garantie satisfaction.</li>
            <li>Respecter nos obligations légales, fiscales et comptables québécoises.</li>
          </ul>
          <p>
            Aucune communication marketing (infolettres ou promotions) ne vous sera transmise sans votre consentement exprès préalable, conformément aux dispositions de la Loi canadienne antipourriel (LCAP).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Partage et communication à des tiers</h2>
          <p>
            Nous ne vendons, ne louons et ne commercialisons aucun renseignement personnel. Vos données peuvent être partagées uniquement avec :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Nos techniciens et chefs d'équipe autorisés intervenant sur vos lieux.</li>
            <li>Nos sous-traitants technologiques nécessaires aux opérations (hébergement infonuagique sécurisé, passerelle de soumission GoHighLevel / Supabase) liés par des ententes contractuelles strictes de confidentialité respectant la Loi 25.</li>
            <li>Les autorités publiques lorsque requis par une ordonnance judiciaire ou la loi.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Conservation et sécurité</h2>
          <p>
            Vos renseignements sont conservés sur des serveurs sécurisés protégés par chiffrement SSL/TLS. Les demandes de soumission non concrétisées sont automatiquement purgées après une période maximale de <strong>{siteConfig.legal.dataRetentionMonths} mois</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">6. Vos droits (Accès, Rectification, Retrait)</h2>
          <p>
            En vertu de la Loi 25, vous bénéficiez des droits suivants :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Droit d'accès à vos renseignements personnels détenus par notre organisation.</li>
            <li>Droit de rectifier tout renseignement inexact, incomplet ou équivoque.</li>
            <li>Droit de retirer votre consentement à tout moment pour l’utilisation future de vos données.</li>
            <li>Droit à la portabilité de vos données dans un format structuré et couramment utilisé.</li>
          </ul>
        </section>

        {/* Responsible Officer Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 not-prose">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-700" />
            Responsable de la protection des renseignements personnels (RPRP)
          </h3>
          <p className="text-xs text-slate-600">
            Pour exercer l’un de vos droits ou signaler une préoccupation relative à vos données :
          </p>
          <div className="text-xs text-slate-800 space-y-1 pt-1 font-medium">
            <p><strong>Nom :</strong> {siteConfig.legal.privacyOfficer.name}</p>
            <p><strong>Titre :</strong> {siteConfig.legal.privacyOfficer.title}</p>
            <p><strong>Courriel :</strong> <a href={`mailto:${siteConfig.legal.privacyOfficer.email}`} className="text-blue-700 underline">{siteConfig.legal.privacyOfficer.email}</a></p>
            <p><strong>Téléphone :</strong> {siteConfig.legal.privacyOfficer.phone}</p>
            <p><strong>Adresse :</strong> {siteConfig.legal.privacyOfficer.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
