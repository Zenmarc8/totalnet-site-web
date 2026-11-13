-- TotalNet Architecture - Supabase SQL Migration
-- Table de stockage sécurisée des demandes de soumissions (Cloisonnement multi-sites)

CREATE TABLE IF NOT EXISTS public.leads_soumissions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    site_id TEXT NOT NULL,
    service_id TEXT NOT NULL,
    service_name TEXT NOT NULL,
    property_type TEXT NOT NULL,
    specific_needs JSONB DEFAULT '[]'::jsonb,
    dimensions JSONB DEFAULT '{}'::jsonb,
    timeframe TEXT NOT NULL,
    preferred_date DATE,
    customer_first_name TEXT NOT NULL,
    customer_last_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    customer_postal_code TEXT NOT NULL,
    customer_street_address TEXT,
    customer_notes TEXT,
    photos_count INT DEFAULT 0,
    photo_names TEXT[] DEFAULT '{}',
    is_out_of_territory BOOLEAN DEFAULT false,
    privacy_consent_accepted BOOLEAN NOT NULL DEFAULT false,
    marketing_consent_accepted BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'nouveau',
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Activation de Row Level Security (RLS) pour conformité Loi 25
ALTER TABLE public.leads_soumissions ENABLE ROW LEVEL SECURITY;

-- 1. Politique : Autoriser l'insertion anonyme depuis le formulaire du site
CREATE POLICY "Permettre l'insertion publique des soumissions" 
ON public.leads_soumissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (privacy_consent_accepted = true);

-- 2. Politique : Seuls les utilisateurs authentifiés (administrateurs) peuvent lire les données
CREATE POLICY "Lecture réservée aux administrateurs authentifiés" 
ON public.leads_soumissions 
FOR SELECT 
TO authenticated 
USING (true);

-- 3. Politique : Seuls les administrateurs peuvent mettre à jour ou archiver
CREATE POLICY "Mise à jour réservée aux administrateurs authentifiés" 
ON public.leads_soumissions 
FOR UPDATE 
TO authenticated 
USING (true);

-- Index pour recherche rapide et analytics multi-sites
CREATE INDEX IF NOT EXISTS idx_leads_site_id ON public.leads_soumissions (site_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads_soumissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_postal_code ON public.leads_soumissions (customer_postal_code);
CREATE INDEX IF NOT EXISTS idx_leads_service_id ON public.leads_soumissions (service_id);
