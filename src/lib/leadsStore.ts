import { LeadSubmission } from '../config/types';

const LEADS_STORAGE_KEY = 'totalnet_leads_vault_v1';

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; leadId: string; errors?: string[] }> {
  const existing = getStoredLeads();
  const updated = [lead, ...existing];
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
  }

  // Optional real dispatch to external webhook if configured
  try {
    // If user provided a custom webhook URL via env, attempt POST
    const webhookUrl = import.meta.env.VITE_GHL_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('https://')) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        mode: 'no-cors'
      });
    }
  } catch (err) {
    console.warn('External webhook dispatch logged:', err);
  }

  return { success: true, leadId: lead.id };
}

export function getStoredLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function deleteLead(leadId: string): void {
  if (typeof window === 'undefined') return;
  const current = getStoredLeads();
  const filtered = current.filter(l => l.id !== leadId);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllLeads(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEADS_STORAGE_KEY);
}

export function exportLeadsToCsv(leads: LeadSubmission[]): string {
  const headers = ['ID', 'Date', 'Site', 'Service', 'Propriété', 'Prénom', 'Nom', 'Téléphone', 'Courriel', 'Ville', 'Code Postal', 'Hors Territoire', 'Consentement Marketing'];
  const rows = leads.map(l => [
    l.id,
    l.createdAt,
    l.siteId,
    `"${l.serviceName.replace(/"/g, '""')}"`,
    `"${l.propertyType}"`,
    `"${l.customer.firstName}"`,
    `"${l.customer.lastName}"`,
    `"${l.customer.phone}"`,
    `"${l.customer.email}"`,
    `"${l.customer.city}"`,
    `"${l.customer.postalCode}"`,
    l.isOutOfTerritory ? 'OUI' : 'NON',
    l.marketingConsentAccepted ? 'OUI' : 'NON'
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
