import { SiteConfig } from './types';
import { totalnetGeneralPreset, allSitePresets } from './multisite-presets';

export { allSitePresets };
export * from './types';
export * from './branding.config';
export * from './contact.config';
export * from './services.config';
export * from './locations.config';
export * from './seo.config';
export * from './integrations.config';
export * from './legal.config';
export * from './cookie.config';

/**
 * Active site configuration.
 * By default, loads 'totalnet-general'.
 * In a multi-tenant build or domain routing environment,
 * this can read from process.env.SITE_ID or window.location.hostname.
 */
export const defaultSiteConfig: SiteConfig = totalnetGeneralPreset;

export function getSiteConfigById(siteId: string): SiteConfig {
  return allSitePresets[siteId] || defaultSiteConfig;
}
