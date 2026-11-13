import { SiteConfig } from './types';
import { defaultBrandingConfig } from './branding.config';
import { defaultContactConfig } from './contact.config';
import { servicesConfig } from './services.config';
import { locationsConfig } from './locations.config';
import { defaultSeoConfig } from './seo.config';
import { defaultIntegrationsConfig } from './integrations.config';
import { defaultLegalConfig } from './legal.config';
import { defaultCookieConfig } from './cookie.config';

/**
 * Site 1: Master General Cleaning Site (TotalNet)
 */
export const totalnetGeneralPreset: SiteConfig = {
  siteId: 'totalnet-general',
  domain: 'totalnetentretien.com',
  branding: defaultBrandingConfig,
  contact: defaultContactConfig,
  services: servicesConfig,
  locations: locationsConfig,
  seo: defaultSeoConfig,
  integrations: defaultIntegrationsConfig,
  legal: defaultLegalConfig,
  cookie: defaultCookieConfig
};

/**
 * Site 2: Specialized Rank & Rent - Tapis Expert Laval
 */
export const tapisExpertLavalPreset: SiteConfig = {
  siteId: 'tapis-expert-laval',
  domain: 'nettoyage-tapis-laval.ca',
  branding: {
    siteName: 'Tapis Expert Laval',
    tagline: 'Le spécialiste numéro 1 du nettoyage de tapis et meubles à Laval',
    logoText: 'Tapis Expert',
    logoSubtext: 'Laval & Couronne Nord',
    primaryColor: '#0F4C81',
    secondaryColor: '#38BDF8',
    accentColor: '#0284C7',
    surfaceSubtle: '#F0F9FF',
    heroBadgeText: 'Spécialiste accrédité Laval • Camion-usine ultra-puissant',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1600&q=85',
      alt: 'Extraction vapeur haute température sur tapis à Laval',
      width: 1600,
      height: 900
    }
  },
  contact: {
    ...defaultContactConfig,
    phoneDisplay: '(450) 682-1990',
    phoneRaw: '+14506821990',
    email: 'contact@nettoyage-tapis-laval.ca',
    quotesEmail: 'soumissions@nettoyage-tapis-laval.ca'
  },
  // Filter for carpet & upholstery focus
  services: servicesConfig.map(s => {
    const isSpecialized = ['nettoyage-de-tapis', 'nettoyage-de-carpettes', 'nettoyage-de-meubles-rembourres', 'nettoyage-de-matelas', 'nettoyage-des-odeurs'].includes(s.id);
    return { ...s, isActive: isSpecialized, isPopular: s.id === 'nettoyage-de-tapis' };
  }),
  // Location prioritized to Laval
  locations: locationsConfig.map(l => ({ ...l, isActive: l.id === 'laval' || l.id === 'terrebonne' || l.id === 'blainville' })),
  seo: {
    ...defaultSeoConfig,
    defaultTitleTemplate: '%s | Tapis Expert Laval - Nettoyage à la vapeur',
    defaultMetaDescription: 'Nettoyage professionnel de tapis à domicile et carpettes fines à Laval. Camion-usine, élimination des odeurs et taches. Soumission en ligne gratuite en 2 minutes.',
    canonicalBaseUrl: 'https://nettoyage-tapis-laval.ca'
  },
  integrations: defaultIntegrationsConfig,
  legal: {
    ...defaultLegalConfig,
    companyLegalName: 'Tapis Expert Laval (Division de TotalNet Inc.)'
  },
  cookie: defaultCookieConfig
};

/**
 * Site 3: Specialized Rank & Rent - Entretien Commercial Rive-Sud
 */
