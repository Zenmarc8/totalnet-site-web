import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';
import { CookieConfig } from '../../config/types';
import { ConsentState, getStoredConsent, saveConsent } from '../../lib/cookieConsent';
import { CookiePreferencesModal } from './CookiePreferencesModal';

interface CookieConsentBannerProps {
  cookieConfig: CookieConfig;
  isOpenExplicitly?: boolean;
  onCloseExplicit?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  cookieConfig,
  isOpenExplicitly = false,
  onCloseExplicit
}) => {
  const [consent, setConsent] = useState<ConsentState>(getStoredConsent());
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ConsentState>;
      setConsent(customEvent.detail);
    };
    window.addEventListener('totalnet_consent_updated', handleUpdate);
    return () => window.removeEventListener('totalnet_consent_updated', handleUpdate);
  }, []);

  const shouldShowBanner = isOpenExplicitly || !consent.hasAnswered;

  const handleAcceptAll = () => {
    const updated = saveConsent(
      { analytics: true, performance: true, marketing: true },
      cookieConfig.consentVersion
    );
    setConsent(updated);
    if (onCloseExplicit) onCloseExplicit();
  };

  const handleRefuseNonEssential = () => {
    const updated = saveConsent(
      { analytics: false, performance: false, marketing: false },
      cookieConfig.consentVersion
    );
    setConsent(updated);
    if (onCloseExplicit) onCloseExplicit();
  };

  if (!shouldShowBanner && !isPreferencesOpen) return null;

  return (
    <>
      {shouldShowBanner && (
        <aside
          role="region"
          aria-label="Gestion du consentement aux témoins"
          className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl animate-fade-in"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="p-2.5 rounded-xl bg-blue-600/30 text-blue-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold tracking-wide flex items-center gap-2">
                  Respect de votre vie privée & Loi 25 du Québec
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Nous utilisons des témoins essentiels pour assurer le bon fonctionnement de notre site et de nos formulaires de soumission. Des témoins facultatifs peuvent être activés avec votre consentement pour mesurer notre audience et optimiser nos services.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={handleRefuseNonEssential}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
              >
                Refuser non essentiels
              </button>
              <button
                onClick={() => setIsPreferencesOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-blue-300 border border-slate-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                Personnaliser
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Accepter tous les témoins
              </button>
            </div>
          </div>
        </aside>
      )}

      <CookiePreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => {
          setIsPreferencesOpen(false);
          if (onCloseExplicit) onCloseExplicit();
        }}
        cookieConfig={cookieConfig}
        currentConsent={consent}
        onConsentSaved={(updated) => setConsent(updated)}
      />
    </>
  );
};
