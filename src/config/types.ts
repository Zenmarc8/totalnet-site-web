/**
 * Master Architecture TotalNet - TypeScript Types
 * Engine for 30+ Rank & Rent cleaning websites in Quebec
 */

export interface BrandingConfig {
  siteName: string;
  tagline: string;
  logoText: string;
  logoSubtext?: string;
  primaryColor: string; // e.g. #05284F
  secondaryColor: string; // e.g. #76A8F9
  accentColor: string;
  surfaceSubtle: string;
  heroBadgeText: string;
  heroImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface ContactConfig {
  phoneDisplay: string;
  phoneRaw: string; // e.g. "+15145550199"
  emergencyPhone?: string;
  email: string;
  quotesEmail: string;
  address: {
    street: string;
    city: string;
    province: string; // 'QC'
    postalCode: string;
    country: string; // 'CA'
  };
  businessHours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
    emergency247: boolean;
  };
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'residentiel' | 'commercial' | 'specialise' | 'sinistre' | 'exterieur';
  icon: string;
  imageUrl: string;
  imageAlt: string;
  isActive: boolean;
  isPopular?: boolean;
  benefits: string[];
  equipmentUsed: string[];
  propertyTypes: string[];
  faqs: ServiceFAQ[];
  estimatedStartingPrice?: string;
  priceNote?: string;
}

export interface LocationItem {
  id: string;
  slug: string;
  name: string;
  region: string; // e.g. 'Laval', 'Grand Montréal', 'Rive-Sud', 'Rive-Nord'
  postalPrefixes: string[]; // e.g. ['H7A', 'H7B', 'H7L', 'H7X', 'H7Y', etc.]
  shortDescription: string;
  fullDescription: string;
  averageResponseTime: string;
  isActive: boolean;
  isPrimaryHub?: boolean;
  localPhone?: string;
  featuredServices: string[]; // array of service slugs
  keyNeighborhoods: string[];
}

export interface SeoConfig {
  defaultTitleTemplate: string;
  defaultMetaDescription: string;
  canonicalBaseUrl: string;
  locale: string; // 'fr_CA'
  openGraphImage: string;
  twitterHandle?: string;
  geoCoordinates: {
    latitude: number;
    longitude: number;
  };
  organizationSchema: {
    legalName: string;
    foundingYear: number;
    vatID?: string;
    areaServed: string[];
  };
  robotsConfig: {
    index: boolean;
    follow: boolean;
  };
}

export interface IntegrationsConfig {
  supabase: {
    enabled: boolean;
    url: string;
    anonKey: string;
    tableName: string;
  };
  goHighLevel: {
    enabled: boolean;
    webhookUrl: string;
    pipelineStageId?: string;
  };
  googleAnalytics: {
    enabled: boolean;
    measurementId: string; // e.g. 'G-XXXXXXXXXX'
  };
  googleTagManager: {
    enabled: boolean;
    containerId: string; // e.g. 'GTM-XXXXXX'
  };
  notificationEmail: {
    enabled: boolean;
    recipient: string;
  };
}

export interface LegalConfig {
  companyLegalName: string;
  quebecEnterpriseNumber: string; // NEQ
  privacyOfficer: {
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
  };
  law25Notice: string;
  dataRetentionMonths: number;
  incidentRegisterMaintained: boolean;
  cancellationPolicy: string;
  insuranceCoverage: string;
}

export interface CookieCategory {
  id: 'essential' | 'analytics' | 'performance' | 'marketing';
  label: string;
  description: string;
  required: boolean;
  defaultState: boolean;
}

export interface CookieConfig {
  consentVersion: string;
  validityDays: number;
  categories: CookieCategory[];
}

export interface SiteConfig {
  siteId: string;
  domain: string;
  branding: BrandingConfig;
  contact: ContactConfig;
  services: ServiceItem[];
  locations: LocationItem[];
  seo: SeoConfig;
  integrations: IntegrationsConfig;
  legal: LegalConfig;
  cookie: CookieConfig;
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  siteId: string;
  serviceId: string;
  serviceName: string;
  propertyType: string;
  specificNeeds: string[];
  dimensions: {
    roomsCount?: number;
    approximateSqFt?: number;
    floorCount?: number;
    itemCount?: number;
    notes?: string;
  };
  timeframe: string;
  preferredDate?: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    postalCode: string;
    streetAddress?: string;
    notes?: string;
  };
  photosCount: number;
  photoNames?: string[];
  isOutOfTerritory: boolean;
  privacyConsentAccepted: boolean;
  marketingConsentAccepted: boolean;
  status: 'nouveau' | 'transmis_supabase' | 'transmis_ghl' | 'erreur';
}
