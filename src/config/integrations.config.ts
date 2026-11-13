import { IntegrationsConfig } from './types';

export const defaultIntegrationsConfig: IntegrationsConfig = {
  supabase: {
    enabled: true,
    url: import.meta.env.VITE_SUPABASE_URL || 'https://mock-proj.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key-placeholder',
    tableName: 'leads_soumissions'
  },
  goHighLevel: {
    enabled: true,
    webhookUrl: import.meta.env.VITE_GHL_WEBHOOK_URL || 'https://services.leadconnectorhq.com/hooks/mock-webhook-placeholder',
    pipelineStageId: 'qualification_leads_quebec'
  },
  googleAnalytics: {
    enabled: false,
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
  },
  googleTagManager: {
    enabled: false,
    containerId: import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-XXXXXXX'
  },
  notificationEmail: {
    enabled: true,
    recipient: 'soumissions@totalnet-quebec.ca'
  }
};
