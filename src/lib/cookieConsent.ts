/**
 * Quebec Law 25 Cookie Consent Manager
 * Stores user preferences, fires events, and enables/disables scripts
 */

export interface ConsentState {
  hasAnswered: boolean;
  timestamp: string | null;
  version: string;
  preferences: {
    essential: boolean;
    analytics: boolean;
    performance: boolean;
    marketing: boolean;
  };
}

const STORAGE_KEY = 'totalnet_cookie_consent_v2';

export const defaultConsentState: ConsentState = {
  hasAnswered: false,
  timestamp: null,
  version: '2026.1-Loi25',
  preferences: {
    essential: true, // Always true
    analytics: false,
    performance: false,
    marketing: false
  }
};

export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return defaultConsentState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConsentState;
    const parsed = JSON.parse(raw);
    return { ...defaultConsentState, ...parsed };
  } catch {
    return defaultConsentState;
  }
}

export function saveConsent(preferences: Partial<ConsentState['preferences']>, version = '2026.1-Loi25'): ConsentState {
  const updated: ConsentState = {
    hasAnswered: true,
    timestamp: new Date().toISOString(),
    version,
    preferences: {
      essential: true,
      analytics: Boolean(preferences.analytics),
      performance: Boolean(preferences.performance),
      marketing: Boolean(preferences.marketing)
    }
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('totalnet_consent_updated', { detail: updated }));
      
      // Update Google Consent Mode v2 if present
      if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag('consent', 'update', {
          analytics_storage: updated.preferences.analytics ? 'granted' : 'denied',
          ad_storage: updated.preferences.marketing ? 'granted' : 'denied',
          ad_user_data: updated.preferences.marketing ? 'granted' : 'denied',
          ad_personalization: updated.preferences.marketing ? 'granted' : 'denied'
        });
      }
    } catch {
      // Storage quota or privacy mode fallback
    }
  }

  return updated;
}

export function resetConsent(): ConsentState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('totalnet_consent_updated', { detail: defaultConsentState }));
    } catch {
      // Fallback
    }
  }
  return defaultConsentState;
}
