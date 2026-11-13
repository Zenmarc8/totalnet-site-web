import React, { useState } from 'react';
import { X, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { CookieConfig } from '../../config/types';
import { ConsentState, saveConsent } from '../../lib/cookieConsent';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  cookieConfig: CookieConfig;
  currentConsent: ConsentState;
  onConsentSaved: (newConsent: ConsentState) => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  isOpen,
  onClose,
  cookieConfig,
  currentConsent,
  onConsentSaved
}) => {
  const [preferences, setPreferences] = useState({
    analytics: currentConsent.preferences.analytics,
    performance: currentConsent.preferences.performance,
    marketing: currentConsent.preferences.marketing
  });

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveConsent(preferences, cookieConfig.consentVersion);
    onConsentSaved(updated);
    onClose();
  };

  const handleAcceptAll = () => {
    const updated = saveConsent(
      { analytics: true, performance: true, marketing: true },
      cookieConfig.consentVersion
    );
    onConsentSaved(updated);
    onClose();
  };

  const handleRefuseAll = () => {
    const updated = saveConsent(
      { analytics: false, performance: false, marketing: false },
      cookieConfig.consentVersion
    );
    onConsentSaved(updated);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cookie-modal-title" className="text-lg font-bold text-slate-900">
                Centre de préférences des témoins (Cookies)
              </h2>
              <p className="text-xs text-slate-500">Conformité à la Loi 25 du Québec</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed">
          <p>
            Nous respectons votre vie privée. Conformément aux dispositions de la Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25), aucun témoin non essentiel n’est déposé sans votre consentement exprès et éclairé.
          </p>

          <div className="space-y-4">
            {/* Category 1: Essentiels */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-900 flex items-center gap-2">
                  Témoins essentiels
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Obligatoires
                  </span>
                </span>
                <span className="text-xs font-semibold text-slate-500">Toujours actifs</span>
              </div>
              <p className="text-xs text-slate-600">
                Garantissent la sécurité, la navigation de base et la mémorisation de votre formulaire de qualification de service. Ils ne collectent aucune donnée marketing.
              </p>
            </div>

            {/* Category 2: Analytiques */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="toggle-analytics" className="font-semibold text-slate-900 cursor-pointer">
                  Témoins d’analyse et d’audience (GA4)
                </label>
                <input
                  id="toggle-analytics"
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <p className="text-xs text-slate-600">
                Permettent de mesurer de manière anonymisée la fréquentation du site et les pages les plus visitées pour améliorer nos services d’entretien.
              </p>
            </div>

            {/* Category 3: Performance */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="toggle-performance" className="font-semibold text-slate-900 cursor-pointer">
                  Témoins de performance et préférences
                </label>
                <input
                  id="toggle-performance"
                  type="checkbox"
                  checked={preferences.performance}
                  onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <p className="text-xs text-slate-600">
                Retiennent vos choix régionaux (ex. Laval ou Rive-Sud) pour afficher les coordonnées téléphoniques locales prioritaires.
              </p>
            </div>

            {/* Category 4: Marketing */}
            <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="toggle-marketing" className="font-semibold text-slate-900 cursor-pointer">
                  Témoins publicitaires et conversion
                </label>
                <input
                  id="toggle-marketing"
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <p className="text-xs text-slate-600">
                Mesurent l’efficacité de nos campagnes de recherche Google pour nous assurer que nos services rejoignent les résidents en besoin réel de nettoyage.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 border-t border-slate-100 bg-slate-50">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleRefuseAll}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Tout refuser
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Tout accepter
            </button>
          </div>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
          >
            Enregistrer mes préférences
          </button>
        </div>
      </div>
    </div>
  );
};
