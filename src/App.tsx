import React, { useState, useEffect } from 'react';
import { defaultSiteConfig, getSiteConfigById, allSitePresets, SiteConfig } from './config/site.config';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SiteSwitcherBanner } from './components/layout/SiteSwitcherBanner';
import { CookieConsentBanner } from './components/cookies/CookieConsentBanner';
import { AdminDashboardModal } from './components/dashboard/AdminDashboardModal';
import { JsonLd } from './components/seo/JsonLd';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LocationsIndexPage } from './pages/LocationsIndexPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { QuotePage } from './pages/QuotePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Legal Pages (Loi 25)
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { PersonalDataPolicyPage } from './pages/legal/PersonalDataPolicyPage';
import { CookiePolicyPage } from './pages/legal/CookiePolicyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { LegalNoticePage } from './pages/legal/LegalNoticePage';
import { AccessibilityPage } from './pages/legal/AccessibilityPage';
import { PrivacyContactPage } from './pages/legal/PrivacyContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [currentSiteConfig, setCurrentSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isCookieExplicitOpen, setIsCookieExplicitOpen] = useState(false);

  // Synchronize CSS variables when currentSiteConfig changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', currentSiteConfig.branding.primaryColor);
      root.style.setProperty('--color-secondary', currentSiteConfig.branding.secondaryColor);
      root.style.setProperty('--color-accent', currentSiteConfig.branding.accentColor);
      root.style.setProperty('--color-surface-subtle', currentSiteConfig.branding.surfaceSubtle);

      // Also update document title according to active site
      document.title = `${currentSiteConfig.branding.siteName} - ${currentSiteConfig.branding.tagline}`;
    }
  }, [currentSiteConfig]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSitePreset = (siteId: string) => {
    const found = getSiteConfigById(siteId);
    if (found) {
      setCurrentSiteConfig(found);
    }
  };

  // Route parser
  const renderCurrentRoute = () => {
    // Normalize path
    const path = currentPath.replace(/\/+$/, '') || '/';

    // 1. Home
    if (path === '/') {
      return <HomePage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 2. Services Index
    if (path === '/services') {
      return <ServicesIndexPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 3. Dynamic Service Detail: /services/:slug
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return <ServiceDetailPage slug={slug} siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 4. Locations Index
    if (path === '/secteurs-desservis') {
      return <LocationsIndexPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 5. Dynamic Location Detail: /secteurs-desservis/:slug
    if (path.startsWith('/secteurs-desservis/')) {
      const slug = path.replace('/secteurs-desservis/', '');
      return <LocationDetailPage slug={slug} siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 6. Quote / Soumission
    if (path === '/soumission') {
      return <QuotePage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 7. About
    if (path === '/a-propos') {
      return <AboutPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 8. Contact
    if (path === '/contact') {
      return <ContactPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 9. FAQ
    if (path === '/faq') {
      return <FaqPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 10. Legal & Law 25 Pages
    if (path === '/politique-confidentialite') {
      return <PrivacyPolicyPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }
    if (path === '/politique-gestion-renseignements') {
      return <PersonalDataPolicyPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }
    if (path === '/politique-cookies') {
      return (
        <CookiePolicyPage
          siteConfig={currentSiteConfig}
          onNavigate={navigateTo}
          onOpenCookiePreferences={() => setIsCookieExplicitOpen(true)}
        />
      );
    }
    if (path === '/conditions-utilisation') {
      return <TermsPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }
    if (path === '/avis-legal') {
      return <LegalNoticePage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }
    if (path === '/accessibilite') {
      return <AccessibilityPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }
    if (path === '/contact-protection-renseignements') {
      return <PrivacyContactPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
    }

    // 11. 404 Fallback
    return <NotFoundPage siteConfig={currentSiteConfig} onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Schema.org Structured Data */}
      <JsonLd siteConfig={currentSiteConfig} currentPath={currentPath} />

      {/* 1. Multisite Demo Switcher Banner */}
      <SiteSwitcherBanner
        currentSiteConfig={currentSiteConfig}
        onSelectSite={handleSelectSitePreset}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* 2. Top Header */}
      <Header
        siteConfig={currentSiteConfig}
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* 3. Main Page Content */}
      <main className="flex-1">
        {renderCurrentRoute()}
      </main>

      {/* 4. Footer with Law 25 Notices and Cookie Manager */}
      <Footer
        siteConfig={currentSiteConfig}
        onNavigate={navigateTo}
        onOpenCookiePreferences={() => setIsCookieExplicitOpen(true)}
      />

      {/* 5. Law 25 Cookie Consent Banner */}
      <CookieConsentBanner
        cookieConfig={currentSiteConfig.cookie}
        isOpenExplicitly={isCookieExplicitOpen}
        onCloseExplicit={() => setIsCookieExplicitOpen(false)}
      />

      {/* 6. Admin & Multi-site Inspection Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        siteConfig={currentSiteConfig}
      />
    </div>
  );
}
