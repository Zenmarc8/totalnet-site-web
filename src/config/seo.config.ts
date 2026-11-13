import { SeoConfig } from './types';

export const defaultSeoConfig: SeoConfig = {
  defaultTitleTemplate: '%s | TotalNet - Services de nettoyage professionnels au Québec',
  defaultMetaDescription: 'Services de nettoyage résidentiel, commercial, tapis, meubles et après sinistre au Québec. Devis gratuit en ligne sous 24h. Interventions à Laval, Montréal et environs.',
  canonicalBaseUrl: 'https://totalnet-quebec.ca',
  locale: 'fr_CA',
  openGraphImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&h=630&q=85',
  geoCoordinates: {
    latitude: 45.5601,
    longitude: -73.7121
  },
  organizationSchema: {
    legalName: 'TotalNet Services de Propreté Inc.',
    foundingYear: 2018,
    areaServed: [
      'Laval',
      'Montréal',
      'Longueuil',
      'Terrebonne',
      'Brossard',
      'Repentigny',
      'Blainville',
      'Saint-Jérôme',
      'Boucherville',
      'Saint-Jean-sur-Richelieu'
    ]
  },
  robotsConfig: {
    index: true,
    follow: true
  }
};