export const commercialRiveSudPreset: SiteConfig = {
  siteId: 'commercial-rive-sud',
  domain: 'entretien-commercial-rivesud.ca',
  branding: {
    siteName: 'ProCommercial Rive-Sud',
    tagline: 'Salubrité, conciergerie et entretien ménager commercial certifié sur la Rive-Sud',
    logoText: 'ProCommercial',
    logoSubtext: 'Rive-Sud de Montréal',
    primaryColor: '#0F172A',
    secondaryColor: '#F59E0B',
    accentColor: '#D97706',
    surfaceSubtle: '#F8FAFC',
    heroBadgeText: 'Contrats B2B certifiés • Longueuil, Brossard & Boucherville',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      alt: 'Entretien ménager de bureaux modernes sur la Rive-Sud',
      width: 1600,
      height: 900
    }
  },
  contact: {
    ...defaultContactConfig,
    phoneDisplay: '(450) 674-8822',
    phoneRaw: '+14506748822',
    email: 'info@entretien-commercial-rivesud.ca',
    quotesEmail: 'devis@entretien-commercial-rivesud.ca'
  },
  services: servicesConfig.map(s => {
    const isCommercial = ['nettoyage-commercial', 'decapage-et-cirage-de-planchers', 'entretien-dimmeubles', 'nettoyage-industriel', 'nettoyage-apres-construction', 'nettoyage-de-vitres'].includes(s.id);
    return { ...s, isActive: isCommercial, isPopular: s.id === 'nettoyage-commercial' };
  }),
  locations: locationsConfig.map(l => ({ ...l, isActive: l.id === 'longueuil' || l.id === 'brossard' || l.id === 'boucherville' || l.id === 'saint-jean-sur-richelieu' })),
  seo: {
    ...defaultSeoConfig,
    defaultTitleTemplate: '%s | ProCommercial Rive-Sud - Nettoyage de bureaux & commerces',
    defaultMetaDescription: 'Conciergerie et entretien ménager commercial à Longueuil, Brossard et Boucherville. Protocoles stricts, décapage de planchers et équipes formées.',
    canonicalBaseUrl: 'https://entretien-commercial-rivesud.ca'
  },
  integrations: defaultIntegrationsConfig,
  legal: {
    ...defaultLegalConfig,
    companyLegalName: 'ProCommercial Rive-Sud (Division de TotalNet Inc.)'
  },
  cookie: defaultCookieConfig
};

/**
 * Site 4: Specialized Rank & Rent - Lavage Vitres Pro Montréal
 */
export const lavageVitresProPreset: SiteConfig = {
  siteId: 'lavage-vitres-pro',
  domain: 'lavage-vitres-montreal.ca',
  branding: {
    siteName: 'Vitres Pro Montréal',
    tagline: 'Lavage de vitres résidentiel et commercial sans traces à l’eau déionisée pure',
    logoText: 'Vitres Pro',
    logoSubtext: 'Montréal & Arrondissements',
    primaryColor: '#0284C7',
    secondaryColor: '#38BDF8',
    accentColor: '#0369A1',
    surfaceSubtle: '#F0F9FF',
    heroBadgeText: 'Technologie eau pure sans traces • Résidentiel & Édifices',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=85',
      alt: 'Lavage professionnel de vitres à Montréal',
      width: 1600,
      height: 900
    }
  },
  contact: {
    ...defaultContactConfig,
    phoneDisplay: '(514) 875-1100',
    phoneRaw: '+15148751100',
    email: 'service@lavage-vitres-montreal.ca',
    quotesEmail: 'soumission@lavage-vitres-montreal.ca'
  },
  services: servicesConfig.map(s => {
    const isWindows = ['nettoyage-de-vitres', 'lavage-a-pression', 'nettoyage-exterieur'].includes(s.id);
    return { ...s, isActive: isWindows, isPopular: s.id === 'nettoyage-de-vitres' };
  }),
  locations: locationsConfig.map(l => ({ ...l, isActive: l.id === 'montreal' || l.id === 'laval' })),
  seo: {
    ...defaultSeoConfig,
    defaultTitleTemplate: '%s | Vitres Pro Montréal - Lavage de vitres et fenêtres',
    defaultMetaDescription: 'Lavage de vitres intérieur et extérieur à Montréal. Moustiquaires et rails inclus, perches télescopiques jusqu’à 4 étages sans échafaudage.',
    canonicalBaseUrl: 'https://lavage-vitres-montreal.ca'
  },
  integrations: defaultIntegrationsConfig,
  legal: {
    ...defaultLegalConfig,
    companyLegalName: 'Vitres Pro Montréal (Division de TotalNet Inc.)'
  },
  cookie: defaultCookieConfig
};

export const allSitePresets: Record<string, SiteConfig> = {
  'totalnet-general': totalnetGeneralPreset,
  'tapis-expert-laval': tapisExpertLavalPreset,
  'commercial-rive-sud': commercialRiveSudPreset,
  'lavage-vitres-pro': lavageVitresProPreset
};
