import React from 'react';
import { Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
}

export const AccessibilityPage: React.FC<Props> = ({ siteConfig, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ name: 'Accessibilité Web', url: '/accessibilite' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Inclusion numérique
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Déclaration d'accessibilité Web (WCAG 2.2 AA)
        </h1>
        <p className="text-xs text-slate-500">
          Engagement envers un accès universel aux services de nettoyage et d’entretien
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Notre engagement</h2>
          <p>
            <strong className="text-slate-900">{siteConfig.branding.siteName}</strong> s'engage à rendre son site Web accessible à tous les utilisateurs, quelles que soient leurs capacités physiques ou cognitives, conformément aux <em>Règles pour l’accessibilité des contenus Web (WCAG 2.2 niveau AA)</em> et au <em>Standard sur l’accessibilité des sites Web du gouvernement du Québec (SGQRI 008 2.0)</em>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Mesures techniques mises en œuvre</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Contraste des couleurs :</strong> Respect d'un ratio de contraste minimal de 4.5:1 pour le texte courant par rapport aux fonds.</li>
            <li><strong>Navigation au clavier :</strong> Tous les éléments interactifs (boutons, formulaires de soumission, menus déroulants) sont navigables sans souris avec indicateurs de focus visibles.</li>
            <li><strong>Structure sémantique :</strong> Hiérarchie rigoureuse des titres (H1, H2, H3) et balises sémantiques HTML5 (&lt;nav&gt;, &lt;main&gt;, &lt;aside&gt;, &lt;footer&gt;).</li>
            <li><strong>Textes alternatifs :</strong> Attributs <code className="bg-slate-100 px-1 py-0.5 rounded">alt</code> descriptifs pour toutes les images informatives.</li>
            <li><strong>Formulaires clairs :</strong> Étiquettes explicites, messages d'erreurs textuels détaillés et champs adaptés aux lecteurs d'écran.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Assistance et commentaires</h2>
          <p>
            Si vous rencontrez des difficultés de navigation ou si vous avez besoin d'une assistance pour compléter votre demande de soumission, nous vous invitons à nous contacter directement par téléphone au <strong className="text-slate-900">{siteConfig.contact.phoneDisplay}</strong> ou par courriel à <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-700 underline">{siteConfig.contact.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
