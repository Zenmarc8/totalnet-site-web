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

  // Envoi vers Supabase (table leads_soumissions)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/leads_soumissions`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          id: lead.id,
          created_at: lead.createdAt,
          site_id: lead.siteId,
          service_id: lead.serviceId,
          service_name: lead.serviceName,
          property_type: lead.propertyType,
          specific_needs: lead.specificNeeds,
          dimensions: lead.dimensions,
          timeframe: lead.timeframe,
          preferred_date: lead.preferredDate || null,
          customer_first_name: lead.customer.firstName,
          customer_last_name: lead.customer.lastName,
          customer_phone: lead.customer.phone,
          customer_email: lead.customer.email,
          customer_city: lead.customer.city,
          customer_postal_code: lead.customer.postalCode,
          customer_street_address: lead.customer.streetAddress || null,
          customer_notes: lead.customer.notes || null,
          photos_count: lead.photosCount,
          photo_names: lead.photoNames,
          is_out_of_territory: lead.isOutOfTerritory,
          privacy_consent_accepted: lead.privacyConsentAccepted,
          marketing_consent_accepted: lead.marketingConsentAccepted,
          status: lead.status,
        }),
      });
    } catch (err) {
      console.warn('Supabase insert error:', err);
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
export async function uploadLeadPhotos(leadId: string, files: File[]): Promise<string[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey || files.length === 0) {
    return files.map((f) => f.name);
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${leadId}/${Date.now()}_${cleanName}`;

    try {
      const res = await fetch(`${supabaseUrl}/storage/v1/object/lead-photos/${filePath}`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      });

      if (res.ok) {
        uploadedUrls.push(`${supabaseUrl}/storage/v1/object/public/lead-photos/${filePath}`);
      } else {
        uploadedUrls.push(file.name);
      }
    } catch {
      uploadedUrls.push(file.name);
    }
  }

  return uploadedUrls;
}
