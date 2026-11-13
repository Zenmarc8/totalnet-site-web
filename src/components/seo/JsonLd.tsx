import React from 'react';
import { SiteConfig, ServiceItem } from '../../config/types';

interface JsonLdProps {
  siteConfig: SiteConfig;
  currentService?: ServiceItem;
  currentPath?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const JsonLd: React.FC<JsonLdProps> = ({
  siteConfig,
  currentService,
  currentPath = '/',
  breadcrumbs,
  faqs
}) => {
  const fullUrl = `${siteConfig.seo.canonicalBaseUrl}${currentPath}`;

  // 1. Organization & LocalBusiness / CleaningService Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': `${siteConfig.seo.canonicalBaseUrl}/#organization`,
    name: siteConfig.branding.siteName,
    legalName: siteConfig.legal.companyLegalName,
    url: siteConfig.seo.canonicalBaseUrl,
    logo: `${siteConfig.seo.canonicalBaseUrl}/images/logo.png`,
    image: siteConfig.branding.heroImage.url,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.province,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.seo.geoCoordinates.latitude,
      longitude: siteConfig.seo.geoCoordinates.longitude
    },
    areaServed: siteConfig.seo.organizationSchema.areaServed.map(city => ({
      '@type': 'City',
      name: city
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '17:00'
      }
    ]
  };

  // 2. Specific Service Schema (if on a service page)
  const serviceSchema = currentService
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: currentService.name,
        serviceType: currentService.name,
        description: currentService.fullDescription,
        provider: {
          '@id': `${siteConfig.seo.canonicalBaseUrl}/#organization`
        },
        areaServed: siteConfig.seo.organizationSchema.areaServed.map(city => ({
          '@type': 'City',
          name: city
        })),
        offers: currentService.estimatedStartingPrice
          ? {
              '@type': 'Offer',
              priceCurrency: 'CAD',
              description: currentService.estimatedStartingPrice
            }
          : undefined
      }
    : null;

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${siteConfig.seo.canonicalBaseUrl}${crumb.url}`
        }))
      }
    : null;

  // 4. FAQPage Schema (only if relevant FAQs exist)
  const faqSchema = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
};
