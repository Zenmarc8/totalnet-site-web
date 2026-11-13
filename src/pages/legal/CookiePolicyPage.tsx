import React from 'react';
import { Cookie, Settings, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../../config/types';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';

interface Props {
  siteConfig: SiteConfig;
  onNavigate: (path: string) => void;
  onOpenCookiePreferences?: () => void;
}

export const CookiePolicyPage: React.FC<Props> = ({
  siteConfig,
  onNavigate,
  onOpenCookiePreferences
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ name: 'Politique relative aux témoins (cookies)', url: '/politique-cookies' }]}
        onNavigate={onNavigate}
      />

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Témoins de navigation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Politique relative aux témoins (cookies)
        </h1>
        <p className="text-xs text-slate-500">
          Transparence sur l'utilisation des traceurs selon la réglementation québécoise
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Qu'est-ce qu'un témoin de navigation ?</h2>
          <p>
            Un témoin (cookie) est un petit fichier texte déposé sur votre appareil (ordinateur, tablette ou téléphone) lors de la consultation d’un site Web. Il permet à notre système de reconnaître votre navigateur et de retenir vos paramètres.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Les catégories de témoins utilisées</h2>
          
          <div className="space-y-3 not-prose">
            {siteConfig.cookie.categories.map(cat => (
              <div key={cat.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{cat.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cat.required ? 'bg-slate-200 text-slate-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {cat.required ? 'Obligatoire' : 'Facultatif (désactivé par défaut)'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Comment modifier vos préférences à tout moment</h2>
          <p>
            Vous conservez le contrôle absolu sur vos choix. Conformément aux directives de la Commission d’accès à l’information, vous pouvez retirer ou ajuster votre consentement en tout temps sans pénalité.
          </p>
          {onOpenCookiePreferences && (
            <div className="pt-2 not-prose">
              <button
                onClick={onOpenCookiePreferences}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Ouvrir le centre de préférences des témoins
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
